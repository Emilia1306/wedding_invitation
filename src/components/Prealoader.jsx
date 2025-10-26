// src/components/Preloader.jsx
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[1100] grid place-items-center bg-[var(--color-bg)]"
      aria-live="polite"
      role="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-[var(--color-brand)]/30 border-t-transparent animate-spin" />
        {/* Texto */}
        <p className="font-hand text-[clamp(20px,5vw,28px)] text-[var(--color-brand)]">
          Un momento…
        </p>
      </div>
    </motion.div>
  );
}

