
import "./globals.css";
import { Manrope } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBand from "@/components/layout/CtaBand";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsappButton"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://lykclimatesystem.com"),

  title: {
    default: "Climatización para Furgones en Perú | LYK Climate Systems",
    template: "%s | LYK Climate Systems",
  },

  description:
    "Venta, instalación, mantenimiento y reparación de sistemas de climatización para furgones en Perú. LYK Climate Systems S.A.C.",

  applicationName: "LYK Climate Systems S.A.C.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Climatización para Furgones en Perú | LYK Climate Systems",
    description:
      "Soluciones de climatización para furgones: venta e instalación de equipos, mantenimiento preventivo y correctivo, diagnóstico y reparación.",
    url: "https://lykclimatesystem.com",
    siteName: "LYK Climate Systems S.A.C.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={manrope.variable} suppressHydrationWarning>
      <body>
        {/* Evitar mostrar el preloader si ya se vio en esta sesión */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("preloader-visto")==="1"){document.documentElement.classList.add("loaded","sin-preloader")}}catch(e){}`,
          }}
        />

        {/* Mejorar la visualización si JavaScript está desactivado */}
        <noscript>
          <style>{`.preloader{display:none!important}.reveal-zoom{transform:none!important}`}</style>
        </noscript>

        <Preloader />
        <Header />
        {children}
        <CtaBand />
        <WhatsAppButton/>
        <Footer />
      </body>
    </html>
  );
}
