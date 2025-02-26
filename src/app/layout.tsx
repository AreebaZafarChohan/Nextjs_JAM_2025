import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import "./style.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative mx-auto max-w-[390px] xs:max-w-[639px] xxs:max-w-[534px] sm:max-w-[767px] md:max-w-[1023px] lg:max-w-[1334px] xl:max-w-[1440px] w-full bg-white overflow-x-hidden`}

      >
        
        <Header />
        {children}
        <Footer />
       
      </body>
    </html>
    </ClerkProvider>
  );
}
