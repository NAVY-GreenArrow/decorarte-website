import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url, key) : null;
export const LINES = [
  { id: "Vinil interior/exterior", color: "#2a6fd0" },
  { id: "Vinil fachada exterior", color: "#d9382f" },
  { id: "Impermeabilizante acrílico", color: "#f5b82e" },
  { id: "Impermeabilizante elastomérico", color: "#3a9d3f" },
  { id: "Esmalte base agua", color: "#1b3f94" },
  { id: "Pinturas de piscinas", color: "#18a8c9" },
];
export const lineColor = (l) => LINES.find((x) => x.id === l)?.color || "#1b3f94";
export const SEED = LINES.map((l, i) => ({
  id: "seed" + i, name: l.id, line: l.id, sheet_url: null,
  description: "Producto de ejemplo. Agrega las pinturas reales desde el panel /admin.",
  features: ["Alta cobertura", "Acabado uniforme"], presentations: "Galón · Cubeta" }));
export async function getPaints() {
  if (!supabase) return SEED;
  const { data, error } = await supabase.from("paints").select("*").eq("active", true).order("created_at");
  return error || !data?.length ? SEED : data;
}
