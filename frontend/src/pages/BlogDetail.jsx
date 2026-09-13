import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Sparkles, Check, Copy, MessageSquare, Bookmark } from "lucide-react";
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
      <p class="lead text-lg font-medium text-stone-700 mb-6">In recent years, cold-pressed juices have evolved from a trendy health wellness routine into a scientifically-proven nutritional staple. But what makes cold-pressed juicing fundamentally superior to traditional centrifugal juicers?</p>
      
      <h2 class="text-2xl font-extrabold text-[#1f2b12] mt-8 mb-4">The Science Behind Cold-Pressed Hydraulic Extraction</h2>
      <p class="mb-4 text-stone-600 leading-relaxed">Unlike traditional high-speed juicers whose spinning blades create heat friction and drag massive amounts of air into the liquid—causing rapid oxidation and heat degradation of delicate vitamins—cold-pressed hydraulic extraction gently presses fresh fruits and vegetables under tons of pressure without heat exposure.</p>
      
      <h3 class="text-xl font-bold text-[#2f4a1f] mt-6 mb-3">Key Health Benefits of Daily Juicing</h3>
      <ul class="space-y-2 mb-6 text-stone-600">
        <li class="flex items-start gap-2">✔ <strong>Maximum Bioavailability:</strong> Retains up to 3x more vitamins A, C, E, and plant antioxidants.</li>
        <li class="flex items-start gap-2">✔ <strong>Cellular Absorption:</strong> Allows your digestive system a resting window while delivering instant hydration directly into your bloodstream.</li>
        <li class="flex items-start gap-2">✔ <strong>100% Pure:</strong> No added refined sugar, artificial flavors, preservatives, or diluting concentrates.</li>
      </ul>

      <h2 class="text-2xl font-extrabold text-[#1f2b12] mt-8 mb-4">How to Integrate Cold-Pressed Juices into Your Life</h2>
      <p class="mb-4 text-stone-600 leading-relaxed">We recommend enjoying a 300ml bottle of fresh <em>Carrot-Beet-Ginger</em> or <em>Amla Green Juice</em> every morning on an empty stomach to kickstart your metabolism and boost immunity.</p>
    `,
    category: "Detox & Cleanse",
    date: "July 20, 2025",
    readTime: "4 min read",
    author: "Dr. Ananya Sharma",
    authorTitle: "Ayurvedic Practitioner & Wellness Lead",
    authorBio: "Specializes in Ayurvedic nutrition, natural detox protocols, and plant-based vitality regimens. Passionate about bringing ancient wisdom into daily healthy habits.",
    authorPhoto: "/images/author_ananya.png",
    image: "/images/healthy_juices_spotlight.png",
    thumbGradient: "from-[#e4f2c2] to-[#9ec13a]"
  },
  {
    id: "2",
    slug: "power-of-high-protein-salads",
    title: "The Power of High-Protein Salads in Sustainable Weight Loss",
    excerpt: "Learn how pairing raw microgreens, sprouts, organic seeds, and plant proteins keeps you satisfied, regulates blood sugar, and boosts metabolism.",
    content: `
      <p class="lead text-lg font-medium text-stone-700 mb-6">Sustainable weight loss isn't about restrictive starvation; it's about supplying high-density micro-nutrients that satisfy your body's cellular hunger and stabilize energy.</p>
      
      <h2 class="text-2xl font-extrabold text-[#1f2b12] mt-8 mb-4">Anatomy of a High-Protein Salad Meal</h2>
      <p class="mb-4 text-stone-600 leading-relaxed">Combining sprouted grains, crisp seasonal greens, and cold-pressed seeds provides a complete amino-acid profile while offering rich dietary fiber.</p>

      <h3 class="text-xl font-bold text-[#2f4a1f] mt-6 mb-3">Key Ingredients for Satiety</h3>
      <ul class="space-y-2 mb-6 text-stone-600">
        <li class="flex items-start gap-2">✔ <strong>Sprouted Mung & Chickpeas:</strong> High-protein, easily digestible bio-active nutrients.</li>
        <li class="flex items-start gap-2">✔ <strong>Walnuts & Pumpkin Seeds:</strong> Healthy Omega-3 fats for brain clarity and heart health.</li>
        <li class="flex items-start gap-2">✔ <strong>Raw Leafy Greens:</strong> Loaded with natural chlorophyl and essential minerals.</li>
      </ul>
    `,
    category: "Nutrition & Diet",
    date: "July 15, 2025",
    readTime: "5 min read",
    author: "Chef Rohan Deshmukh",
    authorTitle: "Nutrition & Culinary Lead",
    authorBio: "Chef Rohan curates organic raw meal bowls and high-protein salad recipes using locally harvested farm-fresh ingredients in Nashik.",
    authorPhoto: "",
    image: blogImg2,
    thumbGradient: "from-[#e2f0c8] to-[#7fae3a]"
  },
  {
    id: "3",
    slug: "ayurvedic-habits-for-natural-digestion",
    title: "5 Simple Ayurvedic Habits for Natural Digestion & High Energy",
    excerpt: "Integrate ancient Dinacharya wellness principles into modern busy daily schedules for improved Agni (digestive fire) and mental clarity.",
    content: `
      <p class="lead text-lg font-medium text-stone-700 mb-6">In Ayurveda, a strong <em>Agni</em> (digestive fire) is considered the cornerstone of physical longevity, clear skin, and vibrant mental clarity.</p>

      <h2 class="text-2xl font-extrabold text-[#1f2b12] mt-8 mb-4">5 Habits to Practice Daily</h2>
      <ol class="list-decimal pl-6 space-y-3 text-stone-600 mb-6">
        <li><strong>Copper Vessel Water:</strong> Hydrate with copper-infused water in the morning.</li>
        <li><strong>Eat Fresh & Seasonal:</strong> Align your dietary choices with seasonal fruits and vegetables.</li>
        <li><strong>Main Meal at Midday:</strong> Eat your largest meal when Agni is naturally strongest at noon.</li>
        <li><strong>Mindful Chewing:</strong> Chew thoroughly to initiate proper digestive enzyme secretion.</li>
        <li><strong>Early Dinner Window:</strong> Finish dinner early to allow cellular healing overnight.</li>
      </ol>
    `,
    category: "Ayurvedic Living",
    date: "July 08, 2025",
    readTime: "6 min read",
    author: "Vaidya Suresh Patil",
    authorTitle: "Ayurvedic Doctor & Physician",
    authorBio: "Vaidya Suresh has over 15 years of clinical practice in Panchakarma and Ayurvedic dietary therapies across Maharashtra.",
    authorPhoto: "",
    image: blogImg3,
    thumbGradient: "from-[#ffe8b8] to-[#ff8a4c]"
  },
  {
    id: "4",
    slug: "super-laddus-guilt-free-snacking",
    title: "Super Laddus: The Guilt-Free Energy Snack for Busy Professionals",
    excerpt: "Handcrafted from premium dry fruits, seeds, and wood-pressed ghee without refined sugar—the perfect healthy snack for active lifestyles.",
    content: `
      <p class="lead text-lg font-medium text-stone-700 mb-6">Mid-afternoon energy crashes often drive us toward processed sugary snacks. Yogyahar Super Laddus are handcrafted to deliver sustained vitality with zero guilt.</p>

      <h2 class="text-2xl font-extrabold text-[#1f2b12] mt-8 mb-4">Pure Ingredients, Maximum Energy</h2>
      <p class="mb-4 text-stone-600 leading-relaxed">Made with almonds, dates, walnuts, pumpkin seeds, and organic flaxseeds, each laddu is a power-packed bite of natural energy.</p>
    `,
    category: "Healthy Recipes",
    date: "June 28, 2025",
    readTime: "4 min read",
    author: "Team Yogyahar",
    authorTitle: "Wellness & Nutrition Team",
    authorBio: "The YOGYAHAR research and kitchen development team in Nashik, dedicated to crafting 100% natural, preservative-free fresh foods.",
    authorPhoto: "",
    image: blogImg4,
    thumbGradient: "from-[#e8d2a8] to-[#a87b3a]"
  }
];

export default function BlogDetail() {
  const { slug } = useParams();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, tHtml } = useLanguage();

  // Scroll to top instantly whenever navigating to a new blog article
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  const [blogsContent] = useSectionContent("blogs", {
    posts: defaultBlogPosts
  });

  const postsList = (blogsContent.posts && blogsContent.posts.length > 0) ? blogsContent.posts : defaultBlogPosts;
  const post = postsList.find((p) => p.slug === slug || p.id === slug) || postsList[0];
  const relatedPosts = postsList.filter((p) => (p.slug || p.id) !== (post.slug || post.id)).slice(0, 3);
  
  const coverSrc = resolveImage(post.image);
  const authorPhotoSrc = resolveImage(post.authorPhoto);

  // Extract headings for Table of Contents
  const headings = [];
  let processedContent = post.content || "";
  if (post.content) {
    const headingRegex = /<(h[23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
    let match;
    let index = 0;
    while ((match = headingRegex.exec(post.content)) !== null) {
      const tag = match[1].toLowerCase();
      const rawText = match[2].replace(/<[^>]*>/g, "").trim();
      const slugId = `toc-heading-${index++}-${rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
      headings.push({
        tag,
        label: rawText,
        id: slugId,
      });
    }

    if (headings.length > 0) {
      let idx = 0;
      processedContent = post.content.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, tag, attrs, text) => {
        const heading = headings[idx++];
        if (heading) {
          // Clean existing id or class attributes if present to avoid duplication
          const cleanedAttrs = attrs.replace(/\s*id="[^"]*"/gi, "").replace(/\s*class="[^"]*"/gi, "");
          return `<${tag} id="${heading.id}" class="scroll-mt-28 font-display font-extrabold text-[#1f2b12]" ${cleanedAttrs}>${text}</${tag}>`;
        }
        return match;
      });
    }
  }

  // Smooth scroll handler for Table of Contents items (stops comfortably AT the Headline with header offset)
  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -110; // 110px padding from top navigation bar
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const articleUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`📰 Read this health & wellness article on YOGYAHAR:\n"${post.title}"\n\n👉 Read full article: ${articleUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: articleUrl }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="text-[#2b2b1f] bg-[#fdfcf7] min-h-screen flex flex-col font-sans text-left">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#fcfaef] border-b border-[#eef0e5] py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold text-stone-500">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-[#1f2b12] hover:text-[#5f7a3a] transition-colors font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 text-[#5f7a3a]" />
            {t("Back to All Articles")}
          </Link>
          <span className="bg-[#1f2b12] text-[#cfe04a] px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-[#cfe04a]/20 shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-12 md:pb-16">
        
        {/* Article Header */}
        <header className="mb-6 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2b12] leading-tight mb-4 font-display">
            {t(post.title)}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#eef0e5] py-4 my-3 text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-3">
              {authorPhotoSrc ? (
                <img src={authorPhotoSrc} alt={post.author} className="w-11 h-11 rounded-full object-cover border border-[#1f2b12]/20 shadow-sm" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#1f2b12] text-[#cfe04a] flex items-center justify-center font-bold text-lg border border-[#1f2b12]/20 shadow-sm">
                  ✍️
                </div>
              )}
              <div>
                <p className="font-extrabold text-[#1f2b12] text-sm">{t(post.author || "Yogyahar Health Team")}</p>
                <p className="text-[11px] text-stone-500">{t(post.authorTitle || "Ayurvedic Nutrition & Health Author")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-stone-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#5f7a3a]" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#5f7a3a]" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image (shows full image, no cropping) */}
        <div className="relative w-full rounded-[24px] overflow-hidden bg-[#eef4e2] border border-[#eef0e5] mb-10 shadow-md">
          {coverSrc ? (
            <img src={coverSrc} alt={post.title} className="w-full h-auto" />
          ) : (
            <div className={`w-full aspect-[16/9] bg-gradient-to-br ${post.thumbGradient || 'from-[#e4f2c2] to-[#9ec13a]'} flex flex-col items-center justify-center p-8 text-center`}>
              <Sparkles className="w-20 h-20 text-[#2f4a1f] opacity-70 mb-3" />
              <span className="text-sm font-extrabold text-[#2f4a1f] uppercase tracking-widest">Yogyahar Health Journal</span>
            </div>
          )}
        </div>

        {/* Article Body Content & Table of Contents Sidebar */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Article Body (Left Column) */}
          <div className={headings.length > 0 ? "lg:col-span-8" : "lg:col-span-12 max-w-3xl mx-auto"}>
            <article className="max-w-none text-justify leading-relaxed text-stone-700 text-sm sm:text-base space-y-6">
              {processedContent ? (
                <div
                  className="prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-[#1f2b12] prose-h2:mt-8 prose-h2:mb-4 prose-h2:scroll-mt-28
                             prose-h3:text-xl prose-h3:font-bold prose-h3:text-[#2f4a1f] prose-h3:mt-6 prose-h3:mb-3 prose-h3:scroll-mt-28
                             prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-justify
                             prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2.5 prose-ul:mb-6
                             prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2.5 prose-ol:mb-6
                             prose-strong:font-bold prose-strong:text-[#1f2b12]"
                  dangerouslySetInnerHTML={{ __html: tHtml ? tHtml(processedContent) : t(processedContent) }} 
                />
              ) : (
                <p className="text-lg font-medium text-stone-600">{t(post.excerpt)}</p>
              )}
            </article>

            {/* Share Article Bar */}
            <div className="mt-10 pt-6 border-t border-[#eef0e5] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#1f2b12] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#5f7a3a]" />
                <span>{t("Share this Article")}:</span>
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleShareWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t("Link Copied!") : t("Copy Link")}</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-stone-300 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t("Share")}</span>
                </button>
              </div>
            </div>

            {/* Writer / Author Bio Card */}
            <div className="mt-8 bg-gradient-to-r from-[#f7f9f0] to-[#fcfaef] border border-[#d4ddb9] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-5 shadow-sm">
              {authorPhotoSrc ? (
                <img src={authorPhotoSrc} alt={post.author} className="w-16 h-16 rounded-2xl object-cover border border-[#1f2b12]/20 shadow-md shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#1f2b12] text-[#cfe04a] flex items-center justify-center font-bold text-2xl border border-[#1f2b12]/20 shadow-md shrink-0">
                  ✍️
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black text-[#1f2b12] font-display">{t(post.author || "Yogyahar Health Team")}</h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2f4a1f]/10 text-[#2f4a1f] border border-[#2f4a1f]/20">
                    Author
                  </span>
                </div>
                <p className="text-xs font-bold text-[#5f7a3a] mb-2">{t(post.authorTitle || "Ayurvedic Nutrition & Health Author")}</p>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {t(post.authorBio || "Passionate about holistic health, ancient Ayurvedic wisdom, and daily organic nutrition. Dedicated to sharing practical dietary habits for vibrant living across Nashik.")}
                </p>
              </div>
            </div>

          </div>

          {/* Sticky Table of Contents Sidebar (Right Column) */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 bg-[#fcfaef] border border-[#eef0e5] p-6 sm:p-7 rounded-[28px] text-left shadow-sm">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1f2b12] mb-4 border-b border-[#eef0e5] pb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#5f7a3a]" />
                <span>{t("Table of Contents")}</span>
              </h4>
              <nav className="space-y-3 text-xs">
                {headings.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(e, item.id)}
                    className={`block font-bold transition-all hover:text-[#5f7a3a] ${
                      item.tag === "h3" 
                        ? "pl-3 text-stone-500 font-medium text-[11.5px]" 
                        : "text-[#1f2b12]"
                    }`}
                  >
                    {t(item.label)}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t border-[#eef0e5] pt-4 text-[11px] text-stone-500 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5f7a3a]" />
                <span>{t("Reading time:")} {t(post.readTime)}</span>
              </div>
            </aside>
          )}
        </div>

        {/* Article Footer & Callout */}
        {post.cta && (
          <div className="mt-12 bg-gradient-to-br from-[#f8faf0] to-[#edf4da] border border-[#dcecc4] rounded-[28px] p-7 sm:p-10 text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h4 className="text-xl font-extrabold text-[#1f2b12] mb-1.5 font-display">{t(post.cta.title)}</h4>
              <p className="text-stone-600 text-sm font-medium leading-relaxed max-w-md">
                {t(post.cta.text)}
              </p>
            </div>
            <Link
              to={post.cta.buttonLink || "/products"}
              className="shrink-0 bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] text-xs font-black uppercase tracking-wider px-7 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              {t(post.cta.buttonText || "Explore")} &rarr;
            </Link>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[#eef0e5] text-left">
            <h3 className="text-2xl font-black text-[#1f2b12] mb-6 font-display">{t("More Articles You Might Like")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id || rel.slug}
                  to={`/blog/${rel.slug || rel.id}`}
                  className="bg-white border border-[#eef0e5] rounded-[24px] p-5 block hover:shadow-lg hover:border-[#cfe04a]/30 transition-all duration-300 group shadow-sm"
                >
                  <span className="text-[10px] font-extrabold text-[#5f7a3a] uppercase tracking-widest block mb-1.5">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-extrabold text-[#1f2b12] group-hover:text-[#5f7a3a] transition-colors leading-snug line-clamp-2 mb-3 font-display">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] font-extrabold text-[#1f2b12] group-hover:underline flex items-center gap-1">
                    {t("Read article")} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
