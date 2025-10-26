import { useEffect, useRef, useState } from "react";

export default function RsvpModal({
  open,
  onClose,
  allowed = 2,
  token = null,
  endpoint = "",
  // NUEVO: callback que el padre (Invite) ejecuta cuando el envío fue OK
  onSuccess,
}) {
  const dialogRef = useRef(null);
  const [attending, setAttending] = useState("si");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "ok" | "error"


  useEffect(() => {
    function onKey(e) { if (e.key === "Escape" && open) onClose?.(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const maxGuests = attending === "si" ? allowed : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!endpoint) { setStatus("error"); return; }
    setSending(true);
    try {

      const body = new URLSearchParams();
      body.set("token", token || "");
      body.set("name", name);
      body.set("phone", phone);
      body.set("attending", attending === "si" ? "true" : "false");
      body.set("guests", String(attending === "si" ? guests : 0));
      body.set("note", note);

      const res = await fetch(endpoint, { method: "POST", body, mode: "cors" });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("ok");
        setTimeout(() => {
          onClose?.();
          setTimeout(() => {
            onSuccess?.({
              attending: attending === "si",
              people: attending === "si" ? guests : 0,
              name,
            });
          }, 250);
        }, 150);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div
        ref={dialogRef}
        className="relative z-10 w-[92%] max-w-[520px] rounded-2xl bg-[var(--color-bg)] shadow-[0_30px_80px_rgba(0,0,0,.25)] p-5 sm:p-6"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-hand text-[clamp(26px,6vw,40px)] text-[var(--color-brand)]">
            Confirma tu asistencia
          </h3>
          <button
            onClick={onClose}
            className="rounded-full px-2.5 py-1 text-[var(--color-ink)]/70 hover:bg-black/5"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3 space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre completo</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Teléfono</label>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
              placeholder="Opcional"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio" name="asistencia" value="si"
                checked={attending === "si"} onChange={() => setAttending("si")}
              />
              <span>Asistiré</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio" name="asistencia" value="no"
                checked={attending === "no"} onChange={() => setAttending("no")}
              />
              <span>No podré asistir</span>
            </label>
          </div>

          <div className={`${attending === "no" ? "opacity-50" : ""}`}>
            <label className="block text-sm mb-1">
              Número de personas (máx. {allowed})
            </label>
            <input
              type="number"
              min={0}
              max={maxGuests}
              value={Math.min(guests, maxGuests)}
              onChange={(e) => setGuests(Number(e.target.value))}
              disabled={attending === "no"}
              className="w-32 rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mensaje (opcional)</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-brand)]/30"
              placeholder="Alergias, comentarios, etc."
            />
          </div>

          {status === "ok" && (
            <p className="text-green-700 text-sm">¡Gracias! Registramos tu confirmación.</p>
          )}
          {status === "error" && (
            <p className="text-red-700 text-sm">Ocurrió un error al enviar. Intenta nuevamente.</p>
          )}

          <div className="pt-1">
            <button
              disabled={sending}
              className="w-full rounded-full px-5 py-2.5 bg-[var(--color-brand)] text-white shadow-[var(--shadow-soft)] disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar confirmación"}
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs text-[var(--color-ink)]/60">
          Esta invitación permite hasta <strong>{allowed}</strong> persona(s).
        </p>
      </div>
    </div>
  );
}
