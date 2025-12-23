import { useState } from 'react';
import { Sparkles, Eye, Car, Snowflake, X } from 'lucide-react';
import { LightCountingGame } from './games/LightCountingGame';
import { WindowDrawingGame } from './games/WindowDrawingGame';
import { LicensePlateGame } from './games/LicensePlateGame';
import { SnowflakeCatchGame } from './games/SnowflakeCatchGame';

interface MiniGamesProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameType = 'menu' | 'counting' | 'drawing' | 'license' | 'snowflake';

const games = [
  { 
    id: 'counting' as const, 
    title: 'Count the Lights', 
    icon: Eye, 
    description: 'How many Christmas lights can you count?' 
  },
  { 
    id: 'drawing' as const, 
    title: 'Window Doodles', 
    icon: Sparkles, 
    description: 'Draw on the foggy window!' 
  },
  { 
    id: 'license' as const, 
    title: 'License Plates', 
    icon: Car, 
    description: 'Spot the special plates!' 
  },
  { 
    id: 'snowflake' as const, 
    title: 'Catch Snowflakes', 
    icon: Snowflake, 
    description: 'Catch falling snowflakes!' 
  },
];

export const MiniGames = ({ isOpen, onClose }: MiniGamesProps) => {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');

  const handleBack = () => setCurrentGame('menu');

  if (!isOpen) return null;

  const renderGame = () => {
    switch (currentGame) {
      case 'counting':
        return <LightCountingGame onBack={handleBack} />;
      case 'drawing':
        return <WindowDrawingGame onBack={handleBack} />;
      case 'license':
        return <LicensePlateGame onBack={handleBack} />;
      case 'snowflake':
        return <SnowflakeCatchGame onBack={handleBack} />;
      default:
        return (
          <div className="grid grid-cols-2 gap-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setCurrentGame(game.id)}
                className="cozy-glass p-4 text-left hover:bg-card/90 transition-all transform hover:scale-105 group"
              >
                <game.icon className="w-8 h-8 text-warmGlow mb-2 group-hover:animate-float" />
                <h3 className="font-display text-lg text-foreground">{game.title}</h3>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-nightSky/80 backdrop-blur-sm animate-fade-in-up">
      <div className="cozy-glass p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-foreground">
            {currentGame === 'menu' ? 'Mini Games' : games.find(g => g.id === currentGame)?.title}
          </h2>
          <button 
            onClick={() => {
              if (currentGame !== 'menu') {
                handleBack();
              } else {
                onClose();
              }
            }}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {renderGame()}
      </div>
    </div>
  );
};
