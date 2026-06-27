import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intentional Career Path — Tu carrera, con intención",
  description:
    "Descubre tu path de carrera ideal, diagnostica tu posición actual y accede a las herramientas que necesitas para crecer con propósito.",
  openGraph: {
    title: "Intentional Career Path",
    description: "Tu carrera, con intención. Tu camino, con claridad.",
    type: "website",
    locale: "es_ES",
    siteName: "Intentional Career Path",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
