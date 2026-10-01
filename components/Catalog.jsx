"use client";
import { useState } from "react";
import { LINES, lineColor } from "@/lib/data";
export default function Catalog({ paints }) {
  const [f, setF] = useState("Todas");
  const list = f === "Todas" ? paints : paints.filter((p) => p.line === f);
  return (<>
    <div className="chips" role="tablist">
      {["Todas", ...LINES.map((l) => l.id)].map((l) => (
        <button key={l} className={"chip" + (f === l ? " on" : "")} onClick={() => setF(l)}>{l}</button>))}
    </div>
    <div className="grid">
      {list.map((p) => (
        <article className="card" key={p.id} style={{ "--c": lineColor(p.line) }}>
          <div className="band"><span>{p.line}</span></div>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          {p.features?.length > 0 && <ul>{p.features.map((x) => <li key={x}>{x}</li>)}</ul>}
          {p.presentations && <small>Presentaciones: {p.presentations}</small>}
          {p.sheet_url
            ? <a className="btn sm" href={p.sheet_url} target="_blank" rel="noopener" download>Descargar ficha técnica (PDF)</a>
            : <span className="soon">Ficha técnica próximamente</span>}
        </article>))}
    </div></>);
}
