"use client";
import Image from "next/image";

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
  "/images/Fabricacióncamión.webp",
  "/images/Técnicocamión.png",
];
const icons = [Truck, Layers, Wrench];

// Especialidades de cada servicio. `img` es la foto de la card del carrusel
// (null = se muestra el ícono grande hasta que tengas la foto).
const typesByService = [
  // 1. Instalación de Equipos Climatizados
  [
    {
      Icon: Thermometer,
      img: "/images/image.png",
      title: "Furgones para Pollitos Bebé",
      text: "Temperatura constante y ventilación uniforme para un traslado seguro y con menos estrés para las aves.",
    },
    {
      Icon: Snowflake,
      img: "/images/Panel_temperatura.png",
      title: "Control de Temperatura en Ruta",
      text: "Climatización de furgones para mantener condiciones estables en diferentes situaciones de transporte.",
    },
    {
      Icon: Gauge,
      img: "/images/card3.png",
      title: "Tecnología Alemana",
      text: "Equipos de alto rendimiento y eficiencia, instalados por personal especializado.",
    },
  ],
  // 2. Asesoría y Soluciones a Medida
  [
    {
      Icon: Layers,
      img: "/images/Evaluacióncamión.png",
      title: "Evaluación de tu Vehículo",
      text: "Revisamos tu vehículo y lo que necesitas transportar para definir la mejor solución de climatización.",
    },
    {
      Icon: Hammer,
      img: "/images/chasis_hammer.png",
      title: "Modificación y Adaptación de Chasis",
      text: "Adecuamos el vehículo cuando es necesario para el montaje correcto del equipo.",
    },
    {
      Icon: ShieldCheck,
      img: "/images/card2.png                             ",
      title: "Cotización Personalizada",
      text: "Te entregamos una propuesta de acuerdo con tu vehículo y tus necesidades.",
    },
  ],
  // 3. Mantenimiento y Servicio Técnico
  [
    {
      Icon: Wrench,
      img: "/images/Furgonetapollitos.png",
      title: "Mantenimiento Preventivo",
      text: "Revisiones periódicas para que tu equipo funcione sin fallas durante el recorrido.",
    },
    {
      Icon: Cpu,
      img: "/images/Diagnóstico_cpu.png",
      title: "Diagnóstico y Reparación",
      text: "Atención técnica para solucionar fallas en tus equipos de climatización.",
    },
    {
      Icon: Building2,
      img: "/images/Furgonetapollitos.png",
      title: "Atención en todo el Perú",
      text: "Servicio técnico especializado donde lo necesites.",
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
    <section id="servicios" className="py-20 md:py-24">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mb-12 grid gap-4 md:grid-cols-2 md:items-end md:gap-16">
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
            Ingeniería de climatización para vehículos
          </h2>
          <p className="max-w-md text-gray-600 md:justify-self-end">
            Fabricamos furgones a medida, reforzamos chasis y damos servicio
            técnico a equipos de aire acondicionado y refrigeración.
          </p>
        </div>

        {/* Grilla de servicios */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-md border border-steel bg-white transition-colors duration-300 hover:border-navy"
              >
                <div className="flex h-44 items-center justify-center bg-soft">
                  {serviceImages[i] ? (
                    <TiltImage src={serviceImages[i]} alt={s.title} />
                  ) : (
                    <Icon size={44} strokeWidth={1.4} className="text-navy" aria-hidden="true" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{s.text}</p>
                  <button
                    type="button"
                    onClick={() => setSelected({ ...s, Icon, index: i })}
                    className="mt-6 inline-flex items-center gap-1.5 self-start font-bold text-navy transition-colors hover:text-brand"
                  >
                    Ver especialidades
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
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
                <Image
                  src="/images/Logotipo1.webp"
                  alt="L&K Climate Systems S.A.C"
                  width={120}
                  height={80}
                  className="h-14 w-auto shrink-0 object-contain"
                />
                <div>
                  <h3
                    id="modal-title"
                    className="text-xl font-bold text-navy md:text-2xl"
                  >
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
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-md bg-brand px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95"
                >
                  <span className="relative z-10">
                    ¡Cotiza tu proyecto a medida!
                  </span>
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
