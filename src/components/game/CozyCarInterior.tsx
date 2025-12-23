import { useEffect, useState } from 'react';

export const CozyCarInterior = () => {
  const [breathePhase, setBreathePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathePhase(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const breatheOpacity = 0.3 + Math.sin(breathePhase * 0.063) * 0.15;

  return (
    <>
      {/* Dashboard glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-warmGlow/20 to-transparent"
          style={{ opacity: breatheOpacity }}
        />
        {/* Dashboard lights */}
        <div className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-bokeh-green/60 animate-pulse" />
        <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 rounded-full bg-bokeh-blue/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-5 right-1/3 w-2 h-2 rounded-full bg-christmas-red/40 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Cozy blanket texture at bottom corners */}
      <div className="absolute bottom-0 left-0 w-48 h-32 pointer-events-none z-[6]">
        <div className="absolute inset-0 bg-gradient-to-tr from-christmas-red/30 via-christmas-red/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-2 left-2 text-4xl opacity-60 animate-float" style={{ animationDelay: '1s' }}>
          🧣
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-32 pointer-events-none z-[6]">
        <div className="absolute inset-0 bg-gradient-to-tl from-christmas-green/20 via-christmas-green/5 to-transparent rounded-tl-3xl" />
        <div className="absolute bottom-4 right-4 text-3xl opacity-50 animate-sway">
          🧤
        </div>
      </div>

      {/* Foggy breath on window (subtle) */}
      <div className="absolute top-1/4 left-1/4 w-32 h-20 pointer-events-none z-[4]">
        <div 
          className="w-full h-full bg-frost/5 rounded-full blur-2xl"
          style={{ 
            opacity: 0.3 + Math.sin(breathePhase * 0.05) * 0.2,
            transform: `scale(${1 + Math.sin(breathePhase * 0.03) * 0.1})`
          }}
        />
      </div>

      {/* Warm ambient glow from sides (car interior) */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-[3]">
        <div className="h-full bg-gradient-to-r from-muted/40 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-[3]">
        <div className="h-full bg-gradient-to-l from-muted/40 to-transparent" />
      </div>

      {/* Seat headrest silhouettes (parents in front) */}
      <div className="absolute top-0 left-8 md:left-16 w-20 md:w-28 h-24 md:h-32 pointer-events-none z-[7]">
        <div className="w-full h-full bg-nightSky/90 rounded-b-3xl shadow-xl" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 bg-nightSky/70 rounded-full blur-sm" />
      </div>
      <div className="absolute top-0 right-8 md:right-16 w-20 md:w-28 h-24 md:h-32 pointer-events-none z-[7]">
        <div className="w-full h-full bg-nightSky/90 rounded-b-3xl shadow-xl" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 bg-nightSky/70 rounded-full blur-sm" />
      </div>

      {/* Hot chocolate cup */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-2xl opacity-70 animate-float z-[8]" style={{ animationDelay: '2s' }}>
        ☕
      </div>

      {/* Teddy bear companion */}
      <div className="absolute bottom-8 right-1/4 text-3xl opacity-60 animate-sway z-[8]" style={{ animationDelay: '0.5s' }}>
        🧸
      </div>

      {/* Window edge frost */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-frost/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-frost/8 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-frost/6 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-frost/6 to-transparent" />
      </div>
    </>
  );
};
