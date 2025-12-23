import { useState, useEffect, useRef } from 'react';
import { Coffee, Cookie } from 'lucide-react';

interface ParentStopProps {
  isActive: boolean;
  onClose: () => void;
}

const treats = [
  { id: 1, name: 'Hot Chocolate', icon: Coffee, emoji: '☕', sound: 'sip' },
  { id: 2, name: 'Gingerbread Cookie', icon: Cookie, emoji: '🍪', sound: 'crunch' },
  { id: 3, name: 'Candy Cane', icon: Cookie, emoji: '🍬', sound: 'crunch' },
  { id: 4, name: 'Mince Pie', icon: Cookie, emoji: '🥧', sound: 'yum' },
  { id: 5, name: 'Warm Cocoa', icon: Coffee, emoji: '🍫', sound: 'sip' },
  { id: 6, name: 'Christmas Pudding', icon: Cookie, emoji: '🎂', sound: 'yum' },
  { id: 7, name: 'Sugar Plum', icon: Cookie, emoji: '🍬', sound: 'crunch' },
  { id: 8, name: 'Eggnog', icon: Coffee, emoji: '🥛', sound: 'sip' },
];

const carStopMessages = [
  "We're just stopping for a moment...",
  "Wait here, sweetie. I'll be right back...",
  "Don't worry, just a quick stop...",
  "Close your eyes and count to twenty...",
  "I have a little surprise for you...",
];

export const ParentStop = ({ isActive, onClose }: ParentStopProps) => {
  const [parent, setParent] = useState<'mum' | 'dad'>('mum');
  const [item, setItem] = useState<{ name: string; emoji: string; sound: string } | null>(null);
  const [message, setMessage] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isActive) {
      setParent(Math.random() > 0.5 ? 'mum' : 'dad');
      const randomTreat = treats[Math.floor(Math.random() * treats.length)];
      setItem({ name: randomTreat.name, emoji: randomTreat.emoji, sound: randomTreat.sound });
      setMessage(carStopMessages[Math.floor(Math.random() * carStopMessages.length)]);
      setIsRevealing(false);
      setShowThankYou(false);
      
      // Play car stopping sound
      playSound('stop');
      
      // Auto-reveal after 2 seconds
      const timer = setTimeout(() => {
        setIsRevealing(true);
        playSound('reveal');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const playSound = (type: 'stop' | 'reveal' | 'collect') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'stop') {
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
      } else if (type === 'reveal') {
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
      } else if (type === 'collect') {
        oscillator.frequency.setValueAtTime(523, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio not supported
    }
  };

  const collectItem = () => {
    if (item) {
      playSound('collect');
      setShowThankYou(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  if (!isActive || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nightSky/95 backdrop-blur-md">
      {/* Animated car stopping background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nightSky via-muted/20 to-nightSky" />
        {/* Slowing street lights */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-warmGlow/60 blur-sm"
            style={{
              left: `${10 + i * 20}%`,
              top: '30%',
              animation: `slideInFromRight 2s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.6 - i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="cozy-glass p-8 max-w-sm w-full text-center relative animate-fade-in-up">
        {/* Warm glow effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-warmGlow/20 blur-3xl" />
        
        {showThankYou ? (
          <div className="animate-scale-in">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="font-display text-3xl text-warmGlow">Thank you!</h2>
            <p className="text-muted-foreground mt-2">Back on the road...</p>
          </div>
        ) : (
          <>
            <div className="text-6xl mb-4 animate-float">
              {parent === 'mum' ? '👩' : '👨'}
            </div>
            
            <h2 className="font-display text-2xl text-foreground mb-2">
              {parent === 'mum' ? 'Mum' : 'Dad'} stopped the car
            </h2>
            
            <p className="text-muted-foreground mb-6 italic">
              "{message}"
            </p>

            {isRevealing ? (
              <div className="animate-fade-in-up">
                <div className="cozy-glass p-6 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-warmGlow/10 to-transparent" />
                  <p className="text-sm text-muted-foreground mb-2 relative z-10">They brought you...</p>
                  <div className="text-6xl mb-3 animate-float relative z-10" style={{ animationDelay: '0.5s' }}>
                    {item.emoji}
                  </div>
                  <h3 className="font-display text-2xl text-warmGlow relative z-10">{item.name}</h3>
                </div>

                <button
                  onClick={collectItem}
                  className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
                  style={{ boxShadow: '0 0 30px 5px hsl(var(--primary) / 0.3)' }}
                >
                  Thank you! 💕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-warmGlow animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-warmGlow animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-warmGlow animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
