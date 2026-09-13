import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import aboutFruitHero from "../assets/about_fruit_hero.png";
import cardWhatWeDo from "../assets/card_what_we_do.png";
import cardWhyWeStarted from "../assets/card_why_we_started.png";
import cardDelivered from "../assets/card_delivered.png";
import cardHelp from "../assets/card_help.png";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const cardData = [
  {
    title: "What We Do",
    text: "At Yogyahar, we prepare 100% fresh fruit salads, sprout salads, vegetable salads, cold-pressed juices, smoothies, and peel-cut fruits all crafted daily with premium quality ingredients. Our aim is to make healthy eating easy, tasty, and convenient for everyone.",
    emoji: "🥗",
    circleClass: "border-[#8ac926]/30 shadow-md",
    image: cardWhatWeDo,
  },
  {
    title: "Why We Started",
    text: "Yogyahar was founded with a simple mission: to make healthy living effortless for busy people. We realized many want to eat clean but do not have time to wash, peel, or cut fruits every day. So we created a service delivering fresh, preservative-free salads directly to your doorstep.",
    emoji: "🌱",
    circleClass: "border-[#f26522]/30 shadow-md",
    image: cardWhyWeStarted,
  },
  {
    title: "Delivered with Care",
    text: "Every bowl is prepared in a hygienic kitchen, packed in eco-friendly biodegradable packaging, and delivered with care. We ensure that you receive nature's best – fresh, safe, and ready to enjoy directly at your home or workplace.",
    emoji: "📦",
    circleClass: "border-amber-500/30 shadow-md",
    image: cardDelivered,
  },
  {
    title: "Always Here to Help",
    text: "From daily subscription assistance to customized orders for events, we are always here for you. Each product is packed safely and quality-checked. If you ever need help, have a query, or require a replacement, reach us anytime through call or WhatsApp.",
    emoji: "💛",
    circleClass: "border-red-500/30 shadow-md",
    image: cardHelp,
  },
];

const checklist = [
  "Seasonal mixed fruit salads",
  "Premium & exotic fruit bowls",
  "Nutritious sprout salads",
  "Fresh veg salads",
  "Cold-pressed juices & smoothies",
  "Custom corporate salad platters",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const checklistContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const checklistItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const defaultContent = {
  eyebrow: "About Yogyahar",
  heading: "Nourishing Nashik\nWith Pure Health",
  paragraph1: "Discover Yogyahar's fresh daily salads, cold-pressed juices, and healthy subscriptions prepared from raw, natural ingredients.",
  quote: "\"We Don't Just Serve Food, We Serve a Healthier You!\"",
  mission: "To create a healthy nation by serving diet food at an affordable cost with a sustainable business model.",
  vision: "To make available Fresh, Natural, Hygienic, Tasty, and Authentic diet food anytime at possible location.",
  backgroundImage: "",
  storyImage: "",
};

export default function About() {
  const [{ eyebrow, heading, paragraph1, quote, mission, vision, backgroundImage }] = useSectionContent("aboutPage", defaultContent);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full overflow-hidden">
        {/* Left Green Box */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#8cc63f] py-12 px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col justify-center text-left text-[#1f2b12]"
        >
          <h1 className="text-[28px] sm:text-[40px] lg:text-[56px] font-bold font-display leading-[1.1] mb-4 md:mb-6">
            {heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium opacity-90 max-w-md leading-relaxed">
            {paragraph1}
          </p>
        </motion.div>
        {/* Right Fruit Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-64 sm:h-80 md:h-auto min-h-[300px] relative"
        >
          <img
            src={resolveImage(backgroundImage, aboutFruitHero)}
            alt={t("Welcome to Our Fruitful Journey")}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* About Freshly Fruits / Yogyahar Intro */}
      <section className="py-12 md:py-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1f2b12] mb-8 tracking-tight font-sans">
            {t(eyebrow)}
          </h2>
          <div className="space-y-6 text-[#5c5c4f] text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              {t("Yogyahar is a healthy food brand dedicated to delivering 100% fresh, hygienic, and preservative-free fruit salads and healthy meals right to your doorstep. We believe that healthy eating should be easy, affordable, and delicious for everyone.")}
            </p>
            <p>
              {t("We specialize in freshly prepared fruit salads, premium and exotic fruit bowls, sprout salads, vegetable salads, cold-pressed juices, smoothies, and peel-cut ready-to-eat fruits. Every order is prepared daily using premium-quality ingredients sourced from trusted suppliers.")}
            </p>
            <p className="text-[#1f2b12] font-bold pt-4 text-base sm:text-lg md:text-xl">
              {t(quote)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#eef4e2] text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2b12] mb-2">{t("Our Vision")}</h4>
                <p className="text-xs sm:text-sm text-[#5c5c4f] leading-relaxed">{t(vision)}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f2b12] mb-2">{t("Our Mission")}</h4>
                <p className="text-xs sm:text-sm text-[#5c5c4f] leading-relaxed">{t(mission)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cards Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#f7f9f0] via-[#faf9f2] to-[#f2f6e5] border-y border-[#edf2dc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {cardData.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#eef0e5] text-left flex flex-col justify-start relative transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
              >
                {/* Banner Image */}
                <div className="h-40 w-full overflow-hidden bg-[#faf9f0] relative">
                  <img src={card.image} alt={t(card.title)} className="w-full h-full object-cover" />
                  {/* Round Icon Container */}
                  <div className={`w-11 h-11 rounded-full bg-white border flex items-center justify-center text-xl absolute bottom-3 left-4 ${card.circleClass} shadow-sm z-10`}>
                    {card.emoji}
                  </div>
                </div>

                <div className="p-6 pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1f2b12] mb-3">
                      {t(card.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5c5c4f] leading-relaxed">
                      {t(card.text)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Celebrate Freshness Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[36px] font-extrabold text-[#1f2b12] mb-2 tracking-tight font-sans"
          >
            {t("Celebrate Freshness, Everyday")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#888] text-sm md:text-base mb-10"
          >
            {t("Discover nature's goodness with a wide range of:")}
          </motion.p>

          {/* Checklist */}
          <motion.div 
            variants={checklistContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto text-left mb-10"
          >
            {checklist.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={checklistItemVariants}
                className="flex items-center gap-3"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fff3e0] text-[#f26522] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#3c3c32]">
                  {t(item)}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#1f2b12] font-bold text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto"
          >
            {t("Freshness, taste, and farm-fresh quality are delivered to you with every order.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-block bg-[#1f2b12] hover:bg-[#131b0b] text-white font-extrabold px-10 py-4 rounded-full shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5 tracking-wider text-xs sm:text-sm uppercase"
            >
              {t("Order Now")}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
