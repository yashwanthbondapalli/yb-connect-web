"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaCircleInfo, FaArrowRight, FaDownload, FaVideo, FaTrashCan } from "react-icons/fa6";

export default function ZoomIntegrationGuide() {
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#05060A] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black pb-24">
      
      {/* Cinematic Ambient Background Light */}
      <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] bg-indigo-900/10 pointer-events-none z-0"></div>

      <main className="max-w-4xl mx-auto w-full px-6 py-20 relative z-10 flex flex-col">
        
        {/* --- HEADER --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center w-full mb-16 border-b border-white/10 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[12px] font-bold tracking-[0.2em] uppercase text-[#FACC15] mb-6">
            <FaCircleInfo /> Integration Directory
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-white">
            Zoom App Marketplace Integration Guide
          </h1>
          
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Learn how to safely install, configure, use, and completely remove the YB Connect integration from your personal or corporate Zoom account.
          </p>
        </motion.section>

        {/* --- CONTENT SECTIONS --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="space-y-16 text-gray-300"
        >
          
          {/* Section 1: Installation */}
          <div className="border-l-2 border-[#FACC15] pl-6 md:pl-8 relative">
            <div className="absolute -left-[13px] top-0 bg-[#05060A] p-1 border border-[#FACC15] rounded-full text-xs text-[#FACC15]">
              <FaDownload />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 font-serif">1. How to Install & Authorize</h2>
            <p className="text-[15px] leading-relaxed mb-4">
              To connect your Zoom account to YB Connect for seamless 1:1 mentorship scheduling, follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[15px] text-gray-400">
              <li>Log into your secure <strong className="text-white">YB Connect</strong> dashboard.</li>
              <li>Navigate to <strong className="text-white">Account Settings &gt; Integrations</strong>.</li>
              <li>Locate the Zoom integration card and click on <strong className="text-[#FACC15]">Connect Zoom Account</strong>.</li>
              <li>You will be securely redirected to the official Zoom App Marketplace authorization screen.</li>
              <li>Review the requested permissions (Meeting Creation and Management) and click <strong className="text-white">Allow</strong>.</li>
            </ol>
          </div>

          {/* Section 2: Usage */}
          <div className="border-l-2 border-indigo-500 pl-6 md:pl-8 relative">
            <div className="absolute -left-[13px] top-0 bg-[#05060A] p-1 border border-indigo-500 rounded-full text-xs text-indigo-400">
              <FaVideo />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 font-serif">2. How to Use the Integration</h2>
            <p className="text-[15px] leading-relaxed mb-4">
              Once connected, YB Connect dynamically manages your availability and event delivery paths automatically:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400">
              <li>
                <strong className="text-white">Automated Links:</strong> When a learner maps out and purchases a 1:1 session with an expert, our background service instantly speaks to the Zoom API to spin up a custom, password-secured meeting space.
              </li>
              <li>
                <strong className="text-white">Calendar Synchronization:</strong> Both the Mentor and the Learner will instantly receive automated confirmation emails containing the generated `zoom.us` access link, integrated calendar invitations, and absolute scheduling guidelines.
              </li>
            </ul>
          </div>

          {/* Section 3: Deauthorization / Uninstallation */}
          <div className="border-l-2 border-red-500 pl-6 md:pl-8 relative">
            <div className="absolute -left-[13px] top-0 bg-[#05060A] p-1 border border-red-500 rounded-full text-xs text-red-400">
              <FaTrashCan />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 font-serif">3. How to Uninstall & Disconnect</h2>
            <p className="text-[15px] leading-relaxed mb-4">
              If you wish to terminate the link between your platform profile and Zoom, you can safely completely delete the app connection at any time:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[15px] text-gray-400 mb-6">
              <li>Log into your personal <strong className="text-white">Zoom Account</strong> and navigate directly to the <a href="https://marketplace.zoom.us/" target="_blank" rel="noreferrer" className="text-red-400 underline hover:text-red-300">Zoom App Marketplace</a>.</li>
              <li>Click on <strong className="text-white">Manage &gt; Added Apps</strong> in the upper right corner of the dashboard, or search directly for the <strong className="text-white">YB Connect</strong> application.</li>
              <li>Locate our app layout listing card and click the <strong className="text-red-500">Remove / Uninstall</strong> option.</li>
              <li>Confirm the action profile parameters. Zoom will instantly break the token link and cleanly notify our background server to scrub your active integration data.</li>
            </ol>
          </div>

        </motion.section>

        {/* --- SUPPORT CTA --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-20 p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Stuck with your integration setup?</h3>
            <p className="text-sm text-gray-400">Our engineering and technical operations teams can help you map out API parameters manually.</p>
          </div>
          <a 
            href="/contact"
            className="whitespace-nowrap bg-transparent border border-[#FACC15] text-[#FACC15] px-8 py-3.5 rounded-xl font-bold hover:bg-[#FACC15] hover:text-black transition-colors duration-300 flex items-center gap-3"
          >
            Open Ticket <FaArrowRight />
          </a>
        </motion.div>

      </main>
    </div>
  );
}
