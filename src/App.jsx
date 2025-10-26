// src/App.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gate from "./components/Gate.jsx";
import Invite from "./components/Invite.jsx";

export default function App() {
  const [showGate, setShowGate] = useState(true);

  // (opcional) bloquear el scroll mientras el Gate está visible
  useEffect(() => {
    document.body.style.overflow = showGate ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showGate]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      {/* Gate (pantalla inicial) */}
      <AnimatePresence mode="wait">
        {showGate && (
          <Gate key="gate" onContinue={() => setShowGate(false)} />
        )}
      </AnimatePresence>

      {/* Invite (se muestra cuando cierras el Gate) */}
      <AnimatePresence mode="wait">
        {!showGate && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Invite
              defaultAllowed={2}
              scriptUrl={import.meta.env.VITE_APPS_SCRIPT_URL}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
