"use client";
import { useState } from "react";
import { LINES, lineColor, lineFg } from "@/lib/data";
const Down = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" /></svg>);
export default function Catalog({ paints }) {
  const [f, setF] = useState("Todas");
  const list = f === "Todas" ? paints : paints.filter((p) => p.line === f);
  return (<>
    <div className="chips">
      {["Todas", ...LINES.map((l) => l.id)].map((l) => (
        <button key={l} aria-pressed={f === l} className={"chip" + (f === l ? " on" : "")} onClick={() => setF(l)}>{l}</button>))}
    </div>
    <div className="grid">
      {list.map((p, i) => (
        <article className="pc" key={p.id} style={{ "--c": lineColor(p.line), "--fg": lineFg(p.line) }}>
          <div className="swatch"><span className="no">{String(i + 1).padStart(2, "0")}</span><span className="ln">{p.line}</span></div>
          <div className="pb">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            {p.features?.length > 0 && <ul className="tags">{p.features.map((x) => <li key={x}>{x}</li>)}</ul>}
            {p.presentations && <small>Presentaciones · {p.presentations}</small>}
            {p.sheet_url
              ? <a className="dl" href={p.sheet_url} target="_blank" rel="noopener" download><Down /> Ficha técnica (PDF)</a>
              : <span className="dl off">Ficha técnica próximamente</span>}
          </div>
        </article>))}
    </div></>);
}
