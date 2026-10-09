"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Truck,
  Wrench,
  Thermometer,
  Snowflake,
  ShieldCheck,
  Layers,
  Building2,
  Cpu,
  ArrowRight,
  Gauge,
  Hammer,
} from "lucide-react";
import { services } from "@/data/content";
import TiltImage from "./TiltImage";
import TypesCarousel from "./TypesCarousel";

// Imagen de cada tarjeta principal (null = usa el ícono). Mismo orden que content.js
const serviceImages = [
  "/images/Furgonetapollitos.png",
  "/images/Fabricacióncamión.png",
  "/images/Técnicocamión.png",
];
const icons = [Truck, Layers, Wrench];

// Especialidades de cada servicio. `img` es la foto de la card del carrusel
// (null = se muestra el ícono grande hasta que tengas la foto).
const typesByService = [
  // 1. Transporte Climatizado
  [
    {
      Icon: Thermometer,
      img:  "/images/Furgonetapollitos.png",
      title: "Furgones para Pollitos Bebé",
      text: "Diseñados para mantener temperatura constante y ventilación uniforme, reduciendo el estrés animal.",
    },
    {
      Icon: Snowflake,
      img:  "/images/Furgonetapollitos.png",
      title: "Cadena de Frío y Perecibles",
      text: "Unidades térmicas de alto rendimiento para el transporte seguro de alimentos, lácteos y carga sensible.",
    },
    {
      Icon: Gauge,
      img:  "/images/Furgonetapollitos.png",
      title: "Tecnología Alemana y Control",
      text: "Equipos térmicos con sensores de alta precisión para un monitoreo óptimo durante todo el trayecto.",
    },
  ],
  // 2. Fabricación y Chasis
  [
    {
      Icon: Layers,
      img: null,
      title: "Furgones Climatizados a Medida",
      text: "Diseño y fabricación personalizada de carrocerías según el tipo de carga y especificaciones del cliente.",
    },
    {
      Icon: Hammer,
      img: null,
      title: "Modificación y Adaptación de Chasis",
      text: "Refuerzo y adecuación estructural de chasis vehicular para garantizar el montaje perfecto de la unidad.",
    },
    {
      Icon: ShieldCheck,
      img: null,
      title: "Acabados Premium e Higiénicos",
      text: "Materiales duraderos de fácil desinfección y máximo aislamiento térmico de bajo consumo energético.",
    },
  ],
  // 3. Climatización y Mantenimiento
  [
    {
      Icon: Building2,
      img: null,
      title: "Instalación Comercial e Industrial",
      text: "Montaje técnico profesional de sistemas de climatización para oficinas, comercios y locales industriales.",
    },
    {
      Icon: Wrench,
      img: null,
      title: "Mantenimiento Preventivo y Correctivo",
      text: "Planes periódicos de limpieza, recarga de refrigerante y revisión técnica para evitar paradas operativas.",
    },
    {
      Icon: Cpu,
      img: null,
      title: "Diagnóstico y Reparación Especializada",
      text: "Atención rápida para solucionar fallas en equipos de aire acondicionado y unidades de refrigeración.",
    },
  ],
];

export default function Services() {
  const [selected, setSelected] = useState(null);

  // Cierra con Escape y bloquea el scroll de fondo mientras el modal está abierto
  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  const types = selected
    ? (selected.types ?? typesByService[selected.index] ?? [])
    : [];

  return (
    <section id="servicios" className="py-20">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-2xl font-bold uppercase text-navy md:text-3xl">
            Nuestros Servicios
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mt-4 text-gray-600">
            Ingeniería y soluciones de climatización vehicular, fabricación a
            medida y servicio técnico con tecnología alemana.
          </p>
        </div>

        {/* Grilla de servicios */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-gray-200">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={s.title} className="group text-center md:px-10">
                <div className="mx-auto mb-3 flex h-28 items-center justify-center">
                  {serviceImages[i] ? (
                    <TiltImage src={serviceImages[i]} alt={s.title} />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy/5 text-navy ring-1 ring-navy/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-navy group-hover:text-white group-hover:ring-brand">
                      <Icon size={34} strokeWidth={1.6} />
                    </div>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mx-auto mb-5 max-w-xs text-sm leading-relaxed text-gray-600">
                  {s.text}
                </p>

                <button
                  type="button"
                  onClick={() => setSelected({ ...s, Icon, index: i })}
                  className="inline-flex items-center gap-1.5 border-b-2 border-brand pb-0.5 font-bold text-navy transition-colors hover:text-brand"
                >
                  Saber más
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal con carrusel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-dark/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-2xl bg-white py-6 shadow-2xl md:py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-navy transition-colors hover:bg-gray-200"
              >
                ✕
              </button>

              {/* Encabezado del servicio */}
              <div className="flex items-center gap-3 px-6 pr-16 md:px-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <selected.Icon size={24} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 id="modal-title" className="text-xl font-bold text-navy md:text-2xl">
                    {selected.title}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-brand">
                    Desliza para ver más
                  </p>
                </div>
              </div>

              {/* Carrusel (key reinicia la posición al abrir otro servicio) */}
              <div className="mt-5">
                <TypesCarousel key={selected.index} types={types} />
              </div>

              {/* Botón */}
              <div className="mt-5 px-6 md:px-8">
                <a
                  href="#contacto"
                  onClick={() => setSelected(null)}
                  onTouchStart={() => {}}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-brand px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95"
                >
                  <span className="relative z-10">¡Cotiza tu proyecto a medida!</span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}