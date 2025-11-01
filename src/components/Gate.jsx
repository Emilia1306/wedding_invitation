// src/components/Gate.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Gate({ onContinue }) {
  const [fading, setFading] = useState(false);

  const go = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => onContinue?.(), 450);
  };

  return (
    <motion.div
      // Overlay FULL, centrado con grid
      className="
        fixed top-0 left-0 z-[9999]
        w-screen h-[100svh]               /* ancho/alto explícitos */
        grid place-items-center            /* centro EXACTO */
        bg-[var(--color-bg)]
      "
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <motion.img
          src="/img/sobre_katie.png"
          alt="Abrir invitación"
          className="
            block
            w-[min(60vw,480px)]     /* ← tamaño del sobre (ajústalo) */
            max-h-[55svh]           /* no ocupa más del 55% del alto visible */
            h-auto
            select-none cursor-pointer
            drop-shadow-[0_10px_24px_rgba(0,0,0,.10)]
          "
          draggable="false"
          onClick={go}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
          }}
        />
        <p className="text-md font-sans italic text-[var(--color-ink)]/70">
          Toca la imagen para continuar
        </p>
      </div>
    </motion.div>
  );
}
