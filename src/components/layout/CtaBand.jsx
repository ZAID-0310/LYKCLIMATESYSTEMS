import Image from "next/image";

const WHATSAPP =
  "https://wa.me/51902589157?text=Hola,%20vengo%20de%20su%20p%C3%A1gina,%20quisiera%20una%20cotizaci%C3%B3n";

export default function CtaBand() {
  return (
    // Mitad de arriba = color de la sección anterior (soft), mitad de abajo = color del footer (ink)
    <section className="bg-gradient-to-b from-white from-50% to-ink to-50%">
      <div className="relative mx-auto w-[92%] max-w-5xl overflow-hidden rounded-md">
        {/* Foto de fondo */}
        <Image
          src="/images/Tecnicoreparando.jpg"
          alt=""
          fill
          sizes="(min-width: 1152px) 1152px, 92vw"
          className="object-cover object-[50%_30%]"
        />
        {/* Capa de color: azul a la izquierda (donde va el texto) y naranja a la derecha */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-brand/80"
        />

        <div className="relative flex flex-col gap-5 px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-12 md:py-8">
          <div>
            <p className="text-base text-white/85">¿Necesitas climatizar tu vehículo?</p>
            <h2 className="mt-1 max-w-lg text-2xl font-semibold leading-tight md:text-3xl">
              Te asesoramos, instalamos y damos mantenimiento.
            </h2>
          </div>

          <a
            href={WHATSAPP}
            className="group inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-md bg-ink px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-ink active:scale-95 md:self-auto"
          >
            Cotizar
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
