import "./globals.css";

export const metadata = {
  title: "FurgoTrans | Transporte rápido y fiable con furgones",
  description: "Transporte de mercancías, mudanzas y entregas express con flota moderna. Atención 24/7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
