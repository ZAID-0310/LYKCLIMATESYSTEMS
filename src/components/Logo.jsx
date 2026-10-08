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
        className={`h-8 w-auto transition-all duration-300 md:h-10 ${
          scrolled ? "" : "brightness-0 invert"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight md:text-lg">
          L&amp;K <span className="text-brand">Climate</span>
        </span>
        <span className="mt-1 text-[10px] font-medium tracking-[0.25em] md:text-xs">
          SYSTEMS S.A.C
        </span>
      </span>
    </span>
  );
}