
import type { Metadata } from "next";
import BarraNavegacao from "../components/BarraNavegacao";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capim Gestão — Capim Dourado Shopping",
  description:
    "Sistema de gestão operacional e infraestrutura do Capim Dourado Shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <BarraNavegacao />
        {children}
      </body>
    </html>
  );
}
