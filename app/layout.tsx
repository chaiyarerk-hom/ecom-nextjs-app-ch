import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Biot Ecommerce",
  description: "Discovert the latest products at the best prices"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        className="flex min-h-full flex-col bg-white poppins"
      >
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      </body>
    </html>
  );
}
