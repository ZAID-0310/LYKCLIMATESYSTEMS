"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { nav } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú con la tecla Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Si la pantalla pasa a tamaño grande, cerrar el menú móvil
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-3">
        <a
          href="#inicio"
          aria-label="L&K Climate Systems, inicio"
          onClick={() => setOpen(false)}
        >
          <Logo scrolled={solid} />
        </a>

        <nav className="flex items-center gap-6 font-semibold" aria-label="Principal">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hidden hover:text-brand md:block"
            >
              {n.label}
            </a>
          ))}

          {/* Botón de presupuesto: solo en pantallas grandes (en celular va dentro del menú) */}
          <a
            href="#contacto"
            className="group relative hidden items-center overflow-hidden rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95 md:inline-flex"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
          >
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
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
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-navy/10 bg-white text-navy md:hidden"
          >
            <ul className="mx-auto w-[92%] max-w-6xl py-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-navy/10 py-3 font-semibold transition-colors hover:text-brand"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-brand px-5 py-3 text-center font-semibold text-white shadow-lg shadow-brand/20 active:scale-95"
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