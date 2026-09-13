import { useSectionContent } from "../hooks/useSectionContent";
import { Sprout, CalendarDays, Sun, Sunset } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const DEFAULT_WHATSAPP_LINK =
  "https://wa.me/917499643234?text=" +
  encodeURIComponent("Hi Yogyahar, I'd like to know more about your subscription plans.");

const defaultContent = {
  eyebrow: "Subscription Programs",
  heading: "Follow Your Diet With Us",
  paragraph:
    "Choose from a 1-day trust builder, 6-day wellness plan, or our full 25-day transformation subscription. Fresh deliveries every morning and evening.",
  whatsappLink: DEFAULT_WHATSAPP_LINK,
  plans: [
    {
      icon: "🌱",
      name: "1 Day",
      label: "Trust Builder",
      price: "₹1,000",
      sub: "Try before you subscribe",
      tag: "No commitment",
      features: [
        "Single day serving",
        "Juice or Salad of your choice",
        "200ml / 300ml / 500ml (Juice)",
        "200gm / 450gm (Salad)",
        "Morning (6–9 am) or Evening (5–7 pm)",
      ],
      popular: false,
    },
    {
      icon: "📅",
      name: "6 Days",
      label: "Most Popular",
      price: "₹2,000",
      sub: "A week of goodness",
      tag: "Great for beginners",
      features: [
        "6 consecutive days",
        "Juice + Salad combos available",
        "200ml / 300ml / 500ml (Juice)",
        "200gm / 450gm (Salad)",
        "Morning (6–9 am) or Evening (5–7 pm)",
      ],
      popular: true,
    },
    {
      icon: "📆",
      name: "25 Days",
      label: "Best Seller",
      price: "₹8,000",
      sub: "Full lifestyle transformation",
      tag: "Best value",
      features: [
        "25 delivery days",
        "Customize plans to your health needs",
        "Morning (6–9 am) and/or Evening (5–7 pm)",
      ],
      popular: false,
    },
  ],
};

const planIconMap = {
  "🌱": Sprout,
  "📅": CalendarDays,
  "📆": CalendarDays,
};

export default function Plans() {
  const [{ eyebrow, heading, paragraph, whatsappLink, plans }] = useSectionContent(
    "plans",
    defaultContent
  );
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-[#f6f9df] to-[#eaf3c4] pt-6 pb-8 sm:pt-8 sm:pb-14" id="plans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Intro */}
        <div className="text-center mb-12">
          <span className="block text-xs font-semibold tracking-[3px] text-[#5f7a3a] uppercase mb-3">
            {t(eyebrow)}
          </span>
          <h2 className="text-[34px] text-[#1f2b12] mb-4">{t(heading)}</h2>
          <p className="text-[#6a7059] text-[15px] max-w-xl mx-auto">{t(paragraph)}</p>
        </div>

        {/* Delivery Slots Banner */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white border border-[#d4ddb9] rounded-full px-5 py-2.5 text-sm font-semibold text-[#1f2b12]">
            <Sun className="w-4 h-4 text-[#5f7a3a]" /> {t("Morning Slot")}: <span className="text-[#5f7a3a]">{t("6–9 AM")}</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#d4ddb9] rounded-full px-5 py-2.5 text-sm font-semibold text-[#1f2b12]">
            <Sunset className="w-4 h-4 text-[#5f7a3a]" /> {t("Evening Slot")}: <span className="text-[#5f7a3a]">{t("5–7 PM")}</span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {plans
            .filter((p) => p.status !== "Inactive" && p.status !== "inactive" && p.status !== "निष्क्रिय" && p.active !== false && p.isActive !== false)
            .map((p, idx) => {
              let IconComponent = planIconMap[p.icon];
              if (!IconComponent) {
                const fallbacks = [Sprout, CalendarDays, CalendarDays];
                IconComponent = fallbacks[idx % 3];
              }
              const isOutOfStock = p.stockStatus === "Out of Stock" || p.stockStatus === "outofstock" || p.stockStatus === "आउट ऑफ स्टॉक" || p.stockStatus === "स्टॉकमध्ये नाही" || p.stock === false || p.inStock === false;
              const isTrial = p.name.toLowerCase().includes("trial") || p.name.toLowerCase().includes("1 day");
              const customWhatsappLink = isTrial
                ? "https://wa.me/917499643234?text=" + encodeURIComponent("Hi Yogyahar! I would like to order a Single Serving Trial.")
                : whatsappLink;

              return (
                <div
                  key={p.name}
                  className={`relative rounded-2xl p-6 sm:p-7 text-center border transition-all hover:-translate-y-1 hover:shadow-xl ${
                    p.popular
                      ? "bg-[#1f2b12] border-2 border-[#1f2b12] sm:scale-[1.04] shadow-xl"
                      : "bg-white border-[#d4ddb9] shadow-sm"
                  }`}
                >
                  {/* Label Badge */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wide whitespace-nowrap ${
                    isOutOfStock
                      ? "bg-[#6e2438] text-white"
                      : p.popular
                      ? "bg-[#cfe04a] text-[#1f2b12]"
                      : "bg-[#1f2b12] text-white"
                  }`}>
                    {isOutOfStock ? t("Out of Stock") : t(p.label)}
                  </div>

                  <div className="flex justify-center mb-2.5 mt-2">
                    <IconComponent className={`w-8 h-8 ${p.popular ? "text-[#cfe04a]" : "text-[#2f4a1f]"}`} />
                  </div>
                  <h3
                    className="text-xl mb-1"
                    style={{ color: p.popular ? "#ffffff" : "#1f2b12" }}
                  >
                    {t(p.name)}
                  </h3>
                  <div className={`text-xs mb-4 ${p.popular ? "text-stone-300 font-medium" : "text-[#6a7059]"}`}>{t(p.sub)}</div>

                  {/* Price */}
                  <div className={`font-display text-[34px] font-extrabold mb-1 ${p.popular ? "text-white" : "text-[#1f2b12]"}`}>
                    {p.price}
                  </div>
                  <span className={`text-xs font-semibold mb-5 block ${p.popular ? "text-[#cfe25c]" : "text-[#5f7a3a]"}`}>{t(p.tag)}</span>

                  <ul className="text-left mb-6 space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={`text-[12.5px] flex gap-2 before:content-['✓'] before:font-bold before:shrink-0 ${
                          p.popular ? "text-stone-100 before:text-[#cfe04a]" : "text-[#20281a] before:text-[#1f2b12]"
                        }`}
                      >
                        {t(f)}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={isOutOfStock ? "#" : customWhatsappLink}
                    target={isOutOfStock ? "_self" : "_blank"}
                    rel="noreferrer"
                    className={`w-full flex justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                      isOutOfStock
                        ? "bg-stone-300 text-stone-600 cursor-not-allowed"
                        : p.popular
                        ? "bg-[#eec84a] hover:bg-[#e3ba38] text-[#1f2b12]"
                        : "bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12]"
                    }`}
                  >
                    {isOutOfStock ? t("Out of Stock") : t("Subscribe on WhatsApp")}
                  </a>
                </div>
              );
            })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1f2b12] hover:bg-[#3d5223] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 shadow-md"
          >
            {t("Enquire on WhatsApp")} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

