"use client";

import { motion, useReducedMotion } from "framer-motion";

// Anima letra por letra con desenfoque. Cada palabra va en un bloque
// indivisible para que el salto de línea no la corte.
export default function BlurInText({
  text = "",
  className = "",
  delayOffset = 0,
  step = 0.04, // segundos entre letras
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let charCount = 0;

  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
          {word.split("").map((char, ci) => {
            const delay = delayOffset + charCount * step;
            charCount++;
            return (
              <motion.span
                key={ci}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay, duration: 0.8, ease: "easeOut" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}