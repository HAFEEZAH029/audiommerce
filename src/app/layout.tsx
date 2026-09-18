import type { Metadata } from "next";
import "./globals.css";
import NavbarServer from "@/components/NavServer";
import Footer from "@/components/Footer";
import StoreProvider from "@/store/StoreProvider";
import GetCart from "@/components/GetCart";
import { getCurrentUser } from "@/lib/getUser";

export const metadata: Metadata = {
  title: "Audiommerce",
  description: "An e-commerce platform for audio products built with a complete checkout system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <GetCart userId={user?.id ?? null} />
          <NavbarServer />
          {children}
          <Footer />
          <div id="modal" ></div>
        </StoreProvider>
      </body>
    </html>
  );
}
