import { useState, useEffect } from 'react';
import { Moon, Sun, Timer } from 'lucide-react';

interface SleepModeProps {
  isActive: boolean;
  onWakeUp: () => void;
}

export const SleepMode = ({ isActive, onWakeUp }: SleepModeProps) => {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes default
  const [customMinutes, setCustomMinutes] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isTimerRunning, timer]);

  useEffect(() => {
    if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Optional: play a gentle chime
    }
  }, [timer, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const presetTimes = [15, 25, 45, 60];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-nightSky/95 flex flex-col items-center justify-center animate-fade-in-up">
      {/* Dreamy overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-warmGlow/10 blur-3xl animate-float"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <Moon className="w-16 h-16 text-warmGlow mx-auto mb-6 animate-float" />
        
        <h2 className="font-display text-4xl text-foreground mb-2 text-glow">
          Sweet Dreams
        </h2>
        <p className="text-muted-foreground mb-8">
          Rest your eyes while the car gently drives through London...
        </p>

        {/* Timer display */}
        <div className="cozy-glass p-8 rounded-3xl mb-8 inline-block">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Timer className="w-5 h-5 text-warmGlow" />
            <span className="text-muted-foreground">Pomodoro Timer</span>
          </div>
          
          <div className="text-6xl font-display text-warmGlow mb-6 text-glow">
            {formatTime(timer)}
          </div>

          {/* Preset times */}
          <div className="flex gap-2 justify-center mb-4">
            {presetTimes.map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setTimer(mins * 60);
                  setCustomMinutes(mins);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  customMinutes === mins
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Start/Pause timer */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {isTimerRunning ? 'Pause' : 'Start'} Timer
          </button>
        </div>

        {/* Wake up button */}
        <button
          onClick={onWakeUp}
          className="flex items-center gap-2 mx-auto px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105"
        >
          <Sun className="w-5 h-5" />
          Wake Up
        </button>
      </div>
    </div>
  );
};
