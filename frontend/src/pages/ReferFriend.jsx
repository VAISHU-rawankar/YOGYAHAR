import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const rewards = [
  { emoji: "🎁", title: "Free Trial for Your Friend", text: "Your referred friend gets a free 1-day trial of our freshest salads & juices — no commitment needed." },
  { emoji: "💰", title: "You Earn Discounts", text: "For every friend who subscribes, you get special discount coupons or free add-ons on your next order." },
  { emoji: "🔄", title: "Unlimited Referrals", text: "There's no limit! Refer as many friends as you like and keep earning benefits every single time." },
  { emoji: "⚡", title: "Instant Credit", text: "Your reward is applied automatically once your friend completes their first subscription order." },
];

const howItWorks = [
  { step: "01", title: "Share Your Name", text: "Ask your friend to mention your name when placing their first order on WhatsApp.", emoji: "📤" },
  { step: "02", title: "Friend Orders", text: "Your friend places their first subscription order mentioning your name/phone as referrer.", emoji: "🛒" },
  { step: "03", title: "Both Benefit", text: "You receive your discount coupon and your friend gets their free trial. Win-win!", emoji: "🎉" },
];

const testimonials = [
  { name: "Priya Sharma", quote: "I referred 3 friends last month and got free add-ons every time. Yogyahar's referral program is amazing!", avatar: "👩" },
  { name: "Rahul Patil", quote: "My office colleague now subscribes because of me. We both enjoy fresh salads daily — and I got discounts!", avatar: "👨" },
  { name: "Sneha Joshi", quote: "The referral system is so simple. Just mention my name and we both win. I've referred my entire family!", avatar: "🧑" },
];

export default function ReferFriend() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ referrerName: "", referrerPhone: "", friendName: "", friendPhone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Yogyahar! I'd like to refer a friend.\n\n👤 *My Name:* ${formData.referrerName}\n📞 *My Phone:* ${formData.referrerPhone}\n\n👤 *Friend's Name:* ${formData.friendName}\n📞 *Friend's Phone:* ${formData.friendPhone}\n\n📝 Note: ${formData.message || "Please give my friend their free trial and apply my referral reward."}`
    );
    window.open(`https://wa.me/917499643234?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden text-center py-20 md:py-28" style={{ background: "linear-gradient(135deg, #561a2c 0%, #7a2340 50%, #3d0f1c 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-[#ff6b9d] blur-[90px]" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-[#ffa0c0] blur-[70px]" />
        </div>
        {/* Floating emojis */}
        {["🎁", "💚", "🤝", "⭐", "🎉"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl md:text-3xl opacity-20 select-none"
            style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 2) * 40}%` }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
          >
            {emoji}
          </motion.span>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold tracking-[3px] uppercase px-5 py-2 rounded-full mb-6"
          >
            🎁 {t("Referral Program")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 font-display"
          >
            {t("I care about my loved one.")}<br />
            <span className="text-[#ffc0d0]">{t("So I am referring YOGYAHAR.")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {t("Gift good health to your family & friends in Nashik with 100% natural, preservative-free fresh cold-pressed juices & fruit cuts.")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={`https://wa.me/917499643234?text=${encodeURIComponent("❤️ I care about my loved one. So I am referring YOGYAHAR to you! 🌿\n\nEnjoy 100% natural, preservative-free fresh cold-pressed juices & salads delivered fresh daily in Nashik.\n\n👉 Check out YOGYAHAR plans: https://yogyahar.com")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#cfe04a] hover:bg-[#c2d43c] text-[#1f2b12] font-black px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-xs sm:text-sm uppercase tracking-wider no-underline cursor-pointer"
            >
              <span>🎁 {t("Referring YOGYAHAR to my loved one")}</span>
            </a>
            <a
              href="#refer-form"
              onClick={(e) => { e.preventDefault(); document.getElementById("refer-form")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center bg-white/15 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-all hover:bg-white/25 text-xs sm:text-sm uppercase tracking-wider"
            >
              {t("Fill Referral Form")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-[#1f2b12] text-center mb-3"
          >
            {t("What You & Your Friend Get")}
          </motion.h2>
          <p className="text-center text-[#5c5c4f] text-sm md:text-base mb-12 max-w-xl mx-auto">
            {t("Everyone wins when you refer a friend to Yogyahar.")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-b from-[#fff8f5] to-white border border-[#f0ddd8] rounded-[20px] p-6 text-center flex flex-col items-center gap-3 hover:shadow-xl transition-all duration-300 hover:border-[#561a2c]/20"
              >
                <div className="w-14 h-14 rounded-full bg-[#fce8ee] flex items-center justify-center text-3xl mb-1 shadow-sm">
                  {r.emoji}
                </div>
                <h3 className="text-base font-bold text-[#1f2b12]">{t(r.title)}</h3>
                <p className="text-xs text-[#5c5c4f] leading-relaxed">{t(r.text)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-14 md:py-20 bg-gradient-to-b from-[#f7f9f0] to-[#fcfaef]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-[#1f2b12] text-center mb-3"
          >
            {t("How It Works")}
          </motion.h2>
          <p className="text-center text-[#5c5c4f] text-sm md:text-base mb-14 max-w-xl mx-auto">
            {t("Simple 3 steps to start earning rewards.")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-[#cfe04a] via-[#a8d04a] to-[#cfe04a] opacity-40" />
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-white border border-[#eef0e5] rounded-[24px] p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1f2b12] text-white text-xs font-extrabold flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <span className="text-4xl block mt-2 mb-4">{step.emoji}</span>
                <h3 className="text-lg font-extrabold text-[#1f2b12] mb-2">{t(step.title)}</h3>
                <p className="text-sm text-[#5c5c4f] leading-relaxed">{t(step.text)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-[#1f2b12] text-center mb-12"
          >
            {t("What Our Referrers Say")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t2, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#fdf9f0] border border-[#eee3cf]/60 rounded-[20px] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{t2.avatar}</span>
                  <div>
                    <p className="font-bold text-[#1f2b12] text-sm">{t2.name}</p>
                    <div className="flex gap-0.5 text-[#f59e0b] text-xs">{"★★★★★"}</div>
                  </div>
                </div>
                <p className="text-sm text-[#5c5c4f] leading-relaxed italic">"{t(t2.quote)}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section id="refer-form" className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #561a2c 0%, #7a2340 60%, #3d0f1c 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-white mb-2">{t("Refer a Friend")}</h2>
              <p className="text-white/70 text-sm">{t("Tell us who you'd like to refer and we'll take it from there!")}</p>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-7xl block"
                >
                  🎉
                </motion.span>
                <p className="text-2xl font-extrabold text-white mt-6">{t("Referral Submitted!")}</p>
                <p className="text-white/70 text-sm mt-2 max-w-sm mx-auto">{t("We've opened WhatsApp for you. We'll contact your friend and apply your reward automatically.")}</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ referrerName: "", referrerPhone: "", friendName: "", friendPhone: "", message: "" }); }}
                  className="mt-6 px-8 py-3 rounded-full bg-white text-[#561a2c] font-bold text-sm transition-all hover:-translate-y-0.5"
                >
                  {t("Refer Another Friend")}
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[28px] p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">{t("Your Details")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ReferField name="referrerName" placeholder={t("Your Name")} emoji="👤" value={formData.referrerName} onChange={handleChange} required />
                      <ReferField name="referrerPhone" type="tel" placeholder={t("Your Phone")} emoji="📞" value={formData.referrerPhone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">{t("Friend's Details")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ReferField name="friendName" placeholder={t("Friend's Name")} emoji="🙂" value={formData.friendName} onChange={handleChange} required />
                      <ReferField name="friendPhone" type="tel" placeholder={t("Friend's Phone")} emoji="📱" value={formData.friendPhone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute top-3.5 left-4 text-white/50 text-sm">💬</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={t("Any message for us? (optional)")}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-white hover:bg-[#fce8ee] text-[#561a2c] font-extrabold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    {t("Send Referral via WhatsApp")}
                  </button>
                  <p className="text-center text-white/50 text-xs">
                    {t("Your referral will be sent via WhatsApp and processed within 24 hours.")}
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ReferField({ name, placeholder, emoji, type = "text", value, onChange, required = false }) {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50 text-sm">{emoji}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm outline-none text-white placeholder-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
      />
    </div>
  );
}
