"use client";

import { motion } from "framer-motion";
import { 
  FaLink, FaUserCheck, FaUsers, FaMagnifyingGlass, 
  FaVideo, FaArrowTrendUp, FaStar, FaArrowRight 
} from "react-icons/fa6";
import { FaCalendarCheck, FaCalendar } from "react-icons/fa";

export default function About() {
  return (
    <div className="w-full">
      {/* Main Content Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col gap-20">
        
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-gold text-sm font-bold tracking-[0.2em] mb-3 uppercase">About Us</h3>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                Empowering Growth with <br/><span className="text-gold">YB Connect</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                YB Connect is Indias trusted mentorship platform that connects learners with verified experts from diverse fields. From booking 1:1 sessions to building real connections, we empower you to learn, grow, and achieve your goals.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mt-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel text-gold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,184,65,0.2)]">
                  <FaUserCheck />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">10K+</h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Verified Experts</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel text-gold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,184,65,0.2)]">
                  <FaCalendarCheck />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">50K+</h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Sessions Booked</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel text-gold flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,184,65,0.2)]">
                  <FaUsers />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">1L+</h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Happy Learners</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Logo / Image Centerpiece */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full h-[400px] flex justify-center items-center"
          >
            {/* Decorative background elements */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-gold/20 animate-pulse-glow"></div>
            <div className="absolute w-[450px] h-[450px] rounded-full border border-gold/5 rotate-45 border-dashed"></div>
            
            {/* Main 3D Card */}
            <div className="w-64 h-64 bg-gradient-to-br from-[#1a1f2e] to-[#0a0d14] rounded-[2rem] border border-gray-600/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex items-center justify-center relative z-10 animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[2rem]"></div>
              <div className="text-7xl font-bold tracking-wider flex items-center gap-1 text-gray-200 drop-shadow-2xl">
                Y<span className="text-gold drop-shadow-[0_0_15px_rgba(245,184,65,0.8)]"><FaLink className="text-5xl" /></span>B
              </div>
            </div>
            
            {/* Pedestal */}
            <div className="absolute bottom-0 w-80 h-12 bg-gradient-to-b from-white/5 to-transparent rounded-[100%] blur-md"></div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* How It Works Section */}
        <section className="flex flex-col items-center text-center relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-bold tracking-[0.2em] mb-2 uppercase"
          >
            Process
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            How It <span className="text-gold">Works</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-gold to-transparent rounded-full mb-12"
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] border-t border-dashed border-gold/30 z-0"></div>

            {/* Steps */}
            {[
              { num: "01", title: "Discover", icon: <FaMagnifyingGlass />, desc: "Explore categories and find the perfect expert for your specific goals." },
              { num: "02", title: "Book a Session", icon: <FaCalendar />, desc: "Choose a time that suits you and book your 1:1 session instantly." },
              { num: "03", title: "Connect & Learn", icon: <FaVideo />, desc: "Join the secure video session, connect with your mentor, and learn." },
              { num: "04", title: "Grow & Achieve", icon: <FaArrowTrendUp />, desc: "Apply your learnings to achieve real results with expert guidance." }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="glass-panel p-8 rounded-2xl relative z-10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group bg-[#0A0E17]/80"
              >
                <div className="w-20 h-20 rounded-full bg-[#05060A] border-2 border-gold/40 text-gold flex items-center justify-center text-2xl mb-6 group-hover:bg-gold group-hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(245,184,65,0.1)]">
                  {step.icon}
                </div>
                <h4 className="font-bold text-xl mb-3 text-white"><span className="text-gold opacity-50 mr-2">{step.num}</span> {step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Banner */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="w-full bg-gradient-to-r from-gold/10 via-transparent to-gold/5 border border-gold/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden shadow-[0_0_30px_rgba(245,184,65,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="flex items-center gap-6 z-10">
              <div className="w-16 h-16 rounded-full glass-panel border border-gold text-gold flex items-center justify-center text-2xl flex-shrink-0 bg-black/20 shadow-[0_0_15px_rgba(245,184,65,0.2)]">
                <FaStar />
              </div>
              <div>
                <h4 className="text-gold font-bold text-xl mb-2">Our Mission</h4>
                <p className="text-gray-300 text-lg max-w-2xl">To create a world where anyone can access the right guidance and grow beyond boundaries.</p>
              </div>
            </div>
            
            <button className="z-10 px-8 py-3 rounded-xl border-2 border-gold text-gold font-bold hover:bg-gold hover:text-black transition-all whitespace-nowrap flex items-center gap-2">
              Join the Community <FaArrowRight />
            </button>
          </div>
        </motion.section>

      </main>
    </div>
  );
}