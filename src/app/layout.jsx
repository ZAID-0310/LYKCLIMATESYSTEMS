import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";

export const metadata = {
  title: "L&K Climate Systems | Furgones climatizados para pollitos bebé y carga perecible",
  description: "Diseño y fabricación de furgones térmicos y climatizados a medida. Transporte de pollitos bebé y cadena de frío con control de temperatura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Si el navegador no ejecuta JavaScript, no dejar la pantalla blanca tapando todo */}
        <noscript>
          <style>{`.preloader{display:none!important}.reveal-zoom{transform:none!important}`}</style>
        </noscript>
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}