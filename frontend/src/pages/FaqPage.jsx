import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  Leaf, 
  Calendar, 
  Truck, 
  CreditCard,
  PhoneCall,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Bot
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import InquiryModal from "../components/InquiryModal";
import { useSectionContent } from "../hooks/useSectionContent";
import { useLanguage } from "../context/LanguageContext";

const defaultFaqData = {
  categories: [
    { id: "all", label: "All Questions", icon: Sparkles },
    { id: "general", label: "General & Brand", icon: Leaf },
    { id: "plans", label: "Subscriptions & Plans", icon: Calendar },
    { id: "delivery", label: "Delivery & Timing", icon: Truck },
    { id: "payment", label: "Payments & Customization", icon: CreditCard },
  ],
  faqs: [
    {
      category: "general",
      q: "What is YOGYAHAR and what do you offer?",
      a: "YOGYAHAR is Nashik's trusted diet food brand offering fresh, natural, hygienic, tasty, and authentic ready-to-eat meals, salads, cold-pressed juices, and healthy snacks delivered directly to your doorstep.",
      highlights: ["100% Vegetarian & Pure", "Freshly prepared every morning & evening", "No added sugar or preservatives"]
    },
    {
      category: "general",
      q: "Are your meals and juices really fresh and preservative-free?",
      a: "Absolutely! Every made-to-order YOGYAHAR meal, salad, and juice is prepared fresh daily using premium natural ingredients. We never use preservatives, artificial colors, synthetic flavors, or added sugar.",
      highlights: ["No Preservatives", "No Artificial Colors", "No Chemicals"]
    },
    {
      category: "general",
      q: "Do you provide non-veg salad?",
      a: "No, YOGYAHAR purely focuses on 100% vegetarian, organic diet food and natural plant-based nutrition.",
      highlights: ["Pure Veg Certified", "Hygienic Clean Kitchen"]
    },
    {
      category: "plans",
      q: "What types of subscriptions do you offer?",
      a: "We offer flexible 1-Day Trial Plans, 6-Day Wellness Subscriptions, and 25-Day Full Transformation Programs. You can subscribe to juices, salads, or combo packages.",
      highlights: ["1 Day Paid Trial", "6 Days Weekly Plan", "25 Days Transformation"]
    },
    {
      category: "plans",
      q: "Can I pause or resume my subscription plan?",
      a: "Yes! You can pause or resume your daily meal or juice subscription anytime with a simple WhatsApp message to our customer care team at +91 7499643234.",
      highlights: ["Pause anytime", "No loss of plan days", "Instant WhatsApp support"]
    },
    {
      category: "delivery",
      q: "What are your daily delivery hours across Nashik?",
      a: "We deliver daily across Nashik City in two convenient time slots: Morning Slot from 6:00 AM to 8:00 AM, and Evening Slot from 6:00 PM to 8:00 PM.",
      highlights: ["Morning Slot: 6 AM – 8 AM", "Evening Slot: 6 PM – 8 PM", "Free doorstep delivery"]
    },
    {
      category: "delivery",
      q: "Where do you deliver?",
      a: "We deliver to Homes, Offices, Gyms, Schools, Colleges, and Hospitals throughout the Nashik area.",
      highlights: ["Across all Nashik localities", "Desk & doorstep drop-off"]
    },
    {
      category: "payment",
      q: "What payment methods do you accept?",
      a: "We accept UPI (Google Pay, PhonePe, Paytm), Netbanking, Credit/Debit cards, and Cash on Delivery / WhatsApp secure payment links.",
      highlights: ["Instant UPI", "Cash on Delivery", "Secure Online Links"]
    },
    {
      category: "payment",
      q: "Can I customize my meals and salad ingredients?",
      a: "Our plans are carefully curated by diet experts, but custom ingredients, dietary restrictions, or calorie preferences can be arranged via a WhatsApp request to +91 7499643234.",
      highlights: ["Dietitian guidance", "Custom WhatsApp requests"]
    },
  ],
};

const quickTags = [
  "Delivery Slots",
  "Subscriptions",
  "Preservatives",
  "WhatsApp Order",
  "Vegetarian",
  "Custom Plans"
];

export default function FaqPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [{ faqs: fetchedFaqs }] = useSectionContent("faq", defaultFaqData);
  const { t } = useLanguage();

  const faqsList = fetchedFaqs && fetchedFaqs.length > 0 ? fetchedFaqs : defaultFaqData.faqs;

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0); // Default open first question
  const [feedbackState, setFeedbackState] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFeedback = (qIndex, isPositive) => {
    setFeedbackState((prev) => ({
      ...prev,
      [qIndex]: isPositive ? "yes" : "no",
    }));
  };

  // Filter FAQs based on active category & search query
  const filteredFaqs = faqsList.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || (item.category && item.category === activeCategory);
    const qText = item.q ? item.q.toLowerCase() : "";
    const aText = item.a ? item.a.toLowerCase() : "";
    const matchesSearch =
      searchQuery.trim() === "" ||
      qText.includes(searchQuery.toLowerCase()) ||
      aText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#f5f8eb] via-[#fcfaef] to-[#f7f9ed] border-b border-[#e5ecd0] py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
        {/* Soft subtle ambient leaf/light glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#cfe04a]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#8ac926]/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#e4ecc4] text-[#1f2b12] border border-[#cbd8a4] px-4.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[3px] mb-4 shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#5f7a3a]" />
            <span>{t("Help & Support Center")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight mb-4 text-[#1f2b12]"
          >
            {t("Frequently Asked Questions")}
            <span className="block w-20 h-1 bg-[#c9d94a] mx-auto mt-4 rounded-full" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#4a5f2e] max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
          >
            {t("Have questions about our fresh diet food, cold-pressed juices, doorstep delivery in Nashik, or subscription packages? We've got you covered.")}
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="relative flex items-center shadow-xl rounded-full">
              <Search className="absolute left-5 w-5 h-5 text-[#5f7a3a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder={t("Search questions e.g. delivery timings, subscriptions, juices...")}
                className="w-full pl-13 pl-[52px] pr-12 py-4 sm:py-4.5 rounded-full bg-white text-[#1f2b12] text-sm sm:text-base font-semibold placeholder-[#8c8c7a] border-2 border-[#d4ddb9] focus:outline-none focus:border-[#5f7a3a] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-extrabold bg-gray-200 hover:bg-gray-300 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick search suggestion pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
              <span className="text-[11px] text-[#4a5f2e] font-extrabold uppercase tracking-wider mr-1">
                {t("Popular Searches")}:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveCategory("all");
                    setOpenIndex(null);
                  }}
                  className="text-[11px] font-bold bg-[#f0f4e2] hover:bg-[#cfe04a] text-[#1f2b12] px-3 py-1 rounded-full border border-[#d4ddb9] transition-all cursor-pointer shadow-sm"
                >
                  {t(tag)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full flex-1">
        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((f, i) => {
              const open = openIndex === i;
              const feedback = feedbackState[i];

              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                    open
                      ? "bg-white border-[#5f7a3a] shadow-xl ring-1 ring-[#5f7a3a]/20"
                      : "bg-white border-[#d4ddb9] hover:border-[#a8bc68] shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left text-sm sm:text-base font-extrabold text-[#1f2b12] cursor-pointer gap-4"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-colors ${
                        open ? "bg-[#1f2b12] text-[#cfe04a]" : "bg-[#f0f4e2] text-[#1f2b12]"
                      }`}>
                        Q{i + 1}
                      </span>
                      <span>{t(f.q)}</span>
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-[#f7f9f0] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        open ? "rotate-180 bg-[#1f2b12] text-[#cfe04a]" : "text-[#1f2b12]"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#4b553d] leading-relaxed border-t border-[#f0f4e2]"
                      >
                        <p className="m-0 pl-11 text-sm text-[#2b2b1f] leading-relaxed font-normal mb-4">
                          {t(f.a)}
                        </p>

                        {/* Bullet Highlights */}
                        {f.highlights && (
                          <div className="pl-11 mb-4 flex flex-wrap gap-2">
                            {f.highlights.map((h, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-[#f0f4e2] text-[#1f2b12] px-3 py-1 rounded-full border border-[#d4ddb9]"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                {t(h)}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Was this helpful reaction bar */}
                        <div className="pl-11 pt-3 border-t border-[#f0f4e2] flex items-center justify-between text-xs text-gray-500">
                          <span>{t("Was this answer helpful?")}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleFeedback(i, true)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                feedback === "yes"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{t("Yes")}</span>
                            </button>
                            <button
                              onClick={() => handleFeedback(i, false)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                feedback === "no"
                                  ? "bg-rose-600 text-white"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>{t("No")}</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#d4ddb9] shadow-sm">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-[#1f2b12] mb-2 font-display">
              {t("No questions matched your search")}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-md mx-auto">
              {t("Try searching for different terms or chat directly with our AI Assistant / WhatsApp Team.")}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="bg-[#1f2b12] text-[#cfe04a] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#2a3818]"
            >
              {t("Reset Search Filters")}
            </button>
          </div>
        )}

        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left mt-10 mb-10">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-[#faf9f0] border border-[#eef0e5]">
            <div className="w-10 h-10 rounded-xl bg-[#cfe04a]/30 text-[#1f2b12] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f2b12] uppercase tracking-wider">{t("Doorstep Delivery")}</h4>
              <p className="text-xs text-[#5c5c4f] m-0">{t("6–8 AM & 6–8 PM across Nashik")}</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-[#faf9f0] border border-[#eef0e5]">
            <div className="w-10 h-10 rounded-xl bg-[#cfe04a]/30 text-[#1f2b12] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f2b12] uppercase tracking-wider">{t("100% Preservative Free")}</h4>
              <p className="text-xs text-[#5c5c4f] m-0">{t("Fresh natural vegetarian food")}</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-[#faf9f0] border border-[#eef0e5]">
            <div className="w-10 h-10 rounded-xl bg-[#cfe04a]/30 text-[#1f2b12] flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1f2b12] uppercase tracking-wider">{t("Instant AI & Chat Help")}</h4>
              <p className="text-xs text-[#5c5c4f] m-0">{t("24/7 assistance available")}</p>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex justify-between items-center mt-6 mb-2 text-xs text-[#5c5c4f] font-semibold border-t border-[#e8e2c8] pt-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {t("Showing")} <strong className="text-[#1f2b12]">{filteredFaqs.length}</strong> {t("questions")}
          </span>
          {searchQuery && (
            <span className="text-[#1f2b12]">
              {t("Filter")}: &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* 3-Column Interactive Support Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: AI Assistant */}
          <div className="bg-gradient-to-br from-[#1f2b12] to-[#2d4218] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#cfe04a]/20 blur-2xl group-hover:bg-[#cfe04a]/30 transition-colors" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center mb-4 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">{t("Ask AI Assistant")}</h3>
              <p className="text-xs text-[#c9d94a] leading-relaxed mb-6">
                {t("Get instant 24/7 AI answers regarding ingredients, diet plans, and health queries.")}
              </p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="w-full bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12] font-bold py-3 rounded-full text-xs uppercase tracking-wider transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              {t("Launch AI Chat")} &rarr;
            </button>
          </div>

          {/* Card 2: WhatsApp Support */}
          <div className="bg-white rounded-3xl p-6 border border-[#d4ddb9] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1f2b12] mb-1">{t("WhatsApp Support")}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                {t("Chat directly with our team to place custom orders or pause your subscription.")}
              </p>
            </div>
            <a
              href="https://wa.me/917499643234?text=Hello%20Yogyahar!%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider text-center transition-transform active:scale-95 no-underline shadow-md"
            >
              {t("Chat on WhatsApp")} &rarr;
            </a>
          </div>

          {/* Card 3: Call Direct */}
          <div className="bg-white rounded-3xl p-6 border border-[#d4ddb9] shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1f2b12] mb-1">{t("Call Customer Support")}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                {t("Speak with our customer care helpline daily between 9 AM and 7 PM.")}
              </p>
            </div>
            <a
              href="tel:+917499643234"
              className="w-full bg-[#1f2b12] hover:bg-[#2a3818] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider text-center transition-transform active:scale-95 no-underline shadow-md"
            >
              +91 7499643234
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
