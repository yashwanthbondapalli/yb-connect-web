"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaShieldHalved, FaArrowRight } from "react-icons/fa6";

export default function PrivacyPolicy() {
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#0B0D14] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black pb-24">
      
      {/* Cinematic Ambient Lighting - Kept very subtle for readability */}
      <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] bg-indigo-900/10 pointer-events-none z-0"></div>

      <main className="max-w-4xl mx-auto w-full px-6 py-20 relative z-10 flex flex-col">
        
        {/* --- HEADER --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center w-full mb-16 border-b border-white/10 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            <FaShieldHalved /> LEGAL COMPLIANCE
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-white">
            Privacy Policy
          </h1>
          
          <p className="text-gray-400 text-sm tracking-wide">
            LAST UPDATED: MAY 4, 2026
          </p>
        </motion.section>

        {/* --- LEGAL CONTENT --- */}
        {/* We use a specific typography container for perfect reading width and line height */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none text-gray-300 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed text-[15px]">
              At YB Connect, we take your privacy as seriously as your professional growth. This Privacy Policy outlines how we collect, use, protect, and handle your Personally Identifiable Information (PII) in accordance with global data protection standards, including GDPR and the Digital Personal Data Protection Act of India.
            </p>
            <p className="leading-relaxed text-[15px] mt-4">
              By accessing or using our platform, you consent to the practices described in this policy. If you do not agree with this policy, please do not access or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">2. Information We Collect</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              We collect information to provide better services to all our users—from figuring out basic stuff like which language you speak, to more complex things like which experts are most relevant to your career trajectory.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Account Information:</strong> Name, email address, phone number, and professional credentials when you register.</li>
              <li><strong className="text-gray-200">Transaction Data:</strong> Secure payment details required to facilitate 1:1 mentorship bookings (processed by our secure payment partners; we do not store full credit card numbers).</li>
              <li><strong className="text-gray-200">Usage Data:</strong> Information about how you use our platform, including video session durations, search queries, and interaction metrics.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">3. How We Use Your Information</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              The data we collect is utilized strictly to elevate your experience on YB Connect. We do not sell your personal data to third-party data brokers.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li>To facilitate, schedule, and secure 1:1 video mentorship sessions.</li>
              <li>To algorithmically match learners with the most relevant industry experts.</li>
              <li>To process secure transactions and prevent fraudulent activity.</li>
              <li>To send you administrative messages, session reminders, and platform updates.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">4. Data Security & Storage</h2>
            <p className="leading-relaxed text-[15px]">
              We implement enterprise-grade security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. All sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 mt-10">5. Video Session Privacy</h2>
            <p className="leading-relaxed text-[15px]">
              All 1:1 video sessions hosted on YB Connect are end-to-end encrypted. We do not record video sessions unless explicitly requested and consented to by both the learner and the expert for educational review purposes. If recorded, these files are stored securely and automatically deleted after 30 days.
            </p>
          </div>

        </motion.section>

        {/* --- BOTTOM CTA CARD --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-20 p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Have questions about your data?</h3>
            <p className="text-sm text-gray-400">Our privacy team is available to help clarify any of our policies.</p>
          </div>
          <button className="whitespace-nowrap bg-transparent border border-[#FACC15] text-[#FACC15] px-8 py-3.5 rounded-xl font-bold hover:bg-[#FACC15] hover:text-black transition-colors duration-300 flex items-center gap-3">
            Contact Privacy Team <FaArrowRight />
          </button>
        </motion.div>

      </main>
    </div>
  );
}