// src/App.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gate from "./components/Gate.jsx";
import Invite from "./components/Invite.jsx";
import Preloader from "./components/Prealoader.jsx";
import MusicButton from "./components/MusicButton.jsx";

// helper para precargar imágenes
function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

export default function App() {
  const [showGate, setShowGate] = useState(true);
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [hasBg, setHasBg] = useState(false); // control del fondo

  useEffect(() => {
    document.body.style.overflow = showGate ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showGate]);

  async function handleContinue() {
    setShowGate(false);
    setHasBg(false);
    setLoadingInvite(true);

    const assets = [
      "/img/fondo.jpg",
      "/img/flores1.png",
      "/img/flor1.png",
      "/img/flor2.png",
      "/img/Flores_centro.png",
      "/img/sobre_katie.svg",
      "/img/fotos_sobre.png",
      "/img/foto_novios.svg",
      "/img/fecha_boda.svg",
      "/img/ginger_letra.png",
      "/img/icono_ubicacion.svg",
      "/img/paleta_colores.svg",
      "/img/regalo_sobre.svg",
      "/img/yue_letra.png",
      "/img/icono_confirmacion.svg",
      "/img/cuentas.png",
      "/img/icono_novios.svg",
    ];

    const safetyTimeout = new Promise((r) => setTimeout(r, 3500));
    const minDelay = new Promise((r) => setTimeout(r, 600));

    await Promise.all([
      Promise.race([Promise.all(assets.map(preload)), safetyTimeout]),
      minDelay,
    ]);

    setHasBg(true);
    setLoadingInvite(false);
  }

  const rootClasses = [
    "min-h-screen",
    "text-[var(--color-ink)]",
    "bg-[var(--color-bg)]",
    hasBg ? "bg-watercolor" : "",
  ].join(" ");

  return (
    <div className={rootClasses}>
      {/* Gate */}
      <AnimatePresence mode="wait">
        {showGate && <Gate key="gate" onContinue={handleContinue} />}
      </AnimatePresence>

      {/* Preloader */}
      <AnimatePresence>
        {!showGate && loadingInvite && <Preloader key="loader" />}
      </AnimatePresence>

      {/* Invite */}
      <AnimatePresence mode="wait">
        {!showGate && !loadingInvite && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Invite scriptUrl={import.meta.env.VITE_SCRIPT_URL} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de música: visible desde que no hay Gate (aunque esté cargando, el preloader lo tapa) */}
      {!showGate && (
        <MusicButton
          src="/audio/cancion.mp3"   // cambia a tu ruta
          volume={0.7}
          show={true}
        />
      )}
    </div>
  );
}
