import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="bg-soft py-16">
      <div className="mx-auto grid w-[92%] max-w-6xl gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="rounded-xl bg-white p-6 shadow">
            <div className="mb-1 text-brand" aria-label="5 estrellas">★★★★★</div>
            <p>{t.text}</p>
            <footer className="mt-2 font-bold text-navy">{t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
