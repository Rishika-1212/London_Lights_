import { useState, useEffect } from 'react';
import { Gift, Cookie, Coffee, X } from 'lucide-react';

interface ParentStopProps {
  isActive: boolean;
  onClose: () => void;
}

const treats = [
  { id: 1, name: 'Hot Chocolate', icon: Coffee, emoji: '☕' },
  { id: 2, name: 'Gingerbread Cookie', icon: Cookie, emoji: '🍪' },
  { id: 3, name: 'Candy Cane', icon: Gift, emoji: '🍬' },
  { id: 4, name: 'Mince Pie', icon: Cookie, emoji: '🥧' },
];

const toys = [
  { id: 1, name: 'Snow Globe', emoji: '🔮' },
  { id: 2, name: 'Teddy Bear', emoji: '🧸' },
  { id: 3, name: 'Music Box', emoji: '🎶' },
  { id: 4, name: 'Christmas Ornament', emoji: '🎄' },
];

export const ParentStop = ({ isActive, onClose }: ParentStopProps) => {
  const [parent, setParent] = useState<'mum' | 'dad'>('mum');
  const [item, setItem] = useState<{ name: string; emoji: string } | null>(null);
  const [collected, setCollected] = useState<string[]>([]);

  useEffect(() => {
    if (isActive) {
      setParent(Math.random() > 0.5 ? 'mum' : 'dad');
      const isTreat = Math.random() > 0.5;
      const items = isTreat ? treats : toys;
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setItem({ name: randomItem.name, emoji: randomItem.emoji });
    }
  }, [isActive]);

  const collectItem = () => {
    if (item) {
      setCollected([...collected, item.emoji]);
      onClose();
    }
  };

  if (!isActive || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nightSky/90 backdrop-blur-sm animate-fade-in-up">
      <div className="cozy-glass p-8 max-w-sm w-full text-center">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="text-6xl mb-4 animate-float">
          {parent === 'mum' ? '👩' : '👨'}
        </div>
        
        <h2 className="font-display text-2xl text-foreground mb-2">
          {parent === 'mum' ? 'Mum' : 'Dad'} stopped the car!
        </h2>
        
        <p className="text-muted-foreground mb-6">
          "Wait here, I'll be right back..."
        </p>

        <div className="cozy-glass p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-2">They brought you...</p>
          <div className="text-5xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>
            {item.emoji}
          </div>
          <h3 className="font-display text-xl text-warmGlow">{item.name}</h3>
        </div>

        <button
          onClick={collectItem}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105"
        >
          Thank you! 💕
        </button>

        {collected.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Your collection:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {collected.map((emoji, i) => (
                <span key={i} className="text-2xl">{emoji}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
