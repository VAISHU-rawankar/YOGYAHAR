import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AyurvedaQuote from "./components/AyurvedaQuote";
import StatsBar from "./components/StatsBar";
import Products from "./components/Products";
import Plans from "./components/Plans";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Newsletter from "./components/Newsletter";
import TrendingNow from "./components/TrendingNow";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import LoginPage from "./admin/LoginPage";
import AdminLayout from "./admin/AdminLayout";
import SectionEditor from "./admin/SectionEditor";
import RequireAuth from "./admin/RequireAuth";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import Chatbot from "./components/Chatbot";
import LogoIntro from "./components/LogoIntro";
import GrabSampleButton from "./components/GrabSampleButton";
import SampleModal from "./components/SampleModal";
import JoinTeam from "./pages/JoinTeam";
import ReferFriend from "./pages/ReferFriend";
import FaqPage from "./pages/FaqPage";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsConditions from "./pages/TermsConditions";

// Module-level flag: resets on every full page load (F5/refresh),
// but stays true during SPA navigation so intro only plays once per load.
let introHasPlayed = false;

function Site() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Play intro on every fresh page load (resets on F5 refresh)
  const [showIntro] = useState(() => {
    if (!isHomePage || introHasPlayed) return false;
    introHasPlayed = true;
    return true;
  });
  const [introPlayed, setIntroPlayed] = useState(!showIntro);

  const handleIntroDone = () => {
    setIntroPlayed(true);
  };

  return (
    <div className="text-[#2b2b1f]">
      {showIntro && <LogoIntro onDone={handleIntroDone} />}
      <Header onConnect={() => setInquiryOpen(true)} onGrabSample={() => setSampleOpen(true)} introPlayed={introPlayed} />
      <Hero onConnect={() => setInquiryOpen(true)} onGrabSample={() => setSampleOpen(true)} />
      <AyurvedaQuote />
      <StatsBar />
      <Products />
      <Plans onGrabSample={() => setSampleOpen(true)} />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <TrendingNow />
      <Newsletter />
      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <GrabSampleButton onClick={() => setSampleOpen(true)} />
      <SampleModal open={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:category/:name" element={<ProductDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/join-our-team" element={<JoinTeam />} />
        <Route path="/refer-friend" element={<ReferFriend />} />
        <Route path="/refer-a-friend" element={<ReferFriend />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="sections/hero" replace />} />
          <Route path="sections/:key" element={<SectionEditor />} />
        </Route>
      </Routes>
      <Chatbot />
    </>
  );
}
