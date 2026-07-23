"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaScaleBalanced, FaArrowRight, FaRotateLeft } from "react-icons/fa6";

export default function RefundPolicy() {
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
            <FaScaleBalanced /> FINANCIAL & ESCROW COMPLIANCE
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-tight text-white">
            Refund & Cancellation Policy
          </h1>
          
          <p className="text-gray-400 text-sm tracking-wide uppercase">
            Effective Date: May 2026 | Organization: YB Connect
          </p>
        </motion.section>

        {/* --- LEGAL CONTENT --- */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none text-gray-300 space-y-12"
        >
          {/* SECTION 1 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">1. Introduction to our Escrow System</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              At YB Connect, we utilize a secure Escrow payment system. When a learner books a session, the funds are held securely by our payment gateway (Razorpay). The expert is only paid <strong>after</strong> the video session is successfully completed. This ensures a trustless, risk-free environment for both learners and experts. 
            </p>
            <p className="leading-relaxed text-[15px]">
              Our cancellation policies are strictly designed to respect the time of our high-value industry experts, while simultaneously protecting learners from unfulfilled commitments.
            </p>
          </div>

          {/* SECTION 2 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">2. Cancellation by the Learner (Student)</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              We understand that schedules change. However, because experts block out valuable time on their calendars for these 1-on-1 sessions, we enforce a strict 24-hour notice period.
            </p>
            
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15] mb-6">
              <li><strong className="text-gray-200">The 24-Hour Rule:</strong> You may cancel or reschedule your session entirely free of charge up to 24 hours before the scheduled start time. You will receive a 100% refund.</li>
              <li><strong className="text-gray-200">Late Cancellations:</strong> Cancellations made less than 24 hours before the scheduled session are <strong>strictly non-refundable</strong>. The expert will be paid for reserving their time.</li>
              <li><strong className="text-gray-200">Learner No-Show:</strong> If you do not join the Zoom video session within 10 minutes of the scheduled start time, our automated system marks the session as a "Learner No-Show." No refunds will be issued.</li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-[#FACC15] font-bold mb-2">Scenario Examples:</h4>
              <p className="text-sm text-gray-300 mb-2"><strong>Scenario A (Refundable):</strong> You book a session for Friday at 5:00 PM. You realize you are busy and hit 'Cancel' on Thursday at 3:00 PM (26 hours prior). The escrow is released back to your original payment method in full.</p>
              <p className="text-sm text-gray-300"><strong>Scenario B (Non-Refundable):</strong> You book a session for Friday at 5:00 PM. You attempt to cancel on Friday at 11:00 AM (6 hours prior). Because the expert has already committed this time slot, the refund is denied.</p>
            </div>
          </div>

          {/* SECTION 3 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">3. Cancellation or No-Show by the Expert</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              We hold our mentors and industry experts to the highest standards of professionalism. Learners are fully protected against expert absences.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15] mb-6">
              <li><strong className="text-gray-200">Expert Cancellation:</strong> If an expert cancels a booked session at any time (even 1 minute before), you will immediately receive a 100% full refund, or you may choose to reschedule for free.</li>
              <li><strong className="text-gray-200">The 10-Minute Rule (Expert No-Show):</strong> We utilize Zoom API Webhooks to track meeting attendance. If the expert fails to join the video session within 10 minutes of the scheduled start time, the session is automatically voided, and you are entitled to a 100% full refund.</li>
            </ul>
          </div>

          {/* SECTION 4 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">4. Technical Issues & Platform Outages</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              If a session cannot be completed due to severe technical difficulties, the responsibility dictates the refund eligibility:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-[15px] text-gray-400 marker:text-[#FACC15]">
              <li><strong className="text-gray-200">Platform Failures (Zoom / YB Connect):</strong> If the Zoom meeting link fails to generate, or our servers experience downtime preventing the session from occurring, you will receive a 100% refund or a free reschedule.</li>
              <li><strong className="text-gray-200">User Connectivity Issues:</strong> YB Connect is not responsible for personal internet outages, hardware failures, or network instability on the learner's end. Sessions missed due to user connectivity issues are not eligible for a refund.</li>
            </ul>
            <p className="leading-relaxed text-[15px] mt-4 text-gray-300">
              *If technical issues occur, you must open a support ticket within <strong>12 hours</strong> of the session's end time so our engineers can review the server and connection logs.
            </p>
          </div>

          {/* SECTION 5 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">5. Refund Processing Timeline</h2>
            <p className="leading-relaxed text-[15px] mb-4">
              When a refund is triggered (either manually by support or automatically by a cancellation), the funds are released from our Razorpay Escrow account directly back to the source.
            </p>
            <p className="leading-relaxed text-[15px] mb-4">
              All approved refunds are processed automatically to your original method of payment (UPI, Credit Card, Debit Card, or NetBanking). 
            </p>
            <div className="bg-[#111520] border border-[#1e293b] p-4 rounded-lg inline-block w-full">
              <p className="text-sm text-[#38bdf8] font-bold"><FaRotateLeft className="inline mr-2" /> Standard Banking Turnaround: 5 to 7 Business Days</p>
              <p className="text-xs text-gray-400 mt-2">Please note that while YB Connect initiates the refund instantly, the time it takes for the funds to reflect in your account depends entirely on your bank's processing queues and RBI guidelines.</p>
            </div>
          </div>

          {/* SECTION 6 */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-white mb-4 border-l-4 border-[#FACC15] pl-4">6. Dispute Resolution</h2>
            <p className="leading-relaxed text-[15px]">
              If you believe a session was unjustly marked as completed, or if an expert ended the session prematurely without providing the promised guidance, you have a <strong>12-hour window</strong> after the session concludes to file a dispute. Once 12 hours pass, the funds are permanently released to the expert's payout queue and cannot be reversed.
            </p>
          </div>

        </motion.section>

        {/* --- BOTTOM CTA CARD --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-24 p-8 sm:p-10 rounded-[2rem] border border-white/10 bg-[#111520]/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3 font-serif">Need to file a dispute?</h3>
            <p className="text-[15px] text-gray-400 max-w-md leading-relaxed">
              If you experienced an expert no-show or a severe technical failure, contact our support team immediately. Please include your Booking ID in the email.
            </p>
          </div>
          
          <a href="mailto:yashwanthbondapalli@ybconnect.in" className="relative z-10 whitespace-nowrap bg-transparent border border-[#FACC15] text-[#FACC15] px-8 py-4 rounded-xl font-bold hover:bg-[#FACC15] hover:text-black transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]">
            Email Support Team <FaArrowRight />
          </a>
        </motion.div>

      </main>
    </div>
  );
}