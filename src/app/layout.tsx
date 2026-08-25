import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel_Decorative, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Élisée & Lydia - La Fête dans la Cour Royale",
  description: "Célébration du mariage d'Élisée et Lydia le 10 Octobre 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${poppins.variable} font-sans antialiased bg-[#FFF8EC] text-[#7A4A2D]`}
      >
        {children}
      </body>
    </html>
  );
}
