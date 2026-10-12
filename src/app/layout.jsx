import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "L&K Climate Systems | Furgones climatizados para pollitos bebé y carga perecible",
  description: "Diseño y fabricación de furgones térmicos y climatizados a medida. Transporte de pollitos bebé y cadena de frío con control de temperatura.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
