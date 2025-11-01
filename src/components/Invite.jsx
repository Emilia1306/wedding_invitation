import { motion } from "framer-motion";
import RsvpModal from "./RsvpModal.jsx";
import { useMemo, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Invite({
  defaultAllowed = 2,      
  scriptUrl = ""          
}) {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const [toast, setToast] = useState({ open: false, msg: "" });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  async function copyToClipboard(text, setFlag) {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(text));
      } else {
        const ta = document.createElement("textarea");
        ta.value = String(text);
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setFlag(true);
      setTimeout(() => setFlag(false), 1800);
    } catch (err) {
      console.error("No se pudo copiar:", err);
      setFlag(false);
    }
  }

  const { token, allowedFromUrl } = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return {
      token: sp.get("i") || null,
      allowedFromUrl: Number(sp.get("pases")) || null,
    };
  }, []);

  const allowed = allowedFromUrl ?? defaultAllowed;

  const CenterToast = ({ open, children }) => {
    if (!open) return null;

    return (
      <div
        aria-live="polite"
        className="fixed inset-0 z-[1000] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

        {/* Tarjeta */}
        <div
          className="relative max-w-[92%] sm:max-w-[640px] w-auto
                    rounded-2xl bg-[var(--color-bg)]/98
                    shadow-[0_25px_60px_rgba(0,0,0,.18)]
                    border border-black/5 overflow-hidden px-6 sm:px-8 py-7 sm:py-9 text-center"
        >
          {/* Flor centrada arriba */}
          <img
            src="/img/flor1.png"
            alt=""
            aria-hidden="true"
            className="mx-auto w-12 sm:w-14 opacity-90 -mt-2 mb-4 pointer-events-none select-none"
          />

          {/* Mensaje */}
          <p className="text-[clamp(16px,4.5vw,20px)] text-[var(--color-ink)]/90">
            {children}
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 pb-16">
      {/* ====================== HERO / CABECERA ====================== */}
      <section className="relative pt-2 -mt-2">
        {/* Arreglo floral superior*/}
        <motion.img
          {...fadeIn}
          src="/img/flores1.png"
          alt="Flores"
          className="rotate-130 mx-auto w-[75%] sm:w-[70%] md:w-[58%] pointer-events-none select-none mt-[-8%]"
          loading="eager"
        />

        {/* Título*/}
        <motion.h1
          {...fadeIn}
          className="font-hand text-center mt-[-25%] leading-tight text-[60px] text-[var(--color-brand)] -mt-1"
        >
          ¡Mis papis se casan!
        </motion.h1>

        {/* Flores sueltas izq/der*/}
        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-[-6%] sm:left-[-1%] top-[56%] w-[30%] sm:w-[30%] z-10"
        />
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-5%] sm:right-[4%] top-[44%] w-[24%] sm:w-[20%]"
        />

        {/* SOBRE + FLOR superpuesta */}
        <div className="text-center mx-auto w-[95%] sm:w-[82%] md:w-[65%] mt-2 flex justify-center">
          <motion.img
            {...fadeIn}
            src="/img/sobre_katie.png"
            alt="sobre"
            className="block sm:w-[82%] md:w-[90%] mt-2 drop-shadow-[0_20px_40px_rgba(0,0,0,.10)]"
            loading="eager"
          />
        </div>
      </section>

      {/* ============== NOMBRES + SOBRE CON FOTOS ============== */}
      <section className="relative mt-10">
        {/* 1) Nombres + flores */}
        <div id="namesHero" className="relative max-w-[1000px] mx-auto my-10">
          {/* Ángel */}
          <motion.h2
            {...fadeIn}
            className="
              font-hand text-[var(--color-brand)]
              text-[70px]
              leading-none
              text-left
              -ml-2 sm:-ml-[-20%]
              mb-2 sm:mb-0
            "
          >
            Ángel
          </motion.h2>

          {/* Ampersand */}
          <motion.div
            {...fadeIn}
            className="
              font-hand text-[var(--color-brand)]
              text-[70px]
              leading-none
              absolute left-1/2 -translate-x-1/2
              py-6
              top-[9%] sm:top-[10%]
              rotate-[-6deg]
              pointer-events-none select-none
            "
            aria-hidden="true"
          >
            &
          </motion.div>

          {/* Mirely */}
          <motion.h2
            {...fadeIn}
            className="
              font-hand text-[var(--color-brand)]
              text-[70px]
              leading-none
              text-right
              mt-6 sm:mt-4
              mr-2 sm:mr-[20%]
            "
          >
            Mirely
          </motion.h2>

          {/* Flor izquierda */}
          <motion.img
            {...fadeIn}
            src="/img/flor1.png"
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none select-none
              absolute
              left-[9%] sm:left-[12%]
              top-[58%] sm:top-[55%]
              w-[22%] sm:w-[20%]
              z-[2]
            "
          />
        </div>

        {/* 2) Sobre con fotos */}
        <div
          id="envelopeBlock"
          className="relative mx-auto w-[92%] sm:w-[80%] md:w-[64%] -mt-2 sm:-mt-4"
        >
          <motion.img
            {...fadeIn}
            src="/img/fotos_sobre.png"
            alt="Nuestros recuerdos"
            className="block w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.10)]"
            loading="lazy"
          />
        </div>
      </section>

      {/* ====================== FOTO + FLORES ====================== */}
      <section className="relative mt-14">
        {/* Foto */}
        <motion.img
          {...fadeIn}
          src="/img/foto_novios.svg"
          alt="Foto de los novios"
          className="block mx-auto w-full max-w-[900px] mt-[-25%]"
          loading="lazy"
        />

        {/* Divisor floral */}
        <img
          src="/img/Flores_centro.png"
          alt=""
          aria-hidden="true"
          className="rotate-270 pointer-events-none select-none block mx-auto -mt-6 w-[62%] max-w-[520px] mt-[-53%]"
        />

        {/* Texto */}
        <p className="mt-[-20%] font-quicksand font-medium text-center max-w-[780px] mx-auto text-[var(--color-brand)]/80  leading-relaxed md:text-3xl text-l">
          En este día en que dos almas se hacen una, agradecemos a la vida
          el regalo de su presencia para celebrar nuestra unión.
        </p>
      </section>

      {/* ====================== FECHA ====================== */}
      <section className="relative mt-8">
        <motion.h2
          {...fadeIn}
          className="font-hand text-[var(--color-brand)] text-center text-[70px] top-[6%]"
        >
          Noviembre
        </motion.h2>
        <motion.img
          {...fadeIn}
          src="/img/fecha_boda.svg"
          alt="Fecha"
          className="w-full max-w-[820px] mx-auto mt-5"
          loading="eager"
        />

        {/* Flores sueltas */}
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-[10%] top-[95%] w-[18%] sm:w-[16%]"
        />
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[10%] top-[-10%] w-[16%] sm:w-[14%]"
        />
      </section>

      {/* ====================== HORA DE CEREMONIA ====================== */}
      <section className="-mt-4 sm:-mt-6 relative">
        <motion.img
          {...fadeIn}
          src="/img/ginger_letra.png"
          alt="Hora de ceremonia"
          className="w-full sm:w-[82%] md:w-[80%] mx-auto"
          loading="lazy"
        />

        {/* Flor derecha*/}
        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[10%] top-[18%] w-[14%] sm:w-[20%] z-10"
        />
      </section>

      {/* ====================== UBICACIÓN ====================== */}
      <section className="relative mt-10 text-center">
        {/* flor arriba-izquierda */}
        <img
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-10 left-6 w-20 opacity-90"
        />

        {/* Ícono + título */}
        <div className="flex flex-col items-center justify-center pt-18">
          <img src="/img/icono_ubicacion.svg" alt="" className="w-15 h-15 mb-1" />
          <h3 className="font-hand text-[70px] leading-none text-[var(--color-brand)]">
            Bosque pino
          </h3>
          <p className="text-[12px] font-quicksand font-bold italic text-[var(--color-ink)]/70 -mt-1 pt-7">
            Planes de Renderos
          </p>
        </div>

        {/* Botón */}
        <div className="relative mt-3 flex justify-center z-10">
          <a
            href="https://maps.app.goo.gl/gMgXumkYpEoXaheC6"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-[12px] font-quicksand font-medium px-6 py-2 bg-[var(--color-brand)] text-white shadow-[var(--shadow-soft)]"
          >
            Como llegar
          </a>
        </div>
      </section>

      {/* Separador floral */}
      <section className="mt-[-10%]">
        <img
          src="/img/flores1.png"
          alt="Arreglo floral"
          className="rotate-130 mx-auto w-[72%] max-w-[460px]"
          loading="lazy"
        />
      </section>

      {/* ====================== CÓDIGO DE VESTIMENTA ====================== */}
      <section className="mt-[-20%] text-center">
        <h3 className="font-hand text-[var(--color-brand)] text-center leading-[0.9] text-[70px]">
          Código de vestimenta
        </h3>

        <p className="mt-2 italic font-quicksand font-bold text-[var(--color-brand)]">Formal:</p>
        <p className="mt-1 text-sm font-quicksand font-medium sm:text-[15px] italic text-[var(--color-ink)]/80">
          Un toque de elegancia para una noche inolvidable
        </p>

        <div className="mt-6">
          <img
            src="/img/codigo_vestimenta.svg"
            alt="Código de vestimenta"
            className="mx-auto w-[86%] sm:w-[70%] max-w-[520px]"
            loading="lazy"
          />
        </div>
      </section>

      <section className="relative mt-[-15%] text-center">
        <p className="max-w-[700px] font-quicksand font-medium mx-auto text-[var(--color-ink)]/80 italic">
          Traje para caballeros y
          <br className="sm:hidden" /> vestido largo o cóctel para damas (no blanco, no terracota)
        </p>

        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="mx-auto w-[72px] sm:w-[88px] mt-3 pointer-events-none select-none"
        />

        <p className="pb-5 font-quicksand font-medium max-w-[700px] mx-auto text-[var(--color-ink)]/80 italic">
          Por sí necesitas un poco de inspiración al elegir tu atuendo, te dejamos nuestra paleta de colores
        </p>

        <motion.img
          {...fadeIn}
          src="/img/paleta_colores.svg"
          alt="Paleta de colores sugerida"
          className="mx-auto w-[85%] sm:w-[60%] md:w-[520px] mt-2"
          loading="lazy"
        />

        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="mx-auto w-[72px] sm:w-[88px] mt-3 pointer-events-none select-none"
        />
      </section>

      {/* ====================== REGALO DE SOBRE ====================== */}
      <section className="mt-2">
        <motion.h2
          {...fadeIn}
          className="font-hand text-[var(--color-brand)] text-center leading-[0.9] text-[70px]"
        >
          Regalo de Sobre
        </motion.h2>

        <div className="relative mx-auto mt-5 w-[92%] sm:w-[80%] md:w-[700px]">
          <motion.img
            {...fadeIn}
            src="/img/regalo_sobre.svg"
            alt="Sobre para obsequio"
            className="relative z-[1] mx-auto w-full drop-shadow-[0_14px_30px_rgba(0,0,0,.10)]"
            loading="lazy"
          />
        </div>

        <p className="max-w-[780px] font-quicksand font-medium mx-auto mt-6 text-[var(--color-ink)]/80 italic px-4 text-center">
          Su compañía es el regalo más valioso que podemos recibir, pero si desean
          obsequiarnos algo, un sobre sería el mejor detalle.
        </p>
      </section>

      {/* ====================== CUENTAS BANCARIAS (SOLO TEXTO) ====================== */}
      <section className="relative mt-12 sm:mt-16">

        <p className="max-w-[900px] font-quicksand font-medium mx-auto text-center text-[var(--color-ink)]/80 italic mt-2 px-4">
          Y si quieres ayudarnos con una contribución y ahorrarte el sobre, a continuación te
          dejamos nuestro número de cuenta bancaria:
        </p>

        {/* —— Cuenta 1 —— */}
        <div className="max-w-[820px] mx-auto mt-8 px-4">
          <div className="text-center">
            <p className="font-hand text-[var(--color-brand)] leading-none text-[70px]">
              Cuenta de banco
            </p>
            <p className="mt-2 text-[var(--color-brand)] font-quicksand font-medium text-[20px] leading-none">
              Mirely Escobar
            </p>
            <p className="text-[var(--color-ink)]/70 italic -mt-1">
              Banco Cuscatlán
            </p>
          </div>

          <div
            className="mt-4 flex items-center gap-2 rounded-2xl bg-white border border-black/10
                      shadow-[0_12px_30px_rgba(0,0,0,.08)] px-4 py-3 sm:px-5 sm:py-3.5"
          >
            <code className="flex-1 text-center font-medium tracking-wide text-[clamp(16px,4.5vw,22px)] text-[var(--color-ink)]">
              404495000474308
            </code>

            <button
              type="button"
              onClick={() => copyToClipboard("404495000474308", setCopied1)}
              className="shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5
                        bg-[var(--color-brand)] text-white text-sm
                        shadow-[0_8px_18px_rgba(0,0,0,.14)] hover:opacity-95 active:scale-95 transition"
              aria-label="Copiar número de cuenta"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="10" height="10" rx="2" />
                <path d="M5 15V7a2 2 0 0 1 2-2h8" />
              </svg>
              {copied1 ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        {/* —— Cuenta 2 —— */}
        <div className="max-w-[820px] mx-auto mt-10 px-4">
          <div className="text-center">
            <p className="mt-2 text-[var(--color-brand)] font-quicksand font-medium text-[20px] leading-none">
              Ángel Guerrero
            </p>
            <p className="text-[var(--color-ink)]/70 italic -mt-1">
              Banco Agrícola
            </p>
          </div>

          <div
            className="mt-4 flex items-center gap-2 rounded-2xl bg-white border border-black/10
                      shadow-[0_12px_30px_rgba(0,0,0,.08)] px-4 py-3 sm:px-5 sm:py-3.5"
          >
            <code className="flex-1 text-center font-medium tracking-wide text-[clamp(16px,4.5vw,22px)] text-[var(--color-ink)]">
              3760710098
            </code>

            <button
              type="button"
              onClick={() => copyToClipboard("3760710098", setCopied2)}
              className="shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1.5
                        bg-[var(--color-brand)] text-white text-sm
                        shadow-[0_8px_18px_rgba(0,0,0,.14)] hover:opacity-95 active:scale-95 transition z-10"
              aria-label="Copiar número de cuenta"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="10" height="10" rx="2" />
                <path d="M5 15V7a2 2 0 0 1 2-2h8" />
              </svg>
              {copied2 ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      </section>



      {/* ====================== NO NIÑOS ====================== */}
      <section id="no-ninos" className="relative sm:mt-[-8%]">
        <motion.img
          {...fadeIn}
          src="/img/flores1.png"
          alt=""
          aria-hidden="true"
          className="rotate-130 pointer-events-none select-none mx-auto w-[68%] sm:w-[480px] -mb-2"
          loading="lazy"
        />

        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-6 sm:left-10 top-16 sm:top-20 w-[5%] sm:w-[15%]"
          loading="lazy"
        />
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-6 sm:right-10 top-[22%] sm:top-[18%] w-[70px] sm:w-[88px]"
          loading="lazy"
        />

        <motion.img
          {...fadeIn}
          src="/img/yue_letra.png"
          alt="Amamos a los pequeños, pero esta ocasión es solo para adultos"
          className="block mx-auto w-[80%] sm:w-[70%] md:w-[60%] mt-[-25%]"
          loading="lazy"
        />


        <motion.img
          {...fadeIn}
          src="/img/Flores_centro.png"
          alt=""
          aria-hidden="true"
          className="rotate-270 pointer-events-none select-none mx-auto sm:mt-[-15%] w-[72%] sm:w-[50%]"
          loading="lazy"
        />
      </section>

      {/* ====================== CONFIRMACIÓN / RSVP ====================== */}
      <section id="rsvp" className="relative sm:mt-[-20%]">
        <div className="flex justify-center">
          <img
            src="/img/icono_confirmacion.svg"
            alt=""
            aria-hidden="true"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-3"
          />
        </div>

        <motion.h2
          {...fadeIn}
          className="font-hand text-[70px] text-center text-[var(--color-brand)]"
        >
          Confirme su asistencia
        </motion.h2>

        <p className="text-center font-quicksand font-medium text-[var(--color-ink)]/70 italic -mt-1">
          Su presencia hará más especial este día.
        </p>
        <br />
        <p className="text-center font-quicksand font-medium text-[var(--color-ink)]/60 text-sm">
          Les agradeceremos confirmar su asistencia antes del
        </p>

        <motion.p
          {...fadeIn}
          className="font-quicksand font-bold text-center text-2xl text-[var(--color-brand)] mt-1"
        >
          15/11/2025
        </motion.p>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setRsvpOpen(true)}
            className="rounded-full px-6 py-2.5 bg-[var(--color-brand)] text-white shadow-[var(--shadow-soft)] font-quicksand font-medium text-[clamp(18px,5vw,28px)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]/40"
            type="button"
          >
            Confirma aquí
          </button>
        </div>

        <p className="text-center mt-6 font-hand text-[clamp(20px,5.5vw,34px)] text-[var(--color-brand)]/90">
          Esperamos contar con tu presencia
        </p>
      </section>

      {/* ====================== MONOGRAMA / CIERRE ====================== */}
      <section className="relative mt-10 sm:mt-14 text-center">
        <motion.img
          {...fadeIn}
          src="/img/icono_novios.svg"
          alt="Cuentas bancarias para contribución"
          className="mx-auto w-full sm:w-full md:w-full max-w-[960px]
                    drop-shadow-[0_18px_40px_rgba(0,0,0,.10)]"
          loading="lazy"
        />
      </section>


      {/* Modal de RSVP */}
      <RsvpModal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        allowed={allowed}
        token={token}
        endpoint={scriptUrl}
        onSuccess={({ name, people }) => {
          setRsvpOpen(false);
          setToastVariant("success");
          const qty = Number.isFinite(people) ? people : 0; 
          setToastMsg(`¡Gracias, ${name || "invitado(a)"}! Registramos tu confirmación para ${qty} persona(s).`);
          setToastOpen(true);
          setTimeout(() => setToastOpen(false), 3000);
        }}
      />

      <CenterToast open={toastOpen} variant={toastVariant}>
        {toastMsg}
      </CenterToast>

    </main>
  );
}
