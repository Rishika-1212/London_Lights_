import { useMemo } from 'react';

export const StreetLights = () => {
  const lights = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: i * 25 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute bottom-20 left-0 w-[200%] h-32 animate-parallax-fast pointer-events-none">
      {lights.map((light) => (
        <div
          key={light.id}
          className="absolute bottom-0"
          style={{ left: `${light.left}%` }}
        >
          {/* Lamp post */}
          <div className="relative">
            <div className="w-1 h-24 bg-muted/60 mx-auto" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-muted/80 rounded-t-lg" />
            {/* Glow */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-warmGlow/30 blur-xl animate-pulse" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-warmGlow animate-pulse" />
          </div>
        </div>
      ))}
      
      {/* Repeat for seamless */}
      {lights.map((light) => (
        <div
          key={`repeat-${light.id}`}
          className="absolute bottom-0"
          style={{ left: `${light.left + 100}%` }}
        >
          <div className="relative">
            <div className="w-1 h-24 bg-muted/60 mx-auto" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-muted/80 rounded-t-lg" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-warmGlow/30 blur-xl animate-pulse" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-warmGlow animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
