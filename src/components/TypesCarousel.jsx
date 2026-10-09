"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TypesCarousel({ types }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Cada slide mide exactamente el ancho de la pista
  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(i, types.length - 1));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  // Flechas del teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, types.length]);

  return (
    <div>
      <div className="relative">
        {/* Pista deslizable: una card por pantalla */}
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {types.map((t, i) => (
            <li
              key={t.title}
              className="w-full shrink-0 snap-center px-6 pb-2 md:px-8"
            >
              <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                {/* Imagen o ícono grande */}
                <div className="relative h-48 bg-gradient-to-br from-navy to-navy-dark sm:h-56">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
                  {t.img ? (
                    <Image
                      src={t.img}
                      alt={t.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 600px"
                      className="object-contain p-4 drop-shadow-2xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/90">
                      <t.Icon size={72} strokeWidth={1.2} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(types.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Texto */}
                <div className="p-5">
                  <h4 className="text-lg font-bold text-navy">{t.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {t.text}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Flechas sobre la imagen (en celular se desliza con el dedo) */}
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Anterior"
          className="absolute left-10 top-24 hidden h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex md:top-28"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === types.length - 1}
          aria-label="Siguiente"
          className="absolute right-10 top-24 hidden h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex md:top-28"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Puntos indicadores */}
      <div className="mt-3 flex justify-center gap-2">
        {types.map((t, i) => (
          <button
            key={t.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a ${t.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === i ? "w-8 bg-brand" : "w-2.5 bg-navy/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}