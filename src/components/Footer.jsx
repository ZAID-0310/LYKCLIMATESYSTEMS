import Logo from "./Logo";

export default function Footer() {
  const col = "grid content-start gap-1";
  return (
    <footer className="bg-navy-dark pt-10 text-white">
      <div className="mx-auto grid w-[92%] max-w-6xl gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <Logo light />
        <div className={col}>
          <h4 className="font-bold">Inicio</h4>
          <a href="#servicios">Servicios</a><a href="#flota">Flota</a><a href="#contacto">Contacto</a>
        </div>
        <div className={col}>
          <h4 className="font-bold">Contacto</h4>
          <span>+51 900 000 000</span><span>hola@furgotrans.com</span>
        </div>
      </div>
      <p className="py-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} FurgoTrans. Todos los derechos reservados.
      </p>
    </footer>
  );
}
