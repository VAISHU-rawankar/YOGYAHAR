import { useState } from "react";
import { useSectionContent } from "../hooks/useSectionContent";
import { api } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  eyebrow: "Stay Connected",
  heading: "Never miss a single news",
  paragraph:
    "Stay informed with updates on our products and services. Stay connected and follow your diet with us!",
  social: [
    { icon: "📷", label: "Instagram", href: "https://instagram.com/yogyahar" },
    { icon: "📘", label: "Facebook", href: "https://facebook.com/yogyahar" },
    { icon: "💬", label: "WhatsApp", href: "https://wa.me/917499643234" },
    { icon: "▶️", label: "YouTube", href: "https://youtube.com/@yogyahar" },
    { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/company/yogyahar" },
    { icon: "🧵", label: "Threads", href: "https://threads.net/@yogyahar" },
  ],
};

const socialIconMap = {
  "📘": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  "🧵": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 8a4 4 0 1 0 4 4" />
      <path d="M12 12v.01" />
    </svg>
  ),
  "▶️": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9" />
    </svg>
  ),
  "📷": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  "💬": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  "📌": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  ),
  "💼": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  "🔗": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};


export default function Newsletter() {
  const [{ eyebrow, heading, paragraph, social }] = useSectionContent(
    "newsletter",
    defaultContent
  );
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/newsletter", { email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-4 sm:mx-6 mb-[30px] rounded-2xl bg-gradient-to-br from-[#561a2c] to-[#3b121e] px-6 py-8 sm:px-12 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:flex-wrap md:justify-between md:items-center gap-8">
        <div className="text-center md:text-left">
          <span className="block text-xs font-semibold tracking-[3px] uppercase mb-1.5" style={{color: '#cfe04a'}}>
            {eyebrow}
          </span>
          <h3 className="text-xl font-bold mb-2" style={{color: '#ffffff', margin: '0 0 8px 0'}}>
            {heading}
          </h3>
          <p className="text-[13px] m-0 max-w-md mx-auto md:mx-0" style={{color: '#c9d4bc'}}>
            {paragraph}
          </p>
        </div>

        {status === "success" ? (
          <p className="text-[13px] font-semibold text-center md:text-left" style={{color: '#cfe04a'}}>
            {t("Thanks for subscribing! 🎉")}
          </p>
        ) : (
          <form className="flex flex-col gap-1.5 w-full md:w-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Enter your email")}
                className="px-[18px] py-3 rounded-full border-none w-full sm:w-64 text-[13px]"
                style={{color: '#20281a', background: '#ffffff'}}
              />
              <button
                type="submit"
                className="px-[22px] py-3 rounded-full font-semibold text-[13px] shrink-0 hover:scale-105 transition-transform active:scale-95"
                style={{background: '#cfe04a', color: '#20281a'}}
              >
                {t("Subscribe")}
              </button>
            </div>
            {status === "error" && (
              <span className="text-[11px]" style={{color: '#cfe25c'}}>
                {t("Something went wrong, please try again.")}
              </span>
            )}
          </form>
        )}

        <div className="flex flex-col items-center gap-2.5 mx-auto md:mx-0">
          <span className="text-[11px] font-semibold tracking-[2px] uppercase" style={{color: '#c9d4bc'}}>
            {t("Follow Us")}
          </span>
          <div className="flex gap-2.5 flex-wrap justify-center max-w-[220px]">
            {social.map((s, idx) => {
              let IconComponent = socialIconMap[s.icon];
              if (!IconComponent) {
                const keys = Object.keys(socialIconMap);
                IconComponent = socialIconMap[keys[idx % keys.length]];
              }
              return (
                <a
                  key={s.label}
                  href={s.href || "#"}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{background: 'rgba(255,255,255,0.15)'}}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(207,226,92,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  <IconComponent className="w-4 h-4" style={{color: '#ffffff'}} strokeWidth={2} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
