"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlurInText from "./BlurInText";

const STEP = 0.015;
const count = (t) => t.replace(/ /g, "").length;

const line1 = "Soluciones de transporte";
const line2 = "rápidas y fiables con";
const line3 = "furgones";

const d1 = 0.1;
const d2 = d1 + count(line1) * STEP;
const d3 = d2 + count(line2) * STEP;

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh w-full flex-col overflow-hidden bg-navy pt-24 md:flex-row md:items-center md:pt-16"
    >
      {/* 1. Imagen: debajo del texto en celular, a la derecha en PC */}
      <div className="relative order-2 mt-6 min-h-[240px] w-full flex-1 md:absolute md:inset-y-0 md:right-0 md:order-none md:mt-0 md:min-h-0 md:w-3/4 md:flex-none">
        <Image
          src="/images/hero-truck.png"
          alt="Camión FurgoTrans"
          fill
          priority
          className="object-cover object-right [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_35%,black_100%)]"
        />
      </div>

      {/* 2. Contenido */}
      <div className="container relative z-10 order-1 mx-auto w-full px-4 md:order-none">
        <div className="max-w-xl text-white">
          <h1
            aria-label={`${line1} ${line2} ${line3}`}
            className="text-3xl md:text-5xl font-bold leading-tight"
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
            <BlurInText
              text={line3}
              className="block text-brand"
              delayOffset={d3}
              step={STEP}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease }}
            className="mt-4 text-gray-200"
          >
            Servicios de logística eficientes para particulares y empresas con
            una flota de furgonetas modernas y conductores profesionales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease }}
            className="mt-6"
          >
            <a
              href="#contacto"
              onTouchStart={() => {}}
              className="group relative inline-flex items-center overflow-hidden rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-navy group-active:text-navy">
                ¡Reserva tu furgón ahora!
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
            </a>
          </motion.div>

          <motion.small
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="block mt-3 text-sm text-gray-300"
          >
            Atención 24/7. Cobertura nacional.
          </motion.small>
        </div>
      </div>
    </section>
  );
}