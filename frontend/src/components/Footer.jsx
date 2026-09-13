import { Link, useLocation } from "react-router-dom";
import { useSectionContent } from "../hooks/useSectionContent";
import { useLanguage } from "../context/LanguageContext";
import footerBanner from "../assets/footer_banner.png";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/yogyahar",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yogyahar",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917499643234",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@yogyahar",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <polygon points="10 15 15 12 10 9" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/yogyahar",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://threads.net/@yogyahar",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 8a4 4 0 1 0 4 4" />
        <path d="M12 12v.01" />
      </svg>
    ),
  },
];

const defaultContent = {
  linkGroups: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Services", href: "/services" },
        { label: "About Us", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Juices", href: "/products?category=juices" },
        { label: "Detox Water", href: "/products?category=detox" },
        { label: "Salads & Fruit Cuts", href: "/products?category=salads" },
        { label: "Super Laddu", href: "/products?category=nonSubItems" },
        { label: "Cold Pressed Oil", href: "/products?category=nonSubItems" },
      ],
    },
  ],
  aboutText:
    "Nashik's trusted diet food brand since 2018. Follow Your Diet With Us — fresh, natural, hygienic, vegetarian meals, salads and juices, delivered to your doorstep.",
  whatsappNumber: "7499643234",
  hours: "🕐 6–8 AM & 6–8 PM daily",
  address: "📍 Nashik, Maharashtra, India",
  copyright: "© 2025 YOGYAHAR All Rights Reserved.",
  tagline: "Follow Your Diet With Us!",
};

const canonicalHrefMap = {
  "Home": "/",
  "Products": "/products",
  "Services": "/services",
  "About Us": "/about",
  "Testimonials": "/#testimonials",
  "FAQ": "/faq",
  "Blog": "/blog",
  "Contact Us": "/contact",
  "Juices": "/products?category=juices",
  "Detox Water": "/products?category=detox",
  "Salads & Fruit Cuts": "/products?category=salads",
  "Super Laddu": "/products?category=nonSubItems",
  "Cold Pressed Oil": "/products?category=nonSubItems",
};

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useLanguage();

  const [
    { linkGroups, aboutText, whatsappNumber, hours, address, copyright, tagline },
  ] = useSectionContent("footer", defaultContent);

  return (
    <>
      {/* Banner - Show ONLY on Home Page */}
      {isHomePage && (
        <div className="w-full overflow-hidden leading-none -mb-5 sm:-mb-8">
          <img
            src={footerBanner}
            alt="Footer Banner"
            className="w-full h-auto block align-bottom m-0 p-0 border-0"
            style={{ marginBottom: '-20px' }}
          />
        </div>
      )}

      <footer style={{background: '#561a2c'}} className="pt-[40px] pb-6 relative z-10" id="footer">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 mb-3 hover:opacity-90">
                <img
                  src="/logo.png"
                  alt="Yogyahar Logo"
                  className="h-[44px] w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-[13px] leading-relaxed mb-4" style={{color: 'rgba(214,211,208,0.9)'}}>
                {aboutText}
              </p>

              {/* Social Media Links in Brand Column */}
              <div>
                <span className="text-xs font-semibold block mb-2" style={{color: '#eee3cf'}}>
                  {t("Social Media")}:
                </span>
                <div className="grid grid-cols-3 gap-2.5 w-fit">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.name}
                      aria-label={s.name}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{background: 'rgba(255,255,255,0.12)', color: '#ffffff'}}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#cfe04a';
                        e.currentTarget.style.color = '#1f2b12';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {linkGroups.map((group) => (
              <div key={group.title} className="col-span-1">
                <h5 className="text-sm mb-4 font-semibold" style={{color: '#eee3cf', margin: '0 0 16px 0'}}>
                  {t(group.title)}
                </h5>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {group.links.map((l) => {
                    const targetHref = canonicalHrefMap[l.label] || l.href || "/";
                    const isHash = targetHref.includes("#");

                    const handleClick = (e) => {
                      if (isHash) {
                        const hashId = targetHref.split("#")[1];
                        if (location.pathname === "/") {
                          e.preventDefault();
                          const el = document.getElementById(hashId);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      } else {
                        window.scrollTo(0, 0);
                      }
                    };

                    return (
                      <li key={l.label} className="mb-2.5">
                        <Link
                          to={targetHref}
                          onClick={handleClick}
                          className="text-[13px] transition-colors"
                          style={{color: 'rgba(214,211,208,0.8)', textDecoration: 'none'}}
                          onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(214,211,208,0.8)'}
                        >
                          {t(l.label)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="col-span-2 md:col-span-1">
              <h5 className="text-sm mb-4 font-semibold" style={{color: '#eee3cf', margin: '0 0 16px 0'}}>
                {t("Contact Us")}
              </h5>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li className="text-[13px] mb-3" style={{color: 'rgba(214,211,208,0.8)', lineHeight: '1.5'}}>
                  {t("You can connect directly on")}{" "}
                  <a
                    href={`https://wa.me/91${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold inline-block whitespace-nowrap"
                    style={{color: '#ffffff', textDecoration: 'underline'}}
                  >
                    {whatsappNumber}
                  </a>
                </li>
                <li className="text-[13px] mb-3" style={{color: 'rgba(214,211,208,0.8)'}}>{t(hours)}</li>
                <li className="text-[13px] mb-4" style={{color: 'rgba(214,211,208,0.8)'}}>{t(address)}</li>
                <li>
                  <span className="text-[11px] font-semibold uppercase tracking-wider block mb-2" style={{color: '#eee3cf'}}>
                    🚚 {t("We Deliver At")}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Home", "School", "College", "Office", "Gym", "Hospitals"].map((loc) => (
                      <span key={loc} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{background: 'rgba(255,255,255,0.12)', color: '#e7e5e4', border: '1px solid rgba(255,255,255,0.15)'}}>
                        {t(loc)}
                      </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row justify-between gap-2 text-xs" style={{borderTop: '1px solid rgba(255,255,255,0.12)', color: 'rgba(168,162,158,1)'}}>
            <span>{copyright}</span>
            <span>{tagline}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

