import React from "react";
import { Gift, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function GrabSampleButton({ onClick }) {
  return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 bg-gradient-to-r from-[#1f2b12] to-[#2f4a1f] hover:from-[#2f4a1f] hover:to-[#3e5f29] text-[#cfe04a] border border-[#cfe04a]/40 font-extrabold px-4 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(207,224,74,0.35)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer no-underline"
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cfe04a] opacity-40" />
        <div className="w-7 h-7 rounded-full bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
          <Gift className="w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#cfe04a] leading-none flex items-center gap-1">
          {t("Grab Your Sample")} <Sparkles className="w-3 h-3 text-[#cfe04a]" />
        </span>
        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">
          {t("Nashik Trial Pack")}
        </span>
      </div>
    </button>
  );
}
