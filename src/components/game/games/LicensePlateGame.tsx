import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';

interface LicensePlateGameProps {
  onBack: () => void;
}

const generatePlate = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  const part1 = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
  const part2 = numbers[Math.floor(Math.random() * 10)] + numbers[Math.floor(Math.random() * 10)];
  const part3 = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
  
  return `${part1}${part2} ${part3}`;
};

const specialPlates = ['XX00 XXX', 'LO00 VEY', 'XM00 ASS', 'SN00 OWY'];

export const LicensePlateGame = ({ onBack }: LicensePlateGameProps) => {
  const [plates, setPlates] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    generateNewPlates();
  }, []);

  const generateNewPlates = () => {
    const newPlates: string[] = [];
    const specialIndex = Math.floor(Math.random() * 4);
    
    for (let i = 0; i < 4; i++) {
      if (i === specialIndex && Math.random() > 0.3) {
        newPlates.push(specialPlates[Math.floor(Math.random() * specialPlates.length)]);
      } else {
        newPlates.push(generatePlate());
      }
    }
    
    setPlates(newPlates);
  };

  const checkPlate = (plate: string) => {
    if (found.includes(plate)) return;
    
    const isSpecial = specialPlates.includes(plate);
    
    if (isSpecial) {
      setScore(score + 25);
      setFound([...found, plate]);
      setMessage('🎄 Special plate! +25 points');
    } else {
      setScore(Math.max(0, score - 5));
      setMessage('Not special! -5 points');
    }

    setTimeout(() => {
      setMessage(null);
      if (isSpecial) {
        generateNewPlates();
        setFound([]);
      }
    }, 1500);
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
      </div>

      <p className="text-center text-foreground mb-4">
        Find the special Christmas plates! Look for patterns like XX00 or festive words.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {plates.map((plate, index) => (
          <button
            key={index}
            onClick={() => checkPlate(plate)}
            disabled={found.includes(plate)}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
              found.includes(plate)
                ? 'bg-christmas-green/20 border-christmas-green'
                : 'bg-snow border-muted hover:border-warmGlow'
            }`}
          >
            <div className="font-mono text-lg font-bold text-background tracking-wider">
              {plate}
            </div>
            <div className="text-xs text-muted mt-1">🇬🇧</div>
          </button>
        ))}
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-center ${
          message.includes('+') 
            ? 'bg-christmas-green/20 text-foreground' 
            : 'bg-christmas-red/20 text-foreground'
        }`}>
          {message}
        </div>
      )}

      <button
        onClick={() => {
          generateNewPlates();
          setFound([]);
        }}
        className="w-full mt-4 px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
      >
        New Cars
      </button>
    </div>
  );
};
