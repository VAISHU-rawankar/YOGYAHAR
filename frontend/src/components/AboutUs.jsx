import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  eyebrow: "About Us",
  heading: "Good Health Starts with the Right Choice!",
  paragraph1:
    "Since 2025, YOGYAHAR makes fresh, natural, hygienic, tasty, authentic diet food — premium salads, cold-pressed juices, and ready-to-eat/ready-to-cook meal kits. We believe in eating tasty, time, knowledge, variety, and consistency.",
  quote: '"We Don\'t Just Serve Food, We Serve a Healthier You!"',
  vision:
    "To make wholesome, fresh, natural, hygienic, tasty, and authentic diet food anytime at possible locations.",
  mission:
    "To create a healthy, nature-by-serving diet food at an affordable cost with a sustainable business model.",
  backgroundImage: "",
};

export default function AboutUs() {
  const [{ eyebrow, heading, paragraph1, quote, vision, mission, backgroundImage }] =
    useSectionContent("aboutUs", defaultContent);
  const { t } = useLanguage();

  const bgImage = resolveImage(backgroundImage, "");

  return (
    <section
      className="py-12 bg-[#fcfaef] relative overflow-hidden bg-cover bg-left bg-no-repeat"
      id="about-us"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="max-w-2xl ml-auto mr-4 md:mr-12 lg:mr-20 xl:mr-28 px-6 text-left relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[3px] text-[#5f7a3a] uppercase mb-3">
          🍃 {eyebrow} 🍃
        </span>
        
        <h2 className="text-[32px] md:text-[36px] font-display text-[#1f2b12] mb-2 leading-tight">
          {heading}
        </h2>
        
        {/* Gold Leaf Divider */}
        <div className="flex items-center justify-start gap-2 mb-6">
          <div className="w-10 h-[1.5px] bg-[#b7c93d]/50" />
          <span className="text-[#5f7a3a] text-[10px]">🍃</span>
          <div className="w-10 h-[1.5px] bg-[#b7c93d]/50" />
        </div>

        <p className="text-[15px] text-[#535a44] leading-relaxed mb-6">
          {paragraph1}
        </p>
        
        <p className="text-[19px] font-display font-medium text-[#1f2b12] mb-12 italic">
          {quote}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {/* Vision Card */}
          <div className="bg-[#ffffff] rounded-[24px] p-8 flex gap-4 items-start shadow-sm border border-[#d4ddb9]/20">
            <div className="w-12 h-12 rounded-full bg-[#3d5223]/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#3d5223] fill-current">
                <path d="M12 22v-6.5M12 15.5V9M12 9V2" stroke="#3d5223" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 2c0 2.5 1.5 4 4 4s1.5-4-4-4zM12 7c-2.5 0-4 1.5-4 4s4 1.5 4-4zM12 9c2.5 0 4 1.5 4 4s-4 1.5-4-4zM12 13c-2.5 0-4 1.5-4 4s4 1.5 4-4z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1f2b12] mb-2 uppercase tracking-wider">
                {t("Our Vision")}
              </h4>
              <div className="w-8 h-[2px] bg-[#b7c93d] mb-3" />
              <p className="text-[13.5px] text-[#6a7059] leading-relaxed">{vision}</p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#ffffff] rounded-[24px] p-8 flex gap-4 items-start shadow-sm border border-[#d4ddb9]/20">
            <div className="w-12 h-12 rounded-full bg-[#3d5223]/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#3d5223]">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#1f2b12] mb-2 uppercase tracking-wider">
                {t("Our Mission")}
              </h4>
              <div className="w-8 h-[2px] bg-[#b7c93d] mb-3" />
              <p className="text-[13.5px] text-[#6a7059] leading-relaxed">{mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
