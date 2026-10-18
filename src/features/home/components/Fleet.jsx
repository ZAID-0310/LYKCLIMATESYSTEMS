"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

// ✏️ EDITA AQUÍ TU VEHÍCULO
const vehiculo = {
  nombre: "Furgón Avícola Climatizado",
  descripcion:
    "Furgones con flujo de aire uniforme y control térmico estricto que aseguran la supervivencia y reducen el estrés animal.",
  especificaciones: [
    { label: "Sistema", valor: "Ventilación y T° uniforme" },
    { label: "Uso", valor: "Pollitos bebé y carga viva" },
  ],
  puntos: [
    "Flujo de aire uniforme",
    "Control térmico estricto",
    "Reduce el estrés animal",
  ],
  // Imágenes del carrusel (deben estar en public/images/)
  imagenes: [
    { tipo: "video", src: "/images/WhatsApp_Video1.mp4", alt: "Recorrido del furgón climatizado" },
    //{ src: "/images/hero-truck.png", alt: "Furgón climatizado de L&K Climate Systems" },
    // { src: "/images/furgon-3.png", alt: "Interior del furgón climatizado" },
  ],
};

export default function Fleet() {
  const reduceMotion = useReducedMotion();
  const { nombre, descripcion, especificaciones, puntos, imagenes } = vehiculo;
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const siguiente = () => setActual((i) => (i + 1) % imagenes.length);
  const anterior = () => setActual((i) => (i - 1 + imagenes.length) % imagenes.length);

  // Cambia sola cada 4 segundos (se pausa con el mouse encima, o si el slide actual es un video)
  useEffect(() => {
    if (reduceMotion || pausado || imagenes.length < 2) return;
    if (imagenes[actual]?.tipo === "video") return;
    const t = setInterval(siguiente, 4000);
    return () => clearInterval(t);
  }, [actual, pausado, reduceMotion, imagenes]);

  return (
    <section id="flota" className="py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-navy">Nuestra flota</h2>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* ----- Carrusel de imágenes y video ----- */}
          <div
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg"
          >
            {imagenes.map((img, i) => (
              <div
                key={img.src}
                aria-hidden={i !== actual}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === actual ? "opacity-100" : "opacity-0"
                }`}
              >
                {img.tipo === "video" ? (
                  <video
                    src={img.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-contain p-4"
                  />
                )}
              </div>
            ))}

            {imagenes.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={anterior}
                  aria-label="Imagen anterior"
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={siguiente}
                  aria-label="Imagen siguiente"
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>

                <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
                  {imagenes.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActual(i)}
                      aria-label={`Ir a la imagen ${i + 1}`}
                      aria-current={i === actual}
                      className={`h-2.5 rounded-full transition-all ${
                        i === actual ? "w-8 bg-brand" : "w-2.5 bg-navy/30 hover:bg-navy/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ----- Descripción ----- */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Vehículo destacado
            </p>
            <h3 className="mt-2 text-2xl font-bold text-navy md:text-3xl">{nombre}</h3>
            <div className="mt-3 h-1 w-14 rounded-full bg-brand" />
            <p className="mt-4 text-gray-600">{descripcion}</p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {especificaciones.map((e) => (
                <div key={e.label} className="rounded-lg bg-soft p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {e.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-navy">{e.valor}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2">
              {puntos.map((p) => (
                <li key={p} className="flex items-center gap-2 text-gray-700">
                  <Check size={18} className="shrink-0 text-brand" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="#contacto">Solicitar cotización</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}