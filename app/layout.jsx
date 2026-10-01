import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";
const head = Outfit({ subsets: ["latin"], variable: "--font-head" });
const body = Work_Sans({ subsets: ["latin"], variable: "--font-body" });
export const metadata = { title: "Pinturas Decorarte · Pintemos el futuro", description: "Fabricamos vinilos, impermeabilizantes, esmaltes y pinturas para piscinas." };
export default function RootLayout({ children }) {
  return (<html lang="es"><body className={`${head.variable} ${body.variable}`}>{children}</body></html>);
}
