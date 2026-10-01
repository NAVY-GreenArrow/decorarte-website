"use client";
import { useEffect, useState } from "react";
import { supabase, LINES } from "@/lib/data";
export default function Admin() {
  const [user, setUser] = useState(null), [paints, setPaints] = useState([]), [msg, setMsg] = useState("");
  const load = async () => { const { data } = await supabase.from("paints").select("*").order("created_at", { ascending: false }); setPaints(data || []); };
  useEffect(() => { if (!supabase) return; supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: l } = supabase.auth.onAuthStateChange((_, s) => setUser(s?.user ?? null)); return () => l.subscription.unsubscribe(); }, []);
  useEffect(() => { if (user) load(); }, [user]);
  if (!supabase) return <main className="wrap sec"><p>Configura las variables de Supabase (.env.local) para usar el panel.</p></main>;
  async function login(e) { e.preventDefault(); const d = Object.fromEntries(new FormData(e.target));
    const { error } = await supabase.auth.signInWithPassword(d); setMsg(error ? "Credenciales incorrectas" : ""); }
  async function add(e) {
    e.preventDefault(); const f = e.target, d = new FormData(f), file = d.get("sheet"); setMsg("Guardando…");
    let sheet_url = null;
    if (file?.size) { const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const up = await supabase.storage.from("fichas").upload(path, file, { contentType: "application/pdf" });
      if (up.error) return setMsg("Error subiendo PDF: " + up.error.message);
      sheet_url = supabase.storage.from("fichas").getPublicUrl(path).data.publicUrl; }
    const { error } = await supabase.from("paints").insert({ name: d.get("name"), line: d.get("line"), description: d.get("description"),
      features: String(d.get("features")).split(",").map((s) => s.trim()).filter(Boolean), presentations: d.get("presentations"), sheet_url });
    setMsg(error ? error.message : "Pintura agregada"); if (!error) { f.reset(); load(); } }
  const toggle = async (p) => { await supabase.from("paints").update({ active: !p.active }).eq("id", p.id); load(); };
  const del = async (p) => { if (confirm(`¿Eliminar ${p.name}?`)) { await supabase.from("paints").delete().eq("id", p.id); load(); } };
  if (!user) return (<main className="wrap sec"><h2>Panel Decorarte</h2>
    <form onSubmit={login} className="form"><input name="email" type="email" placeholder="Correo" required /><input name="password" type="password" placeholder="Contraseña" required /><button className="btn">Entrar</button><p>{msg}</p></form></main>);
  return (<main className="wrap sec"><h2>Panel Decorarte</h2>
    <button className="btn ghost sm" onClick={() => supabase.auth.signOut()}>Salir</button>
    <form onSubmit={add} className="form"><h3>Nueva pintura</h3>
      <input name="name" placeholder="Nombre del producto" required />
      <select name="line" required>{LINES.map((l) => <option key={l.id}>{l.id}</option>)}</select>
      <textarea name="description" placeholder="Descripción" rows={3} />
      <input name="features" placeholder="Características separadas por coma" />
      <input name="presentations" placeholder="Presentaciones (Galón, Cubeta…)" />
      <label>Ficha técnica (PDF) <input name="sheet" type="file" accept="application/pdf" /></label>
      <button className="btn">Agregar</button><p role="status">{msg}</p></form>
    <h3>Pinturas ({paints.length})</h3>
    {paints.map((p) => (<div className="adm" key={p.id}><b>{p.name}</b><span>{p.line}</span>
      <button className="btn ghost sm" onClick={() => toggle(p)}>{p.active ? "Ocultar" : "Mostrar"}</button>
      <button className="btn ghost sm" onClick={() => del(p)}>Eliminar</button></div>))}
  </main>);
}
