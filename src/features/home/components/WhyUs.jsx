"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Thermometer,
  Ruler,
  Zap,
  Wrench,
  MapPin,
  Settings,
} from "lucide-react";
import { reasons } from "@/data/content";

const iconMap = {
  cpu: Cpu,
  thermometer: Thermometer,
  ruler: Ruler,
  zap: Zap,
  wrench: Wrench,
  map: MapPin,
  settings: Settings,
};

const MAX_VISIBILITY = 2; // cuántas cards se ven a cada lado de la activa

// Imagen de cada card del carrusel de celular, mismo orden que `reasons`.
// null = muestra el ícono de siempre.
const reasonImages = [
  "/images/Camión_bebé_modal1.png", // 1
  null, // 2
  null, // 3
  null, // 4
  null, // 5
  null, // 6
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const count = reasons.length;

  const go = (i) => setActive(Math.max(0, Math.min(i, count - 1)));

  // Deslizar con el dedo
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };

  return (
    <section id="nosotros" className="overflow-hidden bg-ink py-16 text-white md:py-24">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Por qué elegir L&amp;K Climate Systems
          </h2>
          <p className="mt-4 text-white/70">
            Especialistas en climatización de vehículos, con asesoría y
            soporte técnico en todo el país.
          </p>
        </div>

        {/* ============ PC: grilla original (desde 768 px) ============ */}
        <div className="hidden border-l border-t border-white/15 md:grid md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => {
            const Icon = iconMap[r.icon];
            return (
              <div key={r.title} className="border-b border-r border-white/15 p-8">
                <Icon size={30} strokeWidth={1.5} className="text-brand" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{r.text}</p>
              </div>
            );
          })}
        </div>

        {/* ============ Celular: carrusel 3D (menos de 768 px) ============ */}
        <div className="md:hidden">
          <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Razones para elegirnos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative mx-auto h-[340px] w-full max-w-md outline-none [perspective:1100px]"
          >
            {reasons.map((r, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              const visible = abs <= MAX_VISIBILITY;
              const isActive = offset === 0;

              return (
                <div
                  key={r.title}
                  onClick={() => !isActive && go(i)}
                  aria-hidden={!isActive}
                  className={`absolute inset-y-0 left-0 right-0 mx-auto w-[78%] rounded-md border bg-white p-6 text-ink transition-all duration-500 ease-out will-change-transform motion-reduce:transition-none ${
                    isActive
                      ? "border-brand/50 shadow-2xl"
                      : "cursor-pointer border-gray-200 shadow-md"
                  }`}
                  style={{
                    transform: `translateX(${offset * 58}%) translateZ(${-abs * 120}px) rotateY(${offset * -32}deg) scale(${1 - abs * 0.06})`,
                    opacity: visible ? 1 - abs * 0.25 : 0,
                    filter: `blur(${abs * 1.2}px)`,
                    zIndex: count - abs,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className="flex h-full flex-col justify-center">
                    {/* Imagen en lugar del ícono (o el ícono si no hay imagen) */}
                    <div className="mb-4 flex justify-center">
                      {reasonImages[i] ? (
                        <div className="relative h-28 w-48">
                          <Image
                            src={reasonImages[i]}
                            alt={r.title}
                            fill
                            sizes="192px"
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      ) : (
(() => {
                          const Icon = iconMap[r.icon];
                          return <Icon size={40} strokeWidth={1.5} className="text-brand" aria-hidden="true" />;
                        })()
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-ink">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {r.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles: flechas y puntos */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-md transition hover:bg-brand hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {reasons.map((r, i) => (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir a ${r.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-8 bg-brand" : "w-2.5 bg-navy/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === count - 1}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-md transition hover:bg-brand hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
