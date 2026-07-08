import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "../components/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Purple Smile",
  description: "Илүү цэвэр, илүү итгэлтэй инээмсэглэл.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
