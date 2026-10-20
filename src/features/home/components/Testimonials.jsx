import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-3xl font-extrabold text-ink md:text-4xl">Lo que dicen nuestros clientes</h2>
        <div className="grid gap-px overflow-hidden rounded-md border border-steel bg-steel md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="bg-white p-8">
              <p className="text-lg leading-relaxed text-ink">{t.text}</p>
              <footer className="mt-5 text-sm font-semibold text-navy">{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
