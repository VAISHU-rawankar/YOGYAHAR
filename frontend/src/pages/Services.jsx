import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import nasikDelivery from "../assets/nasik_delivery.png";
import officeProfessionalsImg from "../assets/office_professionals.png";
import fitnessLoversImg from "../assets/fitness_lovers.png";
import weightLossImg from "../assets/weight_loss.png";
import familySeniorsImg from "../assets/family_seniors.png";
import howItWorksImg from "../assets/how_it_works.png";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  heroHeading: "Wholesome Services,\nTailored for You",
  heroParagraph: "Delivering fresh, hygienic, and premium organic food services daily to fuel your body.",
  heroImage: "",
  audienceCards: [
    {
      title: "Office Professionals",
      text: "Fuel your productive workdays with Yogyahar's desk-friendly meal plans. Convenient, nourishing, and delivered fresh to help corporate professionals maintain peak focus without the midday slump.",
      image: "",
    },
    {
      title: "Gym & Fitness Lovers",
      text: "Support your active lifestyle and workout recovery with Yogyahar's high-protein bowls and clean energy snacks. Carefully portioned and nutrient-dense fuel designed specifically for fitness enthusiasts.",
      image: "",
    },
    {
      title: "Weight Loss Followers",
      text: "Reach your weight management goals naturally with Yogyahar's low-calorie, high-fiber salads and detox programs. Enjoy calorie-conscious portions that are incredibly satisfying and delicious.",
      image: "",
    },
    {
      title: "Family & Seniors",
      text: "Bring wholesome nutrition to your dinner table. Yogyahar provides easy-to-digest, vitamin-rich fruit and veggie selections crafted to promote longevity, health, and vitality for your entire family.",
      image: "",
    },
  ],
  steps: [
    {
      step: "01",
      title: "Choose Your Plan",
      text: "Browse our menu and select a weekly or monthly subscription that matches your lifestyle.",
    },
    {
      step: "02",
      title: "Customize & Schedule",
      text: "Personalize ingredients and pick your delivery time slots for home or office.",
    },
    {
      step: "03",
      title: "Fresh Daily Delivery",
      text: "Our team prepares your meals fresh every morning and delivers them cold to your doorstep.",
    },
  ],
};

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

const stepContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [{ heroHeading, heroParagraph, heroImage, audienceCards }] = useSectionContent("servicesPage", defaultContent);
  const { t } = useLanguage();

  const fallbackAudienceImgs = [
    officeProfessionalsImg,
    fitnessLoversImg,
    weightLossImg,
    familySeniorsImg
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full overflow-hidden">
        {/* Left Green Box */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#8cc63f] py-12 px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col justify-center text-left text-[#1f2b12]"
        >
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-[3px] uppercase mb-3 opacity-80">
            {t("Our Offerings")} 🍃
          </span>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold font-sans leading-[1.1] mb-6">
            {heroHeading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heroHeading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium opacity-90 max-w-md leading-relaxed">
            {heroParagraph}
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#1f2b12]/10 text-[#1f2b12] font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full border border-[#1f2b12]/15 w-fit mt-5">
            {t("📍 Serviceable in whole Nasik area!")}
          </div>
        </motion.div>
        {/* Right Catering Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-64 sm:h-80 md:h-auto min-h-[300px] relative"
        >
          <img
            src={resolveImage(heroImage, nasikDelivery)}
            alt="Yogyahar delivery service in Nasik"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[40px] font-extrabold text-[#1f2b12] mb-2 tracking-tight font-sans"
          >
            {t("Who Is This For?")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 text-sm sm:text-base mb-16 max-w-xl mx-auto"
          >
            {t("Yogyahar is crafted for everyone looking to transform their relationship with food and embrace vitality.")}
          </motion.p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {audienceCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[#faf9f0] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#eef0e5] text-left flex flex-col justify-start transition-shadow hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
              >
                {/* Image above */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 border-b border-[#eef0e5]">
                  <img 
                    src={resolveImage(card.image, fallbackAudienceImgs[idx])} 
                    alt={t(card.title)} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                {/* Text content below */}
                <div className="p-6 flex-1 flex flex-col justify-start">
                  <h3 className="text-lg font-bold text-[#1f2b12] mb-3">
                    {t(card.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5c4f] leading-relaxed">
                    {t(card.text)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-12 md:py-20 bg-[#faf9f0] border-t border-[#eef0e5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[24px] p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-[#eef0e5] overflow-hidden"
          >
            <img 
              src={howItWorksImg} 
              alt={t("How Yogyahar Works Infographic")} 
              className="w-full h-auto rounded-[16px] object-cover" 
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white border-t border-[#eef0e5]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#1f2b12] mb-4 tracking-tight font-sans">
            {t("Ready to Begin Your Healthy Lifestyle?")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
            {t("Choose Yogyahar and enjoy dietitian-curated, delicious salads delivered daily.")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-block bg-[#1f2b12] hover:bg-[#131b0b] text-white font-extrabold px-8 py-3.5 rounded-full shadow-md transition-all hover:shadow-lg tracking-wider text-xs sm:text-sm uppercase"
            >
              {t("Explore Products")}
            </Link>
            <button
              onClick={() => setInquiryOpen(true)}
              className="inline-block bg-white hover:bg-gray-50 text-[#1f2b12] border-2 border-[#1f2b12] font-extrabold px-8 py-3.5 rounded-full shadow-sm transition-all tracking-wider text-xs sm:text-sm uppercase"
            >
              {t("Custom Inquiry")}
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
