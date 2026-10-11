"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reasons } from "@/data/content";

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
    <section id="nosotros" className="overflow-hidden bg-soft py-16 md:py-20">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-bold uppercase text-navy md:text-3xl">
            ¿Por qué elegir L&K Climate Systems?
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
        </div>

        {/* ============ PC: grilla original (desde 768 px) ============ */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-2xl ring-1 ring-navy/10"
                aria-hidden="true"
              >
                {r.icon}
              </span>
              <div>
                <h3 className="font-bold text-navy">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
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
                  className={`absolute inset-y-0 left-0 right-0 mx-auto w-[78%] rounded-2xl border bg-white p-6 transition-all duration-500 ease-out will-change-transform motion-reduce:transition-none ${
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
                        <span
                          className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-3xl ring-1 ring-navy/10"
                          aria-hidden="true"
                        >
                          {r.icon}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-navy">{r.title}</h3>
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
