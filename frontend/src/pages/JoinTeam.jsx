import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { useSectionContent } from "../hooks/useSectionContent";
import { Briefcase, Truck, Utensils, MessageSquare, Megaphone, CheckCircle, ChevronDown, Send, Sparkles, Bell, MapPin, Clock, Award } from "lucide-react";

const defaultJoinTeamContent = {
  status: "Active",
  eyebrow: "YOGYAHAR CAREERS",
  heroHeadingLine1: "Join Our Team &",
  heroHeadingLine2: "Grow With Us",
  heroParagraph: "Explore current job openings & detailed job descriptions. Build a meaningful career in Nashik's leading fresh wellness & nutrition brand.",
  stayUpdatedHeading: "Stay Updated with YOGYAHAR Careers",
  stayUpdatedSubtext: "Looking for upcoming roles? Contact our HR desk directly on WhatsApp for new position alerts.",
  stayUpdatedButtonText: "Get Job Alerts on WhatsApp",
  stayUpdatedWhatsappNumber: "917499643234",
  openingsSectionSubheading: "Current Opportunities in Nashik",
  openingsSectionHeading: "Job Descriptions & Openings",
  whyBuildCareerHeading: "Why Build Your Career With YOGYAHAR?",
  openings: [
    {
      id: "delivery",
      role: "Delivery Executive",
      type: "Full-time / Part-time · Field",
      location: "Nashik City",
      description: "Join our delivery fleet in Nashik! Deliver fresh, organic cold-pressed juices & fruit bowls to active subscribers every morning (6–9 AM) and evening (5–7 PM).",
      responsibilities: [
        "Ensure on-time doorstep delivery to active subscribers in designated Nashik routes",
        "Maintain cold-chain freshness and bottle handling safety",
        "Handle customer delivery acknowledgments and WhatsApp updates"
      ],
      requirements: [
        "Own two-wheeler & valid driving license",
        "Familiarity with Nashik city roads & locations",
        "Punctual, dependable, and courteous attitude",
        "Basic smartphone operation (WhatsApp & Google Maps)"
      ],
      perks: "Competitive daily/monthly pay + Fuel Allowance + Free Daily Healthy Meal + Monthly Incentives",
      status: "Active"
    },
    {
      id: "kitchen",
      role: "Kitchen Preparation Staff",
      type: "Full-time · Kitchen Hub",
      location: "Nashik Main Kitchen",
      description: "Prepare fresh organic fruit cuts, salads, and cold-pressed juices daily in our state-of-the-art hygienic kitchen hub.",
      responsibilities: [
        "Washing, peeling, and precision cutting of fresh fruits & vegetables",
        "Operating cold-press juice extractors maintaining 100% purity standards",
        "Hygienic eco-packaging, sealing, and batch labeling"
      ],
      requirements: [
        "High standard of personal cleanliness & hygiene",
        "Prior kitchen or food handling experience preferred",
        "Ability to start early morning shifts",
        "Team-oriented work ethic"
      ],
      perks: "Attractive Monthly Salary + Daily Free Healthy Meals + Paid Leave + Clean Workplace",
      status: "Active"
    },
    {
      id: "support",
      role: "Customer Relations & Operations",
      type: "Full-time · Office / Hybrid",
      location: "Nashik Office",
      description: "Manage subscriber queries, process daily delivery pause/resume requests, and coordinate with delivery teams to ensure 100% customer satisfaction.",
      responsibilities: [
        "Handling inbound subscriber inquiries via WhatsApp & Phone",
        "Managing daily subscription pause, resume, and plan modification logs",
        "Resolving delivery or quality feedback promptly"
      ],
      requirements: [
        "Fluent in Marathi & Hindi (English is a plus)",
        "Proficient in WhatsApp Business & basic spreadsheets",
        "Customer-first empathetic problem-solving skills"
      ],
      perks: "Competitive Monthly Fixed Salary + Performance Bonuses + Friendly Work Environment",
      status: "Active"
    },
    {
      id: "marketing",
      role: "Sales & Local Outreach Associate",
      type: "Full-time · Field & Digital",
      location: "Nashik Region",
      description: "Drive YOGYAHAR's mission forward by establishing subscription tie-ups with corporate offices, fitness centers, gyms, and residential communities.",
      responsibilities: [
        "Building partnerships with local gyms, yoga studios, & corporate hubs in Nashik",
        "Organizing fresh trial sampling events and subscriber drive campaigns",
        "Managing local promotional channels and customer referrals"
      ],
      requirements: [
        "Energetic & persuasive communication skills",
        "Local networking familiarity in Nashik",
        "Passion for health, wellness, and organic living"
      ],
      perks: "Base Salary + High Commission per Subscription + Travel Allowance",
      status: "Active"
    }
  ],
  values: [
    { title: "Health & Wellness Mission", text: "Work with a brand dedicated to delivering 100% natural, preservative-free fresh food.", status: "Active" },
    { title: "Supportive Culture", text: "Enjoy a positive, respectful work environment where every team member is valued.", status: "Active" },
    { title: "Free Healthy Meals", text: "Receive daily fresh organic meals and fruit juices as part of your team perks.", status: "Active" },
    { title: "Career Growth", text: "Opportunity to grow into leadership roles as YOGYAHAR expands across Maharashtra.", status: "Active" }
  ]
};

const iconMap = {
  delivery: Truck,
  kitchen: Utensils,
  support: MessageSquare,
  marketing: Megaphone
};

export default function JoinTeam() {
  const { t } = useLanguage();
  const [content] = useSectionContent("joinTeamPage", defaultJoinTeamContent);
  const [expandedCard, setExpandedCard] = useState("delivery");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", role: "Delivery Executive", experience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const activeOpenings = (content.openings || defaultJoinTeamContent.openings).filter(o => o.status !== "Inactive");
  const activeValues = (content.values || defaultJoinTeamContent.values).filter(v => v.status !== "Inactive");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Yogyahar Careers Team! I'd like to apply for the position:\n\n💼 *Position:* ${formData.role}\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n✉️ *Email:* ${formData.email || "N/A"}\n📝 *Experience:* ${formData.experience || "N/A"}\n💬 *Message:* ${formData.message || "I am eager to join YOGYAHAR."}`
    );
    window.open(`https://wa.me/${content.stayUpdatedWhatsappNumber || "917499643234"}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const handleQuickApply = (roleTitle) => {
    setFormData({ ...formData, role: roleTitle });
    const msg = encodeURIComponent(
      `Hello Yogyahar Careers! I would like to apply for the *${roleTitle}* role in Nashik. Please share application details.`
    );
    window.open(`https://wa.me/${content.stayUpdatedWhatsappNumber || "917499643234"}?text=${msg}`, "_blank");
  };

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden text-left">
      <Header />

      {/* Hero Header - Clean Forest Green & Lime Theme */}
      <section className="relative bg-gradient-to-br from-[#172b0f] via-[#243d17] to-[#14240c] py-16 sm:py-24 text-white overflow-hidden border-b border-[#cfe04a]/20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#cfe04a] blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#cfe04a] blur-[90px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-[#cfe04a]/20 border border-[#cfe04a]/40 text-[#cfe04a] text-xs font-black tracking-[2.5px] uppercase px-4 py-2 rounded-full mb-4 shadow-sm">
            <Briefcase className="w-4 h-4 text-[#cfe04a]" />
            <span>{t(content.eyebrow || "YOGYAHAR CAREERS")}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 font-display">
            <span className="text-white">{t(content.heroHeadingLine1 || "Join Our Team &")}</span>{" "}
            <span className="text-[#cfe04a] drop-shadow-md">{t(content.heroHeadingLine2 || "Grow With Us")}</span>
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t(content.heroParagraph || "Explore current job openings & detailed job descriptions. Build a meaningful career in Nashik's leading fresh wellness & nutrition brand.")}
          </p>
        </div>
      </section>

      {/* Stay Updated Card Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-20 w-full">
        <div className="bg-gradient-to-r from-[#1b3315] via-[#28471f] to-[#172e12] border border-[#cfe04a]/40 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#cfe04a]/20 text-[#cfe04a] flex items-center justify-center shrink-0 border border-[#cfe04a]/30 shadow-md">
              <Bell className="w-6 h-6 animate-pulse text-[#cfe04a]" />
            </div>
            <div>
              <h3 style={{ color: "#ffffff" }} className="text-lg sm:text-xl font-black font-display drop-shadow-sm">
                {t(content.stayUpdatedHeading || "Stay Updated with YOGYAHAR Careers")}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 font-medium mt-0.5">
                {t(content.stayUpdatedSubtext || "Looking for upcoming roles? Contact our HR desk directly on WhatsApp for new position alerts.")}
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${content.stayUpdatedWhatsappNumber || "917499643234"}?text=${encodeURIComponent("Hello Yogyahar! I want to stay updated on new job openings.")}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12] font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 no-underline cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            {t(content.stayUpdatedButtonText || "Get Job Alerts on WhatsApp")}
          </a>
        </div>
      </section>

      {/* Job Openings Section - Clean YOGYAHAR Theme */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#4a5f2e]">
              {t(content.openingsSectionSubheading || "Current Opportunities in Nashik")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1f2b12] font-display mt-1">
              {t(content.openingsSectionHeading || "Job Descriptions & Openings")}
            </h2>
          </div>

          <div className="space-y-6">
            {activeOpenings.map((job) => {
              const IconComp = iconMap[job.id] || Briefcase;
              const isExpanded = expandedCard === job.id;
              return (
                <div
                  key={job.id}
                  className="bg-white border border-[#d4ddb9] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Header Bar - Unified Premium Forest Green Header */}
                  <div className="bg-gradient-to-r from-[#1f3717] via-[#2a4a1f] to-[#162910] p-5 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#cfe04a]/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#cfe04a]/15 border border-[#cfe04a]/30 flex items-center justify-center shrink-0 shadow-md">
                        <IconComp className="w-6 h-6 text-[#cfe04a]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 style={{ color: "#ffffff" }} className="text-xl sm:text-2xl font-black font-display">{t(job.role)}</h3>
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#cfe04a]/20 text-[#cfe04a] border border-[#cfe04a]/30">
                            <MapPin className="w-3 h-3 text-[#cfe04a]" />
                            {job.location}
                          </span>
                        </div>
                        <p className="text-xs text-stone-300 font-medium mt-1">{t(job.type)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleQuickApply(job.role)}
                        className="bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12] font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-105"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t("Apply Now")}</span>
                      </button>

                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : job.id)}
                        className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? t("Hide Details") : t("View Job Description")}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Job Description details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 sm:p-8 space-y-6 bg-[#faf8f5]">
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#4a5f2e] mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#5b7b2e]" />
                              <span>{t("Role Overview & Description")}:</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                              {t(job.description)}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Key Responsibilities */}
                            {job.responsibilities && job.responsibilities.length > 0 && (
                              <div className="bg-white border border-[#d4ddb9] p-5 rounded-2xl shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-wider text-[#1f2b12] mb-3 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-[#5b7b2e]" />
                                  <span>{t("Key Responsibilities")}</span>
                                </h4>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                                      <span className="text-[#5b7b2e] font-bold">•</span>
                                      <span>{t(resp)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Qualifications & Requirements */}
                            {job.requirements && job.requirements.length > 0 && (
                              <div className="bg-white border border-[#d4ddb9] p-5 rounded-2xl shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-wider text-[#1f2b12] mb-3 flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-[#5b7b2e]" />
                                  <span>{t("Qualifications & Requirements")}</span>
                                </h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                                      <span className="text-[#5b7b2e] font-bold">•</span>
                                      <span>{t(req)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Perks & Compensation */}
                          {job.perks && (
                            <div className="bg-[#f0f4e2] border border-[#cfe04a]/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#4a5f2e] flex items-center gap-1">
                                  <Award className="w-3.5 h-3.5 text-[#5b7b2e]" />
                                  <span>{t("Compensation & Benefits")}:</span>
                                </span>
                                <p className="text-xs font-extrabold text-[#1f2b12] mt-0.5">
                                  {t(job.perks)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleQuickApply(job.role)}
                                className="bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md"
                              >
                                {t("Apply for this Position")} →
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#d4ddb9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1f2b12] font-display">
              {t(content.whyBuildCareerHeading || "Why Build Your Career With YOGYAHAR?")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {activeValues.map((v, idx) => (
              <div
                key={idx}
                className="bg-[#faf8f5] border border-[#d4ddb9] rounded-2xl p-5 text-left flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2f4a1f] text-[#cfe04a] flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-[#cfe04a]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#1f2b12]">{t(v.title)}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">{t(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="refer-form" className="py-14 bg-gradient-to-b from-[#f7f9f0] to-[#fcfaef] border-t border-[#d4ddb9]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#d4ddb9] rounded-3xl p-6 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-black text-[#1f2b12] font-display text-center mb-1">
              {t("Direct Application Form")}
            </h3>
            <p className="text-xs text-stone-600 text-center mb-6">
              {t("Submit your details below to apply for any role at YOGYAHAR.")}
            </p>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#2f4a1f] text-[#cfe04a] flex items-center justify-center text-2xl shadow-lg">
                  <CheckCircle className="w-8 h-8 text-[#cfe04a]" />
                </div>
                <h4 className="text-xl font-black text-[#1f2b12] font-display">{t("Application Sent!")}</h4>
                <p className="text-xs text-stone-600 max-w-xs">{t("Our HR recruitment lead will review your application and contact you shortly.")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1f2b12] mb-1">{t("Select Position *")}</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4ddb9] rounded-xl text-xs font-bold text-[#1f2b12] outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                  >
                    {activeOpenings.map(o => (
                      <option key={o.id} value={o.role}>{o.role} ({o.location})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1f2b12] mb-1">{t("Your Name *")}</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4ddb9] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1f2b12] mb-1">{t("Phone Number *")}</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4ddb9] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1f2b12] mb-1">{t("Relevant Experience")}</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 1 year delivery experience, 2 years kitchen associate, etc."
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4ddb9] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1f2b12] mb-1">{t("Message / Additional Information")}</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us briefly why you want to join YOGYAHAR..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#d4ddb9] rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#2f4a1f] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t("Submit Job Application")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
