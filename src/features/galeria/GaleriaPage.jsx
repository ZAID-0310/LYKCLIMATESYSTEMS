import Image from "next/image";
import { fotos } from "@/data/galeria";
// ✏️ Fotos de la galería (deben estar en public/images/)

export default function GaleriaPage() {
  return (
    <main>
      {/* Franja oscura de arriba: así el navbar se lee bien desde el inicio */}
      <section className="bg-navy-dark pb-12 pt-28 text-center text-white">
        <div className="mx-auto w-[92%] max-w-6xl">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">Galería</h1>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Conoce nuestros furgones y trabajos realizados.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid w-[92%] max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((f) => (
            <div
              key={f.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-soft shadow"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}