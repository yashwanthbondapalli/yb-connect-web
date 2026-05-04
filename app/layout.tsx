import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

// Load the Outfit font
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit" 
});

export const metadata: Metadata = {
  title: "YB Connect | Premium Mentorship Platform",
  description: "Connect with verified mentors, book 1:1 sessions, and accelerate your personal and professional growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      {/* Apply the font variable to the body */}
      <body className={`${outfit.variable} font-sans relative min-h-screen flex flex-col antialiased`}>
        
        {/* Persistent Background Elements */}
        <div className="glow-blob top-[10%] left-[-10%] animate-pulse-glow pointer-events-none"></div>
        <div className="glow-blob glow-blob-gold top-[40%] right-[-10%] animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }}></div>
        <div className="bg-swoosh pointer-events-none"></div>

        {/* Global Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main className="flex-grow relative z-10 w-full overflow-hidden">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}