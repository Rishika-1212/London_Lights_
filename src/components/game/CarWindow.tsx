import { ReactNode } from 'react';
import { BokehLights } from './BokehLights';
import { LondonSkyline } from './LondonSkyline';
import { StreetLights } from './StreetLights';
import { Snowfall } from './Snowfall';
import { CozyCarInterior } from './CozyCarInterior';

interface CarWindowProps {
  children?: ReactNode;
  isNight: boolean;
}

export const CarWindow = ({ children, isNight }: CarWindowProps) => {
  return (
    <div className="relative w-full h-full animate-car-sway">
      {/* Window frame */}
      <div className="window-frame w-full h-full">
        {/* Sky gradient */}
        <div 
          className={`absolute inset-0 transition-colors duration-[30000ms] ${
            isNight 
              ? 'night-gradient' 
              : 'bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500'
          }`}
        />
        
        {/* Moon/Sun */}
        <div 
          className={`absolute top-12 right-20 transition-all duration-[30000ms] ${
            isNight ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-cream/90 shadow-lg" 
            style={{ boxShadow: '0 0 40px 10px rgba(255, 250, 230, 0.3)' }}
          />
        </div>
        
        {/* Stars (night only) */}
        {isNight && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-snow rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        )}
        
        {/* London skyline layers */}
        <LondonSkyline layer="back" />
        <LondonSkyline layer="mid" />
        <LondonSkyline layer="front" />
        
        {/* Street lights */}
        <StreetLights />
        
        {/* Bokeh lights */}
        <BokehLights />
        
        {/* Snowfall */}
        <Snowfall />
        
        {/* Cozy car interior elements */}
        <CozyCarInterior />
        
        {/* Frost overlay on window */}
        <div className="absolute inset-0 frost-overlay pointer-events-none" />
        
        {/* Window condensation effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-frost/5 pointer-events-none" />
        
        {/* Vignette effect for cozy feel */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--night-sky) / 0.4) 100%)'
          }}
        />
        
        {/* Content overlay */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
