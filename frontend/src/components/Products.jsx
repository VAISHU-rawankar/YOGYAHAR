import { Link } from "react-router-dom";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";
import { 
  CupSoda, 
  GlassWater, 
  Utensils, 
  Leaf, 
  ShoppingBag, 
  Package, 
  MessageCircle,
  Sparkles,
  Apple
} from "lucide-react";

const emojiIconMap = {
  // Juices
  "🥕": CupSoda,
  "🫒": GlassWater,
  "🥬": Leaf,
  "🍹": CupSoda,
  "🍉": GlassWater,
  "🌿": Leaf,
  "🍠": GlassWater,
  "🧃": CupSoda,
  "🍓": CupSoda,
  // Salads
  "🥗": Utensils,
  "🍎": Apple,
  "🥙": Utensils,
  "🌱": Leaf,
  // Non-subscription items
  "🍡": ShoppingBag,
  "🫙": Package,
};

function ProductIcon({ emoji, className }) {
  const IconComponent = emojiIconMap[emoji] || Sparkles;
  return <IconComponent className={className} strokeWidth={1.5} />;
}




const DEFAULT_WHATSAPP_LINK =
  "https://wa.me/917499643234?text=" +
  encodeURIComponent("Hi Yogyahar, I'd like to know more.");

const defaultContent = {
  intro: "All subscription-based products are available in 1-Day, 6-Day, and 25-Day packages. Juices are under the Rasahar brand.",
  whatsappLink: DEFAULT_WHATSAPP_LINK,
  juices: [
    {
      name: "Carrot Juice",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Fresh Carrots, Touch of Ginger, Lemon Juice",
      benefits: "Rich in Vitamin A and Beta-Carotene. Boosts immunity, improves eye health, enhances skin glow, and aids digestion.",
      precautions: "Consult doctor if managing high potassium or kidney conditions.",
      emoji: "🥕",
      thumb: "from-[#ffe2b8] to-[#ff9a3c]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Amla Juice",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Fresh Indian Gooseberry (Amla), Mint, Clean Water",
      benefits: "Loaded with Vitamin C and antioxidant power. Strengthens hair, purifies blood, boosts immunity, and promotes digestion.",
      precautions: "People with severe hyperacidity or low blood sugar should consume in moderation.",
      emoji: "🫒",
      thumb: "from-[#e4f2c2] to-[#9ec13a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Green Juice",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Spinach, Cucumber, Bottle Gourd, Coriander, Mint, Lemon",
      benefits: "Alkalizes the body, rich in chlorophyll & iron, flushes toxins, and supports healthy weight loss.",
      precautions: "Individuals with kidney stones (oxalate sensitivity) should consult a physician.",
      emoji: "🥬",
      thumb: "from-[#d8f2c0] to-[#6bb03a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Mix Juice",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Combination of Centrifugal and Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Seasonal Fruits & Vegetables blend (Carrot, Beetroot, Apple, Pomegranate)",
      benefits: "Balanced nutrient intake, natural energy boost, improves stamina, and enhances daily vitality.",
      precautions: "Diabetic patients should monitor carbohydrate intake.",
      emoji: "🍹",
      thumb: "from-[#ffe8b8] to-[#ff8a4c]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Watermelon Juice",
      tag: "Seasonal",
      availability: "Summer",
      makingType: "Centrifugal",
      suitableForFast: "Yes",
      ingredients: "Fresh Watermelon, Mint Leaves, Rock Salt",
      benefits: "Deeply hydrating, rich in Lycopene and electrolyte potassium. Keeps the body cool and refreshed.",
      precautions: "Diabetics should consume with caution due to natural glycemic response.",
      emoji: "🍉",
      thumb: "from-[#ffd2d2] to-[#ff5c6c]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Sugarcane Juice",
      tag: "Seasonal",
      availability: "Summer",
      makingType: "Centrifugal",
      suitableForFast: "Yes",
      ingredients: "Fresh Sugarcane Extract, Ginger, Lemon, Mint",
      benefits: "Instant energy booster, supports liver health, aids digestion, and replenishes natural minerals.",
      precautions: "Not recommended for diabetic individuals.",
      emoji: "🌿",
      thumb: "from-[#d8f2c0] to-[#4a9a3a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Beetroot Juice",
      tag: "Seasonal",
      availability: "Winter",
      makingType: "Cold Pressed",
      suitableForFast: "No",
      ingredients: "Fresh Beetroot, Pomegranate, Lemon Juice",
      benefits: "Improves blood circulation, increases hemoglobin levels, enhances athletic stamina.",
      precautions: "People prone to oxalate kidney stones should consume in moderation.",
      emoji: "🍠",
      thumb: "from-[#e6c2d8] to-[#7a1f4a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Combination Juice",
      tag: "Special",
      availability: "Throughout the year",
      makingType: "Combination of Centrifugal and Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Tailored combination of fresh fruit and vegetable extracts",
      benefits: "Comprehensive micronutrient booster, improves overall digestive health, and boosts immunity.",
      precautions: "Check specific ingredients if you have known food allergies.",
      emoji: "🧃",
      thumb: "from-[#ffe0e0] to-[#ff7a7a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Red Juice",
      tag: "Special",
      availability: "Throughout the year",
      makingType: "Cold Pressed",
      suitableForFast: "Yes",
      ingredients: "Beetroot, Carrot, Apple, Pomegranate",
      benefits: "High in antioxidants, promotes radiant skin, purifies blood, and aids heart health.",
      precautions: "Diabetics and kidney stone patients should consult their doctor.",
      emoji: "🍓",
      thumb: "from-[#ffd6d6] to-[#e0435c]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
  ],
  salads: [
    {
      name: "Salad Meal",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Raw",
      suitableForFast: "No",
      ingredients: "Cucumber, Tomatoes, Bell Peppers, Carrots, Paneer, Mixed Seeds, Lemon Vinaigrette",
      benefits: "Complete balanced diet meal high in dietary fiber, clean plant proteins, vitamins, and minerals.",
      precautions: "Not suitable for individuals with severe digestive inflammation or raw food intolerance.",
      emoji: "🥗",
      thumb: "from-[#e2f0c8] to-[#7fae3a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Fruit Cuts",
      tag: "Seasonal",
      availability: "Throughout the year",
      makingType: "Raw",
      suitableForFast: "Yes",
      ingredients: "Assorted Fresh Seasonal Fruits (Apple, Papaya, Pomegranate, Kiwi, Muskmelon)",
      benefits: "Natural digestive enzymes, vital vitamins, minerals, and instant cellular hydration.",
      precautions: "Diabetic patients should monitor overall fruit sugar intake.",
      emoji: "🍎",
      thumb: "from-[#f7e8ee] to-[#f0d5e0]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Salad Bowl",
      tag: "Special",
      availability: "Throughout the year",
      makingType: "Semi-Boiled",
      suitableForFast: "No",
      ingredients: "Blanched Broccoli, Steamed Sweet Corn, Sprouts, Cherry Tomatoes, Olive Oil Dressing",
      benefits: "Gentle on stomach, easy digestion, rich in micronutrients, antioxidants, and gut-friendly fiber.",
      precautions: "Check dressing components for seed allergies.",
      emoji: "🥙",
      thumb: "from-[#ffe8b8] to-[#ff8a4c]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
    {
      name: "Sprout Salad",
      tag: "Regular",
      availability: "Throughout the year",
      makingType: "Raw",
      suitableForFast: "Yes",
      ingredients: "Sprouted Mung Beans, Chana (Chickpeas), Pomegranate, Onion, Coriander, Lemon",
      benefits: "Powerhouse of living enzymes, high bioavailable protein, aids weight loss and gut health.",
      precautions: "May cause gas/bloating in people sensitive to raw legumes; consume moderate portions.",
      emoji: "🌱",
      thumb: "from-[#d8f2c0] to-[#6bb03a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock"
    },
  ],
  nonSubItems: [
    {
      name: "Super Laddu",
      desc: "Nourishing, protein-packed energy balls handcrafted from premium dry fruits, nuts, and organic seeds. With zero refined sugar and zero preservatives, it's the perfect guilt-free daily snack for sustained energy.",
      emoji: "🍡",
      thumb: "from-[#e8d2a8] to-[#a87b3a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock",
      variants: ["250g Pack", "500g Pack", "1kg Pack"],
    },
    {
      name: "Cold Pressed Oil",
      desc: "100% pure wood-pressed (lakdi ghani) oil extracted at low temperatures to lock in nutrients, rich aroma, and natural taste. Chemical-free, unrefined, and perfect for healthy daily cooking.",
      emoji: "🫙",
      thumb: "from-[#fff0c8] to-[#d4952a]",
      image: "",
      status: "Active",
      stockStatus: "In Stock",
      variants: ["Groundnut", "Sunflower", "Flax Seeds", "Coconut", "Mustard", "Sesame", "Safflower"],
    },
  ],
  detoxHeading: "Detox Water",
  detoxSub: "Detox Water • Subscription-based",
  detoxText: "Cleanse, Hydrate, Refresh — your daily detox, made simple.",
  detoxImage: "",
};

export default function Products() {
  const { t } = useLanguage();
  const [
    {
      intro,
      whatsappLink,
      juices,
      salads,
      nonSubItems,
      detoxHeading,
      detoxSub,
      detoxText,
      detoxImage,
    },
  ] = useSectionContent("products", defaultContent);

  return (
    <section className="pt-14 pb-6" id="products">
      <div className="max-w-6xl mx-auto px-6">
        {/* Juices Title Section */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold tracking-[3px] text-[#5f7a3a] uppercase mb-3">
            <Leaf className="w-4 h-4 text-[#5f7a3a]" /> {t("Rasahar · Juices · Subscription-based")}
          </span>
          <p
            className="text-lg sm:text-xl italic text-[#a9862f] mb-1"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {t("Our most valuable Subscriptions!")}
          </p>
          <h2 className="text-[22px] sm:text-[30px] md:text-[34px] text-[#1f2b12] font-extrabold uppercase tracking-wide font-display">
            {t("Juice")}
          </h2>
          <span className="block w-[50px] h-[3.5px] bg-[#c9d94a] mt-4 mb-10 mx-auto rounded-sm" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-4xl mx-auto">
            {[
              { label: "Regular", sub: "Available throughout the year" },
              { label: "Seasonal", sub: "Available during the season" },
              { label: "Special", sub: "Available in particular months only" },
            ].map((item) => (
              <div key={item.label} className="text-center px-4">
                <h3 className="text-[19px] sm:text-[22px] font-bold text-[#1f2b12]">{t(item.label)}</h3>
                <p className="text-[13px] text-[#6a7059] mt-1">{t(item.sub)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width Marquee Slider */}
      <div className="relative w-full overflow-hidden py-4 mb-8">
        <div className="animate-marquee">
          {/* First Set of Juices */}
          <div className="flex gap-[30px] shrink-0 pr-[30px]">
            {juices.map((j, idx) => (
              <JuiceCard key={`juice-set1-${idx}`} juice={j} />
            ))}
          </div>

          {/* Second Set of Juices */}
          <div className="flex gap-[30px] shrink-0 pr-[30px]" aria-hidden="true">
            {juices.map((j, idx) => (
              <JuiceCard key={`juice-set2-${idx}`} juice={j} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Juices CTA Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton link={whatsappLink}>{t("Get Your Paid One-Day Trial!")}</CtaButton>
            <CtaButton link={whatsappLink} primary>{t("Start Your Juice Monthly Subscription Today!")}</CtaButton>
          </div>
        </div>

        {/* Detox Water Grid (Direct to UI, no background container) */}
        <div className="grid lg:grid-cols-12 gap-8 mb-[72px] items-stretch text-left">
          {/* Left Content Column */}
          <div className="lg:col-span-5 xl:col-span-4 w-full relative flex flex-col justify-between py-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3d5223]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#c9d94a]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-3">
              <div>
                <h2 className="text-[28px] font-display text-[#1f2b12] mb-3 leading-tight font-bold">
                  {t(detoxHeading)}
                </h2>
                <p className="text-[14.5px] text-[#535a44] leading-relaxed mb-5 font-medium">
                  {t("Purify your body with our premium range of daily detox infusions. Handcrafted with fresh citrus fruits, cooling cucumber, and organic herbs to keep you hydrated and active all day long.")}
                </p>

                {/* Additional Content / Subscription Benefits - Compact */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("6 Days, 6 Flavors")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("Metabolism & Toxins Flush")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("100% Organic & Fresh Daily")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("No Added Sugar & Preservatives")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("Premium Glass Bottle Delivery")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-[#5f7a3a] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1f2b12]">{t("Pause/Resume Plans Easily")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full mt-auto">
                <CtaButton link={whatsappLink} primary>
                  {t("Subscribe")}
                </CtaButton>
                <CtaButton link={whatsappLink}>
                  {t("One-Day Trial")}
                </CtaButton>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7 xl:col-span-8 w-full min-h-[280px] lg:min-h-full relative">
            {resolveImage(detoxImage) ? (
              <Link to={`/product/detox/${encodeURIComponent(detoxHeading)}`} className="absolute inset-0 w-full h-full block group">
                <img
                  src={resolveImage(detoxImage)}
                  alt={detoxHeading}
                  className="w-full h-full object-contain transform group-hover:scale-[1.01] transition-transform duration-500 mix-blend-multiply image-fade-edges"
                />
                <div className="absolute top-6 right-6 flex gap-2">
                  <span className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#3d5223] fill-[#3d5223]/20">
                      <path d="M11 20A7 7 0 0 1 4 13c0-6 5-10 12-11 1 7-3 12-9 13 0 2 0 3 1 5Z" />
                    </svg>
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <GlassWater className="w-5 h-5 text-[#3d5223]" />
                  </span>
                </div>
              </Link>
            ) : (
              <Link to={`/product/detox/${encodeURIComponent(detoxHeading)}`} className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#eef4e2] via-[#dcecc4] to-[#c9e0a0] flex items-center justify-center text-7xl hover:shadow-xl transition-all duration-300">
                <GlassWater className="w-16 h-16 text-[#3d5223] opacity-60" />
                <div className="absolute top-6 right-6 flex gap-2">
                  <span className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3d5223] fill-[#3d5223]">
                      <path d="M12 22v-6.5M12 15.5V9M12 9V2" stroke="#3d5223" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M12 2c0 2.5 1.5 4 4 4s1.5-4-4-4zM12 7c-2.5 0-4 1.5-4 4s4 1.5 4-4zM12 9c2.5 0 4 1.5 4 4s-4 1.5-4-4zM12 13c-2.5 0-4 1.5-4 4s4 1.5 4-4zM12 15c2.5 0 4 1.5 4 4s-4 1.5-4-4z" />
                    </svg>
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <GlassWater className="w-5 h-5 text-[#3d5223]" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Salads */}
        <div className="relative mb-16 overflow-hidden rounded-[28px] py-4">
          <Leaf className="absolute -left-8 -top-4 w-[110px] h-[110px] opacity-[0.05] rotate-[-10deg] select-none pointer-events-none text-[#2f4a1f]" />
          <Leaf className="absolute -right-8 -bottom-6 w-[110px] h-[110px] opacity-[0.05] rotate-[12deg] select-none pointer-events-none text-[#2f4a1f]" />

          <div className="relative text-center mb-8">
            <span className="block text-xs font-semibold tracking-[3px] text-[#5f7a3a] uppercase mb-2">
              {t("Salad · Subscription-based")}
            </span>
            <h2 className="text-[28px] text-[#1f2b12]">
              {t("Salad Meal, Bowl, Sprouts & Fruit Cuts")}
            </h2>
            <p className="mt-3 text-[14.5px] text-[#6a7059] max-w-2xl mx-auto leading-relaxed">
              {t("Fresh, premium subscription salads delivered daily. Made with crisp organic greens, nutrient-dense sprouts, fresh fruit cuts, and high-protein ingredients to keep you healthy every day.")}
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {salads.map((s) => (
              <JuiceCard key={s.name} juice={s} type="salads" widthClass="w-full" />
            ))}
          </div>

          <div className="relative flex flex-wrap justify-center gap-4">
            <CtaButton link={whatsappLink}>{t("Get Your One-Day Trial!")}</CtaButton>
            <CtaButton link={whatsappLink} primary>{t("Start Your Salad's Monthly Subscription Today!")}</CtaButton>
          </div>
        </div>

        {/* Non-subscription */}
        <div className="mt-10">
          <div className="text-center mb-6 max-w-2xl mx-auto">
            <span className="block text-xs font-bold tracking-[3px] text-[#5f7a3a] uppercase mb-2">
              {t("Non-Subscription Essentials")}
            </span>
            <h2 className="text-[28px] text-[#1f2b12] font-bold">
              {t("Pure & Traditional Wellness Treats")}
            </h2>
            <p className="mt-3 text-[14.5px] text-[#6a7059] leading-relaxed">
              {t("Explore our hand-crafted, daily essentials. Made using traditional, clean methods with zero preservatives to nourish your body and soul.")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
             {nonSubItems.map((it) => {
               const src = resolveImage(it.image);
               const isOutOfStock =
                 it.stockStatus === "Out of Stock" ||
                 it.stockStatus === "outofstock" ||
                 it.stock === false ||
                 it.inStock === false;

               return (
                 <Link
                   to={`/product/nonSubItems/${encodeURIComponent(it.name)}`}
                   key={it.name}
                   className="flex flex-col sm:flex-row gap-6 sm:gap-8 rounded-[28px] p-6 md:p-8 items-center bg-white shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all text-center sm:text-left border border-[#d4ddb9]/40 sm:min-h-[260px] relative"
                 >
                   <div
                     className={`relative overflow-hidden w-[160px] h-[160px] md:w-[210px] md:h-[210px] rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br ${it.thumb} shadow-inner`}
                   >
                     {src ? (
                       <img src={src} alt={it.name} className="absolute inset-0 w-full h-full object-contain" />
                     ) : (
                       <ProductIcon emoji={it.emoji} className="w-16 h-16 text-[#2f4a1f] opacity-80" />
                     )}
                     {isOutOfStock && (
                       <span className="absolute top-2.5 left-2.5 bg-[#6e2438] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-sm shadow-sm uppercase tracking-wider z-10">
                         OUT OF STOCK
                       </span>
                     )}
                   </div>
                   <div className="flex-1 text-center sm:text-left py-2">
                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                       <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
                         !isOutOfStock
                           ? "bg-[#2f4a1f]/10 text-[#2f4a1f]"
                           : "bg-[#6e2438]/10 text-[#6e2438]"
                       }`}>
                         {!isOutOfStock ? t("🟢 In Stock") : t("🚫 Out of Stock")}
                       </span>
                     </div>
                     <h4 className="text-[22px] mb-2 font-bold text-[#1f2b12] font-display">{t(it.name)}</h4>
                     <p className="text-[14.5px] text-[#6a7059] leading-relaxed mb-4">{t(it.desc)}</p>
                     {it.variants && (
                       <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                         {it.variants.map((v) => (
                           <span key={v} className="text-[11px] bg-[#e6ecd2] text-[#3d5223] font-semibold px-2.5 py-1 rounded-full border border-[#d4ddb9]">
                             {t(v)}
                           </span>
                         ))}
                       </div>
                     )}
                     <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#3d5223] uppercase tracking-wider hover:text-[#1f2b12] transition-colors">
                       {t("View Details")} &rarr;
                     </span>
                   </div>
                 </Link>
               );
             })}
          </div>
        </div>
      </div>
    </section>
  );
}

function getProductMeta(name) {
  const meta = {
    "Combination Juice": { price: "149.00", oldPrice: "189.00", category: "READY TO EAT FRUITS" },
    "Red Juice": { price: "139.00", oldPrice: "189.00", category: "FRESH FRUIT JUICES" },
    "Green Juice": { price: "129.00", oldPrice: "159.00", category: "FRESH FRUIT JUICES" },
    "Beetroot Juice": { price: "139.00", oldPrice: "179.00", category: "FRESH FRUIT JUICES" },
    "Carrot Juice": { price: "129.00", oldPrice: "159.00", category: "FRESH FRUIT JUICES" },
    "Amla Juice": { price: "119.00", oldPrice: "149.00", category: "FRESH FRUIT JUICES" },
    "Mix Juice": { price: "139.00", oldPrice: "189.00", category: "FRESH FRUIT JUICES" },
    "Watermelon Juice": { price: "119.00", oldPrice: "149.00", category: "FRESH FRUIT JUICES" },
    "Sugarcane Juice": { price: "99.00", oldPrice: "129.00", category: "FRESH FRUIT JUICES" },
    // Salads
    "Salad Meal": { price: "149.00", oldPrice: "189.00", category: "HIGH PROTEIN SALADS & BOWLS" },
    "Salad Bowl": { price: "159.00", oldPrice: "199.00", category: "HIGH PROTEIN SALADS & BOWLS" },
    "Sprout Salad": { price: "129.00", oldPrice: "159.00", category: "HIGH PROTEIN SALADS & BOWLS" },
    "Fruit Cuts": { price: "119.00", oldPrice: "149.00", category: "READY TO EAT FRUITS" },
  };
  return meta[name] || { price: "139.00", oldPrice: "189.00", category: "FRESH FRUIT JUICES" };
}

function JuiceCard({ juice, type = "juices", widthClass = "w-[280px] md:w-[300px]" }) {
  const { t } = useLanguage();
  const src = resolveImage(juice.image);
  const meta = getProductMeta(juice.name);

  const isInactive =
    juice.status === "Inactive" ||
    juice.status === "inactive" ||
    juice.active === false ||
    juice.isActive === false;

  const isOutOfStock =
    juice.stockStatus === "Out of Stock" ||
    juice.stockStatus === "outofstock" ||
    juice.stock === false ||
    juice.inStock === false;

  if (isInactive) return null;

  return (
    <Link 
      to={`/product/${type}/${encodeURIComponent(juice.name)}`} 
      className={`${widthClass} text-left bg-transparent shrink-0 block group`}
    >
      {/* Image container */}
      <div className={`relative w-full aspect-square rounded-[24px] overflow-hidden bg-gradient-to-br ${juice.thumb || 'from-[#f5f8ed] to-[#e1e9cf]'} border border-[#eef0e5]`}>
        {src ? (
          <img 
            src={src} 
            alt={juice.name} 
            className="absolute inset-0 w-full h-full object-contain p-3 transform group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ProductIcon emoji={juice.emoji} className="w-14 h-14 text-[#2f4a1f] opacity-80" />
          </div>
        )}
        
        {/* OUT OF STOCK Badge if out of stock */}
        {isOutOfStock && (
          <span className="absolute top-3 left-3 bg-[#6e2438] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-sm shadow-sm uppercase tracking-wider z-10">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Details Container */}
      <div className="pt-3 pb-2 px-3 flex flex-col items-center gap-2 w-full text-center">
        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
          juice.status === "Upcoming"
            ? "bg-[#eec84a]/20 text-[#a87b3a]"
            : !isOutOfStock
            ? "bg-[#2f4a1f]/10 text-[#2f4a1f]"
            : "bg-[#6e2438]/10 text-[#6e2438]"
        }`}>
          {juice.status === "Upcoming" ? t("Upcoming") : !isOutOfStock ? t("In Stock") : t("Out of Stock")}
        </span>
        <h4 className="text-[17px] font-bold text-[#1f2b12] leading-snug group-hover:text-[#4e6c2f] transition-colors text-center">
          {t(juice.name)}
        </h4>
        <div className={`w-full text-center font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all duration-300 ${
          isOutOfStock 
            ? "bg-stone-300 text-stone-600" 
            : "bg-black group-hover:bg-[#cfe04a] group-hover:text-black text-white"
        }`}>
          {isOutOfStock ? t("Out of Stock") : t("View Product")}
        </div>
      </div>
    </Link>
  );
}

function CtaButton({ children, primary = false, small = false, link = DEFAULT_WHATSAPP_LINK }) {
  const base =
    "inline-flex justify-center items-center gap-2 rounded-full text-sm font-semibold transition-all";
  const size = small ? "px-4 py-2.5 text-[13px] w-full" : "px-6 py-3.5";
  const style = primary
    ? "bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12] hover:-translate-y-0.5"
    : "border-[1.5px] border-[#1f2b12] text-[#1f2b12] hover:bg-[#1f2b12] hover:text-white";

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${size} ${style}`}
    >
      {children}
    </a>
  );
}

export function OrderButton({ label = "Order on WhatsApp", link = DEFAULT_WHATSAPP_LINK }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#e6ecd2] border border-[#d4ddb9] px-4 py-2.5 text-[13px] font-semibold hover:bg-[#c9d94a] hover:border-[#c9d94a] transition-colors text-[#2b2b1f]"
    >
      <span>{label}</span>
      <MessageCircle className="w-4 h-4 text-[#3d5223]" />
    </a>
  );
}
