import Logo from "./Logo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {

  function IconoSvg({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ✏️ Tus redes sociales: cambia los links y borra las que no uses
const redes = [
  {
    nombre: "WhatsApp",
    url: "https://wa.me/519025891570",
    icono: <MessageCircle size={18} aria-hidden="true" />,
  },
  {
    nombre: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61591485725790&locale=es_LA",
    icono: (
      <IconoSvg>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </IconoSvg>
    ),
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/lykclimatesystemssac/",
    icono: (
      <IconoSvg>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </IconoSvg>
    ),
  },
];

// ✏️ Datos de contacto (ficticios: cámbialos por los reales)
const EMAIL = "lykclimatesystemssac@gmail.com";
const TELEFONO_VISIBLE = "+51 902 589 157";
const TELEFONO_LINK = "+51902589157"; // sin espacios
const DIRECCION = "Av. Industrial 123, Lima, Perú";

// Abre Google Maps buscando la dirección
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`;


  const col = "grid content-start gap-1";
  return (
    <footer className="bg-ink pb-14 pt-16 text-white">
      <div className="mx-auto grid w-[92%] max-w-6xl gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div className="grid content-start gap-4">
        <Logo light />
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} L&K Climate Systems. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap gap-3">
          {redes.map((r) => (
            <a
              key={r.nombre}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.nombre}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-brand hover:text-brand"
            >
              {r.icono}
            </a>
          ))}
        </div>
      </div>
        <div className={col}>
          <h4 className="font-bold"><a href="#inicio">Inicio</a></h4>
          <a href="#servicios">Servicios</a><a href="#flota">Nuestros Trabajos</a><a href="/contacto">Contacto</a>
        </div>
        <div className={col}>
        <h4 className="font-bold">Contáctanos</h4>
        <ul className="mt-2 grid gap-3 text-sm">
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-start gap-3 transition-colors hover:text-brand"
            >
              <Mail size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              <span className="break-all">{EMAIL}</span>
            </a>
          </li>
          <li>
            <a
              href={`tel:${TELEFONO_LINK}`}
              className="flex items-start gap-3 transition-colors hover:text-brand"
            >
              <Phone size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              <span>{TELEFONO_VISIBLE}</span>
            </a>
          </li>
        </ul>
      </div>
      </div>
      
    </footer>
  );
}
