import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Flame, Sparkles, ArrowRight } from "lucide-react";

export default function TrendingNow() {
  return null;

  const trendingItems = [
    { name: "Watermelon Juice", label: "Juices", emoji: "🍉", tag: "Hot Seller", bg: "from-[#ff6b6b] to-[#ff8e53]", category: "juices" },
    { name: "Fruit Cuts", label: "Salads", emoji: "🍎", tag: "Fresh Daily", bg: "from-[#ff758c] to-[#ff7eb3]", category: "salads" },
    { name: "Detox Water", label: "Hydration", emoji: "🫒", tag: "Best Cleanse", bg: "from-[#a8e6cf] to-[#3d84a8]", category: "detox" },
    { name: "Super Laddu", label: "Energy", emoji: "🍡", tag: "High Protein", bg: "from-[#f7b731] to-[#e1b12c]", category: "nonSubItems" },
    { name: "Cold Pressed Oil", label: "Purity", emoji: "🫗", tag: "100% Organic", bg: "from-[#f6d365] to-[#fda085]", category: "nonSubItems" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#12240e] via-[#243d1a] to-[#172c12] py-6 sm:py-8 text-white overflow-hidden border-y border-[#cfe04a]/20 shadow-2xl">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-[#cfe04a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-[#4a6b2a]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">
        
        {/* Left Headline Badge */}
        <div className="flex items-center gap-3 shrink-0 bg-black/30 border border-[#cfe04a]/30 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cfe04a] opacity-40" />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f7b731] to-[#ff4757] flex items-center justify-center shadow-md">
              <Flame className="w-4 h-4 text-white fill-white animate-bounce" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black uppercase tracking-[2.5px] text-[#cfe04a] flex items-center gap-1.5 leading-none">
              {t("Trending Now")} <Sparkles className="w-3 h-3 text-[#cfe04a]" />
            </span>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mt-1">
              {t("Most Loved Wellness Picks")}
            </span>
          </div>
        </div>

        {/* Right Scrollable Carousel Items */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2.5 w-full justify-start lg:justify-end px-1">
          {trendingItems.map((item, idx) => (
            <Link
              to={`/product/${item.category}/${encodeURIComponent(item.name)}`}
              key={idx}
              className="group relative flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#cfe04a]/70 backdrop-blur-md rounded-2xl pl-2.5 pr-4 py-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(207,224,74,0.25)] shrink-0 no-underline"
            >
              {/* Emoji Avatar with Gradient & Soft Ring */}
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl bg-gradient-to-br ${item.bg} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-2 ring-white/20`}>
                {item.emoji}
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-white group-hover:text-[#cfe04a] transition-colors leading-tight font-display">
                  {t(item.name)}
                </span>
                <span className="text-[9px] font-bold text-[#b5cb56] uppercase tracking-wider flex items-center gap-1">
                  {t(item.tag)}
                </span>
              </div>

              {/* Arrow Hover Icon */}
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#cfe04a] group-hover:text-black text-white/70 flex items-center justify-center transition-all ml-1 shrink-0">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
