"use client";

import { motion, Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { 
  FaStar, FaArrowDown, FaUser, FaShieldHalved, 
  FaMagnifyingGlass, FaVideo, FaChevronRight 
} from "react-icons/fa6";
import { FaRegPlayCircle, FaCalendarCheck } from "react-icons/fa";

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#05060A] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#FACC15] selection:text-black">
      
      {/* --- BACKGROUND GLOWS & SWOOSH --- */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[50px] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,rgba(5,6,10,0)_70%)] animate-pulse-glow pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[50px] bg-[radial-gradient(circle,rgba(250,204,21,0.15)_0%,rgba(5,6,10,0)_70%)] animate-pulse-glow pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>
      
      {/* Signature Wavy Glowing Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[100px] left-[-10%] w-[120%] h-[800px] z-0 pointer-events-none bg-no-repeat bg-cover bg-center" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600'%3E%3Cpath fill='none' stroke='url(%23gradient)' stroke-width='4' stroke-linecap='round' filter='url(%23glow)' d='M0,400 C300,500 500,200 800,150 C1100,100 1300,300 1440,250'/%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='rgba(139, 92, 246, 0.1)'/%3E%3Cstop offset='50%25' stop-color='%23A855F7'/%3E%3Cstop offset='100%25' stop-color='%23FACC15'/%3E%3C/linearGradient%3E%3Cfilter id='glow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeGaussianBlur stdDeviation='15' result='blur'/%3E%3CfeMerge%3E%3CfeMergeNode in='blur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E\")" }}
      ></motion.div>

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-32 relative z-10 flex flex-col lg:flex-row items-center gap-4">
        
        {/* Left Content */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="w-full lg:w-[50%] flex flex-col items-start text-left lg:-mt-40 lg:ml-16 z-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111623] border border-[#1E293B] text-[11px] font-medium text-[#FACC15] mb-8 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
            <FaStar className="animate-pulse" /> India's Trusted Mentorship Platform
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Mentor. Connect.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-yellow-200">Grow.<span className="text-3xl relative -top-6 ml-1 animate-bounce inline-block text-white">✨</span></span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[#94A3B8] text-[16px] md:text-[18px] mb-10 max-w-lg leading-relaxed">
            Connect with verified mentors, book 1:1 sessions, and accelerate your personal and professional growth through high-level networking.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
            <button className="bg-[#FACC15] text-black px-8 py-3.5 rounded-full font-bold hover:bg-[#EAB308] hover:scale-105 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all duration-300 flex items-center gap-2 text-sm group">
              Download Now <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button className="bg-[rgba(10,14,23,0.7)] backdrop-blur-md border border-white/5 text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm group">
              Watch Demo <FaRegPlayCircle className="text-[#FACC15] text-lg group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-12">
            <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300 cursor-pointer">
              <img className="w-10 h-10 rounded-full border-2 border-[#05060A] object-cover hover:z-10 hover:scale-110 transition-transform" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#05060A] object-cover hover:z-10 hover:scale-110 transition-transform" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#05060A] object-cover hover:z-10 hover:scale-110 transition-transform" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-[#05060A] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-[#FACC15]">+</div>
            </div>
            <p className="text-[14px] text-[#94A3B8]">Trusted by <span className="text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">10K+</span> learners</p>
          </motion.div>
        </motion.div>

        {/* Right Content (3D Floating Phones) */}
        <div className="w-full lg:w-[40%] relative h-[500px] lg:h-[650px] flex justify-center lg:justify-end z-10 hidden md:flex">
          {/* Back Phone */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.6, scale: 0.95 }} transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-[15%] lg:right-[5%] top-[40px] w-[260px] h-[550px] border-[6px] border-[#1E293B] rounded-[2.5rem] bg-black overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-float-delayed"
          >
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-black rounded-full z-10"></div>
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80" className="w-full h-full object-cover filter brightness-75" alt="App Back" />
          </motion.div>
          {/* Front Phone */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="absolute right-[5%] lg:right-[25%] top-0 w-[280px] lg:w-[320px] h-[600px] lg:h-[550px] border-[6px] border-[#1E293B] rounded-[2.5rem] bg-black overflow-hidden shadow-[0_0_80px_rgba(250,204,21,0.25)] z-20 animate-float"
          >
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-black rounded-full z-10"></div>
            <img src="https://images.unsplash.com/photo-1607252656733-fd7458bc97dc?w=600&q=80" className="w-full h-full object-cover" alt="App Front" />
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES BAR (3D Tilt Effect) --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30 -mt-20 md:-mt-32">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="bg-[rgba(10,14,23,0.7)] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
            {[
              { icon: <FaUser />, title: "Expert Mentors", desc: "Learn directly from top industry professionals and leaders." },
              { icon: <FaCalendarCheck />, title: "1:1 Sessions", desc: "Book highly personalized one-on-one sessions seamlessly." },
              { icon: <FaShieldHalved />, title: "Secure & Reliable", desc: "Verified expert backgrounds and bank-grade secure payments." },
              { icon: <FaStar />, title: "High ROI", desc: "Affordable pricing for life-changing mentorship advice." },
            ].map((feature, idx) => (
              <Tilt key={idx} tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} transitionSpeed={400} className="px-4 py-4 cursor-pointer group">
                <div className="text-4xl text-[#FACC15] mb-5 flex justify-center group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] transition-all duration-300">
                    {feature.icon}
                </div>
                <h3 className="text-[19px] font-semibold mb-2 group-hover:text-[#FACC15] transition-colors">{feature.title}</h3>
                <p className="text-[14px] text-[#94A3B8] leading-relaxed mx-auto max-w-[200px]">{feature.desc}</p>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- APP PREVIEW SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center relative z-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-[#FACC15] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="text-lg leading-none animate-pulse">✨</span> APP PREVIEW
          </div>
          <h2 className="text-[36px] font-bold mb-16 drop-shadow-md">Tutorial</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="flex overflow-x-auto gap-8 pb-10 snap-x scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[
            { title: "Home Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" },
            { title: "Explore Categories", img: "https://images.unsplash.com/photo-1607252656733-fd7458bc97dc?w=500&q=80" },
            { title: "Explore Categories", img: "https://images.unsplash.com/photo-1607252656733-fd7458bc97dc?w=500&q=80" },
            { title: "Explore Categories", img: "https://images.unsplash.com/photo-1607252656733-fd7458bc97dc?w=500&q=80" },
            { title: "Expert Roster", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80" },
            { title: "Deep Profiles", img: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=500&q=80" }
          ].map((screen, idx) => (
            <div key={idx} className="snap-center shrink-0 flex flex-col items-center group cursor-pointer w-[220px]">
              <div className="w-[220px] h-[460px] border-[5px] border-[#1E293B] rounded-[2.5rem] bg-black mb-6 relative overflow-hidden group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(250,204,21,0.2)] transition-all duration-500">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60px] h-[15px] bg-black rounded-full z-10"></div>
                <img src={screen.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={screen.title} />
              </div>
              <h4 className="font-bold text-[16px] group-hover:text-[#FACC15] transition-colors">{screen.title}</h4>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- APP PREVIEW (Grid of 6 Phones) --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-[#FACC15] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">APP PREVIEW</div>
          <h2 className="text-[32px] sm:text-[40px] font-semibold mb-16 text-white">Experience The Interface</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 max-w-5xl mx-auto">
          {[
            { title: "Home", desc: "Find experts across different domains" },
            { title: "Categories", desc: "Explore categories to find the right mentor" },
            { title: "Experts", desc: "Browse and discover top experts" },
            { title: "Expert Profile", desc: "Review details, ratings and schedule" },
            { title: "Bookings", desc: "Manage your sessions seamlessly" },
            { title: "Profile", desc: "Track your personal learning journey" }
          ].map((screen, idx) => (
            <motion.div 
              key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-[220px] h-[450px] border-[4px] border-[#1E293B] rounded-[2rem] bg-[#0A0E17] mb-6 relative overflow-hidden shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[50px] h-[12px] bg-[#040508] rounded-full z-10"></div>
                <img src="https://images.unsplash.com/photo-1607252656733-fd7458bc97dc?w=400&q=80" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={screen.title} />
              </div>
              <h4 className="font-semibold text-[17px] text-white mb-1">{screen.title}</h4>
              <p className="text-[13px] text-[#94A3B8] max-w-[180px]">{screen.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-[#FACC15] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">HOW IT WORKS</div>
          <h2 className="text-[36px] font-bold mb-24">Get Started in 3 Simple Steps</h2>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between relative max-w-5xl mx-auto">
          {/* Dashed Line */}
          <div className="hidden md:block absolute top-10 left-[15%] w-[70%] h-1 border-t-2 border-dashed border-gray-600 z-0"></div>

          {[
            { num: "1", title: "Discover", icon: <FaMagnifyingGlass />, desc: "Explore curated categories and filter to find the perfect expert for your goals." },
            { num: "2", title: "Book Securely", icon: <FaCalendarCheck />, desc: "Sync calendars, pick an optimal time, and lock in your session instantly." },
            { num: "3", title: "Connect & Grow", icon: <FaVideo />, desc: "Join the high-quality video room and start accelerating your journey." }
          ].map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + (idx * 0.2) }}
              className="w-full md:w-1/3 flex flex-col items-center relative z-10 mb-16 md:mb-0 group"
            >
              <div className="w-24 h-24 rounded-full border-2 border-[#1E293B] group-hover:border-[#FACC15] flex items-center justify-center text-[#94A3B8] group-hover:text-[#FACC15] text-3xl mb-6 bg-[#0A0E17] shadow-lg group-hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-500 relative z-20 group-hover:-translate-y-2">
                {step.icon}
              </div>
              <h3 className="font-bold text-[19px] mb-3 group-hover:text-[#FACC15] transition-colors">{step.num}. {step.title}</h3>
              <p className="text-[14px] text-[#94A3B8] max-w-[220px] text-center">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-[#FACC15] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">WHAT OUR USERS SAY</div>
          <h2 className="text-[36px] font-bold mb-16">Loved by Top Minds</h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full"
        >
          {[
            { quote: "YB Connect helped me bypass months of trial and error for my startup. Direct access to industry titans is priceless.", name: "Rohit Sharma", role: "Founder, Startify", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" },
            { quote: "As an expert, the booking flow is flawless. It connects me with driven, ambitious learners exactly when I'm available.", name: "Arjun Mehta", role: "Product VP", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
            { quote: "The video streaming quality is exceptional. It honestly feels like we are sitting in the same room collaborating.", name: "Neha Verma", role: "Senior Marketer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" }
          ].map((item, idx) => (
            <div key={idx} className="bg-[rgba(10,14,23,0.7)] backdrop-blur-md border border-[#1E293B] rounded-2xl p-8 text-left hover:-translate-y-2 hover:border-[#FACC15] hover:shadow-[0_15px_30px_rgba(250,204,21,0.1)] transition-all duration-300">
              <p className="text-gray-300 text-[15px] leading-relaxed mb-6 h-24">"{item.quote}"</p>
              <div className="text-[#FACC15] text-[13px] mb-6 flex gap-1">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="flex items-center gap-4">
                <img src={item.img} className="w-12 h-12 rounded-full object-cover border-2 border-[#1E293B]" alt={item.name} />
                <div>
                  <h4 className="font-bold text-[15px] text-white">{item.name}</h4>
                  <p className="text-[12px] text-[#FACC15]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="max-w-6xl mx-auto px-6 py-16 mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 border border-[#FACC15]/30 bg-gradient-to-r from-[#1A1500] via-[#0A0E17] to-[#1A1500] shadow-[0_0_50px_rgba(250,204,21,0.15)] overflow-hidden relative"
        >
          {/* Decorative Glow inside CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FACC15]/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-black/50 border border-[#FACC15]/50 flex items-center justify-center text-[#FACC15] text-4xl shadow-[0_0_20px_rgba(250,204,21,0.4)] animate-pulse-glow flex-shrink-0">
               <FaUser />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2 text-white">Ready to Skyrocket Your Potential?</h3>
              <p className="text-[15px] text-gray-300">Join the elite network of learners and experts on YB Connect.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
            <button className="bg-[#FACC15] text-black px-8 py-4 rounded-xl font-bold hover:bg-[#EAB308] hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-all duration-300 flex items-center justify-center gap-2 text-[15px] whitespace-nowrap">
              Download App <FaArrowDown />
            </button>
            <button className="border-2 border-gray-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-2 text-[15px] whitespace-nowrap">
              Explore Mentors <FaChevronRight className="text-xs" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}