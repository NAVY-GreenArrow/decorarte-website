import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
const head = Playfair_Display({ subsets: ["latin"], variable: "--font-head", style: ["normal", "italic"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata = { title: "Pinturas Decorarte · Pintemos el futuro", description: "Fabricamos vinilos, impermeabilizantes, esmaltes y pinturas para piscinas." };
export default function RootLayout({ children }) {
  return (<html lang="es"><body className={`${head.variable} ${body.variable}`}>{children}</body></html>);
}
