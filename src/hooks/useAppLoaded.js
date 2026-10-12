"use client";

import { useEffect, useState } from "react";

// Devuelve true cuando termina la pantalla de carga (o si no existe)
export default function useAppLoaded() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("loaded") || !document.querySelector(".preloader")) {
      setLoaded(true);
      return;
    }
    const on = () => setLoaded(true);
    window.addEventListener("app:loaded", on, { once: true });
    return () => window.removeEventListener("app:loaded", on);
  }, []);

  return loaded;
}