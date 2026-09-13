import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrendingNow from "../components/TrendingNow";
import InquiryModal from "../components/InquiryModal";
import productsHero from "../assets/products_hero.png";
import { 
  Sparkles,
  CupSoda, 
  GlassWater, 
  Utensils, 
  Leaf, 
  ShoppingBag, 
  Package, 
  Apple
} from "lucide-react";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const emojiIconMap = {
  "🫒": GlassWater,
  "🍎": Apple,
  "🍹": CupSoda,
  "🥗": Utensils,
  "🥑": Utensils,
  "🍌": CupSoda,
  "🍠": GlassWater,
  "🫐": CupSoda,
  "🥕": CupSoda,
  "🥬": Leaf,
  "🍉": GlassWater,
  "🌿": Leaf,
  "🧃": CupSoda,
  "🍓": CupSoda,
  "🥙": Utensils,
  "🌱": Leaf,
  "🍡": ShoppingBag,
  "🫙": Package,
};

function ProductIcon({ emoji, className }) {
  const IconComponent = emojiIconMap[emoji] || Sparkles;
  return <IconComponent className={className} strokeWidth={1.5} />;
}



const productsList = [
  {
    name: "Carrot Juice",
    price: 129,
    originalPrice: 159,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🥕",
    thumb: "from-[#ffe2b8] to-[#ff9a3c]",
    sale: true,
    inStock: true
  },
  {
    name: "Amla Juice",
    price: 119,
    originalPrice: 149,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🫒",
    thumb: "from-[#e4f2c2] to-[#9ec13a]",
    sale: true,
    inStock: true
  },
  {
    name: "Green Juice",
    price: 129,
    originalPrice: 159,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🥬",
    thumb: "from-[#d8f2c0] to-[#6bb03a]",
    sale: true,
    inStock: true
  },
  {
    name: "Mix Juice",
    price: 139,
    originalPrice: 189,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🍹",
    thumb: "from-[#ffe8b8] to-[#ff8a4c]",
    sale: true,
    inStock: true
  },
  {
    name: "Watermelon Juice",
    price: 119,
    originalPrice: 149,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🍉",
    thumb: "from-[#ffd2d2] to-[#ff5c6c]",
    sale: true,
    inStock: true
  },
  {
    name: "Sugarcane Juice",
    price: 99,
    originalPrice: 129,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🌿",
    thumb: "from-[#d8f2c0] to-[#4a9a3a]",
    sale: true,
    inStock: true
  },
  {
    name: "Beetroot Juice",
    price: 139,
    originalPrice: 179,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🍠",
    thumb: "from-[#e6c2d8] to-[#7a1f4a]",
    sale: true,
    inStock: true
  },
  {
    name: "Combination Juice",
    price: 149,
    originalPrice: 189,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🧃",
    thumb: "from-[#ffe0e0] to-[#ff7a7a]",
    sale: true,
    inStock: true
  },
  {
    name: "Red Juice",
    price: 139,
    originalPrice: 189,
    category: "juices",
    categoryLabel: "FRESH FRUIT JUICES",
    emoji: "🍓",
    thumb: "from-[#ffd6d6] to-[#e0435c]",
    sale: true,
    inStock: true
  },
  {
    name: "Salad Meal",
    price: 149,
    originalPrice: 189,
    category: "salads",
    categoryLabel: "HIGH PROTEIN SALADS & BOWLS",
    emoji: "🥗",
    thumb: "from-[#e2f0c8] to-[#7fae3a]",
    sale: true,
    inStock: true
  },
  {
    name: "Fruit Cuts",
    price: 119,
    originalPrice: 149,
    category: "salads",
    categoryLabel: "READY TO EAT FRUITS",
    emoji: "🍎",
    thumb: "from-[#f7e8ee] to-[#f0d5e0]",
    sale: true,
    inStock: true
  },
  {
    name: "Salad Bowl",
    price: 159,
    originalPrice: 199,
    category: "salads",
    categoryLabel: "HIGH PROTEIN SALADS & BOWLS",
    emoji: "🥙",
    thumb: "from-[#ffe8b8] to-[#ff8a4c]",
    sale: true,
    inStock: true
  },
  {
    name: "Sprout Salad",
    price: 129,
    originalPrice: 159,
    category: "salads",
    categoryLabel: "HIGH PROTEIN SALADS & BOWLS",
    emoji: "🌱",
    thumb: "from-[#d8f2c0] to-[#6bb03a]",
    sale: true,
    inStock: true
  },
  {
    name: "Super Laddu",
    price: 199,
    originalPrice: 249,
    category: "nonSubItems",
    categoryLabel: "NON-SUBSCRIPTION ESSENTIALS",
    emoji: "🍡",
    thumb: "from-[#e8d2a8] to-[#a87b3a]",
    sale: true,
    inStock: true
  },
  {
    name: "Cold Pressed Oil",
    price: 199,
    originalPrice: 249,
    category: "nonSubItems",
    categoryLabel: "NON-SUBSCRIPTION ESSENTIALS",
    emoji: "🫙",
    thumb: "from-[#fff0c8] to-[#d4952a]",
    sale: true,
    inStock: true
  },
  {
    name: "Detox Water",
    price: 149,
    originalPrice: 189,
    category: "detox",
    categoryLabel: "DETOX WATER",
    emoji: "🫒",
    thumb: "from-[#eef4e2] to-[#c9e0a0]",
    sale: true,
    inStock: true
  }
];

const categoryOptions = [
  { value: "all", label: "Select a category" },
  { value: "juices", label: "Juices & Smoothies" },
  { value: "salads", label: "Salads & Fruit Bowls" },
  { value: "detox", label: "Detox Water" },
  { value: "nonSubItems", label: "Non-Subscription Essentials" },
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState(340);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedDietGoal, setSelectedDietGoal] = useState("all");
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location, searchParams]);

  const [productsContent] = useSectionContent("products", {
    juices: [],
    salads: [],
    nonSubItems: [],
    detox: []
  });

  const rawMerged = [
    ...(productsContent.juices || []).map(p => ({
      ...p,
      price: Number(p.price) || 129,
      originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      category: p.name?.toLowerCase().includes("detox") ? "detox" : "juices",
      categoryLabel: p.name?.toLowerCase().includes("detox") ? "DETOX WATER" : "FRESH FRUIT JUICES",
      isActive: p.status === undefined ? true : (p.status !== "Inactive" && p.status !== "inactive" && p.status !== "निष्क्रिय" && p.status !== false),
      inStock: p.stockStatus === undefined ? (p.inStock !== undefined ? p.inStock : true) : (p.stockStatus !== "Out of Stock" && p.stockStatus !== "outofstock" && p.stockStatus !== "आउट ऑफ स्टॉक" && p.stockStatus !== "स्टॉकमध्ये नाही" && p.stockStatus !== false),
      sale: p.sale !== undefined ? p.sale : true
    })),
    ...(productsContent.salads || []).map(p => ({
      ...p,
      price: Number(p.price) || 149,
      originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      category: "salads",
      categoryLabel: "HIGH PROTEIN SALADS & BOWLS",
      isActive: p.status === undefined ? true : (p.status !== "Inactive" && p.status !== "inactive" && p.status !== "निष्क्रिय" && p.status !== false),
      inStock: p.stockStatus === undefined ? (p.inStock !== undefined ? p.inStock : true) : (p.stockStatus !== "Out of Stock" && p.stockStatus !== "outofstock" && p.stockStatus !== "आउट ऑफ स्टॉक" && p.stockStatus !== "स्टॉकमध्ये नाही" && p.stockStatus !== false),
      sale: p.sale !== undefined ? p.sale : true
    })),
    ...(productsContent.nonSubItems || []).map(p => ({
      ...p,
      price: Number(p.price) || 199,
      originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      category: "nonSubItems",
      categoryLabel: "NON-SUBSCRIPTION ESSENTIALS",
      isActive: p.status === undefined ? true : (p.status !== "Inactive" && p.status !== "inactive" && p.status !== "निष्क्रिय" && p.status !== false),
      inStock: p.stockStatus === undefined ? (p.inStock !== undefined ? p.inStock : true) : (p.stockStatus !== "Out of Stock" && p.stockStatus !== "outofstock" && p.stockStatus !== "आउट ऑफ स्टॉक" && p.stockStatus !== "स्टॉकमध्ये नाही" && p.stockStatus !== false),
      sale: p.sale !== undefined ? p.sale : true
    })),
    ...(productsContent.detox || []).map(p => ({
      ...p,
      price: Number(p.price) || 149,
      originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      category: "detox",
      categoryLabel: "DETOX WATER",
      isActive: p.status === undefined ? true : (p.status !== "Inactive" && p.status !== "inactive" && p.status !== "निष्क्रिय" && p.status !== false),
      inStock: p.stockStatus === undefined ? (p.inStock !== undefined ? p.inStock : true) : (p.stockStatus !== "Out of Stock" && p.stockStatus !== "outofstock" && p.stockStatus !== "आउट ऑफ स्टॉक" && p.stockStatus !== "स्टॉकमध्ये नाही" && p.stockStatus !== false),
      sale: p.sale !== undefined ? p.sale : true
    }))
  ];

  // Ensure Detox Water item from fallback is present if not in rawMerged
  const hasDetoxItem = rawMerged.some(p => p.category === "detox" || p.name?.toLowerCase().includes("detox"));
  const mergedProducts = hasDetoxItem
    ? rawMerged
    : [...rawMerged, ...productsList.filter(p => p.category === "detox")];

  const activeProductsList = mergedProducts.length > 0 ? mergedProducts : productsList;

  // Filtering Logic
  let filteredProducts = activeProductsList.filter((product) => {
    // Hide Inactive items
    if (product.isActive === false || product.status === "Inactive") {
      return false;
    }
    // Category Filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "detox") {
        const isDetox =
          product.category === "detox" ||
          product.name?.toLowerCase().includes("detox") ||
          product.categoryLabel?.toLowerCase().includes("detox") ||
          product.dietGoal?.toLowerCase().includes("detox");
        if (!isDetox) return false;
      } else if (product.category !== selectedCategory) {
        return false;
      }
    }
    // Price Filter
    if (product.price > priceRange) {
      return false;
    }
    // Stock Filter
    if (inStockOnly && !product.inStock) {
      return false;
    }
    // Diet Goal Filter
    if (selectedDietGoal !== "all") {
      const goal = product.dietGoal || (product.category === "juices" ? "detox, weight loss" : "weight loss");
      if (!goal.toLowerCase().includes(selectedDietGoal.toLowerCase())) {
        return false;
      }
    }
    // Delivery Slot Filter
    if (selectedDeliverySlot !== "all") {
      const slot = product.deliverySlots || "both";
      if (!slot.toLowerCase().includes(selectedDeliverySlot.toLowerCase()) && slot.toLowerCase() !== "both") {
        return false;
      }
    }
    return true;
  });

  // Sorting Logic
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-clip">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-14 md:py-28 overflow-hidden text-center"
        style={{ backgroundImage: `url(${productsHero})` }}
      >
        <div className="absolute inset-0 bg-[#fcfaef]/35 backdrop-blur-[0.5px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-[30px] sm:text-[40px] md:text-[56px] font-bold font-display text-[#1b3d17] leading-tight mb-3 md:mb-4">
            {t("Explore Our Fresh Selections")}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            {t("Fruit bowls, juices, and tropical picks – all in one place.")}
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="py-8 md:py-12 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10 items-start">
          
          {/* Mobile Filters Toggle Button */}
          <div className="lg:hidden flex items-center gap-3 col-span-1">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 bg-[#1b3d17] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" /></svg>
              {mobileFiltersOpen ? t("Hide Filters") : t("Show Filters")}
            </button>
            <span className="text-xs text-gray-500 font-semibold">{filteredProducts.length} {t("results")}</span>
          </div>

          {/* Left Column: Filters Sidebar */}
          <aside className={`lg:col-span-1 lg:sticky lg:top-28 z-20 bg-white border border-[#e2e8d5] p-5 sm:p-6 rounded-[24px] text-left shadow-[0_4px_25px_rgba(0,0,0,0.06)] text-[#1f2b12] ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between border-b border-[#e8eed8] pb-4 mb-6">
              <h3 className="text-base font-extrabold text-[#1f2b12] flex items-center gap-2 font-display">
                <span>{t("Filters")}</span>
                <span className="text-xs font-bold bg-[#f0f4e2] text-[#4a5f2e] px-2 py-0.5 rounded-full border border-[#d4ddb9]">
                  {filteredProducts.length}
                </span>
              </h3>
              {(selectedCategory !== "all" || selectedDietGoal !== "all" || selectedDeliverySlot !== "all" || inStockOnly) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDietGoal("all");
                    setSelectedDeliverySlot("all");
                    setInStockOnly(false);
                  }}
                  className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200 transition-all cursor-pointer"
                >
                  {t("Reset All")} ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                {t("Category")}
              </h4>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#f8faf2] border border-[#d4ddb9] rounded-xl px-3.5 py-2.5 text-xs text-[#1f2b12] font-semibold outline-none focus:border-[#5f7a3a] focus:bg-white transition-all cursor-pointer"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white text-[#1f2b12]">
                    {t(opt.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Diet Goal Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                {t("Diet Goal")}
              </h4>
              <select 
                value={selectedDietGoal}
                onChange={(e) => setSelectedDietGoal(e.target.value)}
                className="w-full bg-[#f8faf2] border border-[#d4ddb9] rounded-xl px-3.5 py-2.5 text-xs text-[#1f2b12] font-semibold outline-none focus:border-[#5f7a3a] focus:bg-white transition-all cursor-pointer"
              >
                <option value="all" className="bg-white text-[#1f2b12]">{t("All Diet Goals")}</option>
                <option value="weight loss" className="bg-white text-[#1f2b12]">{t("Weight Loss")}</option>
                <option value="detox" className="bg-white text-[#1f2b12]">{t("Detox")}</option>
                <option value="muscle gain" className="bg-white text-[#1f2b12]">{t("Muscle Gain")}</option>
                <option value="general health" className="bg-white text-[#1f2b12]">{t("General Health")}</option>
              </select>
            </div>

            {/* Delivery Slots Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                {t("Delivery Slots")}
              </h4>
              <select 
                value={selectedDeliverySlot}
                onChange={(e) => setSelectedDeliverySlot(e.target.value)}
                className="w-full bg-[#f8faf2] border border-[#d4ddb9] rounded-xl px-3.5 py-2.5 text-xs text-[#1f2b12] font-semibold outline-none focus:border-[#5f7a3a] focus:bg-white transition-all cursor-pointer"
              >
                <option value="all" className="bg-white text-[#1f2b12]">{t("All Slots")}</option>
                <option value="morning" className="bg-white text-[#1f2b12]">{t("Morning (6-9 AM)")}</option>
                <option value="evening" className="bg-white text-[#1f2b12]">{t("Evening (5-7 PM)")}</option>
                <option value="both" className="bg-white text-[#1f2b12]">{t("Both Slots")}</option>
              </select>
            </div>

            {/* Availability Checkbox */}
            <div className="mb-6 pt-4 border-t border-[#e8eed8]">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                {t("Stock Availability")}
              </h4>
              <label className="flex items-center gap-2.5 text-xs font-bold text-[#1f2b12] cursor-pointer select-none hover:text-[#5f7a3a] transition-colors">
                <input 
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#cbd8a4] text-[#5f7a3a] focus:ring-[#5f7a3a]/30 w-4 h-4 accent-[#5f7a3a] cursor-pointer"
                />
                {t("In stock items only")} ({activeProductsList.length})
              </label>
            </div>

            {/* Contact Card */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#d4ddb9] bg-[#f8faf2] p-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1f2b12] mb-1.5">{t("Need Custom Guidance?")}</h4>
              <p className="text-xs text-[#5c5c4f] leading-relaxed mb-3 m-0">
                {t("Questions about diet plans or ingredients? Reach our team directly.")}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+917499643234"
                  className="flex items-center gap-2 text-xs font-bold text-[#1f2b12] hover:text-[#5f7a3a] transition-colors no-underline"
                >
                  <span className="w-6 h-6 rounded-lg bg-[#e4ecc4] flex items-center justify-center text-xs">📞</span>
                  +91 7499643234
                </a>
                <a
                  href="https://wa.me/917499643234"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-[#1f2b12] hover:text-[#5f7a3a] transition-colors no-underline"
                >
                  <span className="w-6 h-6 rounded-lg bg-[#e4ecc4] flex items-center justify-center text-xs">💬</span>
                  {t("Chat on WhatsApp")}
                </a>
              </div>
            </div>
          </aside>


          {/* Right Column: Catalog Grid */}
          <main className="lg:col-span-3 col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
              <span className="text-xs font-semibold text-gray-500">
                {t("SHOWING")} 1-{filteredProducts.length} {t("OF")} {activeProductsList.length} {t("RESULTS")}
              </span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#eef0e5] rounded-xl px-4 py-2 text-xs text-gray-600 outline-none cursor-pointer self-start sm:self-auto"
              >
                <option value="default">{t("Default sorting")}</option>
                <option value="price-low">{t("Sort by price: low to high")}</option>
                <option value="price-high">{t("Sort by price: high to low")}</option>
                <option value="name-asc">{t("Sort by name: A-Z")}</option>
              </select>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#eef0e5] rounded-3xl">
                <span className="text-4xl">🥦</span>
                <p className="text-gray-500 text-sm mt-3 font-semibold">{t("No products found matching filters.")}</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
              >
                {filteredProducts.map((product) => {
                  const isSubscription = product.category === "juices" || product.category === "salads" || product.category === "detox";
                  return (
                    <div
                      key={product.name}
                      className="bg-white border border-[#eef0e5] rounded-[20px] overflow-hidden text-center flex flex-col justify-between hover:shadow-md transition-shadow relative"
                    >
                      {/* Out of stock Badge */}
                      {!product.inStock && (
                        <span className="absolute top-3 left-3 bg-[#6e2438] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md z-10 shadow-sm uppercase tracking-wider">
                          {t("OUT OF STOCK")}
                        </span>
                      )}

                      {/* Image Area */}
                      <Link
                        to={`/product/${product.category}/${encodeURIComponent(product.name)}`}
                        className={`relative aspect-[4/5] flex items-center justify-center bg-gradient-to-br ${product.thumb} group overflow-hidden`}
                      >
                        {resolveImage(product.image) ? (
                          <img 
                            src={resolveImage(product.image)} 
                            alt={t(product.name)} 
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <ProductIcon emoji={product.emoji} className="w-14 h-14 text-[#1b3d17]/70 transform group-hover:scale-110 transition-transform duration-300" />
                        )}
                      </Link>

                      {/* Content Area */}
                      <div className="p-4 flex flex-col justify-between flex-1 text-center items-center">
                        <div className="w-full flex flex-col items-center">
                          <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
                            <span className="block text-[9px] font-extrabold text-gray-400 tracking-wider uppercase">
                              {t(product.categoryLabel)}
                            </span>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
                              product.status === "Upcoming"
                                ? "bg-[#eec84a]/20 text-[#a87b3a]"
                                : product.inStock !== false
                                ? "bg-[#2f4a1f]/10 text-[#2f4a1f]"
                                : "bg-[#6e2438]/10 text-[#6e2438]"
                            }`}>
                              {product.status === "Upcoming"
                                ? t("Upcoming")
                                : product.inStock !== false
                                ? t("In Stock")
                                : t("Out of Stock")}
                            </span>
                          </div>
                          <Link 
                            to={`/product/${product.category}/${encodeURIComponent(product.name)}`}
                            className="text-xs sm:text-sm font-bold text-[#1b3d17] hover:text-[#2a7a2e] transition-colors leading-tight line-clamp-2 block text-center"
                          >
                            {t(product.name)}
                          </Link>
                        </div>

                        {/* 3 Price Duration Display (subscription products only) */}
                        {isSubscription && (() => {
                          const p1 = Number(product.price1Day) || Number(product.price) || 149;
                          const p6 = Number(product.price6Days) || Math.round(p1 * 6 * 0.9);
                          const p25 = Number(product.price25Days) || Math.round(p1 * 25 * 0.8);
                          return (
                            <div className="w-full mt-2 pt-2 border-t border-[#e8eed8]">
                              <div className="text-[9px] font-extrabold text-[#4a5f2e] uppercase tracking-wider text-center mb-1.5">
                                {t("3 Plan Options")}:
                              </div>
                              <div className="grid grid-cols-3 gap-1 bg-[#f0f4e2] p-1 rounded-xl text-center mb-2.5">
                                <div className="flex flex-col py-1 px-0.5 rounded-lg bg-white shadow-xs">
                                  <span className="text-[9px] text-[#5c5c4f]">1 Day</span>
                                  <span className="text-[11px] font-black text-[#1f2b12]">₹{p1}</span>
                                </div>
                                <div className="flex flex-col py-1 px-0.5 rounded-lg bg-[#e4ecc4]">
                                  <span className="text-[9px] text-[#2f4a1f] font-bold">6 Days</span>
                                  <span className="text-[11px] font-black text-[#1f2b12]">₹{p6}</span>
                                </div>
                                <div className="flex flex-col py-1 px-0.5 rounded-lg bg-[#cfe04a] text-[#1f2b12]">
                                  <span className="text-[9px] font-black">25 Days</span>
                                  <span className="text-[11px] font-black">₹{p25}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        <Link
                          to={`/product/${product.category}/${encodeURIComponent(product.name)}`}
                          className={`w-full block bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] text-center font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] active:scale-95 no-underline ${isSubscription ? "" : "mt-3"}`}
                        >
                          {isSubscription ? t("View Details & Plans") : t("View Details")} &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <span className="w-8 h-8 rounded-lg bg-[#f5d13a] text-[#1b3d17] flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer">1</span>
              <span className="w-8 h-8 rounded-lg bg-[#faf9f0] border border-[#eef0e5] text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors">2</span>
              <span className="w-8 h-8 rounded-lg bg-[#faf9f0] border border-[#eef0e5] text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors">3</span>
              <span className="text-gray-400 text-xs px-1">...</span>
              <span className="w-8 h-8 rounded-lg bg-[#faf9f0] border border-[#eef0e5] text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors">6</span>
              <span className="px-3 h-8 rounded-lg bg-[#faf9f0] border border-[#eef0e5] text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors ml-2">{t("NEXT >")}</span>
            </div>
          </main>

        </div>
      </section>

      <TrendingNow />

      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
