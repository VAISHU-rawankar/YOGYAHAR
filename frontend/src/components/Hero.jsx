import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../assets/hero-bg.png";
import heroBanner0 from "../assets/hero_banner_0.png";
import heroBanner1 from "../assets/hero_banner_1.png";
import heroBanner2 from "../assets/hero_banner_2.png";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { Leaf, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
 
const defaultContent = {
  eyebrow: "YOGYAHAR — Follow Your Diet With Us!",
  headingLine1: "Fresh. Natural. Hygienic.",
  headingLine2: "Tasty. Authentic.",
  paragraph:
    "No preservatives, no chemicals, no artificial colors, no added sugar, only Pure Products.",
  heroBg,
  features: [
    { icon: "🌿", title: "Fresh & Natural", sub: "No Chemicals" },
    { icon: "🚫", title: "No Preservatives", sub: "No Added Sugar" },
    { icon: "🚚", title: "Doorstep Delivery", sub: "Across Nashik" },
    { icon: "🥗", title: "100% Vegetarian", sub: "Made to Order" },
  ],
};
 
const iconMap = {
  "🌿": Leaf,
  "🚫": ShieldCheck,
  "🚚": Truck,
  "🥗": Sparkles,
};
 
export default function Hero({ onConnect, onGrabSample = null }) {
  const [content] = useSectionContent("hero", defaultContent);
  const { eyebrow, headingLine1, headingLine2, paragraph, features } = content;
  const { t } = useLanguage();

  const bannerImages = [
    heroBanner0,
    heroBanner1,
    heroBanner2,
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000); // Rotates smoothly every 3 seconds

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <section className="bg-gradient-to-br from-[#f3f7cb] via-[#e7f2ac] to-[#cfe789] overflow-hidden relative">
 
      {/* Floating Decorative Elements */}
      <Leaf className="absolute left-[8%] top-[20%] w-6 h-6 text-[#5b7b2e]/20 animate-float-slow hidden lg:block pointer-events-none z-10" />
      <Sparkles className="absolute left-[40%] top-[15%] w-5 h-5 text-[#f5d13a]/30 animate-float-fast hidden lg:block pointer-events-none z-10" />
      <Leaf className="absolute left-[3%] bottom-[15%] w-8 h-8 text-[#5b7b2e]/10 animate-float-mid hidden lg:block pointer-events-none z-10" />
      <Sparkles className="absolute left-[45%] bottom-[20%] w-6 h-6 text-[#5b7b2e]/15 animate-float-slow hidden lg:block pointer-events-none z-10" />
 
      {/* Background image slideshow (3s rotation) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBannerIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-center lg:bg-right bg-no-repeat opacity-100"
            style={{
              backgroundImage: `url(${bannerImages[currentBannerIndex]})`,
              backgroundSize: currentBannerIndex === 0 ? "cover" : "contain",
            }}
          />
        </AnimatePresence>
      </div>
  
      {/* Mobile background gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3f7cb]/60 via-[#f3f7cb]/30 to-[#f3f7cb]/70 z-5 pointer-events-none lg:hidden" />
  
      {/* Desktop background gradient overlay for text readability */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#f3f7cb] from-30% to-transparent to-55% z-5 pointer-events-none" />
 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-0 lg:gap-10 items-center relative z-10 pt-8 pb-8 lg:pt-[65px] lg:pb-[65px]">
        {/* Text content */}
        <div className="lg:col-span-6 px-2 lg:p-0 lg:rounded-none lg:-translate-x-4">
          <span className="block text-xs font-semibold tracking-[3px] text-[#5f7a3a] uppercase mb-3 leading-relaxed opacity-0 animate-fadeInUp fill-mode-forwards delay-100">
            {eyebrow}
          </span>
          <h1 className="leading-[1.04] text-[#1f2b12] font-sans font-semibold opacity-0 animate-fadeInUp fill-mode-forwards delay-200" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
            {headingLine1}
            <span className="block font-semibold text-[#5b7b2e] mt-1">{headingLine2}</span>
          </h1>
          <p className="my-5 text-[#535a44] text-sm md:text-base max-w-md leading-relaxed opacity-0 animate-fadeInUp fill-mode-forwards delay-350">{paragraph}</p>
          <div className="flex flex-wrap items-center gap-3 mb-7 opacity-0 animate-fadeInUp fill-mode-forwards delay-500">
            {onGrabSample && (
              <button
                onClick={onGrabSample}
                className="inline-flex items-center gap-2 rounded-full bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] border border-[#cfe04a]/40 px-6 py-3.5 text-xs sm:text-sm font-extrabold transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer"
              >
                {t("Grab Your Sample")}
              </button>
            )}
            <button
              onClick={onConnect}
              className="inline-flex items-center gap-2 rounded-full bg-[#cfe04a] hover:bg-[#c2d43c] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#1f2b12] transition-all hover:scale-[1.03] hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer"
            >
              {t("Connect Now!")} &rarr;
            </button>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#1f2b12] bg-white/50 hover:bg-[#1f2b12] text-[#1f2b12] hover:text-[#cfe04a] px-7 py-3.5 text-xs sm:text-sm font-extrabold transition-all shadow-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95"
            >
              {t("Explore Products")} &rarr;
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 md:gap-x-7 md:gap-y-3 pb-8 lg:pb-0 opacity-0 animate-fadeInUp fill-mode-forwards delay-650">
            {features.map((f, idx) => {
              let IconComponent = iconMap[f.icon];
              if (!IconComponent) {
                const fallbacks = [Leaf, ShieldCheck, Truck, Sparkles];
                IconComponent = fallbacks[idx % 4];
              }
              return (
                <div
                  key={f.title}
                  className="flex items-center gap-2.5 text-[11.5px] sm:text-xs font-medium text-[#20281a] text-left group/feat cursor-default"
                >
                  <span className="w-9 h-9 rounded-full border-[1.5px] border-[#3d5223]/30 bg-[#3d5223]/5 flex items-center justify-center text-base text-[#1f2b12] shrink-0 shadow-sm group-hover/feat:scale-110 group-hover/feat:rotate-12 group-hover/feat:border-[#5b7b2e] transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-[#1f2b12] group-hover/feat:text-[#5b7b2e] transition-colors" strokeWidth={2} />
                  </span>
                  <span>
                    {f.title}
                    <br />
                    <span className="text-[10px] text-[#6a7059] font-normal">{f.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop right spacing placeholder */}
        <div className="hidden lg:block lg:col-span-6 h-[350px]" />
      </div>
    </section>
  );
}

