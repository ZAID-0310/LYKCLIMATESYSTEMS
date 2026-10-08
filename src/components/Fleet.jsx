import { fleet } from "@/data/content";
import Button from "./Button";

export default function Fleet() {
  return (
    <section id="flota" className="py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-navy">Nuestra flota</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {fleet.map((f) => (
            <article key={f.name} className="rounded-xl bg-white p-5 text-center shadow-md">
              <div className="mb-3 rounded-lg bg-soft py-4 text-6xl" aria-hidden="true">🚐</div>
              <h3 className="font-bold text-navy">{f.name}</h3>
              <p className="mb-4 mt-1 text-sm text-gray-600">{f.size}<br />{f.load}</p>
              <Button href="#contacto" small>Ver detalles</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
