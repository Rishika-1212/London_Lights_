export const LondonSkyline = ({ layer = 'back' }: { layer?: 'back' | 'mid' | 'front' }) => {
  const getAnimationClass = () => {
    switch (layer) {
      case 'back': return 'animate-parallax-slow';
      case 'mid': return 'animate-parallax-medium';
      case 'front': return 'animate-parallax-fast';
    }
  };

  const getOpacity = () => {
    switch (layer) {
      case 'back': return 'opacity-30';
      case 'mid': return 'opacity-50';
      case 'front': return 'opacity-70';
    }
  };

  return (
    <div className={`absolute bottom-0 left-0 w-[200%] h-48 ${getAnimationClass()}`}>
      <svg 
        viewBox="0 0 2400 200" 
        className={`w-full h-full ${getOpacity()}`}
        preserveAspectRatio="none"
      >
        {/* Buildings silhouette */}
        <defs>
          <linearGradient id={`building-gradient-${layer}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(222, 30%, 20%)" />
            <stop offset="100%" stopColor="hsl(222, 40%, 12%)" />
          </linearGradient>
        </defs>
        
        {/* First set of buildings */}
        <g fill={`url(#building-gradient-${layer})`}>
          {/* Big Ben */}
          <rect x="100" y="40" width="30" height="160" />
          <polygon points="115,0 100,40 130,40" />
          
          {/* Buildings */}
          <rect x="150" y="80" width="60" height="120" />
          <rect x="220" y="60" width="40" height="140" />
          <rect x="280" y="100" width="80" height="100" />
          <rect x="380" y="70" width="50" height="130" />
          
          {/* London Eye suggestion */}
          <circle cx="500" cy="120" r="60" fill="none" stroke="hsl(222, 30%, 25%)" strokeWidth="3" />
          
          <rect x="580" y="90" width="70" height="110" />
          <rect x="670" y="50" width="40" height="150" />
          <rect x="730" y="110" width="90" height="90" />
          <rect x="840" y="75" width="55" height="125" />
          <rect x="920" y="95" width="65" height="105" />
          
          {/* Repeat for seamless loop */}
          <rect x="1100" y="40" width="30" height="160" />
          <polygon points="1115,0 1100,40 1130,40" />
          <rect x="1150" y="80" width="60" height="120" />
          <rect x="1220" y="60" width="40" height="140" />
          <rect x="1280" y="100" width="80" height="100" />
          <rect x="1380" y="70" width="50" height="130" />
          <circle cx="1500" cy="120" r="60" fill="none" stroke="hsl(222, 30%, 25%)" strokeWidth="3" />
          <rect x="1580" y="90" width="70" height="110" />
          <rect x="1670" y="50" width="40" height="150" />
          <rect x="1730" y="110" width="90" height="90" />
          <rect x="1840" y="75" width="55" height="125" />
          <rect x="1920" y="95" width="65" height="105" />
        </g>
        
        {/* Windows with lights */}
        <g fill="hsl(39, 90%, 58%)" className="animate-twinkle">
          {[150, 170, 190, 230, 250, 300, 340, 400, 600, 620, 690, 750, 790, 860, 940].map((x, i) => (
            <rect 
              key={i} 
              x={x} 
              y={90 + Math.random() * 40} 
              width="8" 
              height="12" 
              opacity={0.4 + Math.random() * 0.6}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
