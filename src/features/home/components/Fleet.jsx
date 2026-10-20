"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

// ✏️ EDITA AQUÍ TUS VIDEOS (deben estar en public/images/ o public/videos/)
// Para agregar uno nuevo, copia un bloque { ... } y cambia los textos.
const videos = [
  {
    src: "/images/WhatsApp_Video1.mp4",
    titulo: "Interior del furgón climatizado",
    descripcion:
      "Distribución interna y equipos de climatización que mantienen una temperatura estable y ventilación uniforme durante todo el recorrido.",
  },
  {
    src: "/images/video-pantalla.mp4",
    titulo: "Unidad bien equipada",
    descripcion:
      "Furgon listo con su panel de control de temperatura para mejor control del sistema de climatisación",
  },
  {
    src: "/images/video-caja-de energia.mp4",
    titulo: "Caja de control de energia de emergencia",
    descripcion:
      "Viene instalado su panel de energia para tener mejor dominio de todo el sistema en caso de emergencia.",
  },
];

const WHATSAPP =
  "https://wa.me/51902589157?text=Hola,%20quisiera%20una%20cotizaci%C3%B3n";

const pad = (n) => String(n).padStart(2, "0");

export default function Fleet() {
  const reduceMotion = useReducedMotion();
  const total = videos.length;

  const [actual, setActual] = useState(0);
  const [autoplay, setAutoplay] = useState(true); // intención del usuario
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0 a 1
  const [visible, setVisible] = useState(false);

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const toqueRef = useRef(null);

  const ir = useCallback(
    (i) => {
      setActual(((i % total) + total) % total);
      setProgress(0);
    },
    [total]
  );

  // Respeta "reducir movimiento": no arranca solo
  useEffect(() => {
    if (reduceMotion) setAutoplay(false);
  }, [reduceMotion]);

  // Solo reproduce cuando la sección está en pantalla (ahorra datos y batería)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reproduce / pausa según visibilidad e intención del usuario
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible && autoplay) v.play().catch(() => {});
    else v.pause();
  }, [actual, visible, autoplay]);

  // Sincroniza el sonido
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, actual]);

  const alternar = () => setAutoplay((a) => !a);

  const onEnded = () => {
    if (total > 1) ir(actual + 1);
    else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") ir(actual + 1);
    if (e.key === "ArrowLeft") ir(actual - 1);
  };

    const onToqueInicio = (e) => {
    const t = e.touches[0];
    toqueRef.current = { x: t.clientX, y: t.clientY };
  };

  const onToqueFin = (e) => {
    const ini = toqueRef.current;
    toqueRef.current = null;
    if (!ini || total < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - ini.x;
    const dy = t.clientY - ini.y;
    // Solo cuenta si el gesto es claramente horizontal
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      ir(actual + (dx < 0 ? 1 : -1));
    }
  };

  const v = videos[actual];

  return (
    <section id="flota" ref={sectionRef} className="py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end md:gap-16">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Nuestros trabajos</h2>
          <p className="max-w-md text-gray-600 md:justify-self-end">
            Así quedan los equipos instalados. Mira el interior y el resultado final de nuestros proyectos.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Videos de nuestros trabajos"
          onKeyDown={onKeyDown}
          className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8"
        >
          {/* ---------- Escenario principal ---------- */}
          <div>
            <div
              onTouchStart={onToqueInicio}
              onTouchEnd={onToqueFin}
              className="group relative aspect-video touch-pan-y overflow-hidden rounded-md bg-ink"
            >
              <video
                key={v.src}
                ref={videoRef}
                src={v.src}
                muted
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => {
                  const d = e.currentTarget.duration;
                  if (d) setProgress(e.currentTarget.currentTime / d);
                }}
                onEnded={onEnded}
                className="h-full w-full object-contain"
              />

              {/* Degradado inferior para que se lean los controles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/80 to-transparent"
              />

              {/* Botón central cuando está en pausa */}
              {!playing && (
                <button
                  type="button"
                  onClick={alternar}
                  aria-label="Reproducir video"
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-xl transition hover:scale-105 active:scale-95 md:h-20 md:w-20"
                >
                  <Play size={30} fill="currentColor" aria-hidden="true" className="ml-1" />
                </button>
              )}

              {/* Flechas laterales */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => ir(actual - 1)}
                    aria-label="Video anterior"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => ir(actual + 1)}
                    aria-label="Video siguiente"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </>
              )}

              {/* Barra de controles */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-4 text-white">
                <button
                  type="button"
                  onClick={alternar}
                  aria-label={playing ? "Pausar video" : "Reproducir video"}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/30"
                >
                  {playing ? (
                    <Pause size={18} fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play size={18} fill="currentColor" aria-hidden="true" className="ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  aria-pressed={!muted}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/30"
                >
                  {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                </button>

                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                <span className="text-sm font-semibold tabular-nums">
                  {pad(actual + 1)} / {pad(total)}
                </span>
              </div>
            </div>

                        {/* Puntos del carrusel (solo celular) */}
            {total > 1 && (
              <div className="mt-4 flex justify-center gap-2 lg:hidden">
                {videos.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => {
                      ir(i);
                      setAutoplay(true);
                    }}
                    aria-label={`Ir al video ${i + 1}`}
                    aria-current={i === actual}
                    className={`h-2.5 rounded-full transition-all ${
                      i === actual ? "w-6 bg-brand" : "w-2.5 bg-steel"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Descripción del video actual */}
            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div aria-live="polite" className="max-w-xl">
                <h3 className="text-2xl font-bold text-ink md:text-3xl">{v.titulo}</h3>
                <p className="mt-2 text-gray-600">{v.descripcion}</p>
              </div>

            </div>
          </div>

          {/* ---------- Lista de videos ---------- */}
                    <ul className="hidden lg:flex lg:flex-col lg:gap-3">
            {videos.map((item, i) => {
              const activo = i === actual;
              return (
                <li key={item.src} className="min-w-[78%] snap-start sm:min-w-[46%] lg:min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      ir(i);
                      setAutoplay(true);
                    }}
                    aria-current={activo}
                    aria-label={`Ver video ${i + 1}: ${item.titulo}`}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-md border p-3 text-left transition-colors ${
                      activo ? "border-navy bg-soft" : "border-steel bg-white hover:border-navy/50"
                    }`}
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded bg-ink">
                      <video
                        src={`${item.src}#t=0.5`}
                        muted
                        playsInline
                        preload="metadata"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                        <Play size={18} fill="white" className="text-white" aria-hidden="true" />
                      </span>
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold tabular-nums text-brand">{pad(i + 1)}</span>
                      <span className="block font-bold leading-snug text-ink">{item.titulo}</span>
                    </span>

                    {/* Barra de progreso del video activo */}
                    {activo && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-steel">
                        <span className="block h-full bg-brand" style={{ width: `${progress * 100}%` }} />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}