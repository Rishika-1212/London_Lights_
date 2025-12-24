import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc3, Music, Volume2, VolumeX } from 'lucide-react';

// --- IMPORTS FOR LOCAL AUDIO FILES ---

import jingleBellRock from './res/Bobby Helms - Jingle Bell Rock.mp3';
import rockinTree from "./res/Brenda Lee - Rockin' Around The Christmas Tree (Remastered).mp3";
import beginningToLook from './res/It_s_Beginning_To_Look_A_Lot_Like_Christmas.mp3';
import hollyJolly from './res/Michael Buble - Holly Jolly Christmas.mp3';
import lastChristmas from './res/Wham! - Last Christmas (Lyrics).mp3';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

const songs: Song[] = [
  { 
    id: 1, 
    title: "Jingle Bell Rock", 
    artist: "Bobby Helms",
    url: jingleBellRock
  },
  { 
    id: 2, 
    title: "Rockin' Around The Christmas Tree", 
    artist: "Brenda Lee",
    url: rockinTree
  },
  { 
    id: 3, 
    title: "It's Beginning To Look A Lot Like Christmas", 
    artist: "Michael Bublé",
    url: beginningToLook
  },
  { 
    id: 4, 
    title: "Holly Jolly Christmas", 
    artist: "Michael Bublé",
    url: hollyJolly
  },
  { 
    id: 5, 
    title: "Last Christmas", 
    artist: "Wham!",
    url: lastChristmas
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
    // Create the audio object
    if (songs[currentSong]) {
        audioRef.current = new Audio(songs[currentSong].url);
        audioRef.current.volume = 0.3;
        audioRef.current.loop = false;
        
        // Add event listeners
        audioRef.current.addEventListener('ended', nextSong);
        audioRef.current.addEventListener('timeupdate', updateProgress);
    }
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', nextSong);
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  // Handle Song Changes
  useEffect(() => {
    if (audioRef.current && songs[currentSong]) {
      // Update the source to the new song URL
      audioRef.current.src = songs[currentSong].url;
      audioRef.current.load(); // Reload the audio element
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback prevented:", error);
            setIsPlaying(false);
          });
        }
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
        audioRef.current.play().catch(e => console.log("Play error:", e));
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
      <div className="cozy-glass p-5 w-80 relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
        {/* Ambient glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-yellow-500/20 blur-3xl" />
        
        {/* CD Visual */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 border-4 border-neutral-700 shadow-lg ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          >
            {/* CD Shine Effect */}
            <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-tr from-transparent via-white to-transparent" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/10" />
            
            {/* Center Hole */}
            <div className="absolute inset-9 rounded-full bg-black border-2 border-neutral-600" />
          </div>
          
          <Disc3 
            className={`absolute inset-0 m-auto w-10 h-10 text-yellow-500/80 ${isPlaying ? 'animate-spin' : ''}`} 
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-yellow-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Song info */}
        <div className="text-center mb-4">
          <p className="text-xs text-white/50 flex items-center justify-center gap-1 mb-1">
            <Music className="w-3 h-3" />
            {isPlaying ? 'Now Playing' : 'Paused'}
          </p>
          <h3 className="font-sans text-lg text-white font-medium truncate px-2">
            {songs[currentSong].title}
          </h3>
          <p className="text-sm text-yellow-500/80">{songs[currentSong].artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/50" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>

          <button 
            onClick={prevSong}
            className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110"
          >
            <SkipBack className="w-5 h-5 text-white" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-4 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black transition-all transform hover:scale-110 shadow-lg shadow-yellow-500/20"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
          
          <button 
            onClick={nextSong}
            className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Playlist (Scrollable) */}
        <div className="mt-4 pt-4 border-t border-white/10 max-h-32 overflow-y-auto custom-scrollbar">
          {songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => setCurrentSong(index)}
              className={`w-full text-left p-2 rounded-lg transition-all mb-1 ${
                index === currentSong 
                  ? 'bg-yellow-500/20 text-yellow-200' 
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <p className="text-sm font-medium truncate">{song.title}</p>
            </button>
          ))}
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="mt-3 w-full py-2 text-xs text-white/40 hover:text-white transition-colors"
        >
          Close Player
        </button>
      </div>
    </div>
  );
};