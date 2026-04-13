import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StoreProvider from "@/store/StoreProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Audiommerce",
  description: "An e-commerce platform for audio products built with a complete checkout system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.variable}>
        <StoreProvider>
          <Navigation />
          {children}
          <Footer />
          <div id="modal" />
        </StoreProvider>
      </body>
    </html>
  );
}
