import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { preguntas } from "@/data/faq";

// Datos estructurados para buscadores (FAQPage)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map((p) => ({
    "@type": "Question",
    name: p.pregunta,
    acceptedAnswer: { "@type": "Answer", text: p.respuesta },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Franja oscura de arriba: así el navbar se lee bien desde el inicio */}
      <section className="bg-navy-dark pb-12 pt-28 text-center text-white">
        <div className="mx-auto w-[92%] max-w-6xl">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">Preguntas frecuentes</h1>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Resolvemos las dudas más comunes sobre nuestros furgones y servicios.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-[92%] max-w-3xl">
          <div className="grid gap-3">
            {preguntas.map((p) => (
              <details
                key={p.pregunta}
                className="group rounded-xl border border-navy/10 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {p.pregunta}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-brand transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-gray-600">{p.respuesta}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 font-semibold text-navy">¿No encontraste tu respuesta?</p>
            <Button href="/#contacto">Escríbenos</Button>
          </div>
        </div>
      </section>
    </main>
  );
}