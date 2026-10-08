export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      {/* Ícono de camión: el color del cuerpo se hereda del header */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto md:h-8" aria-hidden="true">
        {/* Caja de carga */}
        <rect x="0" y="4" width="28" height="19" rx="2.5" fill="currentColor" />
        {/* Cabina con ventana recortada */}
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M30 10h9l7 7v6H30zM33 12.5h4.5l3 3.5H33z"
        />
        {/* Ruedas */}
        <circle cx="10" cy="25" r="4.5" className="fill-brand" />
        <circle cx="38" cy="25" r="4.5" className="fill-brand" />
        <circle cx="10" cy="25" r="1.6" fill="currentColor" />
        <circle cx="38" cy="25" r="1.6" fill="currentColor" />
      </svg>

      {/* Texto */}
      <span className="text-lg font-extrabold tracking-tight md:text-xl">
        Furgo<span className="text-brand">Trans</span>
      </span>
    </span>
  );
}