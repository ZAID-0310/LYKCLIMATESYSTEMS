"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { nav, navMas } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menú móvil
  const [masMovil, setMasMovil] = useState(false); // submenú "Más" en móvil
  const [masOpen, setMasOpen] = useState(false); // submenú "Más" en escritorio
  const masRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menús con la tecla Escape
  useEffect(() => {
    if (!open && !masOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMasOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, masOpen]);

  // Cerrar el submenú de escritorio al hacer clic fuera
  useEffect(() => {
    if (!masOpen) return;
    const onClick = (e) => {
      if (masRef.current && !masRef.current.contains(e.target)) setMasOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [masOpen]);

  // Si la pantalla pasa a tamaño grande, cerrar el menú móvil
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Al cerrar el menú móvil, también se cierra su submenú
  useEffect(() => {
    if (!open) setMasMovil(false);
  }, [open]);


    // Scroll a las secciones de la página, midiendo de nuevo al terminar
  useEffect(() => {
    // Posición donde debe quedar la sección (respeta tu scroll-margin-top del CSS)
    const posicion = (el) => {
      const margen = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = el.getBoundingClientRect().top + window.scrollY - margen;
      return Math.min(Math.max(0, y), max);
    };

    // Baja a la sección y, al terminar, vuelve a medir por si la página se movió
        // Baja a la sección con una sola animación, midiendo el destino en cada cuadro
    const irA = (el) => {
      // Si el usuario prefiere menos movimiento, salta directo
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top: posicion(el), behavior: "instant" });
        return;
      }

      const inicio = window.scrollY;
      const t0 = performance.now();
      const distancia = Math.abs(posicion(el) - inicio);
      const duracion = Math.min(1000, Math.max(500, distancia * 0.5)); // milisegundos
      const suavizado = (t) => 1 - Math.pow(1 - t, 3);

      // Si el usuario toca o gira la rueda durante el recorrido, se detiene
      let activo = true;
      const parar = () => {
        activo = false;
      };
      window.addEventListener("wheel", parar, { once: true, passive: true });
      window.addEventListener("touchstart", parar, { once: true, passive: true });

      const paso = (ahora) => {
        if (!activo) return;
        const t = Math.min(1, (ahora - t0) / duracion);
        const destino = posicion(el); // se vuelve a medir en cada cuadro
        window.scrollTo({
          top: inicio + (destino - inicio) * suavizado(t),
          behavior: "instant", // ignora el scroll-behavior: smooth del CSS
        });
        if (t < 1) {
          requestAnimationFrame(paso);
        } else {
          window.removeEventListener("wheel", parar);
          window.removeEventListener("touchstart", parar);
        }
      };
      requestAnimationFrame(paso);
    };

    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank") return;

      const url = new URL(a.href, window.location.href);
      const mismaPagina =
        url.origin === window.location.origin && url.pathname === window.location.pathname;
      if (!mismaPagina || !url.hash) return;

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      history.pushState(null, "", url.hash);
      setTimeout(() => irA(el), 50); // deja que se cierre el menú móvil
    };

    // Si entras desde otra página a /#servicios, ajusta cuando termina la pantalla de carga
    const alTerminarCarga = () => {
      if (!window.location.hash) return;
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (el) setTimeout(() => irA(el), 100);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("app:loaded", alTerminarCarga, { once: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("app:loaded", alTerminarCarga);
    };
  }, []);

  // Con el menú abierto el fondo siempre es blanco para que se lean los links
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white text-navy shadow"
          : "bg-gradient-to-b from-navy-dark/80 to-transparent text-white"
      }`}
    >
      <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-3 md:py-4">
        <a
          href="/"
          aria-label="L&K Climate Systems, inicio"
          onClick={() => setOpen(false)}
        >
          <Logo scrolled={solid} />
        </a>

        <nav className="flex items-center gap-5 font-semibold md:gap-8 md:text-lg" aria-label="Principal">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hidden hover:text-brand md:block"
            >
              {n.label}
            </a>
          ))}

          {/* Submenú "Más" (escritorio) */}
          <div
            ref={masRef}
            className="relative hidden md:block"
            onMouseEnter={() => setMasOpen(true)}
            onMouseLeave={() => setMasOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMasOpen(true)}
              aria-expanded={masOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              Más
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={`transition-transform duration-200 ${masOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {masOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full pt-3"
                >
                  <ul className="min-w-60 overflow-hidden rounded-md border border-navy/10 bg-white py-2 text-navy shadow-xl">
                    {navMas.map((n) => (
                      <li key={n.href}>
                        <a
                          href={n.href}
                          onClick={() => setMasOpen(false)}
                          className="block px-6 py-3 text-base font-semibold transition-colors hover:bg-soft hover:text-brand"
                        >
                          {n.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botón de presupuesto: solo en pantallas grandes (en celular va dentro del menú) */}
          <a
            href="/contacto"
            className="group relative hidden items-center overflow-hidden rounded-md bg-brand px-7 py-3 text-base font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95 md:inline-flex"
          >
            <span className="relative z-10 whitespace-nowrap">Solicitar presupuesto</span>
            <span className="absolute inset-0 origin-left scale-x-0 bg-navy-dark transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
          </a>

          {/* Botón hamburguesa: solo en celular */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
          >
            {open ? <X size={30} aria-hidden="true" /> : <Menu size={30} aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {/* Panel del menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-navy/10 bg-white text-navy md:hidden"
          >
            <ul className="mx-auto w-[92%] max-w-6xl py-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-navy/10 py-4 text-lg font-semibold transition-colors hover:text-brand"
                  >
                    {n.label}
                  </a>
                </li>
              ))}

              {/* Submenú "Más" (celular) */}
              <li>
                <button
                  type="button"
                  onClick={() => setMasMovil((o) => !o)}
                  aria-expanded={masMovil}
                  className="flex w-full items-center justify-between border-b border-navy/10 py-4 text-lg font-semibold transition-colors hover:text-brand"
                >
                  Más
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${masMovil ? "rotate-180" : ""}`}
                  />
                </button>
                {masMovil && (
                  <ul className="border-b border-navy/10 bg-soft/60 pl-4">
                    {navMas.map((n) => (
                      <li key={n.href}>
                        <a
                          href={n.href}
                          onClick={() => setOpen(false)}
                          className="block py-3.5 text-base font-medium text-navy/80 transition-colors hover:text-brand"
                        >
                          {n.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className="py-4">
                <a
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-brand px-5 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-brand/20 active:scale-95"
                >
                  Solicitar presupuesto
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}