"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  Sofa,
  Timer,
  ArrowRight,
  Boxes,
  Store,
  Globe,
  Home,
  Building2,
  Truck,
  Zap,
  Clock,
  CalendarClock,
} from "lucide-react";
import { services } from "@/data/content";

// Un ícono por servicio, en el mismo orden que tu content.js
const icons = [Package, Sofa, Timer];

// Tres tipos por servicio, en el mismo orden que tu content.js
// (1. Transporte de Mercancías, 2. Mudanzas y Portes, 3. Entregas Express)
const typesByService = [
  // 1. Transporte de Mercancías
  [
    {
      Icon: Boxes,
      title: "Carga general",
      text: "Traslado de mercadería en cajas, pallets o bultos entre almacenes, tiendas y clientes.",
    },
    {
      Icon: Store,
      title: "Distribución para negocios",
      text: "Entregas programadas a tiendas, bodegas y puntos de venta, con rutas y horarios acordados.",
    },
    {
      Icon: Globe,
      title: "Transporte nacional",
      text: "Envío de mercadería a otras ciudades del país en furgón, con entrega coordinada.",
    },
  ],
  // 2. Mudanzas y Portes
  [
    {
      Icon: Home,
      title: "Mudanza de hogar",
      text: "Traslado de muebles, electrodomésticos y cajas, con personal de apoyo para cargar y descargar.",
    },
    {
      Icon: Building2,
      title: "Mudanza de oficina",
      text: "Mudamos escritorios, equipos y archivos en horarios flexibles para que tu empresa no pare.",
    },
    {
      Icon: Truck,
      title: "Portes y fletes",
      text: "Traslado de un mueble, un electrodoméstico o pocos bultos, sin pagar una mudanza completa.",
    },
  ],
  // 3. Entregas Express
  [
    {
      Icon: Zap,
      title: "Express el mismo día",
      text: "Recogemos y entregamos tu pedido en el día, con seguimiento durante el trayecto.",
    },
    {
      Icon: Clock,
      title: "Entrega urgente",
      text: "Para envíos que no pueden esperar: salida inmediata y ruta directa al destino.",
    },
    {
      Icon: CalendarClock,
      title: "Entrega programada",
      text: "Eliges el día y la franja horaria, y nosotros llegamos puntuales.",
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

  // Si el servicio trae sus propios "types" en content.js, usa esos
  const types = selected
    ? (selected.types ?? typesByService[selected.index] ?? [])
    : [];

  return (
    <section id="servicios" className="py-20">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-2xl font-bold uppercase text-navy md:text-3xl">
            Nuestros servicios
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mt-4 text-gray-600">
            Soluciones de transporte para cada necesidad, con furgones propios y
            conductores profesionales.
          </p>
        </div>

        {/* Servicios */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-gray-200">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={s.title} className="group text-center md:px-10">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-navy/5 text-navy ring-1 ring-navy/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-navy group-hover:text-white group-hover:ring-brand">
                  <Icon size={34} strokeWidth={1.6} />
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

      {/* Modal */}
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
              className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-soft text-navy transition-colors hover:bg-gray-200"
              >
                ✕
              </button>

              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 text-navy">
                <selected.Icon size={28} strokeWidth={1.6} />
              </div>
              <h3
                id="modal-title"
                className="pr-10 text-2xl font-bold text-navy"
              >
                {selected.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{selected.text}</p>

              <h4 className="mb-3 mt-6 text-sm font-bold text-navy">
                Tipos de servicio
              </h4>
              <ul className="space-y-3">
                {types.map((t) => (
                  <li
                    key={t.title}
                    className="flex gap-3 rounded-xl border border-gray-200 bg-soft p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand ring-1 ring-gray-200">
                      <t.Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-bold text-navy">{t.title}</p>
                      <p className="mt-0.5 text-sm text-gray-600">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                onClick={() => setSelected(null)}
                onTouchStart={() => {}}
                className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-lg bg-brand px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95"
              >
                <span className="relative z-10">¡Reserva tu furgón ahora!</span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
