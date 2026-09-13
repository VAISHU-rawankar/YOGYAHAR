import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, Sparkles, Tag } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import blogImg1 from "../assets/hero-photo.jpg";
import blogImg2 from "../assets/fitness_lovers.png";
import blogImg3 from "../assets/family_seniors.png";
import blogImg4 from "../assets/weight_loss.png";

const defaultBlogPosts = [
  {
    id: "1",
    slug: "cold-pressed-juices-daily-detox",
    title: "Why Cold-Pressed Juices Are Superior for Daily Detox & Energy",
    excerpt: "Discover how cold-pressed extraction preserves vital living enzymes, vitamins, and antioxidants compared to conventional centrifugal blending.",
    content: `
      <h2>The Science Behind Cold-Pressed Extraction</h2>
      <p>Unlike traditional centrifugal juicers that produce heat and drag air into the juice—causing rapid oxidation and loss of delicate nutrients—cold-pressed hydraulic extraction gently squeezes every single drop of nutrient-rich juice without heat exposure.</p>
      
      <h3>Key Health Benefits</h3>
      <ul>
        <li><strong>Maximum Nutrient Retention:</strong> Retains up to 3x more vitamins A, C, E, and bioactive polyphenols.</li>
        <li><strong>Instant Cellular Absorption:</strong> Being fiber-free, cold-pressed juices give your digestive system a break while flooding your bloodstream with pure cellular hydration.</li>
        <li><strong>Zero Added Preservatives:</strong> 100% raw, fresh, and unadulterated fruit and vegetable extracts.</li>
      </ul>

      <h3>How to Incorporate into Your Daily Routine</h3>
      <p>We recommend starting your morning with a 300ml bottle of fresh <em>Carrot-Beet-Ginger</em> or <em>Amla Green Juice</em> on an empty stomach for maximum bioavailability and morning vitality.</p>
    `,
    category: "Detox & Cleanse",
    date: "July 20, 2025",
    readTime: "4 min read",
    author: "Dr. Ananya Sharma (Ayurvedic Practitioner)",
    image: "/images/healthy_juices_spotlight.png",
    thumbGradient: "from-[#e4f2c2] to-[#9ec13a]",
    featured: true,
    status: "Active"
  },
  {
    id: "2",
    slug: "power-of-high-protein-salads",
    title: "The Power of High-Protein Salads in Sustainable Weight Loss",
    excerpt: "Learn how pairing raw microgreens, sprouts, organic seeds, and plant proteins keeps you satisfied, regulates blood sugar, and boosts metabolism.",
    content: `
      <h2>Anatomy of a High-Protein Salad Meal</h2>
      <p>Combining sprouted grains, crisp seasonal greens, and cold-pressed seeds provides a complete amino-acid profile while offering rich dietary fiber.</p>
    `,
    category: "Nutrition & Diet",
    date: "July 15, 2025",
    readTime: "5 min read",
    author: "Chef Rohan Deshmukh (Nutrition Lead)",
    image: blogImg2,
    thumbGradient: "from-[#e2f0c8] to-[#7fae3a]",
    featured: false,
    status: "Active"
  },
  {
    id: "3",
    slug: "ayurvedic-habits-for-natural-digestion",
    title: "5 Simple Ayurvedic Habits for Natural Digestion & High Energy",
    excerpt: "Integrate ancient Dinacharya wellness principles into modern daily schedules for improved Agni (digestive fire) and mental clarity.",
    content: `
      <h2>5 Habits to Practice Daily</h2>
      <ol>
        <li>Copper Vessel Water</li>
        <li>Eat Fresh & Seasonal</li>
        <li>Main Meal at Midday</li>
        <li>Mindful Chewing</li>
        <li>Early Dinner Window</li>
      </ol>
    `,
    category: "Ayurvedic Living",
    date: "July 08, 2025",
    readTime: "6 min read",
    author: "Vaidya Suresh Patil",
    image: blogImg3,
    thumbGradient: "from-[#ffe8b8] to-[#ff8a4c]",
    featured: false,
    status: "Active"
  },
  {
    id: "4",
    slug: "super-laddus-guilt-free-snacking",
    title: "Super Laddus: The Guilt-Free Energy Snack for Busy Professionals",
    excerpt: "Handcrafted from premium dry fruits, seeds, and wood-pressed ghee without refined sugar—the perfect healthy snack for active lifestyles.",
    content: `
      <h2>Pure Ingredients, Maximum Energy</h2>
      <p>Made with almonds, dates, walnuts, pumpkin seeds, and organic flaxseeds, each laddu is a power-packed bite of natural energy.</p>
    `,
    category: "Healthy Recipes",
    date: "June 28, 2025",
    readTime: "4 min read",
    author: "Team Yogyahar",
    image: blogImg4,
    thumbGradient: "from-[#e8d2a8] to-[#a87b3a]",
    featured: false,
    status: "Active"
  }
];

const categories = ["All", "News & Updates", "Detox & Cleanse", "Nutrition & Diet", "Ayurvedic Living", "Healthy Recipes"];

export default function BlogPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const [blogsContent] = useSectionContent("blogs", {
    eyebrow: "YOGYAHAR KNOWLEDGE HUB",
    heading: "Insights for Health & Wellness",
    paragraph: "Articles, recipes, detox guides, and Ayurvedic wellness wisdom to nourish your body and mind every day.",
    posts: defaultBlogPosts
  });

  const postsList = (blogsContent.posts && blogsContent.posts.length > 0) ? blogsContent.posts : defaultBlogPosts;

  const activePosts = postsList.filter((p) => p.status !== "Inactive" && p.status !== "inactive" && p.active !== false);

  const filteredPosts = activePosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = activePosts.find((p) => p.featured) || activePosts[0];

  return (
    <div className="text-[#2b2b1f] bg-[#fdfcf7] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Hero Section */}
      <section 
        className="relative py-16 sm:py-24 bg-cover bg-center text-center overflow-hidden border-b border-[#cfe04a]/20"
        style={{ backgroundImage: "url('/images/organic_wellness_blog_bg.png')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#0e1707]/90 backdrop-blur-[1px]" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#cfe04a] text-[#1f2b12] text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm border border-[#cfe04a]/20"
          >
            {t(blogsContent.eyebrow || "YOGYAHAR KNOWLEDGE HUB")}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight leading-tight mb-4"
            style={{ color: "#ffffff" }}
          >
            {t(blogsContent.heading || "Insights for Health & Wellness")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {t(blogsContent.paragraph || "Articles, recipes, detox guides, and Ayurvedic wellness wisdom to nourish your body and mind every day.")}
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-xl mx-auto relative"
          >
            <Search className="w-5 h-5 text-[#cfe04a] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles on juices, diet, Ayurveda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-sm font-semibold text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#cfe04a]/50 focus:bg-white/35 transition-all duration-300 shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pt-8 pb-14 bg-[#fcfaef] flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#1f2b12] text-[#cfe04a] shadow-lg scale-105 border border-[#cfe04a]/30"
                    : "bg-white text-stone-600 border border-[#eef0e5] hover:bg-[#eef4db] hover:text-[#1f2b12]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article Spotlight (when category is All & no active search) */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 bg-white border border-[#eef0e5] rounded-[32px] overflow-hidden p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500 grid md:grid-cols-12 gap-8 items-center text-left"
            >
              <div className="md:col-span-6 relative aspect-[1.4/1] rounded-[24px] overflow-hidden bg-white border border-[#eef0e5] flex items-center justify-center group">
                {featuredPost.image ? (
                  <img
                    src={resolveImage(featuredPost.image)}
                    alt={featuredPost.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${featuredPost.thumbGradient || 'from-[#e4f2c2] to-[#9ec13a]'} flex flex-col items-center justify-center p-6 text-center`}>
                    <Sparkles className="w-16 h-16 text-[#2f4a1f] opacity-80 mb-2" />
                    <span className="text-xs font-extrabold text-[#2f4a1f] uppercase tracking-widest">Featured Story</span>
                  </div>
                )}
                <span className="absolute top-4 left-4 bg-[#1f2b12] text-[#cfe04a] text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Featured
                </span>
              </div>

              <div className="md:col-span-6 flex flex-col justify-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#5f7a3a] uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5 text-[#5f7a3a]" />
                  {t(featuredPost.category)}
                </span>

                <Link
                  to={`/blog/${featuredPost.slug || featuredPost.id}`}
                  className="text-2xl sm:text-3xl font-extrabold text-[#1f2b12] hover:text-[#5f7a3a] transition-colors leading-tight block"
                >
                  {t(featuredPost.title)}
                </Link>

                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {t(featuredPost.excerpt)}
                </p>

                <div className="flex items-center gap-4 text-xs font-bold text-stone-500 mt-1 border-t border-[#f5f7ed] pt-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#5f7a3a]" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#5f7a3a]" />
                    {t(featuredPost.readTime)}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/blog/${featuredPost.slug || featuredPost.id}`}
                    className="inline-flex items-center gap-2 bg-[#1f2b12] hover:bg-[#cfe04a] text-white hover:text-[#1f2b12] text-xs font-extrabold px-7 py-3.5 rounded-full transition-all shadow-md group"
                  >
                    {t("Read Full Article")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Cards Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#dcecc4] rounded-3xl bg-white shadow-sm">
              <span className="text-5xl block mb-4">📰</span>
              <p className="text-stone-500 text-sm font-bold">{t("No articles found matching your criteria.")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-[#eef0e5] rounded-[28px] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#cfe04a]/30 transition-all duration-300 text-left group shadow-sm"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <Link
                      to={`/blog/${post.slug || post.id}`}
                      className="relative block aspect-[1.6/1] bg-gradient-to-br overflow-hidden border-b border-[#eef0e5]"
                    >
                      {post.image ? (
                        <img
                          src={resolveImage(post.image)}
                          alt={post.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${post.thumbGradient || 'from-[#e4f2c2] to-[#9ec13a]'} flex items-center justify-center p-4`}>
                          <span className="text-3xl opacity-80">📖</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#1f2b12] text-[#cfe04a] text-[10px] font-extrabold px-3.5 py-1.5 rounded-xl uppercase tracking-wider border border-[#cfe04a]/20 shadow-md">
                        {t(post.category)}
                      </span>
                    </Link>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-stone-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#5f7a3a]" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#5f7a3a]" />
                          {t(post.readTime)}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${post.slug || post.id}`}
                        className="text-lg font-bold text-[#1f2b12] group-hover:text-[#5f7a3a] transition-colors leading-snug line-clamp-2 block mb-2"
                      >
                        {t(post.title)}
                      </Link>

                      <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                        {t(post.excerpt)}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-[#f5f7ed] flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-bold text-stone-500 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#5f7a3a]" />
                      {post.author || "Yogyahar Team"}
                    </span>

                    <Link
                      to={`/blog/${post.slug || post.id}`}
                      className="text-xs font-bold text-[#1f2b12] group-hover:text-[#5f7a3a] flex items-center gap-1 transition-colors"
                    >
                      {t("Read article")} &rarr;
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
