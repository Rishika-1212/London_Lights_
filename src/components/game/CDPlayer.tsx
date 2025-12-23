import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc3, Music, Volume2, VolumeX } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

// Free Christmas music from various royalty-free sources
const songs: Song[] = [
  { 
    id: 1, 
    title: "Silent Night", 
    artist: "Christmas Classics",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  { 
    id: 2, 
    title: "Jingle Bells", 
    artist: "Holiday Orchestra",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  { 
    id: 3, 
    title: "Winter Wonderland", 
    artist: "Cozy Jazz",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  { 
    id: 4, 
    title: "O Holy Night", 
    artist: "Piano Dreams",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  { 
    id: 5, 
    title: "Deck the Halls", 
    artist: "Christmas Choir",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
];

interface CDPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CDPlayer = ({ isOpen, onClose }: CDPlayerProps) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(songs[currentSong].url);
    audioRef.current.volume = 0.3;
    audioRef.current.loop = false;
    
    audioRef.current.addEventListener('ended', nextSong);
    audioRef.current.addEventListener('timeupdate', updateProgress);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', nextSong);
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].url;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentSong]);

  const updateProgress = () => {
    if (audioRef.current) {
      const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(prog) ? 0 : prog);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-20 left-4 z-50 animate-fade-in-up">
      <div className="cozy-glass p-5 w-80 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-warmGlow/20 blur-3xl" />
        
        {/* CD Visual */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-muted via-background to-muted border-4 border-muted shadow-lg ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          >
            <div className="absolute inset-6 rounded-full bg-nightSky" />
            <div className="cd-shine absolute inset-0 rounded-full" />
            {/* CD grooves */}
            <div className="absolute inset-8 rounded-full border border-muted/30" />
            <div className="absolute inset-10 rounded-full border border-muted/20" />
          </div>
          <Disc3 
            className={`absolute inset-0 m-auto w-10 h-10 text-warmGlow ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          />
          {/* Playing indicator glow */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: '0 0 30px 10px hsl(var(--warm-glow) / 0.3)' }} />
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-warmGlow rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Song info */}
        <div className="text-center mb-4">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
            <Music className="w-3 h-3" />
            {isPlaying ? 'Now Playing' : 'Paused'}
          </p>
          <h3 className="font-display text-xl text-foreground truncate animate-fade-in-up">
            {songs[currentSong].title}
          </h3>
          <p className="text-sm text-warmGlow">{songs[currentSong].artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-all hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-foreground" />
            )}
          </button>

          <button 
            onClick={prevSong}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all hover:scale-110"
          >
            <SkipBack className="w-4 h-4 text-foreground" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-5 rounded-full bg-primary hover:bg-primary/90 transition-all transform hover:scale-110 shadow-lg"
            style={{ boxShadow: isPlaying ? '0 0 20px 5px hsl(var(--primary) / 0.4)' : undefined }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
            )}
          </button>
          
          <button 
            onClick={nextSong}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all hover:scale-110"
          >
            <SkipForward className="w-4 h-4 text-foreground" />
          </button>

          <div className="w-10" /> {/* Spacer for balance */}
        </div>

        {/* Song list */}
        <div className="mt-4 pt-4 border-t border-border/50 max-h-32 overflow-y-auto">
          {songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => setCurrentSong(index)}
              className={`w-full text-left p-2 rounded-lg transition-all ${
                index === currentSong 
                  ? 'bg-primary/20 text-foreground' 
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
            >
              <p className="text-sm font-medium truncate">{song.title}</p>
              <p className="text-xs opacity-70">{song.artist}</p>
            </button>
          ))}
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/30"
        >
          Close
        </button>
      </div>
    </div>
  );
};
