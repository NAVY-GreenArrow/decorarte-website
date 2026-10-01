import Image from "next/image";
import Catalog from "@/components/Catalog";
import ContactForm from "@/components/ContactForm";
import { getPaints } from "@/lib/data";
export const revalidate = 60;
const wa = process.env.NEXT_PUBLIC_WHATSAPP;
export default async function Home() {
  const paints = await getPaints();
  const waUrl = `https://wa.me/${wa || ""}?text=${encodeURIComponent("Hola Decorarte, quiero información sobre sus pinturas.")}`;
  return (<>
    <header className="nav wrap">
      <Image src="/logo.jpg" alt="Pinturas Decorarte" width={150} height={53} priority />
      <nav><a href="#catalogo">Catálogo</a><a href="#contacto">Contacto</a></nav>
    </header>
    <section className="hero wrap">
      <div>
        <p className="eyebrow">Fabricantes de pintura</p>
        <h1>Pintemos <em>el futuro</em></h1>
        <p className="lead">Vinilos, impermeabilizantes, esmaltes y pinturas para piscinas, formulados para durar y lucir.</p>
        <div className="row"><a className="btn" href="#catalogo">Ver catálogo</a><a className="btn ghost" href={waUrl} target="_blank" rel="noopener">WhatsApp</a></div>
      </div>
      <div className="art" aria-hidden="true">
        <svg viewBox="0 0 300 300" className="stroke">
          {["#f5b82e", "#d9382f", "#2a6fd0", "#3a9d3f"].map((c, i) => (
            <path key={c} d={`M20 ${250 - i * 4} C 60 ${60 + i * 18}, 190 ${40 + i * 18}, 280 ${70 + i * 18}`} stroke={c} style={{ animationDelay: `${i * 0.15}s` }} />))}
        </svg>
        <div className="cans"><i style={{ "--c": "#2a6fd0" }} /><i style={{ "--c": "#d9382f" }} /><i style={{ "--c": "#3a9d3f" }} /></div>
      </div>
    </section>
    <section id="catalogo" className="wrap sec"><h2>Nuestras pinturas</h2><Catalog paints={paints} /></section>
    <section id="contacto" className="wrap sec two">
      <div><h2>Hablemos de tu proyecto</h2>
        <p>Escríbenos y te asesoramos para elegir el producto ideal.</p>
        <a className="btn" href={waUrl} target="_blank" rel="noopener">Chatear por WhatsApp</a>
        <p className="muted">{process.env.NEXT_PUBLIC_EMAIL} {process.env.NEXT_PUBLIC_ADDRESS}</p></div>
      <ContactForm />
    </section>
    <footer className="wrap foot">© {new Date().getFullYear()} Pinturas Decorarte · Pintemos el futuro</footer>
  </>);
}
