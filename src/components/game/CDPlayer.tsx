import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc3, Music } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
}

const songs: Song[] = [
  { id: 1, title: "Have Yourself a Merry Little Christmas", artist: "Judy Garland" },
  { id: 2, title: "Let It Snow", artist: "Dean Martin" },
  { id: 3, title: "White Christmas", artist: "Bing Crosby" },
  { id: 4, title: "Silent Night", artist: "Nat King Cole" },
  { id: 5, title: "The Christmas Song", artist: "Nat King Cole" },
  { id: 6, title: "Winter Wonderland", artist: "Tony Bennett" },
  { id: 7, title: "Jingle Bell Rock", artist: "Bobby Helms" },
  { id: 8, title: "It's Beginning to Look a Lot Like Christmas", artist: "Michael Bublé" },
];

interface CDPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CDPlayer = ({ isOpen, onClose }: CDPlayerProps) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 left-4 z-50 animate-fade-in-up">
      <div className="cozy-glass p-4 w-72">
        {/* CD Visual */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-muted to-background border-4 border-muted ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          >
            <div className="absolute inset-4 rounded-full bg-background" />
            <div className="cd-shine absolute inset-0 rounded-full" />
          </div>
          <Disc3 className={`absolute inset-0 m-auto w-8 h-8 text-warmGlow ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Song info */}
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Music className="w-3 h-3" />
            Now Playing
          </p>
          <h3 className="font-display text-lg text-foreground truncate">
            {songs[currentSong].title}
          </h3>
          <p className="text-sm text-warmGlow">{songs[currentSong].artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={prevSong}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <SkipBack className="w-4 h-4 text-foreground" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 rounded-full bg-primary hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            )}
          </button>
          
          <button 
            onClick={nextSong}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <SkipForward className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
