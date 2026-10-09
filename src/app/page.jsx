import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Fleet from "../components/Fleet";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Fleet />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
