"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function TiltImage({ src, alt }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Posición del puntero dentro de la imagen: de -0.5 a 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);

  function onMove(e) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerUp={onLeave}
      className="relative h-28 w-48"
      style={{ perspective: 800 }}
    >
      {/* Sombra en el suelo */}
      <div className="absolute bottom-0 left-1/2 h-3 w-3/5 -translate-x-1/2 rounded-full bg-black/25 blur-md" />

      {/* Imagen que se inclina y flota */}
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="192px"
          className="object-contain drop-shadow-xl"
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>
    </div>
  );
}