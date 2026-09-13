import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { MessageSquare, AlertTriangle, User, Phone, Mail, FileText, CheckCircle, ShieldAlert, ChevronDown, Send, Briefcase, Gift } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import contactHero from "../assets/contact_hero.png";
import { useSectionContent } from "../hooks/useSectionContent";
import { API_BASE_URL, resolveImage } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

const defaultContent = {
  title: "We'd Love to Hear From You!",
  description: "Have a question, feedback, or just want to say hello? We're here for you. Reach out to us and we'll get back to you as soon as possible.",
  locationName: "YOGYAHAR",
  address: "Nashik, Maharashtra, India",
  phone: "+91 12345 67890",
  phoneHours: "(Mon - Sat, 9 AM - 7 PM)",
  email1: "hello@yogyahar.com",
  email2: "wecare@yogyahar.com",
  workingDays: "Monday - Saturday",
  workingHours: "09:00 AM - 07:00 PM",
  backgroundImage: "",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "grievance" ? "grievance" : "inquiry";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [grievanceType, setGrievanceType] = useState("Delivery Delayed / Slot Missed");
  const [urgency, setUrgency] = useState("Urgent Priority (Same Day)");
  const [{ title, description, locationName, address, phone, phoneHours, email1, email2, workingDays, workingHours, backgroundImage }] = useSectionContent("contactUs", defaultContent);
  const { t } = useLanguage();

  const infoCards = [
    {
      emoji: "📍",
      title: t("Our Location"),
      lines: [locationName, address],
      circleClass: "border-[#8ac926]/30 shadow-md",
    },
    {
      emoji: "📞",
      title: t("Call Us"),
      lines: [phone, phoneHours],
      circleClass: "border-[#f26522]/30 shadow-md",
    },
    {
      emoji: "✉️",
      title: t("Email Us"),
      lines: [email1, email2],
      circleClass: "border-blue-500/30 shadow-md",
    },
    {
      emoji: "⏰",
      title: t("Working Hours"),
      lines: [workingDays, workingHours],
      circleClass: "border-amber-500/30 shadow-md",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header onConnect={() => setInquiryOpen(true)} />

      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-14 md:py-28 overflow-hidden text-center"
        style={{ backgroundImage: `url(${resolveImage(backgroundImage, contactHero)})` }}
      >
        <div className="absolute inset-0 bg-[#fcfaef]/35 backdrop-blur-[0.5px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-[3px] uppercase mb-3 text-[#1f2b12]/80">
            {t("Contact Us")} 🍃
          </span>
          <h1 className="text-[28px] sm:text-[40px] md:text-[56px] font-bold font-display text-[#1b3d17] leading-tight mb-3 md:mb-4">
            {title}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Main Info + Form Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#f7f9f0] to-[#fcfdf8] border-y border-[#edf2dc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Info Cards & More Ways to Connect */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left"
            >
              {infoCards.map((c, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-[#eef0e5] flex flex-col justify-start transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] text-[#2b2b1f]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-[16px] bg-[#f5f8ed] text-xl flex items-center justify-center border border-[#e1e9cf] shrink-0 shadow-sm text-[#1f2b12]">
                      {c.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1f2b12] mb-1 font-sans">
                        {c.title}
                      </h3>
                      <div className="space-y-1">
                        {c.lines.map((line, i) => (
                          <p key={i} className="text-xs sm:text-sm text-[#5c5c4f] leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* More Ways to Connect Cards (Positioned in Place of Map!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {/* Join Our Team Card */}
              <Link
                to="/join-our-team"
                className="group relative overflow-hidden rounded-[24px] flex flex-col cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 no-underline text-left"
                style={{ background: "linear-gradient(150deg, #1f3717 0%, #12240e 100%)" }}
              >
                {/* Glow blobs */}
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" style={{ background: "#cfe04a", filter: "blur(40px)" }} />
                <div className="h-1.5 w-full rounded-t-[24px] bg-gradient-to-r from-[#cfe04a] to-[#8db83d]" />

                <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#cfe04a]/15 border border-[#cfe04a]/30 shadow-md">
                      <Briefcase className="w-5 h-5 text-[#cfe04a]" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#cfe04a]/15 text-[#cfe04a] border border-[#cfe04a]/30">
                      {t("Now Hiring")}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ color: "#ffffff" }} className="text-xl font-black mb-1 leading-tight drop-shadow-md font-display">
                      {t("Join Our Team")}
                    </h3>
                    <p className="text-stone-300 text-xs font-medium leading-relaxed">
                      {t("Passionate about healthy food? View our detailed job descriptions in Nashik.")}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#cfe04a] group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1.5 uppercase tracking-wider">
                        {t("View Job Descriptions")} →
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#cfe04a] text-[#1f2b12] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Refer a Friend Card */}
              <motion.a
                href={`https://wa.me/917499643234?text=${encodeURIComponent("❤️ I care about my loved one. So I am referring YOGYAHAR to you! 🌿\n\nEnjoy 100% natural, preservative-free fresh cold-pressed juices & salads delivered fresh daily in Nashik.\n\n👉 Check out YOGYAHAR plans: https://yogyahar.com")}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-[24px] flex flex-col cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 no-underline text-left"
                style={{ background: "linear-gradient(150deg, #561a2c 0%, #3a0e1c 100%)" }}
              >
                {/* Glow blobs */}
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" style={{ background: "#ff8aab", filter: "blur(40px)" }} />
                <div className="h-1.5 w-full rounded-t-[24px] bg-gradient-to-r from-[#ff8aab] to-[#e05580]" />

                <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#ffb3c8]/15 border border-[#ffb3c8]/30 shadow-md">
                      <Gift className="w-5 h-5 text-[#ffb3c8]" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#ffb3c8]/15 text-[#ffb3c8] border border-[#ffb3c8]/30">
                      {t("Earn Rewards")}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ color: "#ffffff" }} className="text-xl font-black mb-1 leading-tight drop-shadow-md font-display">
                      {t("Refer a Friend")}
                    </h3>
                    <p style={{ color: "#ffc0d0" }} className="text-[11px] font-extrabold leading-relaxed">
                      {t("I care about my loved one. So I am referring YOGYAHAR to them!")}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#ffb3c8] group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1 uppercase tracking-wider">
                        {t("Referring YOGYAHAR to my loved one")} →
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#ff8aab] text-[#3d0f1c] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 shrink-0">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.075-1.33a9.97 9.97 0 004.937 1.33h.005c5.507 0 9.99-4.478 9.99-9.984a9.97 9.97 0 00-2.923-7.062A9.97 9.97 0 0012.012 2zm5.725 14.195c-.247.697-1.442 1.3-1.996 1.385-.503.078-1.157.143-3.328-.755-2.775-1.148-4.545-3.98-4.684-4.166-.138-.186-1.123-1.493-1.123-2.85 0-1.355.706-2.017.957-2.28.25-.262.553-.328.738-.328.184 0 .368.002.528.01.166.008.388-.063.606.464.225.545.767 1.866.833 2 .066.134.11.29.02.465-.09.18-.135.29-.27.447-.134.156-.285.347-.406.467-.135.132-.277.275-.12.545.158.27 1.01 1.666 2.164 2.69 1.488 1.32 2.733 1.728 3.12 1.884.388.156.613.13.842-.128.229-.26.974-1.135 1.236-1.52.261-.387.525-.325.882-.196.358.13 2.273 1.07 2.664 1.266.39.196.65.292.747.458.096.166.096.96-.151 1.657z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
  
          {/* Form with Tabs: General Inquiry & Grievances */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-[#d4ddb9]/60 flex flex-col justify-center text-[#2b2b1f] self-stretch"
          >
            {/* Tab Selector Buttons */}
            <div className="flex bg-[#f0f4e2] p-1.5 rounded-2xl mb-6 border border-[#d4ddb9]">
              <button
                type="button"
                onClick={() => { setActiveTab("inquiry"); setSubmitted(false); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "inquiry"
                    ? "bg-[#1f2b12] text-[#cfe04a] shadow-md"
                    : "text-[#5c5c4f] hover:text-[#1f2b12]"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t("Send Us a Message")}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("grievance"); setSubmitted(false); }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "grievance"
                    ? "bg-[#2f4a1f] text-[#cfe04a] shadow-md ring-1 ring-[#cfe04a]/40"
                    : "text-[#5c5c4f] hover:text-[#2f4a1f]"
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-[#cfe04a]" />
                <span>{t("Grievances / Complaint")}</span>
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#2f4a1f] text-[#cfe04a] flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <p className="text-lg text-[#1f2b12] font-extrabold font-display">
                  {t("Submitted Successfully!")}
                </p>
                <p className="text-xs text-[#5c5c4f] max-w-xs">
                  {activeTab === "grievance"
                    ? t("Your grievance has been logged. Our priority resolution officer will contact you shortly.")
                    : t("Your message has been sent successfully.")}
                </p>
              </div>
            ) : activeTab === "inquiry" ? (
              /* General Inquiry Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field name="name" placeholder={t("Your Full Name *")} required Icon={User} />
                <Field name="email" type="email" placeholder={t("Email Address *")} required Icon={Mail} />
                <Field name="phone" type="tel" placeholder={t("Phone Number *")} required Icon={Phone} />

                <div className="relative w-full text-[#2b2b1f]">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
                    <FileText className="w-4 h-4" />
                  </span>
                  <select
                    name="subject"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#d4ddb9]/80 text-sm outline-none text-[#2b2b1f] focus:ring-2 focus:ring-[#1f2b12]/10 focus:border-[#1f2b12] transition-all duration-300 cursor-pointer appearance-none font-medium"
                  >
                    <option value="">-- {t("Select Subject / Topic")} * --</option>
                    <option value="General Inquiry">{t("General Inquiry / Question")}</option>
                    <option value="Subscription Plans">{t("Subscription Plans & Pricing")}</option>
                    <option value="Grab Sample">{t("Grab Sample / 1-Day Trial")}</option>
                    <option value="Corporate Orders">{t("Corporate & Bulk Orders")}</option>
                    <option value="Feedback & Suggestions">{t("Feedback & Suggestions")}</option>
                    <option value="Careers / Join Team">{t("Careers & Join Our Team")}</option>
                  </select>
                  <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-400">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
                
                <div className="relative">
                  <span className="absolute top-3.5 left-4 text-stone-400">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t("Your Message *")}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#d4ddb9]/80 text-sm outline-none text-[#2b2b1f] placeholder-[#8c8c7a] focus:ring-2 focus:ring-[#1f2b12]/10 focus:border-[#1f2b12] transition-all duration-300 resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold py-3.5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform active:scale-95 tracking-wider text-xs uppercase cursor-pointer"
                >
                  {t("Send Message")}
                </button>
              </form>
            ) : (
              /* Grievance / Complaint Form */
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Priority Alert Badge */}
                <div className="bg-[#f4f7ea] border border-[#d4ddb9] p-3 rounded-2xl mb-1 flex items-center gap-2.5 text-xs font-bold text-[#2f4a1f]">
                  <ShieldAlert className="w-4 h-4 text-[#5b7b2e] shrink-0" />
                  <span>{t("Priority Redressal for Active Subscribers & Orders")}</span>
                </div>

                <Field name="name" placeholder={t("Your Full Name *")} required Icon={User} />
                <Field name="email" type="email" placeholder={t("Email Address *")} required Icon={Mail} />
                <Field name="phone" type="tel" placeholder={t("Phone Number *")} required Icon={Phone} />
                <Field name="orderId" placeholder={t("Subscription ID / Order ID (Optional)")} Icon={FileText} />

                {/* Ready Options Dropdown */}
                <div className="relative w-full text-[#2b2b1f]">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#3d5223] mb-1.5">
                    {t("Select Grievance Category (Ready Options)")} *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </span>
                    <select
                      name="subject"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#d4ddb9] text-sm outline-none text-[#2b2b1f] focus:ring-2 focus:ring-[#3d5223]/20 focus:border-[#3d5223] transition-all duration-300 cursor-pointer appearance-none font-bold"
                    >
                      <option value="GRIEVANCE: Delivery Delayed / Slot Missed">Delivery Delayed / Slot Missed</option>
                      <option value="GRIEVANCE: Packaging / Bottle Leakage">Packaging / Bottle Leakage & Damage</option>
                      <option value="GRIEVANCE: Product Taste / Freshness Concern">Product Taste / Temperature Issue</option>
                      <option value="GRIEVANCE: Subscription & Payment Dispute">Subscription / Payment Dispute</option>
                      <option value="GRIEVANCE: Delivery Partner Behavior">Delivery Partner Behavior Concern</option>
                      <option value="GRIEVANCE: Other Urgent Issue">Other Urgent Grievance Issue</option>
                    </select>
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-400">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute top-3.5 left-4 text-stone-400">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t("Describe your grievance or complaint details...")}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#d4ddb9] text-sm outline-none text-[#2b2b1f] placeholder-[#8c8c7a] focus:ring-2 focus:ring-[#3d5223]/20 focus:border-[#3d5223] transition-all duration-300 resize-none font-medium"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t("Submit Official Grievance")}</span>
                  </button>

                  <a
                    href="https://wa.me/917499643234?text=⚠️%20URGENT%20GRIEVANCE%20-%20I%20need%20immediate%20help%20with%20my%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 no-underline"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.075-1.33a9.97 9.97 0 004.937 1.33h.005c5.507 0 9.99-4.478 9.99-9.984a9.97 9.97 0 00-2.923-7.062A9.97 9.97 0 0012.012 2zm5.725 14.195c-.247.697-1.442 1.3-1.996 1.385-.503.078-1.157.143-3.328-.755-2.775-1.148-4.545-3.98-4.684-4.166-.138-.186-1.123-1.493-1.123-2.85 0-1.355.706-2.017.957-2.28.25-.262.553-.328.738-.328.184 0 .368.002.528.01.166.008.388-.063.606.464.225.545.767 1.866.833 2 .066.134.11.29.02.465-.09.18-.135.29-.27.447-.134.156-.285.347-.406.467-.135.132-.277.275-.12.545.158.27 1.01 1.666 2.164 2.69 1.488 1.32 2.733 1.728 3.12 1.884.388.156.613.13.842-.128.229-.26.974-1.135 1.236-1.52.261-.387.525-.325.882-.196.358.13 2.273 1.07 2.664 1.266.39.196.65.292.747.458.096.166.096.96-.151 1.657z" />
                    </svg>
                    <span>{t("WhatsApp Urgent")}</span>
                  </a>
                </div>
              </form>
            )}
          </motion.div>


        </div>
      </section>



      {/* Newsletter */}
      <section className="px-4 sm:px-6 pt-6 pb-12 md:pb-16 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto rounded-[24px] px-5 sm:px-8 md:px-12 py-8 sm:py-10 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-6 relative overflow-hidden"
          style={{background: 'linear-gradient(135deg, #263d14 0%, #1a2a0d 60%, #2e1a10 100%)'}}
        >
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{background: '#cfe04a', filter: 'blur(40px)'}} />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10" style={{background: '#cfe04a', filter: 'blur(40px)'}} />

          <div className="text-left relative z-10">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-1 font-sans" style={{color: '#ffffff', margin: '0 0 6px 0'}}>
              📩 Stay Updated with YOGYAHAR
            </h3>
            <p className="text-xs sm:text-sm max-w-sm leading-relaxed" style={{color: 'rgba(207,224,160,0.85)'}}>
              Subscribe to our newsletter for the latest updates, offers &amp; health tips.
            </p>
          </div>
          <form className="flex gap-2.5 w-full sm:w-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="px-4 py-3 rounded-xl w-full sm:w-64 text-sm outline-none"
              style={{background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)'}}
              onFocus={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onBlur={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1 shrink-0 hover:scale-105 active:scale-95"
              style={{background: '#cfe04a', color: '#1f2b12'}}
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      <Footer />
      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}

function Field({ name, placeholder, Icon, type = "text", required = false }) {
  return (
    <div className="relative w-full text-[#2b2b1f]">
      {Icon && (
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
          <Icon className="w-4 h-4" />
        </span>
      )}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-3 rounded-xl bg-white border border-[#d4ddb9]/80 text-sm outline-none text-[#2b2b1f] placeholder-[#8c8c7a] focus:ring-2 focus:ring-[#1f2b12]/10 focus:border-[#1f2b12] transition-all duration-300 font-medium`}
      />
    </div>
  );
}
