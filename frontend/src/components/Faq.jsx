import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useSectionContent } from "../hooks/useSectionContent";
import faqImage from "../assets/faq_image.webp";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  faqs: [
    {
      q: "What is YOGYAHAR and what do you offer?",
      a: "YOGYAHAR is Nashik's trusted diet food brand offering fresh, natural, hygienic, tasty, and authentic ready-to-eat meals, salads, and juices.",
    },
    {
      q: "Are your meals and juices really fresh and preservative-free?",
      a: "Absolutely, every made-to-order YOGYAHAR meal and juice is prepared fresh daily using natural ingredients. No preservatives, no artificial colors, and no added sugar.",
    },
    {
      q: "What types of subscriptions do you offer?",
      a: "We offer 6 days and 25 days subscriptions. You can also order a single serving to try before starting your subscription.",
    },
    {
      q: "What are your delivery hours?",
      a: "We deliver daily from 6:00 AM to 8:00 AM and 6 PM to 8 PM across Nashik City.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept UPI, Cash, and secure online payment links.",
    },
    {
      q: "Do you provide non-veg salad?",
      a: "No, YOGYAHAR purely focuses on vegetarian diet food.",
    },
    {
      q: "Can I customize my meals?",
      a: "Our meals are mainly pre-designed, but custom plans are possible via a WhatsApp request to +91 7499643234.",
    },
  ],
};

export default function Faq() {
  const [{ faqs }] = useSectionContent("faq", defaultContent);
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#fcfaef] py-8 sm:py-14" id="faq">
      <span className="absolute left-[-30px] bottom-[-20px] text-[140px] opacity-15">
        🌿
      </span>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile FAQ heading */}
        <div className="lg:hidden text-center mb-8">
          <span className="block text-xs font-bold tracking-[3px] text-[#5f7a3a] uppercase mb-2">{t("FAQ")}</span>
          <h2 className="text-[30px] sm:text-[38px] font-bold text-[#1f2b12] leading-tight">
            {t("Frequently Asked Questions")}
            <span className="block w-[50px] h-[3px] bg-[#c9d94a] mt-3.5 rounded-sm mx-auto" />
          </h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          
          {/* Left Column: Heading - desktop only */}
          <div className="hidden lg:block lg:col-span-5 text-left lg:sticky lg:top-28">
            <span className="block text-xs font-bold tracking-[3px] text-[#5f7a3a] uppercase mb-2">
              {t("FAQ")}
            </span>
            <h2 className="text-[38px] md:text-[48px] font-bold text-[#1f2b12] leading-tight">
              {t("Frequently Asked Questions")}
              <span className="block w-[50px] h-[3px] bg-[#c9d94a] mt-3.5 rounded-sm" />
            </h2>
            <div className="mt-8 rounded-[20px] overflow-hidden border border-[#d4ddb9]/40 shadow-[0_10px_25px_rgba(0,0,0,0.02)] max-w-[340px]">
              <img src={faqImage} alt={t("Frequently Asked Questions")} className="w-full h-auto block" />
            </div>
          </div>

          {/* Right Column: Questions */}
          <div className="col-span-full lg:col-span-7 w-full flex flex-col">
            {faqs.map((f, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={f.q}
                  className="bg-white rounded-xl mb-3 overflow-hidden border border-[#d4ddb9]"
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full bg-none px-5.5 px-[22px] py-4.5 py-[18px] flex justify-between items-center text-sm font-semibold text-left"
                  >
                    {f.q}
                    <span
                      className={`text-[#1f2b12] transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </button>
                  <div
                    className={`px-5.5 px-[22px] overflow-hidden transition-all duration-300 ${
                      open ? "max-h-52 pb-4.5 pb-[18px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-[13px] text-[#6a7059] m-0">{f.a}</p>
                  </div>
                </div>
              );
            })}
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="group flex items-center gap-2.5 bg-[#2a3818] hover:bg-[#1f2b12] text-white px-6 py-3.5 rounded-full shadow-md border-2 border-[#cfe04a] transition-all duration-300 hover:scale-[1.02] active:scale-95 w-full sm:w-auto justify-center whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-full bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-[#f5f8d8]">
                  {t("Have more questions? Ask AI")}
                </span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              </button>

              <a
                href="https://wa.me/917499643234?text=Hi%20Yogyahar!%20I%20have%20a%20question%20regarding%20your%20diet%20food%20and%20plans."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-[1.5px] border-[#1f2b12] text-[#1f2b12] hover:bg-[#1f2b12] hover:text-white px-6 py-3.5 rounded-full shadow-sm text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto whitespace-nowrap"
              >
                <span>{t("Still have a Question? Chat with Us")}</span> &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
