// src/components/Invite.jsx
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Invite() {
  return (
    <main className="max-w-[1000px] mx-auto px-4 pb-16">
      {/* ====================== HERO / CABECERA ====================== */}
      {/* Subo todo el héroe un pelín */}
      <section className="relative pt-2 -mt-2">
        {/* Arreglo floral superior — respetando rotate-130 */}
        <motion.img
          {...fadeIn}
          src="/img/flores1.png"
          alt="Flores"
          className="rotate-130 mx-auto w-[75%] sm:w-[70%] md:w-[58%] pointer-events-none select-none mt-[-8%]"
          loading="eager"
        />

        {/* Título: le quito espacio arriba */}
        <motion.h1
          {...fadeIn}
          className="font-hand text-center mt-[-25%] leading-tight text-[clamp(28px,6vw,60px)] text-[var(--color-brand)] -mt-1"
        >
          ¡Mis papis se casan!
        </motion.h1>

        {/* Flores sueltas izq/der — subo un poco su posición */}
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
            src="/img/sobre_katie.svg"
            alt="sobre"
            className="block sm:w-[82%] md:w-[90%] mt-2 drop-shadow-[0_20px_40px_rgba(0,0,0,.10)]"
            loading="eager"
          />
        </div>
      </section>

      {/* ============== NOMBRES + SOBRE CON FOTOS (separado en 2 divs) ============== */}
        <section className="relative mt-10">
        {/* 1) Nombres + flores */}
        <div id="namesHero" className="relative max-w-[1000px] mx-auto my-10">
            {/* Ángel (izquierda, escalonado) */}
            <motion.h2
            {...fadeIn}
            className="
                font-hand text-[var(--color-brand)]
                text-[clamp(44px,9vw,120px)]
                leading-none
                text-left
                -ml-2 sm:-ml-4
            "
            >
            Ángel
            </motion.h2>

            {/* Ampersand centrado y grande */}
            <motion.div
            {...fadeIn}
            className="
                font-hand text-[var(--color-brand)]
                text-[clamp(64px,12vw,160px)]
                leading-none
                absolute left-1/2 -translate-x-1/2
                top-[8%] sm:top-[7%]
                rotate-[-6deg]
                pointer-events-none select-none
            "
            aria-hidden="true"
            >
            &
            </motion.div>

            {/* Mirely (derecha, un poco más abajo) */}
            <motion.h2
            {...fadeIn}
            className="
                font-hand text-[var(--color-brand)]
                text-[clamp(44px,9vw,120px)]
                leading-none
                text-right
                mt-3 sm:mt-4
                mr-2 sm:mr-4
            "
            >
            Mirely
            </motion.h2>

            {/* Flor izquierda bajo "Ángel" */}
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

        {/* 2) Solo el sobre con fotos */}
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

        {/* ====================== FOTO + FLORES (sección vertical) ====================== */}
        <section className="relative mt-14">

        {/* Foto grande con borde rasgado */}
        <motion.img
            {...fadeIn}
            src="/img/foto_novios.svg"
            alt="Foto de los novios"
            className="block mx-auto w-full max-w-[900px] mt-[-25%]"
            loading="lazy"
        />

        {/* Divisor floral centrado debajo de la foto */}
        <img
            src="/img/Flores_centro.png"
            alt=""
            aria-hidden="true"
            className="rotate-270 pointer-events-none select-none block mx-auto -mt-6 w-[62%] max-w-[520px] mt-[-53%]"
        />

        {/* Texto corto/poético debajo */}
        <p className="mt-[-20%] text-center max-w-[780px] mx-auto text-[var(--color-brand)]/80 italic leading-relaxed font-hand md:text-5xl text-3xl">
            En este día en que dos almas se hacen una, agradecemos a la vida
            el regalo de su presencia para celebrar nuestra unión.
        </p>
      </section>

      {/* ====================== FECHA ====================== */}
      <section className="relative mt-8">
        <motion.h2
          {...fadeIn}
          className="font-hand text-[var(--color-brand)] text-center
                    text-[clamp(40px,8vw,90px)] top-[6%]">
          Noviembre
        </motion.h2>
        <motion.img
          {...fadeIn}
          src="/img/fecha_boda.svg"
          alt="Fecha"
          className="w-full max-w-[820px] mx-auto mt-5"
          loading="eager"
        />

        {/* Flores sueltas decorativas */}
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none
                    absolute left-[10%] top-[95%] w-[18%] sm:w-[16%]"
        />
        <motion.img
          {...fadeIn}
          src="/img/flor2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none
                    absolute right-[10%] top-[-10%] w-[16%] sm:w-[14%]"
        />
      </section>

      {/* ====================== HORA DE CEREMONIA ====================== */}
      <section className="-mt-4 sm:-mt-6 relative">
        {/* Bloque principal */}
        <motion.img
          {...fadeIn}
          src="/img/ginger_letra.png"
          alt="Hora de ceremonia"
          className="w-full sm:w-[82%] md:w-[80%] mx-auto"
          loading="lazy"
        />

        {/* Flor derecha (a la altura del panel) */}
        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute
                    right-[10%] top-[18%] w-[14%] sm:w-[20%] z-10"
        />
      </section>
      {/* ====================== UBICACIÓN ====================== */}
      <section className="relative mt-10 text-center">
        {/* flor suelta arriba-izquierda */}
        <img
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-25 left-6 w-12 sm:w-50 opacity-90"
        />

        {/* Ícono + título */}
        <div className="flex flex-col items-center justify-center pt-18">
          <img
            src="/img/icono_ubicacion.svg"
            alt=""
            className="w-15 h-15 mb-1"
          />
          <h3 className="font-hand text-[75px] leading-none text-[var(--color-brand)]">
            Bosque pino
          </h3>
          <p className="text-[12px] italic text-[var(--color-ink)]/70 -mt-1 pt-7">
            Planes de Renderos
          </p>
        </div>


        {/* Botón */}
        <div className="relative mt-3 flex justify-center">
          <a
            href="https://maps.app.goo.gl/gMgXumkYpEoXaheC6"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-[12px] px-6 py-2 bg-[var(--color-brand)] text-white shadow-[var(--shadow-soft)]"
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
        <h3 className="font-hand text-[clamp(26px,5vw,42px)] text-[var(--color-brand)]">
          Código de vestimenta
        </h3>

        <p className="mt-2 italic text-[var(--color-brand)]">Formal:</p>
        <p className="mt-1 text-sm sm:text-[15px] italic text-[var(--color-ink)]/80">
          Un toque de elegancia para una noche inolvidable
        </p>

        {/* Ilustración / guía */}
        <div className="mt-6">
          <img
            src="/img/codigo_vestimenta.svg"
            alt="Código de vestimenta"
            className="mx-auto w-[86%] sm:w-[70%] max-w-[520px]"
            loading="lazy"
          />
        </div>
      </section>

      {/* ====================== REGALO DE SOBRE ====================== */}
      <section className="relative mt-14 text-center">
        {/* Textos guía */}
        <p className="max-w-[700px] mx-auto text-[var(--color-ink)]/80 italic">
          Traje para caballeros y
          <br className="sm:hidden" /> vestido largo o cóctel para damas (no blanco, no terracota)
        </p>

        {/* Flor centrada arriba de la paleta */}
        <motion.img
          {...fadeIn}
          src="/img/flor1.png"
          alt=""
          aria-hidden="true"
          className="mx-auto w-[72px] sm:w-[88px] mt-3 pointer-events-none select-none"
        />

        {/* Textos guía */}
        <p className="max-w-[700px] mx-auto text-[var(--color-ink)]/80 italic">
          Por sí necesitas un poco de inspiración al elegir tu atuendo, te dejamos nuestra paleta de colores
        </p>

        {/* Paleta de colores */}
        <motion.img
          {...fadeIn}
          src="/img/paleta_colores.svg"
          alt="Paleta de colores sugerida"
          className="mx-auto w-[85%] sm:w-[60%] md:w-[520px] mt-2"
          loading="lazy"
        />


        {/* Título */}
        <motion.h2
          {...fadeIn}
          className="font-hand text-[clamp(30px,8vw,64px)] text-[var(--color-brand)] mt-8"
        >
          Regalo de Sobre
        </motion.h2>

        {/* Marco decorativo + sobre */}
        <div className="relative mx-auto mt-5 w-[92%] sm:w-[80%] md:w-[700px]">
          {/* Ramillete superior-izquierdo */}
          <motion.img
            {...fadeIn}
            src="/img/flores1.png"
            alt=""
            aria-hidden="true"
            className="absolute -left-2 sm:-left-6 -top-14 sm:-top-16 w-[34%] sm:w-[30%] rotate-[-10deg] pointer-events-none select-none"
          />

          {/* Ramillete inferior-derecho (mismo PNG girado/opuesto con flor2 si lo prefieres) */}
          <motion.img
            {...fadeIn}
            src="/img/flores1.png"
            alt=""
            aria-hidden="true"
            className="absolute -right-3 sm:-right-6 -bottom-16 sm:-bottom-20 w-[36%] sm:w-[32%] rotate-[12deg] pointer-events-none select-none"
            style={{ transformOrigin: "center" }}
          />

          {/* Sobre (ilustración principal) */}
          <motion.img
            {...fadeIn}
            src="/img/regalo_sobre.svg"
            alt="Sobre para obsequio"
            className="relative z-[1] mx-auto w-full drop-shadow-[0_14px_30px_rgba(0,0,0,.10)]"
            loading="lazy"
          />
        </div>

        {/* Texto final */}
        <p className="max-w-[780px] mx-auto mt-6 text-[var(--color-ink)]/80 italic px-4">
          Su compañía es el regalo más valioso que podemos recibir, pero si desean
          obsequiarnos algo, un sobre sería el mejor detalle.
        </p>
      </section>


    </main>
  );
}
