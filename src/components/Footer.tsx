import Link from "next/link";
import { FaUserGroup, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaApple } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="pt-24 pb-10 mt-10 border-t border-borderSubtle bg-gradient-to-b from-transparent to-black relative z-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-gold text-3xl drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                <FaUserGroup />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">YB CONNECT</span>
            </div>
            <p className="text-textMuted text-[14px] mb-8 max-w-xs leading-relaxed">
              Building the digital bridges between world-class experts and ambitious learners worldwide.
            </p>
            <div className="flex gap-5 text-textMuted">
              <a href="#" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"><FaInstagram className="text-lg" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"><FaLinkedin className="text-lg" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"><FaTwitter className="text-lg" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-borderSubtle flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"><FaYoutube className="text-lg" /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-white text-[16px] mb-6">Platform</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-textMuted font-medium">
              <li><Link href="/about" className="hover:text-gold hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-gold hover:translate-x-1 transition-all inline-block">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-[16px] mb-6">Legal</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-textMuted font-medium">
              <li><Link href="/privacy" className="hover:text-gold hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-borderSubtle pt-8 gap-6">
          <p className="text-[13px] text-gray-500 font-medium">© 2026 YB Connect. Engineered for growth.</p>
          <div className="flex gap-4">
            <button className="border border-borderSubtle bg-[#0A0E17] rounded-xl px-4 py-2 flex items-center justify-center gap-3 hover:border-gold transition-colors w-[150px]">
              <span className="text-white font-bold text-sm">Google Play</span>
            </button>
            <button className="border border-borderSubtle bg-[#0A0E17] rounded-xl px-4 py-2 flex items-center gap-3 hover:border-gold transition-colors w-[150px]">
              <FaApple className="text-3xl text-white" />
              <div className="text-left">
                <div className="text-[10px] text-gray-400 leading-none">Download on the</div>
                <div className="font-semibold text-[14px] leading-tight text-white">App Store</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}