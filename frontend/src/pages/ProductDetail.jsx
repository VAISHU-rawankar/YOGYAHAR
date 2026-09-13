import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrendingNow from "../components/TrendingNow";
import InquiryModal from "../components/InquiryModal";
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
  Sparkles,
  Apple,
  Settings,
  CalendarDays,
  CheckCircle,
  XCircle,
  Shield,
  Heart,
  Truck,
  Lock,
  Trophy,
  Sun,
  Sunset,
  Bell,
  Gift
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
  "🍊": CupSoda,
  "🥛": GlassWater,
  "🍍": CupSoda,
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




const fullDefaultContent = {
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
      status: "Active",
      stockStatus: "In Stock"
    },
  ],
  nonSubItems: [
    {
      name: "Super Dry Fruits Laddu",
      tag: "High Shelf Life",
      desc: "Protein-rich energy laddu made from premium dry fruits — available in various quantities.",
      emoji: "🍡",
      thumb: "from-[#e8d2a8] to-[#a87b3a]",
      status: "Active",
      stockStatus: "In Stock",
    },
    {
      name: "Cold Pressed Oil",
      tag: "High Shelf Life",
      desc: "Wood-pressed & chemical-free. Available in: Groundnut, Sunflower, Flax Seeds, Coconut, Mustard, Sesame, Safflower — various quantities.",
      emoji: "🫙",
      thumb: "from-[#fff0c8] to-[#d4952a]",
      status: "Active",
      stockStatus: "In Stock",
      variants: ["Groundnut", "Sunflower", "Flax Seeds", "Coconut", "Mustard", "Sesame", "Safflower"],
    },
  ],
};

const ingredientData = {
  "Green Detox Juice": [
    { name: "Cucumber", emoji: "🥒" },
    { name: "Green Apple", emoji: "🍏" },
    { name: "Spinach", emoji: "🥬" },
    { name: "Kale", emoji: "🥬" },
    { name: "Celery", emoji: "🥦" },
    { name: "Lemon", emoji: "🍋" }
  ],
  "Carrot Juice": [
    { name: "Carrot", emoji: "🥕" },
    { name: "Ginger", emoji: "🫚" },
    { name: "Lemon", emoji: "🍋" }
  ],
  "Amla Juice": [
    { name: "Amla", emoji: "🫒" },
    { name: "Mint", emoji: "🌱" }
  ]
};

const relatedProductsDefault = [
  { name: "Immunity Booster", desc: "Orange, Carrot, Ginger, Turmeric", price: "₹199", tag: "Regular", emoji: "🍊", thumb: "from-[#ffe8b8] to-[#ff8a4c]" },
  { name: "Beetroot Revive", desc: "Beetroot, Apple, Carrot, Lemon", price: "₹199", tag: "Special", emoji: "🍠", thumb: "from-[#ffd6d6] to-[#e0435c]" },
  { name: "Pineapple Mint Cooler", desc: "Pineapple, Mint, Lemon", price: "₹199", tag: "Seasonal", emoji: "🍍", thumb: "from-[#eef4e2] to-[#9ec13a]" },
  { name: "Almond Delight", desc: "Almond, Dates, Cardamom, Milk", price: "₹199", tag: "Special", emoji: "🥛", thumb: "from-[#fbf3e7] to-[#e6dcc8]" },
];

export default function ProductDetail() {
  const { category, name } = useParams();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [content] = useSectionContent("products", fullDefaultContent);
  const [quantity, setQuantity] = useState(1);
  const [activeTabImg, setActiveTabImg] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState("ingredients");
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("plan");
    if (p === "1Day") return "1Day";
    if (p === "25Days") return "25Days";
    return "6Days";
  });
  const { t } = useLanguage();

  const decodedCategory = category;
  const decodedName = decodeURIComponent(name);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [decodedCategory, decodedName]);

  // Find product details
  let productItem = null;
  if (decodedCategory === "juices") {
    productItem = content.juices?.find((x) => x.name === decodedName);
  } else if (decodedCategory === "salads") {
    productItem = content.salads?.find((x) => x.name === decodedName);
  } else if (decodedCategory === "non-sub" || decodedCategory === "nonSubItems") {
    productItem = content.nonSubItems?.find((x) => x.name === decodedName);
  } else if (decodedCategory === "detox") {
    productItem = {
      name: content.detoxHeading || "Detox Water",
      emoji: "💧",
      thumb: "from-[#eef4e2] to-[#c9e0a0]",
      image: content.detoxImage,
      tag: "Subscription"
    };
  }

  // Fallback lookup across all categories if category param did not match perfectly
  if (!productItem) {
    productItem =
      content.juices?.find((x) => x.name === decodedName) ||
      content.salads?.find((x) => x.name === decodedName) ||
      content.nonSubItems?.find((x) => x.name === decodedName);
  }

  const isItemActive =
    productItem?.status !== undefined
      ? (productItem.status !== "Inactive" && productItem.status !== "inactive" && productItem.status !== "निष्क्रिय" && productItem.status !== false)
      : productItem?.active !== undefined
      ? (productItem.active !== "Inactive" && productItem.active !== "inactive" && productItem.active !== "निष्क्रिय" && productItem.active !== false)
      : productItem?.isActive !== undefined
      ? (productItem.isActive !== "Inactive" && productItem.isActive !== "inactive" && productItem.isActive !== "निष्क्रिय" && productItem.isActive !== false)
      : true;

  const isItemInStock =
    productItem?.stockStatus !== undefined
      ? (productItem.stockStatus !== "Out of Stock" && productItem.stockStatus !== "outofstock" && productItem.stockStatus !== "आउट ऑफ स्टॉक" && productItem.stockStatus !== "स्टॉकमध्ये नाही" && productItem.stockStatus !== false)
      : productItem?.stock !== undefined
      ? (productItem.stock !== "Out of Stock" && productItem.stock !== "outofstock" && productItem.stock !== "आउट ऑफ स्टॉक" && productItem.stock !== "स्टॉकमध्ये नाही" && productItem.stock !== false)
      : productItem?.inStock !== undefined
      ? (productItem.inStock !== "Out of Stock" && productItem.inStock !== "outofstock" && productItem.inStock !== "आउट ऑफ स्टॉक" && productItem.inStock !== "स्टॉकमध्ये नाही" && productItem.inStock !== false)
      : true;

  const pImg = resolveImage(productItem?.image);
  const pThumb = productItem?.thumb || "from-[#eef4e2] to-[#c9e0a0]";
  const pEmoji = productItem?.emoji || "🥦";
  const isSubscription = decodedCategory === "juices" || decodedCategory === "salads" || decodedCategory === "detox";

  // Simulate multiple image tabs for mockup aesthetic
  const imageGallery = pImg 
    ? [pImg, pImg, pImg, pImg]
    : [null, null, null, null];

  const ingredients = ingredientData[`${decodedName} Juice`] || ingredientData[decodedName] || [
    { name: "Pure Extract", emoji: pEmoji },
    { name: "Clean Water", emoji: "💧" },
    { name: "Natural Herbs", emoji: "🍃" }
  ];

  const whatsappMessage = encodeURIComponent(
    `Hi Yogyahar! I would like to order/subscribe to "${decodedName}" (Quantity: ${quantity}) from the products page.`
  );

  const notifyMessage = encodeURIComponent(
    `Hi Yogyahar! "${decodedName}" is currently out of stock. Please notify me on WhatsApp when it is back in stock.`
  );

  const sampleMessage = encodeURIComponent(
    `Hi Yogyahar! I would like to grab a Paid Sample of "${decodedName}". Please share the details.`
  );

  // Dynamically select related products from the actual juices list
  const allJuices = content.juices || [];
  const relatedProducts = allJuices
    .filter((j) => j.name !== decodedName)
    .slice(0, 4)
    .map((j) => {
      const ingredientsList = ingredientData[j.name] || ingredientData[`${j.name} Juice`] || [];
      const desc = ingredientsList.length > 0 
        ? ingredientsList.map(i => i.name).join(", ") 
        : "Fresh, healthy, 100% organic juice";
      return {
        name: j.name,
        desc: desc,
        price: "₹199",
        tag: j.tag || "Regular",
        emoji: j.emoji || "🥤",
        thumb: j.thumb || "from-[#eef4e2] to-[#c9e0a0]",
        image: j.image
      };
    });

  return (
    <div className="text-[#2b2b1f] bg-[#FAFAF9] min-h-screen flex flex-col font-sans">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Breadcrumb navigation */}
      <div className="bg-white border-b border-[#eee3cf]/40 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 text-xs font-semibold text-[#8c8c7a] tracking-wide">
          <Link to="/" className="hover:text-[#2f4a1f] transition-colors">{t("Home")}</Link>
          <span>&rsaquo;</span>
          <Link to="/products" className="hover:text-[#2f4a1f] transition-colors">{t("Products")}</Link>
          <span>&rsaquo;</span>
          <span className="text-[#2f4a1f] font-bold">{t(decodedName)}</span>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 md:py-16">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch mb-8 lg:mb-10">
          
          {/* Left Column: Image + Specifications + Ingredients */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full h-full">
            <div className="relative w-full h-full min-h-[350px] sm:min-h-[400px] flex-1 rounded-[24px] overflow-hidden bg-[#faf8f5] border border-[#eee3cf]/50 p-2 flex items-center justify-center shadow-sm">
              <span className="absolute top-4 left-4 bg-[#4a6b2a]/10 text-[#4a6b2a] text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1 z-10">
                <Leaf className="w-3 h-3 text-[#4a6b2a]" /> {t("100% Natural")}
              </span>
              
              {imageGallery[activeTabImg] ? (
                <img
                  src={imageGallery[activeTabImg]}
                  alt={t(decodedName)}
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${pThumb} flex items-center justify-center shadow-inner relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/[0.02]" />
                  <ProductIcon emoji={pEmoji} className="w-24 h-24 text-[#2f4a1f] opacity-90 filter drop-shadow-sm" />
                </div>
              )}
            </div>

            {/* Cold Pressed Oil Variants */}
            {productItem?.variants && (
              <div className="bg-white border border-[#eee3cf]/60 rounded-2xl p-4 text-left shadow-sm">
                <span className="text-[11px] font-bold text-[#8c8c7a] uppercase tracking-wider block mb-2">{t("Available Varieties")}</span>
                <div className="flex flex-wrap gap-1.5">
                  {productItem.variants.map((v) => (
                    <span key={v} className="text-[11px] bg-[#f4ede0] text-[#4a6b2a] font-semibold px-2.5 py-1 rounded-full border border-[#eee3cf]">
                      {t(v)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
 
          {/* Right Column: Detailed Product Buy Section & Health Benefits */}
          <div className="lg:col-span-7 text-left flex flex-col justify-between gap-5 h-full">
            <div>
              {decodedCategory === "juices" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-[2px] text-[#4a6b2a] bg-[#4a6b2a]/10 px-3 py-1 rounded-full uppercase mb-2">
                  <Leaf className="w-3.5 h-3.5 text-[#4a6b2a] mr-0.5" /> {t("Rasahar · Cold Pressed Juice")}
                </span>
              )}
              {decodedCategory === "salads" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-[2px] text-[#d99e1f] bg-[#d99e1f]/10 px-3 py-1 rounded-full uppercase mb-2">
                  🥗 {t("Fresh Salad")}
                </span>
              )}
              {decodedCategory === "detox" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-[2px] text-[#2f4a1f] bg-[#2f4a1f]/10 px-3 py-1 rounded-full uppercase mb-2">
                  💧 {t("Detox Water")}
                </span>
              )}
              {(decodedCategory === "nonSubItems" || decodedCategory === "non-sub") && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-[2px] text-[#a87b3a] bg-[#a87b3a]/10 px-3 py-1 rounded-full uppercase mb-2">
                  ⭐ {t("High Shelf Life Product")}
                </span>
              )}
              <h1 className="text-[32px] md:text-[38px] font-display text-[#2f4a1f] font-bold leading-tight mb-1">
                {t(decodedName)}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {/* Unified Status Badge */}
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1 rounded-full ${
                  productItem?.status === "Upcoming"
                    ? "bg-[#eec84a]/20 text-[#a87b3a] border border-[#eec84a]/30"
                    : isItemInStock
                    ? "bg-[#2f4a1f]/10 text-[#2f4a1f] border border-[#2f4a1f]/20"
                    : "bg-[#6e2438]/10 text-[#6e2438] border border-[#6e2438]/20"
                }`}>
                  {productItem?.status === "Upcoming" ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a87b3a] animate-pulse" />
                      📅 {t("Upcoming")}
                    </>
                  ) : isItemInStock ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c9e20]" />
                      📦 {t("In Stock")}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e03131]" />
                      🚫 {t("Out of Stock")}
                    </>
                  )}
                </span>

                {productItem?.tag && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    productItem.tag === "Regular" ? "bg-[#4a6b2a]/10 text-[#4a6b2a]" :
                    productItem.tag === "Seasonal" ? "bg-[#d99e1f]/10 text-[#d99e1f]" :
                    productItem.tag === "Special" ? "bg-[#6e2438]/10 text-[#6e2438]" :
                    "bg-[#a87b3a]/10 text-[#a87b3a]"
                  }`}>
                    {productItem.tag}
                  </span>
                )}
                <span className="text-[#6b6b5c] text-[13.5px] font-medium italic">{t("Cleanse. Refresh. Rejuvenate.")}</span>
              </div>
            </div>

            <p className="text-[14.5px] text-[#555546] leading-relaxed">
              {t("A refreshing blend of premium local ingredients. Designed to detox your body, improve digestion, and boost your energy levels naturally.")}
            </p>

            {/* Interactive Tabs for Ingredients, Advantages, Precautions, Not Suitable For */}
            <div className="mt-4 bg-[#fbfaf3] border border-[#d4ddb9]/50 rounded-2xl overflow-hidden shadow-sm text-left">
              <div className="flex flex-wrap border-b border-[#d4ddb9]/30 bg-[#f9fbf4]">
                {[
                  { id: "ingredients", label: "Ingredients" },
                  { id: "advantages", label: "Advantages" },
                  { id: "precautions", label: "Precautions" },
                  { id: "notSuitable", label: "Not Suitable For" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id)}
                    className={`flex-1 py-3 px-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 text-center whitespace-nowrap ${
                      activeDetailTab === tab.id
                        ? "border-[#4a6b2a] text-[#4a6b2a] bg-white"
                        : "border-transparent text-[#6b6b5c] hover:text-[#2f4a1f] hover:bg-stone-50"
                    }`}
                  >
                    {t(tab.label)}
                  </button>
                ))}
              </div>
              <div className="p-5 min-h-[120px]">
                {activeDetailTab === "ingredients" && (
                  <div>
                    <span className="text-[11px] font-extrabold text-[#4a6b2a] uppercase tracking-wider block mb-2">🍎 {t("Ingredients List")}</span>
                    <p className="text-[13.5px] text-[#555546] leading-relaxed font-medium">
                      {t(productItem?.ingredients) || t("Pure organic extracts, fresh seasonal fruits, clean filtered water, natural herbs.")}
                    </p>
                  </div>
                )}
                {activeDetailTab === "advantages" && (
                  <div>
                    <span className="text-[11px] font-extrabold text-[#4a6b2a] uppercase tracking-wider block mb-2">⭐ {t("Key Advantages")}</span>
                    <p className="text-[13.5px] text-[#3a5823] leading-relaxed font-medium">
                      {t(productItem?.benefits) || t("Rich in natural minerals and active enzymes. Promotes digestion, boosts immunity, and keeps you hydrated throughout the day.")}
                    </p>
                  </div>
                )}
                {activeDetailTab === "precautions" && (
                  <div>
                    <span className="text-[11px] font-extrabold text-[#8c4015] uppercase tracking-wider block mb-2">⚠️ {t("Important Precautions")}</span>
                    <p className="text-[13px] text-[#8c4015] leading-relaxed font-medium">
                      {t(productItem?.precautions) || t("Consult a physician if you are managing severe medical conditions, food allergies, or specific dietary restrictions.")}
                    </p>
                  </div>
                )}
                {activeDetailTab === "notSuitable" && (
                  <div>
                    <span className="text-[11px] font-extrabold text-[#6e2438] uppercase tracking-wider block mb-2">🚫 {t("Not Suitable For")}</span>
                    <p className="text-[13px] text-[#6e2438] leading-relaxed font-medium">
                      {t(productItem?.notSuitableFor || productItem?.notSuitable) || t("Not recommended for infants under 1 year, or individuals with severe sugar sensitivities (for fruit-based items).")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-y border-[#eee3cf]/30 py-3.5 my-1">
              <div className="text-center flex flex-col items-center gap-1">
                <Shield className="w-5 h-5 text-[#2f4a1f]" />
                <span className="text-[9px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">{t("100% Pure")}</span>
                <span className="text-[8px] text-[#8c8c7a]">{t("No Preservatives")}</span>
              </div>
              <div className="text-center flex flex-col items-center gap-1">
                <CupSoda className="w-5 h-5 text-[#2f4a1f]" />
                <span className="text-[9px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">{t("Cold Pressed")}</span>
                <span className="text-[8px] text-[#8c8c7a]">{t("Max Nutrition")}</span>
              </div>
              <div className="text-center flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-[#2f4a1f]" />
                <span className="text-[9px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">{t("Fresh Delivery")}</span>
                <span className="text-[8px] text-[#8c8c7a]">{t("Daily Slots")}</span>
              </div>
              <div className="text-center flex flex-col items-center gap-1">
                <Heart className="w-5 h-5 text-[#2f4a1f]" />
                <span className="text-[9px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">{t("Diet Friendly")}</span>
                <span className="text-[8px] text-[#8c8c7a]">{t("Weight Loss")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications — Full Width */}
        <div className="mb-8 bg-[#f4ede0]/40 border border-[#eee3cf]/60 rounded-[24px] p-5 sm:p-6 text-left shadow-sm">
          <h3 className="text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider mb-3">{t("Product Specifications")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">{t("Type of Making")}</span>
                <p className="text-[12px] sm:text-[13px] font-bold text-[#2f4a1f] leading-tight">{t(productItem?.makingType || "Cold Pressed")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">{t("Available")}</span>
                <p className="text-[12px] sm:text-[13px] font-bold text-[#2f4a1f] leading-tight">{t(productItem?.availability || "Throughout the year")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                {(productItem?.suitableForFast === "Yes" || productItem?.suitableForFast === true || (productItem?.suitableForFast !== "No" && productItem?.suitableForFast !== false)) ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4a6b2a]" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#6e2438]" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">{t("Suitable for Fast")}</span>
                <p className="text-[12px] sm:text-[13px] font-bold text-[#2f4a1f] leading-tight">
                  {(productItem?.suitableForFast === "Yes" || productItem?.suitableForFast === true || (productItem?.suitableForFast !== "No" && productItem?.suitableForFast !== false)) ? t("Yes") : t("No")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                <span className="text-base sm:text-lg">🟢</span>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">
                  {t("Product Status")}
                </span>
                <p className={`text-[12px] sm:text-[13px] font-bold leading-tight ${
                  productItem?.status === "Upcoming" ? "text-[#a87b3a]" : isItemInStock ? "text-[#2f4a1f]" : "text-[#6e2438]"
                }`}>
                  {productItem?.status === "Upcoming" ? t("Upcoming") : isItemInStock ? t("Active") : t("Out of Stock")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                <span className="text-base sm:text-lg">🥤</span>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">{t("Products Includes")}</span>
                <p className="text-[12px] sm:text-[13px] font-bold text-[#2f4a1f] leading-tight">
                  {(productItem?.name?.toLowerCase()?.includes("mix") || productItem?.name?.toLowerCase()?.includes("combination") || productItem?.name?.toLowerCase()?.includes("red juice")) 
                    ? t("Combination of Multiple Products") 
                    : t("Single Product")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#eee3cf]/60 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2f4a1f]/10 flex items-center justify-center text-[#2f4a1f] shrink-0">
                <span className="text-base sm:text-lg">⚖️</span>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#8c8c7a] uppercase tracking-wider block mb-0.5">{t("Available Quantities")}</span>
                <p className="text-[12px] sm:text-[13px] font-bold text-[#2f4a1f] leading-tight">
                  {decodedCategory === "juices" ? t("200 ml / 300 ml / 500 ml") : t("200 gm / 450 gm")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Packages — 3 Duration Pricing Tiers */}
        {(() => {
          const rawPrice = productItem?.price;
          const defaultBasePrice =
            decodedCategory === "juices" ? 129 :
            (decodedCategory === "nonSubItems" || decodedCategory === "non-sub") ? 199 :
            149;
          const p1 = Number(productItem?.price1Day) || (typeof rawPrice === "number" ? rawPrice : parseInt(String(rawPrice || "").replace(/\D/g, "")) || defaultBasePrice);
          const p6 = Number(productItem?.price6Days) || Math.round(p1 * 6 * 0.9);
          const p25 = Number(productItem?.price25Days) || Math.round(p1 * 25 * 0.8);

          return (
            <div className="mb-8 md:mb-12 text-left bg-white border border-[#eee3cf]/60 rounded-[24px] p-4 sm:p-6 shadow-sm">
              <span className="block text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider mb-4">{t("Subscription Packages (3 Duration Pricing)")}</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
                {[
                  { label: "1 Day Plan", badge: "Trial Plan", price: `₹${p1}`, perDay: `₹${p1} / day`, badgeColor: "bg-[#f0b429]/10 text-[#a87b3a]", border: "border-t-[#f0b429]", popular: false },
                  { label: "6 Days Plan", badge: "Save 10%", price: `₹${p6}`, perDay: `~₹${Math.round(p6 / 6)} / day`, badgeColor: "bg-emerald-100 text-emerald-800 font-bold", border: "border-t-[#2f4a1f]", popular: true },
                  { label: "25 Days Plan", badge: "Save 20% Best Value", price: `₹${p25}`, perDay: `~₹${Math.round(p25 / 25)} / day`, badgeColor: "bg-[#6e2438]/10 text-[#6e2438] font-bold", border: "border-t-[#6e2438]", popular: false },
                ].map((plan) => (
                  <div
                    key={plan.label}
                    className={`relative bg-white border border-[#eee3cf]/60 border-t-4 ${plan.border} rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${plan.popular ? "ring-2 ring-[#cfe04a] bg-[#fbfdf6]" : ""}`}
                  >
                    <div className="flex flex-col gap-1 text-left mb-3">
                      <span className="text-[17px] font-extrabold text-[#2f4a1f]">{t(plan.label)}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit ${plan.badgeColor}`}>{t(plan.badge)}</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-2 border-t border-[#f0f4e2]">
                      <span className="text-2xl font-black text-[#1f2b12]">{plan.price}</span>
                      <span className="text-xs font-semibold text-gray-500">{plan.perDay}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-[#6b6b5c] bg-[#f4ede0]/30 border border-[#eee3cf]/60 rounded-xl px-5 py-3.5">
                <span className="flex items-center gap-1.5"><Sun className="w-4 h-4 text-[#2f4a1f]" /> {t("Morning Slot: ")} 6–9 AM</span>
                <span className="flex items-center gap-1.5"><Sunset className="w-4 h-4 text-[#2f4a1f]" /> {t("Evening Slot: ")} 5–7 PM</span>
              </div>

              <div className="mt-6">
                {isItemInStock ? (
                  <a
                    href={`https://wa.me/917499643234?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex justify-center items-center gap-2.5 bg-black hover:bg-[#cfe04a] text-white hover:text-black rounded-xl py-3.5 text-xs font-bold transition-all shadow-md active:scale-95 uppercase tracking-wider"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.075-1.33a9.97 9.97 0 004.937 1.33h.005c5.507 0 9.99-4.478 9.99-9.984a9.97 9.97 0 00-2.923-7.062A9.97 9.97 0 0012.012 2zm5.725 14.195c-.247.697-1.442 1.3-1.996 1.385-.503.078-1.157.143-3.328-.755-2.775-1.148-4.545-3.98-4.684-4.166-.138-.186-1.123-1.493-1.123-2.85 0-1.355.706-2.017.957-2.28.25-.262.553-.328.738-.328.184 0 .368.002.528.01.166.008.388-.063.606.464.225.545.767 1.866.833 2 .066.134.11.29.02.465-.09.18-.135.29-.27.447-.134.156-.285.347-.406.467-.135.132-.277.275-.12.545.158.27 1.01 1.666 2.164 2.69 1.488 1.32 2.733 1.728 3.12 1.884.388.156.613.13.842-.128.229-.26.974-1.135 1.236-1.52.261-.387.525-.325.882-.196.358.13 2.273 1.07 2.664 1.266.39.196.65.292.747.458.096.166.096.96-.151 1.657z" />
                    </svg>
                    <span>{t("Order on WhatsApp")}</span>
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/917499643234?text=${notifyMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex justify-center items-center gap-2.5 bg-[#6e2438] hover:bg-[#872c46] text-white rounded-xl py-3.5 text-xs font-bold transition-all shadow-md active:scale-95 uppercase tracking-wider"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{t("Notify Me When Available")}</span>
                  </a>
                )}

                {isItemInStock && (
                  <a
                    href={`https://wa.me/917499643234?text=${sampleMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full flex justify-center items-center gap-2.5 bg-white hover:bg-[#f4ede0] text-[#2f4a1f] border-2 border-[#2f4a1f] rounded-xl py-3.5 text-xs font-bold transition-all shadow-sm active:scale-95 uppercase tracking-wider"
                  >
                    <Gift className="w-4 h-4" />
                    <span>{t("Grab Your Paid Sample")}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })()}

        {/* You May Also Like Related Section */}
        <div className="text-left mb-10 md:mb-16">
          <h2 className="text-[22px] sm:text-[28px] font-display text-[#2f4a1f] font-bold text-center mb-2">
            {t("You May Also Like")}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-12 h-[1.5px] bg-[#d99e1f]/50" />
            <Leaf className="w-3.5 h-3.5 text-[#d99e1f] shrink-0" />
            <div className="w-12 h-[1.5px] bg-[#d99e1f]/50" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((rel, idx) => (
              <Link
                key={idx}
                to={`/product/juices/${encodeURIComponent(rel.name)}`}
                className="group bg-white border border-[#eee3cf]/50 rounded-[24px] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className={`relative overflow-hidden aspect-[1.1/1] flex items-center justify-center text-5xl bg-gradient-to-br ${rel.thumb}`}>
                  {resolveImage(rel.image) ? (
                    <img
                      src={resolveImage(rel.image)}
                      alt={rel.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ProductIcon emoji={rel.emoji} className="w-12 h-12 text-[#2f4a1f] opacity-80" />
                  )}
                  <span className="absolute top-3 right-3 text-[9px] font-extrabold bg-white/95 text-[#2f4a1f] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {t(rel.tag)}
                  </span>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 gap-4 text-left">
                  <div>
                    <h4 className="text-[15.5px] font-bold text-[#2f4a1f] mb-1 group-hover:text-[#4a6b2a] transition-colors">{t(rel.name)}</h4>
                    <p className="text-[12.5px] text-[#6b6b5c] leading-snug">{t(rel.desc)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#eee3cf]/30 pt-3">
                    <span className="text-[16px] font-extrabold text-[#2f4a1f]">{t(rel.price)}</span>
                    <span className="w-7 h-7 rounded-full bg-[#f0b429]/10 text-[#d99e1f] hover:bg-[#f0b429] hover:text-[#2b2b1f] flex items-center justify-center text-sm font-bold transition-all">
                      +
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Trust Badges Footer Bar */}
      <div className="bg-[#FAF7F2] border-t border-[#eee3cf]/40 py-6 md:py-8 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-xs font-bold text-[#555546] uppercase tracking-wider">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-6 h-6 text-[#2f4a1f]" />
            <div className="text-left">
              <div className="text-[#2f4a1f]">{t("Delivered Fresh")}</div>
              <div className="text-[10px] text-[#8c8c7a] font-semibold mt-0.5 normal-case tracking-normal">{t("At your doorstep")}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Lock className="w-6 h-6 text-[#2f4a1f]" />
            <div className="text-left">
              <div className="text-[#2f4a1f]">{t("Secure Payment")}</div>
              <div className="text-[10px] text-[#8c8c7a] font-semibold mt-0.5 normal-case tracking-normal">{t("100% safe & secure")}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CalendarDays className="w-6 h-6 text-[#2f4a1f]" />
            <div className="text-left">
              <div className="text-[#2f4a1f]">{t("Subscription Plans")}</div>
              <div className="text-[10px] text-[#8c8c7a] font-semibold mt-0.5 normal-case tracking-normal">{t("Save more with plans")}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-6 h-6 text-[#2f4a1f]" />
            <div className="text-left">
              <div className="text-[#2f4a1f]">{t("100% Satisfaction")}</div>
              <div className="text-[10px] text-[#8c8c7a] font-semibold mt-0.5 normal-case tracking-normal">{t("We care for you")}</div>
            </div>
          </div>
        </div>
      </div>

      <TrendingNow />
      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
