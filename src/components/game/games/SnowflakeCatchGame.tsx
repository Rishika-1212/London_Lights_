import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Snowflake } from 'lucide-react';

interface SnowflakeCatchGameProps {
  onBack: () => void;
}

interface FallingSnowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export const SnowflakeCatchGame = ({ onBack }: SnowflakeCatchGameProps) => {
  const [score, setScore] = useState(0);
  const [snowflakes, setSnowflakes] = useState<FallingSnowflake[]>([]);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  const spawnSnowflake = useCallback(() => {
    const newFlake: FallingSnowflake = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -10,
      size: Math.random() * 20 + 20,
      speed: Math.random() * 2 + 1,
    };
    setSnowflakes(prev => [...prev, newFlake]);
  }, []);

  // Spawn snowflakes
  useEffect(() => {
    if (!gameActive) return;
    
    const spawnInterval = setInterval(spawnSnowflake, 800);
    return () => clearInterval(spawnInterval);
  }, [gameActive, spawnSnowflake]);

  // Move snowflakes
  useEffect(() => {
    if (!gameActive) return;
    
    const moveInterval = setInterval(() => {
      setSnowflakes(prev => 
        prev
          .map(flake => ({ ...flake, y: flake.y + flake.speed }))
          .filter(flake => flake.y < 110)
      );
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [gameActive]);

  // Timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const catchSnowflake = (id: number, size: number) => {
    setSnowflakes(prev => prev.filter(f => f.id !== id));
    const points = size > 30 ? 5 : size > 20 ? 10 : 15;
    setScore(prev => prev + points);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setSnowflakes([]);
    setGameActive(true);
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to games
      </button>

      <div className="flex items-center justify-between mb-4">
        <span className="text-warmGlow font-display text-xl">Score: {score}</span>
        <span className={`font-display text-xl ${timeLeft <= 10 ? 'text-christmas-red' : 'text-foreground'}`}>
          {timeLeft}s
        </span>
      </div>

      <p className="text-center text-foreground mb-4">
        Tap the snowflakes! Smaller = more points ❄️
      </p>

      <div className="relative h-64 bg-nightSky/50 rounded-2xl overflow-hidden mb-4">
        {snowflakes.map((flake) => (
          <button
            key={flake.id}
            onClick={() => catchSnowflake(flake.id, flake.size)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
            style={{
              left: `${flake.x}%`,
              top: `${flake.y}%`,
            }}
          >
            <Snowflake 
              className="text-snow drop-shadow-lg" 
              style={{ width: flake.size, height: flake.size }}
            />
          </button>
        ))}
        
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-nightSky/80">
            <h3 className="font-display text-2xl text-warmGlow mb-2">Time's Up!</h3>
            <p className="text-foreground mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
