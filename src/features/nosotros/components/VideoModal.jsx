"use client";

import { useEffect, useState } from "react";
import { X, Play } from "lucide-react";

export default function VideoModal({
  src = "/videos/nosotros.mp4",
  poster = "/images/Furgonetapollitos.png",
  title = "LYK Climate Systems S.A.C.",
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Vista previa del video */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Reproducir video: ${title}`}
        className="group relative block w-full overflow-hidden rounded-2xl bg-black text-left shadow-lg"
      >
        <video
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-xl transition group-hover:scale-110">
            <Play size={28} fill="currentColor" />
          </span>
        </span>

        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12 text-sm font-semibold text-white">
          Ver video
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar video"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={24} />
            </button>

            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full rounded-xl bg-black shadow-2xl"
            />

            <p className="mt-3 text-center text-sm text-white/80">{title}</p>
          </div>
        </div>
      )}
    </>
  );
}