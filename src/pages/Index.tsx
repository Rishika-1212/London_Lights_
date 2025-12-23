import { useState, useEffect } from 'react';
import { CarWindow } from '@/components/game/CarWindow';
import { GameHUD } from '@/components/game/GameHUD';
import { CDPlayer } from '@/components/game/CDPlayer';
import { MiniGames } from '@/components/game/MiniGames';
import { SleepMode } from '@/components/game/SleepMode';
import { ParentStop } from '@/components/game/ParentStop';

const Index = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isNight, setIsNight] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isParentStop, setIsParentStop] = useState(false);

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      );
      // Night is between 6pm and 7am
      setIsNight(hours >= 18 || hours < 7);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-nightSky">
      {/* Main car window view */}
      <CarWindow isNight={isNight}>
        {/* Game HUD */}
        <GameHUD
          isNight={isNight}
          currentTime={currentTime}
          onSleep={() => setIsSleeping(true)}
          onOpenGames={() => setIsGamesOpen(true)}
          onOpenMusic={() => setIsMusicOpen(true)}
          onTriggerStop={() => setIsParentStop(true)}
        />
      </CarWindow>

      {/* CD Player */}
      <CDPlayer isOpen={isMusicOpen} onClose={() => setIsMusicOpen(false)} />

      {/* Mini Games */}
      <MiniGames isOpen={isGamesOpen} onClose={() => setIsGamesOpen(false)} />

      {/* Sleep Mode */}
      <SleepMode isActive={isSleeping} onWakeUp={() => setIsSleeping(false)} />

      {/* Parent Stop */}
      <ParentStop isActive={isParentStop} onClose={() => setIsParentStop(false)} />

      {/* Welcome overlay for first visit */}
      <WelcomeOverlay />
    </div>
  );
};

const WelcomeOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nightSky/95 backdrop-blur-md animate-fade-in-up cursor-pointer"
      onClick={() => setIsVisible(false)}
    >
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 animate-float">🚗</div>
        <h1 className="font-display text-4xl md:text-5xl text-warmGlow text-glow mb-4">
          London Lights
        </h1>
        <p className="text-foreground/80 mb-2 text-lg">
          It's Christmas Eve. You're in the backseat.
        </p>
        <p className="text-muted-foreground mb-8">
          The city lights blur past as your parents drive through London...
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-2xl">
          <span className="animate-float" style={{ animationDelay: '0s' }}>🎄</span>
          <span className="animate-float" style={{ animationDelay: '0.2s' }}>❄️</span>
          <span className="animate-float" style={{ animationDelay: '0.4s' }}>🎁</span>
          <span className="animate-float" style={{ animationDelay: '0.6s' }}>🌟</span>
          <span className="animate-float" style={{ animationDelay: '0.8s' }}>🍪</span>
        </div>

        <p className="text-warmGlow animate-pulse">
          Tap anywhere to begin...
        </p>
      </div>
    </div>
  );
};

export default Index;
