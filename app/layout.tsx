import type { Metadata } from "next";
import { Boldonse, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';

const boldonse = Boldonse({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohit Singh",
  description: "Portfolio of Mohit Singh, a passionate web developer and designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${boldonse.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <GravityStarsBackground className="absolute inset-0 z-0">
            <div className="relative z-10 flex-1 flex flex-col">
              {children}
            </div>
        </GravityStarsBackground>
      </body>
    </html>
  );
}
