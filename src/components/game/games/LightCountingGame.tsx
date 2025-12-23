import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Check, RefreshCw } from 'lucide-react';

interface LightCountingGameProps {
  onBack: () => void;
}

export const LightCountingGame = ({ onBack }: LightCountingGameProps) => {
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [round, setRound] = useState(1);

  const lights = useMemo(() => {
    const count = Math.floor(Math.random() * 12) + 3;
    const colors = ['bg-bokeh-gold', 'bg-bokeh-red', 'bg-bokeh-green', 'bg-bokeh-blue'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 10,
      size: Math.random() * 20 + 15,
    }));
  }, [round]);

  const checkAnswer = () => {
    if (parseInt(guess) === lights.length) {
      setScore(score + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const nextRound = () => {
    setRound(round + 1);
    setGuess('');
    setFeedback(null);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        if (feedback === 'correct') {
          nextRound();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

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
        <span className="text-muted-foreground">Round {round}</span>
      </div>

      {/* Light display area */}
      <div className="relative h-48 bg-nightSky/50 rounded-2xl overflow-hidden mb-4">
        {lights.map((light) => (
          <div
            key={light.id}
            className={`absolute rounded-full ${light.color} blur-[2px] animate-pulse`}
            style={{
              left: `${light.left}%`,
              top: `${light.top}%`,
              width: light.size,
              height: light.size,
              animationDelay: `${light.id * 0.2}s`,
            }}
          />
        ))}
      </div>

      <p className="text-center text-foreground mb-4">
        How many lights do you see?
      </p>

      <div className="flex gap-2">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter number..."
          className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-warmGlow"
          disabled={feedback !== null}
        />
        <button
          onClick={checkAnswer}
          disabled={!guess || feedback !== null}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Check className="w-5 h-5" />
        </button>
      </div>

      {feedback && (
        <div className={`mt-4 p-4 rounded-xl text-center ${
          feedback === 'correct' 
            ? 'bg-christmas-green/20 text-christmas-green' 
            : 'bg-christmas-red/20 text-christmas-red'
        }`}>
          {feedback === 'correct' ? (
            <>🎄 Correct! +10 points</>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span>There were {lights.length} lights!</span>
              <button
                onClick={nextRound}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
