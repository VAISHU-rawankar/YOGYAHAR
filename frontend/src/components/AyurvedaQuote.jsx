import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";

const defaultContent = {
  eyebrow: "Charak Samhita · Sutra 30.26",
  sanskrit: "स्वस्थस्य स्वास्थ्य रक्षणं । आतुरस्य विकार प्रशमनं च ॥",
  hindi:
    "आयुर्वेद का मुख्य उद्देश्य स्वस्थ लोगों के स्वास्थ्य को बनाए रखना और बीमार लोगों की बीमारी को ठीक करना है।",
  english:
    '"The main purpose of Ayurveda is to maintain the health of the healthy and to cure the disease of the ill."',
  backgroundImage: "",
};

export default function AyurvedaQuote() {
  const [{ eyebrow, sanskrit, hindi, english, backgroundImage }] = useSectionContent(
    "ayurvedaQuote",
    defaultContent
  );

  const bgImage = resolveImage(backgroundImage, "");

  return (
    <section 
      className="relative bg-[#1f2b12] py-14 bg-cover bg-center bg-fixed overflow-hidden"
      style={bgImage ? { backgroundImage: `url("${encodeURI(bgImage)}")` } : {}}
    >
      {/* Dark overlay for readability */}
      {bgImage && (
        <div className="absolute inset-0 bg-[#1f2b12]/45 backdrop-blur-[0.5px]"></div>
      )}
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
        <span className="block text-xs font-semibold tracking-[3px] text-[#cfe25c] uppercase mb-4">
          {eyebrow}
        </span>
        <p className="text-xl md:text-2xl font-display mb-5 leading-relaxed font-semibold">{sanskrit}</p>
        <p className="text-sm md:text-base text-[#dfe6cb] mb-3 leading-relaxed">{hindi}</p>
        <p className="text-sm md:text-base text-[#c9d4bc] italic">{english}</p>
      </div>
    </section>
  );
}
