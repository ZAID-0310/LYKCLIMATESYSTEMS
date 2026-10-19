import Image from "next/image";

export default function Logo({ scrolled = false }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/Logotipo1.png"
        alt=""
        width={120}
        height={50}
        priority
        className={`h-10 w-auto transition-all duration-300 md:h-14 ${
          scrolled ? "" : "brightness-0 invert"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight md:text-2xl">
          L&amp;K <span className="text-brand">Climate</span>
        </span>
        <span className="mt-1 text-[11px] font-medium tracking-[0.25em] md:text-sm">
          SYSTEMS S.A.C
        </span>
      </span>
    </span>
  );
}