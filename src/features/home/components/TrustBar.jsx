import { Cpu, ShieldCheck, MapPin } from "lucide-react";

const items = [
  { Icon: Cpu, title: "Tecnología alemana", text: "Equipos térmicos de alta precisión" },
  { Icon: ShieldCheck, title: "Garantía y soporte técnico", text: "Instalación, mantenimiento y repuestos" },
  { Icon: MapPin, title: "Atención en todo el Perú", text: "Agro, logística e industria" },
];

export default function TrustBar() {
  return (
    <section aria-label="Respaldo" className="bg-ink text-white">
      <ul className="mx-auto grid w-[92%] max-w-6xl divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-center gap-4 py-5 md:px-8 md:first:pl-0 md:last:pr-0">
            <Icon size={28} strokeWidth={1.5} className="shrink-0 text-brand" aria-hidden="true" />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-white/65">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
