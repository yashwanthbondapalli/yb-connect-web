"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaScaleBalanced, FaArrowRight } from "react-icons/fa6";

export default function TermsOfService() {
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#0B0D14] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black pb-24">
      
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] bg-indigo-900/10 pointer-events-none z-0"></div>

      <main className="max-w-4xl mx-auto w-full px-6 py-20 relative z-10 flex flex-col">
        
        {/* --- HEADER --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center w-full mb-16 border-b border-white/10 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            <FaScaleBalanced /> PLATFORM RULES
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-white">
            Terms of Service
          </h1>
          
          <p className="text-gray-400 text-sm tracking-wide">
            EFFECTIVE DATE: MAY 4, 2026
          </p>
        </motion.section>

        {/* --- LEGAL CONTENT --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none text-gray-300 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-[15px]">
              Welcome to YB Connect. By accessing our platform, registering an account, or booking a mentorship session, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">2. The YB Connect Marketplace Model</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              YB Connect operates as a technological bridge connecting individuals seeking guidance ("Learners") with industry professionals ("Experts"). 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Independent Contractors:</strong> Experts on YB Connect are independent professionals, not employees, agents, or representatives of YB Connect.</li>
              <li><strong className="text-gray-200">No Guarantees:</strong> While we rigorously vet our Experts, YB Connect does not guarantee specific career outcomes, job placements, or financial success resulting from 1:1 sessions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">3. Bookings, Payments & Platform Fees</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              To maintain the infrastructure of our global platform, YB Connect processes all transactions securely and applies transparent fee structures.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Transactions:</strong> All payments for paid sessions must be conducted through the YB Connect platform. Attempting to bypass the platform for payment violates these terms and will result in immediate account termination.</li>
              <li><strong className="text-gray-200">Expert Payouts:</strong> Experts receive their earnings subject to our standard platform commission fee, processed via our secure payout partners.</li>
              <li><strong className="text-gray-200">Cancellations:</strong> Sessions can be rescheduled or cancelled up to 24 hours before the scheduled start time for a full refund. No-shows are not eligible for refunds.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">4. User Code of Conduct</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              Excellence is our core value. All users must maintain professional decorum during video sessions and text interactions. You agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li>Engage in harassment, hate speech, or discriminatory behavior.</li>
              <li>Record video sessions without explicit, documented consent from all participating parties.</li>
              <li>Share confidential corporate information or proprietary trade secrets during sessions.</li>
              <li>Use the platform to solicit illicit services or spam users with marketing materials.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">5. Limitation of Liability</h2>
            <p className="leading-relaxed text-[15px]">
              In no event shall YB Connect, its directors, employees, or partners be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform.
            </p>
          </div>

        </motion.section>

        {/* --- BOTTOM CTA CARD --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-20 p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Need further clarification?</h3>
            <p className="text-sm text-gray-400">Our legal and support teams are available to assist you.</p>
          </div>
          <button className="whitespace-nowrap bg-transparent border border-[#FACC15] text-[#FACC15] px-8 py-3.5 rounded-xl font-bold hover:bg-[#FACC15] hover:text-black transition-colors duration-300 flex items-center gap-3">
            Contact Support <FaArrowRight />
          </button>
        </motion.div>

      </main>
    </div>
  );
}