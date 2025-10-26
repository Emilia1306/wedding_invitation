// src/components/Toast.jsx
import { useEffect } from "react";

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-[1000] flex justify-center px-4">
      <div className="rounded-xl bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,.2)] border border-black/5
                      px-4 py-3 text-center max-w-[540px] w-full sm:w-auto">
        <p className="text-[var(--color-brand)] text-[clamp(18px,4.5vw,28px)]">
          {message}
        </p>
      </div>
    </div>
  );
}
