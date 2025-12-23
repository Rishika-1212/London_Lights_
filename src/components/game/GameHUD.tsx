import { Moon, Gamepad2, Disc3, Clock } from 'lucide-react';

interface GameHUDProps {
  isNight: boolean;
  currentTime: string;
  onSleep: () => void;
  onOpenGames: () => void;
  onOpenMusic: () => void;
}

export const GameHUD = ({ 
  isNight, 
  currentTime,
  onSleep, 
  onOpenGames, 
  onOpenMusic,
}: GameHUDProps) => {
  return (
    <>
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="cozy-glass px-4 py-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-warmGlow" />
          <span className="font-display text-lg text-foreground">{currentTime}</span>
          <span className="text-muted-foreground text-sm">
            {isNight ? '🌙' : '☀️'}
          </span>
        </div>

        <h1 className="font-display text-2xl text-warmGlow text-glow hidden sm:block">
          London Lights
        </h1>

        <div className="cozy-glass px-4 py-2">
          <span className="text-sm text-muted-foreground">
            Christmas Eve 🎄
          </span>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="cozy-glass px-6 py-3 flex items-center gap-4">
          <button
            onClick={onOpenMusic}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <Disc3 className="w-6 h-6 text-warmGlow group-hover:animate-spin" style={{ animationDuration: '2s' }} />
            <span className="text-xs text-muted-foreground">Music</span>
          </button>

          <button
            onClick={onOpenGames}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <Gamepad2 className="w-6 h-6 text-bokeh-green group-hover:animate-float" />
            <span className="text-xs text-muted-foreground">Games</span>
          </button>

          <button
            onClick={onSleep}
            className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <Moon className="w-6 h-6 text-bokeh-blue group-hover:animate-float" />
            <span className="text-xs text-muted-foreground">Sleep</span>
          </button>
        </div>
      </div>
    </>
  );
};
