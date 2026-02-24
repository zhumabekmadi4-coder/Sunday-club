import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Fireplace } from "@/components/Fireplace";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sunday Club | Книжный клуб в стиле Dark Academia",
  description: "Общая страсть к историям. Раз в две недели мы собираемся для глубокого обсуждения литературы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased min-h-screen relative overflow-x-hidden ambient-light font-sans`}
      >
        <Fireplace />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
