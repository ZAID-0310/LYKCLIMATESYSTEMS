"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

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

const field = "w-full rounded-md bg-white p-3";

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
      `*Tipo de servicio:* ${data.tipo}`,
    ];
    const detalles = (data.detalles || "").trim();
    if (detalles) lineas.push(`*Detalles:* ${detalles}`);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contacto" className="bg-navy py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-white">Formulario de contacto</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-3">
            <input name="nombre" placeholder="Nombre" required aria-label="Nombre" className={field} />
            <input name="email" type="email" placeholder="Email" required aria-label="Email" className={field} />
            <select name="tipo" aria-label="Tipo de servicio" defaultValue="" required className={field}>
              <option value="" disabled>Tipo de servicio</option>
              {servicios.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <textarea name="detalles" rows={4} maxLength={600} placeholder="Detalles" aria-label="Detalles" className={field} />
            <Button type="submit">Solicitar presupuesto por WhatsApp</Button>

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
          <iframe
            title="Mapa de cobertura"
            loading="lazy"
            className="min-h-72 w-full rounded-lg border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-77.1%2C-12.2%2C-76.9%2C-12.0&layer=mapnik"
          />
        </div>
      </div>
    </section>
  );
}