"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";

// Número de WhatsApp de la empresa (con código de país, sin + ni espacios)
const WHATSAPP_NUMBER = "51902589157";
const TELEFONO_LINK = "+51902589157";

const SERVICIO_INSTALACION = "Instalación de equipo climatizado";
const SERVICIO_POLLITOS = "Climatización para pollitos bebé";
const SERVICIO_OTRO = "Otro";

// Opciones del selector "Tipo de servicio"
const servicios = [
  SERVICIO_INSTALACION,
  SERVICIO_POLLITOS,
  "Asesoría para mi vehículo",
  "Modificación y adaptación de chasis",
  "Mantenimiento y reparación",
  SERVICIO_OTRO,
];

// Estilo base de los campos (cada campo pone su redondeo)
// text-base en celular evita que iPhone haga zoom al tocar el campo
const field =
  "w-full bg-white px-5 py-3 text-base text-navy shadow-md outline-none transition placeholder:text-gray-500 focus:ring-4 focus:ring-brand/40 md:text-sm";
const fieldError = "ring-2 ring-red-400";

// Etiqueta visible + campo + mensaje de error
function Campo({ id, label, error, opcional, children }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="px-2 text-sm font-semibold text-white/90">
        {label}
        {opcional && <span className="font-normal text-white/60"> (opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="px-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [tipo, setTipo] = useState("");
  const [errores, setErrores] = useState({});
  const [waUrl, setWaUrl] = useState("");
  const [abriendo, setAbriendo] = useState(false);

  const pideVehiculo = tipo !== "" && tipo !== SERVICIO_OTRO;
  const pideUnidades = tipo === SERVICIO_INSTALACION || tipo === SERVICIO_POLLITOS;
  const pidePollitos = tipo === SERVICIO_POLLITOS;

  function validar(data) {
    const e = {};
    if (!(data.nombre || "").trim()) e.nombre = "Escribe tu nombre.";

    const telefono = (data.telefono || "").trim();
    const email = (data.email || "").trim();
    // +51 + 9 dígitos = 11 dígitos en total
    const telefonoValido = telefono.replace(/\D/g, "").length >= 11;
    const emailValido = /^\S+@\S+\.\S+$/.test(email);

    if (!telefonoValido && !emailValido) {
      e.telefono = "Déjanos un teléfono o un email para responderte.";
    }
    if (email && !emailValido) e.email = "Revisa el email: parece incompleto.";
    if (!data.tipo) e.tipo = "Elige el tipo de servicio.";
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget));

    const e = validar(data);
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      document.getElementById(primero)?.focus();
      return;
    }

    const lineas = ["¡Hola! Quisiera solicitar un presupuesto.", ""];
    lineas.push(`*Nombre:* ${data.nombre.trim()}`);

    const telefono = (data.telefono || "").trim();
    if (telefono.replace(/\D/g, "").length >= 11) lineas.push(`*Teléfono:* ${telefono}`);

    const email = (data.email || "").trim();
    if (email) lineas.push(`*Email:* ${email}`);

    lineas.push(`*Tipo de servicio:* ${data.tipo}`);

    const extra = [
      ["Vehículo", data.vehiculo],
      ["Unidades", data.unidades],
      ["Cantidad aproximada de pollitos", data.pollitos],
      ["Ciudad o región", data.ciudad],
      ["Detalles", data.detalles],
    ];
    for (const [nombre, valor] of extra) {
      const v = (valor || "").trim();
      if (v) lineas.push(`*${nombre}:* ${v}`);
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
    setWaUrl(url);
    setAbriendo(true);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setAbriendo(false), 2000);
  }

  const aria = (id) => ({
    "aria-invalid": errores[id] ? true : undefined,
    "aria-describedby": errores[id] ? `${id}-error` : undefined,
  });

  return (
    <section id="contacto" className="bg-white py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-bold uppercase text-navy">
          Formulario de contacto
        </h2>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {/* Tarjeta oscura redondeada */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid content-start gap-4 rounded-3xl bg-navy-dark p-6 shadow-2xl ring-1 ring-white/10 md:p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white">Cuéntanos qué necesitas</h3>
              <p className="mt-1 text-sm text-white/70">
                Al enviar, se abre WhatsApp con tu mensaje listo para mandarnos.
              </p>
            </div>

            <Campo id="nombre" label="Nombre" error={errores.nombre}>
              <input
                id="nombre"
                name="nombre"
                autoComplete="name"
                placeholder="Tu nombre"
                className={`${field} rounded-full ${errores.nombre ? fieldError : ""}`}
                {...aria("nombre")}
              />
            </Campo>

            <Campo id="telefono" label="Teléfono" error={errores.telefono}>
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
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  defaultValue="+51 "
                  placeholder="+51 999 999 999"
                  className={`${field} rounded-full ${errores.telefono ? fieldError : ""}`}
                  {...aria("telefono")}
                />
              </div>
            </Campo>

            <Campo id="email" label="Email" opcional error={errores.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                className={`${field} rounded-full ${errores.email ? fieldError : ""}`}
                {...aria("email")}
              />
            </Campo>

            <Campo id="tipo" label="Tipo de servicio" error={errores.tipo}>
              <div className="relative">
                <select
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className={`${field} cursor-pointer appearance-none rounded-full pr-12 ${
                    tipo === "" ? "text-gray-500" : ""
                  } ${errores.tipo ? fieldError : ""}`}
                  {...aria("tipo")}
                >
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
                  {servicios.map((s) => (
                    <option key={s} value={s} className="text-navy">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-navy"
                  aria-hidden="true"
                />
              </div>
            </Campo>

            {/* Campos que aparecen según el servicio elegido */}
            {pideVehiculo && (
              <Campo id="vehiculo" label="Vehículo" opcional>
                <input
                  id="vehiculo"
                  name="vehiculo"
                  placeholder="Marca y modelo. Ej.: Hyundai H100"
                  className={`${field} rounded-full`}
                />
              </Campo>
            )}

            {(pideUnidades || pidePollitos) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {pideUnidades && (
                  <Campo id="unidades" label="Unidades" opcional>
                    <input
                      id="unidades"
                      name="unidades"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      placeholder="Ej.: 2"
                      className={`${field} rounded-full`}
                    />
                  </Campo>
                )}
                {pidePollitos && (
                  <Campo id="pollitos" label="Cantidad de pollitos" opcional>
                    <input
                      id="pollitos"
                      name="pollitos"
                      inputMode="numeric"
                      placeholder="Aproximada por viaje"
                      className={`${field} rounded-full`}
                    />
                  </Campo>
                )}
              </div>
            )}

            <Campo id="ciudad" label="Ciudad o región" opcional>
              <input
                id="ciudad"
                name="ciudad"
                autoComplete="address-level2"
                placeholder="Donde está tu vehículo o proyecto"
                className={`${field} rounded-full`}
              />
            </Campo>

            <Campo id="detalles" label="Mensaje" opcional>
              <textarea
                id="detalles"
                name="detalles"
                rows={3}
                maxLength={600}
                placeholder="Cuéntanos lo que necesites"
                className={`${field} resize-none rounded-2xl`}
              />
            </Campo>

            {/* Botón en píldora con el efecto de deslizamiento */}
            <button
              type="submit"
              disabled={abriendo}
              onTouchStart={() => {}}
              className="group relative mt-1 flex items-center justify-center overflow-hidden rounded-full bg-brand px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand/30 transition-all duration-300 hover:shadow-brand/50 active:scale-95 disabled:opacity-70 sm:w-fit"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-navy group-active:text-navy">
                {abriendo ? "Abriendo WhatsApp…" : "Solicitar presupuesto por WhatsApp"}
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

          {/* Imagen con contacto directo encima */}
          <div className="relative min-h-80 w-full overflow-hidden rounded-3xl shadow-2xl md:min-h-0">
            <Image
              src="/images/camion-climatizado-2.png"
              alt="Técnico instalando un equipo de climatización en un furgón"
              fill
              sizes="(min-width: 768px) 50vw, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="text-lg font-bold">¿Prefieres hablar directamente?</p>
              <p className="mt-1 text-sm text-white/80">Atención en todo el Perú.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hola, vengo de su página y quisiera hacer una consulta."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Escribir por WhatsApp
                </a>
                <a
                  href={`tel:${TELEFONO_LINK}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-white/90"
                >
                  <Phone size={18} aria-hidden="true" />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}