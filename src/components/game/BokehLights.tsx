import { useMemo } from 'react';

interface BokehLight {
  id: number;
  size: number;
  color: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export const BokehLights = () => {
  const lights = useMemo<BokehLight[]>(() => {
    const colors = [
      'bg-bokeh-gold',
      'bg-bokeh-red', 
      'bg-bokeh-green',
      'bg-bokeh-blue',
      'bg-warmGlow',
      'bg-snow',
    ];

    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lights.map((light) => (
        <div
          key={light.id}
          className={`bokeh-light ${light.color} opacity-60`}
          style={{
            width: light.size,
            height: light.size,
            left: `${light.left}%`,
            top: `${light.top}%`,
            animationDelay: `${light.delay}s`,
            animationDuration: `${light.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
