"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// ✏️ Número de WhatsApp de la empresa (con código de país, sin + ni espacios)
const WHATSAPP_NUMBER = "51902589157";

// ✏️ Opciones del selector "Tipo de servicio"
const servicios = [
  "Furgón para pollitos bebé",
  "Cadena de frío y perecibles",
  "Furgón climatizado a medida",
  "Modificación y adaptación de chasis",
  "Mantenimiento y reparación",
  "Otro",
];

// Estilo base de los campos (sin redondeo: cada campo pone el suyo)
// text-base en celular evita que iPhone haga zoom al tocar el campo
const field =
  "w-full bg-white px-5 py-3 text-base text-navy shadow-md outline-none transition placeholder:text-gray-500 focus:ring-4 focus:ring-brand/40 md:text-sm";

export default function Contact() {
  const [waUrl, setWaUrl] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const lineas = [
      "¡Hola! Quisiera solicitar un presupuesto.",
      "",
      `*Nombre:* ${data.nombre.trim()}`,
      `*Email:* ${data.email.trim()}`,
    ];

    // Teléfono (solo si escribió algo además del +51)
    const telefono = (data.telefono || "").trim();
    if (telefono.replace(/\D/g, "").length > 2) {
      lineas.push(`*Teléfono:* ${telefono}`);
    }

    lineas.push(`*Tipo de servicio:* ${data.tipo}`);

    const detalles = (data.detalles || "").trim();
    if (detalles) lineas.push(`*Detalles:* ${detalles}`);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contacto" className="bg-navy py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold uppercase text-white">
          Formulario de contacto
        </h2>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {/* Tarjeta oscura redondeada */}
          <form
            onSubmit={onSubmit}
            className="grid content-start gap-3 rounded-3xl bg-navy-dark p-5 shadow-2xl ring-1 ring-white/10 md:p-6"
          >
            <input
              name="nombre"
              placeholder="Nombre"
              required
              aria-label="Nombre"
              className={`${field} rounded-full`}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              aria-label="Email"
              className={`${field} rounded-full`}
            />

            {/* ---- Teléfono con bandera (opcional: borra este bloque si no lo quieres) ---- */}
            <div className="flex gap-3">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-md md:h-11 md:w-11"
                title="Perú"
              >
                <svg
                  viewBox="0 0 3 2"
                  className="h-4 w-6 overflow-hidden rounded-sm"
                  aria-label="Bandera de Perú"
                >
                  <rect width="3" height="2" fill="#D91023" />
                  <rect x="1" width="1" height="2" fill="#fff" />
                </svg>
              </span>
              <input
                name="telefono"
                type="tel"
                inputMode="tel"
                defaultValue="+51 "
                placeholder="+51 999 999 999"
                aria-label="Teléfono"
                className={`${field} rounded-full`}
              />
            </div>
            {/* ---- Fin del bloque de teléfono ---- */}

            {/* Selector con flecha propia */}
            <div className="relative">
              <select
                name="tipo"
                aria-label="Tipo de servicio"
                defaultValue=""
                required
                className={`${field} cursor-pointer appearance-none rounded-full pr-12 invalid:text-gray-500`}
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {servicios.map((s) => (
                  <option key={s} className="text-navy">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-navy"
              />
            </div>

            {/* Mensaje: esquinas redondeadas pero sin forma de píldora */}
            <textarea
              name="detalles"
              rows={3}
              maxLength={600}
              placeholder="Mensaje"
              aria-label="Mensaje"
              className={`${field} resize-none rounded-2xl`}
            />

            {/* Botón en píldora con el efecto de deslizamiento */}
            <button
              type="submit"
              onTouchStart={() => {}}
              className="group relative flex items-center justify-center overflow-hidden rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-brand/50 active:scale-95 sm:w-fit"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-navy group-active:text-navy">
                Solicitar presupuesto por WhatsApp
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
            </button>

            {waUrl && (
              <p role="status" className="text-sm text-white/80">
                Se abrió WhatsApp con tu mensaje. Si no se abrió,{" "}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline"
                >
                  toca aquí
                </a>
                .
              </p>
            )}
          </form>

          {/* Mapa con las mismas esquinas redondeadas */}
          <iframe
            title="Mapa de cobertura"
            loading="lazy"
            className="min-h-64 w-full rounded-3xl border-0 shadow-2xl md:h-full"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-77.1%2C-12.2%2C-76.9%2C-12.0&layer=mapnik"
          />
        </div>
      </div>
    </section>
  );
}