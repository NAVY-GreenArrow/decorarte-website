"use client";
import { useState } from "react";
import { supabase } from "@/lib/data";
export default function ContactForm() {
  const [s, setS] = useState("");
  async function send(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (!supabase) return setS("Escríbenos por WhatsApp mientras se configura el formulario.");
    setS("Enviando…");
    const { error } = await supabase.from("messages").insert(d);
    setS(error ? "No se pudo enviar. Intenta por WhatsApp." : "¡Gracias! Te contactaremos pronto.");
    if (!error) e.target.reset();
  }
  return (<form onSubmit={send} className="form">
    <input name="name" placeholder="Nombre" required />
    <input name="phone" placeholder="Teléfono (opcional)" />
    <textarea name="message" placeholder="¿Qué necesitas pintar o impermeabilizar?" rows={4} required />
    <button className="btn">Enviar mensaje</button>
    <p role="status">{s}</p>
  </form>);
}
