import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cyberpro — The studio behind your next vision",
  description:
    "One team. End to end. Cyberpro builds brands, ships products, and creates things worth shipping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={courierPrime.variable}>
      <body>
        <CustomCursor />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
