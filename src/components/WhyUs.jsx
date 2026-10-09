import { reasons } from "@/data/content";

export default function WhyUs() {
  return (
    <section id="nosotros" className="bg-soft py-16 md:py-20">
      <div className="mx-auto w-[92%] max-w-6xl">
        {/* Encabezado */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-bold uppercase text-navy md:text-3xl">
            ¿Por qué elegir L&K Climate Systems?
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
        </div>

        {/* Grilla balanceada: 1 col en celular, 2 en tablet y 3 en escritorio (3x2 = 6 perfecto) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-2xl ring-1 ring-navy/10"
                aria-hidden="true"
              >
                {r.icon}
              </span>
              <div>
                <h3 className="font-bold text-navy">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}