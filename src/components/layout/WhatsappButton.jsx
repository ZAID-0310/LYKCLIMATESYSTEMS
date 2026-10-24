'use client';

import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);
  const [dismissed, setDismissed] = useState(false);

    const phoneNumber = '51902589157';

  const defaultMessage = encodeURIComponent(
    '¡Hola LYK Climate Systems S.A.C.! Quisiera información sobre sus sistemas de climatización para furgones.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  useEffect(() => {
    // Si el usuario ya cerró el mensaje, no volver a mostrarlo.
    try {
      if (sessionStorage.getItem('whatsapp-mensaje-cerrado') === '1') {
        setDismissed(true);
        return;
      }
    } catch {}

    let hideTimer;
    let interval;

    const showTemporarily = () => {
      setShowMessage(true);

      // Ocultar el mensaje después de 5 segundos.
      hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    };

    // Primera aparición después de 2 segundos.
    const initialTimer = setTimeout(() => {
      showTemporarily();

      // Repetir cada 3 minutos.
      interval = setInterval(() => {
        showTemporarily();
      }, 180000);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  const closeMessage = () => {
    setShowMessage(false);
    setDismissed(true);

    try {
      sessionStorage.setItem('whatsapp-mensaje-cerrado', '1');
    } catch {}
  };

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">

      {/* Mensaje flotante */}
      {showMessage && !dismissed && (
        <div className="whatsapp-tooltip relative w-[260px] rounded-2xl border border-gray-100 bg-white px-5 py-4 pr-9 text-gray-800 shadow-xl sm:w-[280px]">

          {/* Botón X */}
          <button
            type="button"
            onClick={closeMessage}
            aria-label="Cerrar definitivamente el mensaje"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>

          {/* Mensaje clicable */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar cotización por WhatsApp"
            className="block"
          >
            <span className="block text-sm font-bold text-slate-900">
              ¿Necesitas una cotización?
            </span>

            <span className="mt-1 block text-xs leading-relaxed text-gray-600">
              Escríbenos por WhatsApp y te ayudaremos con tu proyecto.
            </span>
          </a>

          {/* Punta del globo */}
          <span className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 border-b border-r border-gray-100 bg-white" />
        </div>
      )}

      {/* Botón de WhatsApp permanente */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-600"
      >
        <svg
          className="h-8 w-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99 0-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}