import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaApple } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#05060A] border-t border-white/5 pt-20 pb-10 mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              
              {/* LOGO */}
              <img 
                src="/img/loho.jpeg"
                alt="YB Connect"
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.35)] group-hover:scale-105 transition"
              />

              {/* BRAND NAME */}
              <span className="text-lg font-semibold tracking-wide text-white">
                <span className="text-[#FACC15]">YB</span> CONNECT
              </span>
            </Link>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm mb-8">
              Building digital bridges between world-class mentors and ambitious learners. 
              Learn faster, connect smarter, and grow with real guidance.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4">
              {[FaInstagram, FaLinkedin, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#94A3B8] hover:bg-[#FACC15] hover:text-black hover:border-[#FACC15] transition-all duration-300"
                >
                  <Icon className="text-[16px]" />
                </a>
              ))}
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wide">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#94A3B8]">
              <li>
                <Link href="/about" className="hover:text-[#FACC15] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#FACC15] transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wide">Legal</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#94A3B8]">
              <li>
                <Link href="/legal" className="hover:text-[#FACC15] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FACC15] transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA COLUMN */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wide">Get the App</h4>

            <div className="flex flex-col gap-4">

              {/* PLAY STORE */}
              <button className="bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-center hover:border-[#FACC15] hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] transition-all">
                <span className="text-white text-sm font-medium">Download for Android</span>
              </button>

              {/* APPLE */}
              <button className="bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-[#FACC15] hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] transition-all">
                <FaApple className="text-xl text-white" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400">Download on the</div>
                  <div className="text-sm text-white font-medium">App Store</div>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-6 gap-4">

          <p className="text-xs text-gray-500">
            © 2026 <span className="text-white">YB Connect</span>. All rights reserved.
          </p>

          <p className="text-xs text-gray-600">
            Designed for creators & learners 🚀
          </p>

        </div>

      </div>
    </footer>
  );
}