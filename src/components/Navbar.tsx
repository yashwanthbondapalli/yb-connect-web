"use client";
import Link from "next/link";
import { FaUserGroup } from "react-icons/fa6";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="container mx-auto px-6 lg:px-12 py-5 flex justify-between items-center relative z-50 glass-panel sticky top-0 md:rounded-full md:mt-4 md:w-[95%] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
{/* --- NEW PREMIUM STICKER ADDED HERE --- */}
{/* --- NEW PREMIUM STICKER (MOVED TO BOTTOM) --- */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#05060A] border border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.3)] text-[#FACC15] text-[9px] md:text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest whitespace-nowrap z-50 animate-pulse uppercase">
        🚀 App Launching Soon • Explore Services
      </div>
      {/* ------------------------------------------- */}
  {/* Logo + Brand */}
  <Link 
    href="/" 
    className="flex items-center gap-3 group"
  >
    {/* Logo Image */}
    <img 
      src="/img/loho.jpeg"
      alt="YB Connect Logo"
      className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform duration-300"
    />

    {/* Brand Name */}
    <span className="text-lg sm:text-xl font-semibold tracking-wide text-white group-hover:text-[#FACC15] transition-colors duration-300">
      YB CONNECT
    </span>
  </Link>

      {/* Desktop Links */}
      <div className="hidden lg:flex gap-8 text-[13px] font-medium text-gray-300">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
        <Link href="/pricing" className="hover:text-gold transition-colors">Pricing</Link>
        <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        <Link href="/legal" className="hover:text-gold transition-colors">Legal</Link>
      </div>

      {/* CTA Button & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-gold text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-goldHover hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-105 transition-all duration-300">
          Get the App
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown (Simple version) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-4 glass-panel rounded-2xl p-6 flex flex-col gap-4 lg:hidden border border-white/10">
          <Link href="/" className="text-white hover:text-gold">Home</Link>
          <Link href="/about" className="text-white hover:text-gold">About Us</Link>
          <Link href="/pricing" className="text-white hover:text-gold">Pricing</Link>
          <Link href="/contact" className="text-white hover:text-gold">Contact</Link>
          <Link href="/legal" className="text-white hover:text-gold">Legal</Link>
          <button className="w-full bg-gold text-black px-6 py-2.5 rounded-full font-bold mt-2">
            Get the App
          </button>
        </div>
      )}
    </nav>
    
  );
}