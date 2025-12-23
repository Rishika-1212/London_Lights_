import { useState, useEffect, useRef } from 'react';
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
  const [hasStarted, setHasStarted] = useState(false);
  const lastStopTime = useRef(Date.now());

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

  // Random parent stops - between 45 seconds to 2 minutes
  useEffect(() => {
    if (!hasStarted || isSleeping || isParentStop || isGamesOpen || isMusicOpen) return;

    const checkForStop = () => {
      const timeSinceLastStop = Date.now() - lastStopTime.current;
      const minTime = 45000; // 45 seconds minimum
      const maxTime = 120000; // 2 minutes maximum
      
      if (timeSinceLastStop > minTime) {
        // Random chance increases over time
        const chance = Math.min((timeSinceLastStop - minTime) / (maxTime - minTime), 1);
        if (Math.random() < chance * 0.1) { // 10% chance per check after min time
          setIsParentStop(true);
          lastStopTime.current = Date.now();
        }
      }
    };

    const interval = setInterval(checkForStop, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [hasStarted, isSleeping, isParentStop, isGamesOpen, isMusicOpen]);

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
      <WelcomeOverlay onStart={() => setHasStarted(true)} />
    </div>
  );
};

interface WelcomeOverlayProps {
  onStart: () => void;
}

const WelcomeOverlay = ({ onStart }: WelcomeOverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    setIsVisible(false);
    onStart();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nightSky/95 backdrop-blur-md animate-fade-in-up cursor-pointer"
      onClick={handleStart}
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
          <span className="animate-float" style={{ animationDelay: '0.4s' }}>☕</span>
          <span className="animate-float" style={{ animationDelay: '0.6s' }}>🌟</span>
          <span className="animate-float" style={{ animationDelay: '0.8s' }}>🧸</span>
        </div>

        <p className="text-warmGlow animate-pulse">
          Tap anywhere to begin...
        </p>
      </div>
    </div>
  );
};

export default Index;
