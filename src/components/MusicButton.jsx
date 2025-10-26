// src/components/MusicButton.jsx
import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicButton({
  src = "/audio/cancion.mp3",
  initiallyPlaying = false,
  className = "",
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    if (initiallyPlaying) {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setLocked(true);
        setPlaying(false);
      });
    }
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, initiallyPlaying]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setLocked(false);
    } catch {
      setLocked(true);
      setPlaying(false);
    }
  }

  return (
    <div
      className={`fixed right-4 bottom-4 z-[1200] ${className}`}
    >
      {/* Botón redondo */}
      <button
        type="button"
        onClick={toggle}
        className={`
          relative inline-flex items-center justify-center
          w-14 h-14 rounded-full
          bg-[var(--color-brand)] text-white
          shadow-[0_10px_25px_rgba(0,0,0,.18)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/40
          transition-transform active:scale-95
        `}
        aria-pressed={playing}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
      >
        {playing && (
          <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-white/20" />
        )}

        {/* Ícono principal */}
        <span className="relative">
          {playing ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </span>
      </button>

      {locked && (
        <div className="mt-2 px-3 py-1.5 rounded-full text-xs bg-black/70 text-white text-center">
          Toca el botón para activar el audio
        </div>
      )}
    </div>
  );
}
