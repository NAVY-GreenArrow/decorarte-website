import Image from "next/image";
import Catalog from "@/components/Catalog";
import ContactForm from "@/components/ContactForm";
import { getPaints, LINES } from "@/lib/data";
export const revalidate = 60;
const wa = process.env.NEXT_PUBLIC_WHATSAPP;
export default async function Home() {
  const paints = await getPaints();
  const waUrl = `https://wa.me/${wa || ""}?text=${encodeURIComponent("Hola Decorarte, quiero información sobre sus pinturas.")}`;
  return (<>
    <header className="nav wrap">
      <Image src="/logo.jpg" alt="Pinturas Decorarte" width={150} height={53} priority />
      <nav aria-label="Principal"><a href="#catalogo">Catálogo</a><a href="#contacto">Contacto</a><a className="btn sm" href={waUrl} target="_blank" rel="noopener">WhatsApp</a></nav>
    </header>
    <section className="hero wrap">
      <div className="copy">
        <p className="eyebrow">Fabricantes de pintura</p>
        <h1>Pintemos <em>el futuro</em></h1>
        <p className="lead">Vinilos, impermeabilizantes, esmaltes y pinturas para piscinas. Formulados por nosotros para durar y lucir.</p>
        <div className="row"><a className="btn" href="#catalogo">Ver catálogo</a><a className="btn ghost" href="#contacto">Pedir asesoría</a></div>
        <dl className="facts">
          <div><dt>06</dt><dd>líneas de producto</dd></div>
          <div><dt>PDF</dt><dd>ficha técnica por pintura</dd></div>
          <div><dt>Propia</dt><dd>formulación y fábrica</dd></div>
        </dl>
      </div>
      <div className="fan" aria-hidden="true">
        {LINES.map((l, i) => (<i key={l.id} style={{ "--c": l.color, "--i": i, "--fg": l.fg }}><b>0{i + 1}</b></i>))}
      </div>
    </section>
    <section id="catalogo" className="wrap sec">
      <h2><span className="num">01</span>Nuestras pinturas</h2>
      <Catalog paints={paints} />
    </section>
    <div className="dark"><section id="contacto" className="wrap sec two">
      <div><h2><span className="num">02</span>Hablemos de tu proyecto</h2>
        <p className="lead">Cuéntanos qué superficie vas a proteger o renovar y te recomendamos el producto indicado.</p>
        <a className="btn light" href={waUrl} target="_blank" rel="noopener">Chatear por WhatsApp</a>
        <p className="small">{process.env.NEXT_PUBLIC_EMAIL} {process.env.NEXT_PUBLIC_ADDRESS}</p></div>
      <ContactForm />
    </section></div>
    <footer className="wrap foot">© {new Date().getFullYear()} Pinturas Decorarte · Pintemos el futuro</footer>
  </>);
}
