"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-navy shadow"
          : "bg-gradient-to-b from-navy-dark/80 to-transparent text-white"
      }`}
    >
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-3">
        <a href="#inicio" aria-label="FurgoTrans inicio">
          <Logo />
        </a>
        <nav
          className="flex items-center gap-6 font-semibold"
          aria-label="Principal"
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hidden hover:text-brand md:block"
            >
              {n.label}
            </a>
          ))}

          <a
            href="#contacto"
            className="group relative inline-flex items-center overflow-hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-brand/40 active:scale-95 md:px-5"
          >
            <span className="relative z-10 whitespace-nowrap md:hidden">
              Presupuesto
            </span>
            <span className="relative z-10 hidden whitespace-nowrap md:inline">
              Solicitar presupuesto
            </span>
            <span className="absolute inset-0 origin-left scale-x-0 bg-navy-dark transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
          </a>
        </nav>
      </div>
    </header>
  );
}
