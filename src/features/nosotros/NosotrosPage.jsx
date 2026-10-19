import {
  quienesSomos,
  historia,
  mision,
  vision,
  compromisos,
  cifras,
  equipo,
} from "@/data/nosotros";

export default function NosotrosPage() {
  return (
    <main>
      {/* Franja oscura de arriba: así el navbar se lee bien desde el inicio */}
      <section className="bg-navy-dark pb-12 pt-28 text-center text-white">
        <div className="mx-auto w-[92%] max-w-6xl">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">Nosotros</h1>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Las personas y el trabajo detrás de cada furgón climatizado.
          </p>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid w-[92%] max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">Quiénes somos</h2>
            <div className="mt-5 grid gap-4 leading-relaxed text-gray-600">
              {quienesSomos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <img
            src="/images/Furgonetapollitos.png"
            alt="Furgoneta climatizada para el traslado de pollitos bebé"
            className="w-full rounded-2xl object-cover shadow-lg"
            loading="lazy"
          />
        </div>
      </section>

      {/* Historia */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto w-[92%] max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy md:text-3xl">{historia.titulo}</h2>
          <div className="mt-5 grid gap-4 leading-relaxed text-gray-600">
            {historia.texto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid w-[92%] max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-navy-dark p-8 text-white">
            <h2 className="text-xl font-bold">Misión</h2>
            <p className="mt-3 leading-relaxed text-white/80">{mision}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-navy">Visión</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{vision}</p>
          </div>
        </div>
      </section>

      {/* Cifras (solo si hay datos) */}
      {cifras.length > 0 && (
        <section className="bg-ink py-12 text-white">
          <dl className="mx-auto grid w-[92%] max-w-6xl gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
            {cifras.map((c) => (
              <div key={c.etiqueta}>
                <dt className="sr-only">{c.etiqueta}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold text-brand">{c.valor}</span>
                  <span className="mt-1 block text-sm text-white/70">{c.etiqueta}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Compromisos */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[92%] max-w-6xl">
          <h2 className="text-2xl font-extrabold text-navy md:text-3xl">Cómo trabajamos</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {compromisos.map((c) => (
              <div key={c.titulo} className="border-l-4 border-brand pl-5">
                <h3 className="text-lg font-bold text-navy">{c.titulo}</h3>
                <p className="mt-1 text-gray-600">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo (solo si hay datos) */}
      {equipo.length > 0 && (
        <section className="bg-soft py-16 md:py-20">
          <div className="mx-auto w-[92%] max-w-6xl">
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">El equipo</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {equipo.map((p) => (
                <figure key={p.nombre} className="rounded-2xl bg-white p-6 shadow-sm">
                  <figcaption className="font-bold text-navy">
                    {p.nombre}
                    <span className="block text-sm font-normal text-gray-500">{p.cargo}</span>
                  </figcaption>
                  {p.frase && <blockquote className="mt-3 text-gray-600">{p.frase}</blockquote>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}