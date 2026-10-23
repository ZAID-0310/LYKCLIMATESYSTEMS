"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

const MIN_MS = 900;  // tiempo mínimo que se ve la pantalla blanca
const MAX_MS = 3500; // tope: si la página tarda más, se quita igual
const CLAVE = "preloader-visto";

export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    // Si ya se mostró en esta sesión, no volver a mostrarlo
    let yaVisto = false;
    try {
      yaVisto = sessionStorage.getItem(CLAVE) === "1";
    } catch {}
    if (yaVisto) {
      root.classList.add("loaded");
      setVisible(false);
      return;
    }

    const start = Date.now();
    let closed = false;

    root.style.overflow = "hidden"; // sin scroll mientras carga

    const close = () => {
      if (closed) return;
      closed = true;
      root.style.overflow = "";
      root.classList.add("loaded");
      try {
        sessionStorage.setItem(CLAVE, "1");
      } catch {}
      window.dispatchEvent(new Event("app:loaded"));
      setVisible(false);
    };

    // Espera a que cargue la página, pero respetando el tiempo mínimo
    const finish = () => setTimeout(close, Math.max(0, MIN_MS - (Date.now() - start)));

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    const safety = setTimeout(close, MAX_MS);

    return () => {
      clearTimeout(safety);
      window.removeEventListener("load", finish);
      root.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Cargando"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-white text-navy"
        >
          <motion.div
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Logo scrolled />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}