import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBand from "@/components/layout/CtaBand";
import Preloader from "@/components/layout/Preloader";

export const metadata = {
  title: "L&K Climate Systems | Instalación y mantenimiento de equipos climatizados",
  description: "Asesoría, instalación y mantenimiento de equipos de climatización para furgones, con tecnología alemana. Atención en todo el Perú.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={manrope.variable}>
      <body>
        {/* Si el navegador no ejecuta JavaScript, no dejar la pantalla blanca tapando todo */}
        <noscript>
          <style>{`.preloader{display:none!important}.reveal-zoom{transform:none!important}`}</style>
        </noscript>
        <Preloader />
        <Header />
        {children}
        <CtaBand />
        <Footer />
      </body>
    </html>
  );
}