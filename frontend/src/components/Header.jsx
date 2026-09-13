import { useLocation, Link } from "react-router-dom";
import { useSectionContent } from "../hooks/useSectionContent";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const canonicalNavMap = {
  "Home": "/",
  "Products": "/products",
  "Services": "/services",
  "About Us": "/about",
  "FAQ": "/faq",
  "Contact Us": "/contact",
  "Blog": "/blog",
};

export default function Header({ onConnect, onGrabSample = null, introPlayed }) {
  const [{ navLinks: fetchedNavLinks }] = useSectionContent("header", defaultContent);
  const navLinks = fetchedNavLinks && fetchedNavLinks.length > 0 ? fetchedNavLinks : defaultContent.navLinks;

  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const { language, changeLanguage, t } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fcfaef]/95 backdrop-blur-sm border-b border-[#e8e2c8]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-[#1f2b12] hover:opacity-90 transition-opacity"
          >
            <motion.img
              id="header-logo-target"
              src="/logo.png"
              alt="Yogyahar Logo"
              initial={isHomePage && !introPlayed ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-[48px] w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex gap-8">
              {navLinks.map((link) => {
                const targetHref = canonicalNavMap[link.label] || link.href;
                const isHash = targetHref.startsWith("#") || targetHref.includes("#");
                const isActive = targetHref === pathname;
                return (
                  <li key={link.label}>
                    {isHash ? (
                      <a
                        href={targetHref}
                        className={`text-sm font-medium hover:text-[#5f7a3a] transition-colors ${
                          isActive ? "text-[#5f7a3a]" : "text-[#20281a]"
                        }`}
                      >
                        {t(link.label)}
                      </a>
                    ) : (
                      <Link
                        to={targetHref}
                        className={`text-sm font-medium hover:text-[#5f7a3a] transition-colors ${
                          isActive ? "text-[#5f7a3a]" : "text-[#20281a]"
                        }`}
                      >
                        {t(link.label)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-[#f0f4e2]/60 hover:bg-[#e6ecd2] border border-[#d4ddb9] rounded-full px-3 py-2 text-xs font-bold text-[#1f2b12] outline-none cursor-pointer transition-all shadow-sm focus:ring-1 focus:ring-[#5f7a3a]"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="mr">MR</option>
              </select>
            </div>

            <button
              onClick={onConnect}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#cfe04a] hover:bg-[#c2d43c] px-4 py-2 text-xs font-semibold text-[#1f2b12] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {t("Connect Now!")} &rarr;
            </button>

            {/* WhatsApp Header Button */}
            <a
              href="https://wa.me/917499643234?text=Hello%20Yogyahar!%20I%27d%20like%20to%20know%20more%20about%20your%20products%20and%20services."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.657.983 3.41 1.493 5.405 1.495 5.527 0 10.026-4.499 10.03-10.028.002-2.68-1.04-5.193-2.932-7.09C17.26 1.637 14.75 1.56 12.015 1.56 6.488 1.56 1.99 6.059 1.986 11.588c-.001 2.013.528 3.821 1.537 5.484l-.992 3.626 3.73-.978L6.647 19.16z M16.71 13.976c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#20281a] focus:outline-none p-1.5"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-[#fcfaef] border-b border-[#e8e2c8] shadow-xl overflow-hidden"
            >
              <div className="py-6 px-6 flex flex-col gap-4">
                <ul className="flex flex-col gap-4 text-left">
                  {navLinks.map((link) => {
                    const targetHref = canonicalNavMap[link.label] || link.href;
                    const isHash = targetHref.startsWith("#") || targetHref.includes("#");
                    const isActive = targetHref === pathname;
                    return (
                      <li
                        key={link.label}
                        className="border-b border-[#d4ddb9]/40 pb-2"
                      >
                        {isHash ? (
                          <a
                            href={targetHref}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-semibold hover:text-[#5f7a3a] transition-colors ${
                              isActive ? "text-[#5f7a3a]" : "text-[#20281a]"
                            }`}
                          >
                            {t(link.label)}
                          </a>
                        ) : (
                          <Link
                            to={targetHref}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-semibold hover:text-[#5f7a3a] transition-colors ${
                              isActive ? "text-[#5f7a3a]" : "text-[#20281a]"
                            }`}
                          >
                            {t(link.label)}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile Language Selector */}
                <div className="flex items-center justify-between border-t border-[#d4ddb9]/40 pt-4 mt-2">
                  <span className="text-sm font-bold text-[#20281a]">
                    {language === "hi" ? "भाषा" : language === "mr" ? "भाषा" : "Language"}:
                  </span>
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-[#f0f4e2]/60 border border-[#d4ddb9] rounded-full px-3.5 py-1.5 text-xs font-bold text-[#1f2b12] outline-none"
                  >
                    <option value="en">EN</option>
                    <option value="hi">HI</option>
                    <option value="mr">MR</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onConnect();
                  }}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#cfe04a] hover:bg-[#c2d43c] px-6 py-4 text-sm font-semibold text-[#1f2b12] shadow-md mt-2"
                >
                  {t("Connect Now!")} &rarr;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
