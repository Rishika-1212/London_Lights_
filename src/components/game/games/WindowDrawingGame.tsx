import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eraser } from 'lucide-react';

interface WindowDrawingGameProps {
  onBack: () => void;
}

export const WindowDrawingGame = ({ onBack }: WindowDrawingGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with "fog"
    ctx.fillStyle = 'rgba(200, 210, 220, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const { x, y } = getCoords(e);

    // "Wipe" the fog away
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(200, 210, 220, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

      <p className="text-center text-foreground mb-4">
        Draw on the foggy window with your finger!
      </p>

      <div className="relative rounded-2xl overflow-hidden mb-4" style={{ background: 'linear-gradient(180deg, hsl(222, 47%, 11%), hsl(222, 40%, 20%))' }}>
        {/* Background scene visible through "wiped" areas */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-warmGlow/60 blur-sm"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          className="relative z-10 cursor-crosshair touch-none w-full"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />
      </div>

      <button
        onClick={clearCanvas}
        className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
      >
        <Eraser className="w-4 h-4" />
        Re-fog window
      </button>
    </div>
  );
};
