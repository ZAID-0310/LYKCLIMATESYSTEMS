import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Contact from "./components/Contact";

// ✏️ Datos de contacto (el correo, la dirección y el horario son ficticios: cámbialos)
const EMAIL = "lykclimatesystemssac@gmail.com";
const TELEFONO_VISIBLE = "+51 902 589 157";
const TELEFONO_LINK = "+51902589157"; // sin espacios
const DIRECCION = "Av. Industrial 123, Lima, Perú";
const HORARIO = "Lunes a viernes · 8:00 a. m. a 6:00 p. m.";

// Abre Google Maps buscando la dirección
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`;

const tarjetas = [
  {
    icono: Phone,
    titulo: "Teléfono",
    texto: TELEFONO_VISIBLE,
    href: `tel:${TELEFONO_LINK}`,
  },
  {
    icono: Mail,
    titulo: "Correo",
    texto: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icono: Clock,
    titulo: "Horario de atención",
    texto: HORARIO,
  },
];

export default function ContactoPage() {
  return (
    <main>
      {/* Franja oscura de arriba: así el navbar se lee bien desde el inicio */}
      <section className="bg-navy-dark pb-12 pt-28 text-center text-white">
        <div className="mx-auto w-[92%] max-w-6xl">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">Contáctanos</h1>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Cuéntanos qué necesitas y te respondemos por WhatsApp.
          </p>
        </div>
      </section>

      {/* Datos de contacto */}
      <section className="py-12">
                <div className="mx-auto flex w-[92%] max-w-6xl flex-wrap justify-center gap-5">
          {tarjetas.map(({ icono: Icono, titulo, texto, href, externo }) => {
            const clase =
                            "flex w-full flex-col items-center rounded-xl border border-navy/10 bg-white p-6 text-center shadow-sm sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]";
            const contenido = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icono size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-bold text-navy">{titulo}</h2>
                <p className="mt-1 break-words text-sm text-gray-600">{texto}</p>
              </>
            );

            return href ? (
              <a
                key={titulo}
                href={href}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                className={`${clase} transition hover:-translate-y-1 hover:shadow-lg`}
              >
                {contenido}
              </a>
            ) : (
              <div key={titulo} className={clase}>
                {contenido}
              </div>
            );
          })}
        </div>
      </section>

      {/* Formulario + mapa */}
      <Contact />

      {/* Enlace a preguntas frecuentes */}
      <section className="py-12 text-center">
        <p className="mb-4 font-semibold text-navy">¿Tienes dudas antes de escribirnos?</p>
        <Button href="/preguntas-frecuentes">Ver preguntas frecuentes</Button>
      </section>
    </main>
  );
}