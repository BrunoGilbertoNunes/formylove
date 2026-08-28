import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { music } from "../config/relationship";
import { playMusic, pauseMusic, isMusicPlaying } from "../utils/music";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    const sync = () => {
      const nowPlaying = isMusicPlaying();
      if (playingRef.current !== nowPlaying) {
        playingRef.current = nowPlaying;
        setPlaying(nowPlaying);
      }
    };
    const id = window.setInterval(sync, 800);
    return () => window.clearInterval(id);
  }, []);

  if (!music.enabled) return null;

  const toggle = () => {
    if (playingRef.current) {
      pauseMusic();
    } else {
      playMusic();
    }
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pausar música" : "Tocar música"}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-wine-800/70 bg-wine-900/70 px-4 py-2.5 text-sm text-cream-100 shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-wine-400"
    >
      {playing ? (
        <Pause className="h-4 w-4" aria-hidden />
      ) : (
        <Play className="h-4 w-4" aria-hidden />
      )}
      <span className="hidden sm:inline">{music.title}</span>
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${
          playing ? "animate-pulse bg-wine-300" : "bg-wine-700"
        }`}
      />
    </motion.button>
  );
}
