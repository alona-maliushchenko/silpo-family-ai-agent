import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silpo Family AI",
  description: "AI-помічник для планування сімейного меню та покупок",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body> {children} </body>
    </html>
  );
}