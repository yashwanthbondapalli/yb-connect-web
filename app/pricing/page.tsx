"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaCircleCheck, FaCrown, FaShieldHalved } from "react-icons/fa6";
import { FaRegStar, FaRegGem } from "react-icons/fa";

// --- CUSTOM COMPONENT: Premium Glow Card ---
const GlowCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#FACC15]/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] group ${className}`}>
      {children}
    </div>
  );
};

export default function Pricing() {
  // Interactive State for the Toggle
  const [isLearner, setIsLearner] = useState(true);

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
      <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] bg-indigo-900/10 pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] bg-[#FACC15]/5 pointer-events-none z-0"></div>

      <main className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 relative z-10 flex flex-col items-center">
        
        {/* --- HEADER & TOGGLE --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="text-center w-full max-w-2xl mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            PRICING
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif tracking-tight text-white">
            Choose the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-yellow-200">Right Plan</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[#94A3B8] mb-10 text-lg max-w-lg mx-auto">
            Select a plan that perfectly aligns with your growth trajectory. Upgrade or downgrade at any time.
          </motion.p>

          {/* Interactive Toggle Switch */}
          <motion.div variants={fadeUp} className="bg-[#05060A] rounded-full p-1.5 flex justify-between items-center border border-[#1E293B] w-full max-w-sm mx-auto shadow-inner relative z-10">
            <button 
              onClick={() => setIsLearner(true)}
              className={`flex-1 font-bold rounded-full py-3 text-sm transition-all duration-300 z-10 relative ${isLearner ? 'bg-[#FACC15] text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              For Learners
            </button>
            <button 
              onClick={() => setIsLearner(false)}
              className={`flex-1 font-bold rounded-full py-3 text-sm transition-all duration-300 z-10 relative ${!isLearner ? 'bg-[#FACC15] text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              For Experts
            </button>
          </motion.div>
        </motion.section>

        {/* --- PRICING CARDS GRID --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center mb-16"
        >
          
          {/* FREE PLAN */}
          <motion.div variants={fadeUp} className="h-full">
            <GlowCard className="p-8 flex flex-col h-full hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 text-xl bg-[#05060A]">
                  <FaRegStar />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Free</h2>
                  <p className="text-gray-400 text-xs mt-1">Get started at no cost.</p>
                </div>
              </div>
              
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-4xl font-bold text-white">₹0<span className="text-base text-gray-500 font-normal">/forever</span></h2>
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-300 mb-8 flex-grow">
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Explore Experts</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>View Expert Profiles</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Access to Free Resources</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Community Access</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Book Free Discovery Call</span></div>
              </div>

              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors duration-300">
                Get Started Free
              </button>
            </GlowCard>
          </motion.div>

          {/* PRO PLAN (ELEVATED) */}
          <motion.div variants={fadeUp} className="h-full relative z-20 md:scale-105 lg:scale-110">
            <div className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col h-full bg-gradient-to-b from-[#1A1500] to-[#0A0D14] border-2 border-[#FACC15] shadow-[0_20px_60px_rgba(250,204,21,0.15)] group hover:-translate-y-2 transition-transform duration-300">
              
              {/* Internal Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#FACC15]/20 to-transparent pointer-events-none"></div>

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FACC15] text-black text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest shadow-[0_0_15px_rgba(250,204,21,0.5)] z-20">
                MOST POPULAR
              </div>

              <div className="flex items-center gap-4 mb-6 pt-2 relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#FACC15]/10 border border-[#FACC15] flex items-center justify-center text-[#FACC15] text-2xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                  <FaCrown />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Pro</h2>
                  <p className="text-gray-300 text-xs mt-1">Unlock more features.</p>
                </div>
              </div>
              
              <div className="mb-8 border-b border-[#FACC15]/20 pb-6 relative z-10">
                <h2 className="text-5xl font-bold text-[#FACC15]">₹499<span className="text-base text-gray-400 font-normal">/month</span></h2>
              </div>

              <div className="flex flex-col gap-4 text-sm text-[#E2E8F0] mb-8 flex-grow relative z-10">
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span className="font-semibold text-white">All Free Features</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Book 1:1 Paid Sessions</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Priority Expert Support</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Session Reminders</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Exclusive Discounts</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Full Session History</span></div>
              </div>

              <button className="w-full py-4 rounded-xl bg-[#FACC15] text-black font-bold text-lg shadow-[0_5px_20px_rgba(250,204,21,0.3)] hover:shadow-[0_10px_30px_rgba(250,204,21,0.6)] transition-all transform hover:-translate-y-1 relative z-10">
                Choose Pro Plan
              </button>
            </div>
          </motion.div>

          {/* PREMIUM PLAN */}
          <motion.div variants={fadeUp} className="h-full">
            <GlowCard className="p-8 flex flex-col h-full hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white text-xl bg-[#05060A]">
                  <FaRegGem />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Premium</h2>
                  <p className="text-gray-400 text-xs mt-1">The complete experience.</p>
                </div>
              </div>
              
              <div className="mb-8 border-b border-white/10 pb-6">
                <h2 className="text-4xl font-bold text-white">₹999<span className="text-base text-gray-500 font-normal">/month</span></h2>
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-300 mb-8 flex-grow">
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span className="font-semibold text-white">All Pro Features</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Unlimited 1:1 Sessions</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Personalized Guidance</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Top Expert Access</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Dedicated 24/7 Support</span></div>
                <div className="flex items-start gap-3"><FaCircleCheck className="text-[#FACC15] mt-1 shrink-0" /> <span>Advanced Session Insights</span></div>
              </div>

              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:border-white hover:bg-white/5 transition-colors duration-300">
                Choose Premium
              </button>
            </GlowCard>
          </motion.div>

        </motion.section>

        {/* --- SECURE PAYMENTS BANNER --- */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="w-full max-w-3xl"
        >
          <div className="rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center justify-center gap-5 border border-green-500/20 bg-gradient-to-t from-green-500/5 to-[#0B0D14] backdrop-blur-md shadow-lg">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-2xl flex-shrink-0 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <FaShieldHalved />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-white font-bold tracking-wide">100% Secure Payments</h4>
              <p className="text-[#94A3B8] text-sm mt-1">Transactions are encrypted and secured by industry-leading payment gateways.</p>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}