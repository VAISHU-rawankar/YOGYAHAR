import { useState } from "react";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Play } from "lucide-react";

const defaultContent = {
  testimonials: [
    {
      initials: "RP",
      name: "Dr. Rupali Pade",
      role: "Dentist",
      text: "Yogyahar's juices make me feel fresh and rejuvenated every day — sugar-free and remarkably consistent service.",
      image: "",
      type: "expert",
    },
    {
      initials: "RS",
      name: "Rishikesh Sonawane",
      role: "Civil Engineer",
      text: "A promising start-up known for excellent service and timely delivery, every single day.",
      image: "",
      type: "customer",
    },
    {
      initials: "UP",
      name: "Ujjwala Kiran Petkar",
      role: "Banker",
      text: "Their morning delivery of health-promoting juice has genuinely become a part of my healthy routine.",
      image: "",
      type: "customer",
    },
    {
      initials: "RB",
      name: "Rahul Bhamre",
      role: "Advisory System Analyst",
      text: "Refreshed and fantastic! My 30-day juice cleanse with Yogyahar was a great experience.",
      image: "",
      type: "customer",
    },
    {
      initials: "KD",
      name: "Dr. K. Deshmukh",
      role: "Nutritionist",
      text: "As a health advisor, I highly recommend Yogyahar's cold pressed juices. Their extraction process preserves essential nutrients without thermal degradation.",
      image: "",
      type: "expert",
    },
    {
      name: "Sneha Patil",
      role: "Fitness Coach",
      text: "Amazing high-protein salads and detox programs. Ideal for pre-workout and post-workout recovery.",
      image: "",
      type: "expert",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isVideo: true,
    },
    {
      name: "Pooja Shah",
      role: "Happy Customer",
      text: "Ordering fresh fruit cuts from Yogyahar has made healthy snacking so easy for my family.",
      image: "",
      type: "customer",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      isVideo: true,
    },
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    }
  },
};

export default function Testimonials() {
  const [{ testimonials }] = useSectionContent("testimonials", defaultContent);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("customer"); // 'customer' | 'expert'

  const filteredTestimonials = (testimonials || defaultContent.testimonials).filter(
    (item) => (item.type || "customer") === activeTab
  );

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#fde9ee] via-[#fdf0e6] to-[#fdf7ed]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block text-center text-xs font-bold tracking-[4px] text-[#5f7a3a] uppercase mb-4"
        >
          🍃 {t("FEEDBACK & REVIEWS")} 🍃
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-[30px] sm:text-[38px] md:text-[42px] font-display text-[#1f2b12] mb-4 font-bold leading-tight"
        >
          {t("Real People. Real Results.")}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[15px] text-[#535a44] max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          {t("Discover how YOGYAHAR is helping people across Nashik transform their health journey with daily fresh, natural, and preservative-free meals and juices.")}
        </motion.p>

        {/* Gold Leaf Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <div className="w-16 h-[1.5px] bg-[#b7c93d]/50" />
          <span className="text-[#5f7a3a] text-[12px]">🍃</span>
          <div className="w-16 h-[1.5px] bg-[#b7c93d]/50" />
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
              activeTab === "customer"
                ? "bg-[#1f2b12] text-[#cfe04a] shadow-md"
                : "bg-white text-[#535a44] border border-[#d4ddb9]/60 hover:bg-[#fafaf9]"
            }`}
          >
            {t("What Customers Say")}
          </button>
          <button
            onClick={() => setActiveTab("expert")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
              activeTab === "expert"
                ? "bg-[#1f2b12] text-[#cfe04a] shadow-md"
                : "bg-white text-[#535a44] border border-[#d4ddb9]/60 hover:bg-[#fafaf9]"
            }`}
          >
            {t("What Experts Say")}
          </button>
        </div>

        {/* Testimonials Display Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch"
          >
            {filteredTestimonials.map((item, idx) => {
              const avatarUrl = resolveImage(item.image, "");
              
              if (item.isVideo) {
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="relative bg-black rounded-[28px] overflow-hidden aspect-[4/5] shadow-md border border-[#d4ddb9]/40 group flex flex-col justify-end"
                  >
                    <video
                      src={item.videoUrl}
                      controls
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-[28px] opacity-80 group-hover:opacity-95 transition-opacity"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 p-5 text-left pointer-events-none">
                      <div className="flex gap-0.5 text-[#fbbf24] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[13px] text-white/90 leading-snug italic mb-3">
                        "{t(item.text)}"
                      </p>
                      <div className="text-white font-bold text-[14.5px] leading-none">{t(item.name)}</div>
                      <div className="text-[#cfe04a] text-[11px] font-semibold uppercase tracking-wider mt-1">{t(item.role)}</div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6,
                    scale: 1.01,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "rgba(61, 82, 35, 0.3)"
                  }}
                  className="bg-white border border-[#d4ddb9]/60 rounded-[28px] p-7 shadow-sm transition-all duration-300 flex flex-col justify-between relative text-left"
                >
                  <div className="absolute top-6 right-7 select-none pointer-events-none opacity-80">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* 5 Golden Stars */}
                      <div className="flex gap-0.5 text-[#fbbf24] mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[14.5px] text-[#535a44] leading-relaxed italic font-medium">
                        "{t(item.text)}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 border-t border-[#e6ecd2] pt-4 mt-auto">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={item.name}
                          className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[#d4ddb9]/60 shrink-0 shadow-sm"
                        />
                      ) : (
                        <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#cfe04a] to-[#3d5223] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-inner">
                          {item.initials || item.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-[15px] text-[#1f2b12] leading-snug">{t(item.name)}</div>
                        <div className="text-[#6a7059] text-[11px] font-semibold mt-0.5 uppercase tracking-wide">{t(item.role)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
