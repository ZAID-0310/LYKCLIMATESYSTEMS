"use client";

import Image from "next/image";
import Link from "next/link"; // <-- 1. Importar Link de Next.js
import { motion } from "framer-motion";
import BlurInText from "./BlurInText";
import TrustBar from "./TrustBar";
import useAppLoaded from "@/hooks/useAppLoaded";
import { ArrowRight } from "lucide-react";

const STEP = 0.015;
const count = (t) => t.replace(/ /g, "").length;

const line1 = "Instalación y mantenimiento";
const line2 = "de equipos climatizados";

const d1 = 0.1;
const d2 = d1 + count(line1) * STEP;

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const loaded = useAppLoaded();
  return (
    <>
      <section
        id="inicio"
        className="relative flex min-h-svh w-full flex-col overflow-hidden bg-navy pt-24 md:flex-row md:items-center md:pt-24"
      >
        {/* imagen debajo del texto en celular, a la derecha en PC */}
        <div className="reveal-zoom origin-center md:origin-right relative order-2 mt-6 min-h-[240px] w-full flex-1 md:absolute md:inset-y-0 md:right-0 md:order-none md:mt-0 md:min-h-0 md:w-[78%] md:flex-none">
          <Image
            src="/images/contact-image.webp"
            alt="Furgón climatizado de L&K Climate Systems"
            fill
            priority
            className="object-cover object-right [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_35%,black_100%)]"
          />
        </div>

        {/* contenido */}
        <div className="relative z-10 order-1 w-full px-5 sm:px-8 lg:px-[4.2vw] 2xl:px-24 md:order-none">
          <div className="max-w-[680px] text-white lg:max-w-[760px] 2xl:max-w-[850px]">
            <h1
              aria-label={`${line1} ${line2}`}
              className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[clamp(3rem,3.4vw,4.5rem)]"
            >
              <BlurInText
                text={line1}
                className="block"
                delayOffset={d1}
                step={STEP}
              />
              <BlurInText
                text={line2}
                className="block"
                delayOffset={d2}
                step={STEP}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.05, ease }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-gray-200"
            >
              Asesoría, instalación y soporte técnico con tecnología alemana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.12, ease }}
              className="mt-6"
            >
              {/* 2. Reemplazo de <a> por <Link> con href="/nosotros/" */}
              <Link
                href="/nosotros/"
                onTouchStart={() => {}}
                className="group relative inline-flex items-center overflow-hidden rounded-md bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-navy group-active:text-navy">
                  Ver más
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
              </Link>
            </motion.div>

            
          </div>
        </div>
      </section>
      <TrustBar />
    </>
  );
}