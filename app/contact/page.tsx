"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaLocationDot, FaEnvelope, FaPhone, FaArrowRight, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";

// --- CUSTOM COMPONENT: Premium Glow Card ---
const GlowCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#FACC15]/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] group ${className}`}>
      {children}
    </div>
  );
};

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isHovered, setIsHovered] = useState(false);

  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="bg-[#0B0D14] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black pb-24">
      
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] bg-indigo-900/15 pointer-events-none z-0"></div>
      <div className="absolute top-[60%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FACC15]/5 pointer-events-none z-0"></div>

      <main className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24 relative z-10 flex flex-col">
        
        {/* --- HERO SECTION --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="text-center w-full max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            CONCIERGE DESK
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif tracking-tight text-white leading-[1.1]">
            Lets Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-yellow-200">Conversation.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are looking to accelerate your career, partner with our ecosystem, or join our roster of elite experts, our team is ready to assist you.
          </motion.p>
        </motion.section>

        {/* --- SPLIT LAYOUT: INFO & FORM --- */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Contact Information */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <GlowCard className="p-10 h-full flex flex-col gap-10">
                
                {/* Global HQ */}
                <div>
                  <div className="w-12 h-12 rounded-full border border-[#FACC15]/30 flex items-center justify-center text-[#FACC15] text-lg mb-6 bg-[#FACC15]/5">
                    <FaLocationDot />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white font-serif">Global Headquarters</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed">
                    Innovation Tech Park<br />
                    Kakinada, Andhra Pradesh<br />
                    India
                  </p>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>

                {/* Direct Comms */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-[#05060A] flex items-center justify-center text-gray-400 group-hover:text-[#FACC15] group-hover:border-[#FACC15]/50 transition-all">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500 uppercase tracking-wider font-bold mb-1">Email Us</p>
                      <p className="text-[15px] text-white font-medium">concierge@ybconnect.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-[#05060A] flex items-center justify-center text-gray-400 group-hover:text-[#FACC15] group-hover:border-[#FACC15]/50 transition-all">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500 uppercase tracking-wider font-bold mb-1">Call Us</p>
                      <p className="text-[15px] text-white font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="flex gap-4">
              {[<FaLinkedinIn key="li" />, <FaXTwitter key="tw" />, <FaInstagram key="ig" />].map((icon, idx) => (
                <button key={idx} className="w-14 h-14 rounded-2xl border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#FACC15] hover:border-[#FACC15] transition-all duration-300 shadow-lg hover:-translate-y-1">
                  {icon}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Premium Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <GlowCard className="p-10 sm:p-12">
              <h3 className="text-2xl font-bold mb-8 text-white font-serif">Send a Direct Inquiry</h3>
              
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[13px] text-gray-400 font-medium ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-[#05060A]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/50 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-gray-400 font-medium ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-[#05060A]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
<select defaultValue="" className="w-full bg-[#05060A]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/50 transition-all duration-300 appearance-none cursor-pointer">
  <option value="" disabled>Select a subject...</option>
  <option value="mentorship">I want to find a Mentor</option>
  <option value="expert">I want to become an Expert</option>
  <option value="partnership">Enterprise Partnership</option>
  <option value="support">General Support</option>
</select>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2 mb-2">
                  <label className="text-[13px] text-gray-400 font-medium ml-1">Your Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-[#05060A]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative overflow-hidden w-full bg-[#FACC15] text-black py-4 rounded-xl font-bold text-lg shadow-[0_5px_20px_rgba(250,204,21,0.3)] hover:shadow-[0_10px_30px_rgba(250,204,21,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="relative z-10">Transmit Message</span>
                  <FaArrowRight className={`relative z-10 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  
                  {/* Sweep Effect */}
                  <div className="absolute inset-0 h-full w-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:animate-[sweep_0.8s_ease-in-out]"></div>
                </button>
                <p className="text-center text-gray-500 text-[12px] mt-2">Your information is encrypted and securely transmitted.</p>
              </form>
            </GlowCard>
          </motion.div>

        </div>
      </main>

      {/* Global CSS for Sweep */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}} />
    </div>
  );
}