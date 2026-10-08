"use client";
import { useState } from "react";
import Button from "./Button";

const field = "w-full rounded-md bg-white p-3";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Solicitud:", data); // TODO: enviar a tu API / servicio de email
    setSent(true);
  }

  return (
    <section id="contacto" className="bg-navy py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-white">Formulario de contacto</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={onSubmit} className="grid gap-3">
            <input name="nombre" placeholder="Nombre" required aria-label="Nombre" className={field} />
            <input name="email" type="email" placeholder="Email" required aria-label="Email" className={field} />
            <div className="grid grid-cols-2 gap-3">
              <input name="telefono" type="tel" placeholder="Teléfono" aria-label="Teléfono" className={field} />
              <select name="tipo" aria-label="Tipo de servicio" defaultValue="" className={field}>
                <option value="" disabled>Tipo de servicio</option>
                <option>Transporte de mercancías</option>
                <option>Mudanza</option>
                <option>Entrega express</option>
              </select>
            </div>
            <textarea name="detalles" rows={4} placeholder="Detalles" aria-label="Detalles" className={field} />
            <Button type="submit">{sent ? "¡Solicitud enviada!" : "Solicitar presupuesto gratis"}</Button>
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
