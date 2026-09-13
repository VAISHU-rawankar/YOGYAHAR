import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, CheckCircle, Sparkles, Sun, Sunset, Send, MapPin, Phone, User, GlassWater, Apple, Droplet, Cookie } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../lib/apiClient";

export default function SampleModal({ open, onClose }) {
  const { t } = useLanguage();
  const [sampleType, setSampleType] = useState("Cold Pressed Juice (200ml)");
  const [deliverySlot, setDeliverySlot] = useState("Morning (6-9 AM)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const sampleOptions = [
    { id: "Cold Pressed Juice (200ml)", label: "Cold Pressed Juice", size: "200 ml", Icon: GlassWater },
    { id: "Fresh Fruit Bowl", label: "Fresh Fruit Bowl", size: "200 gm", Icon: Apple },
    { id: "Detox Water Infusion", label: "Detox Water", size: "500 ml", Icon: Droplet },
    { id: "Organic Super Laddu", label: "Super Laddu", size: "1 Pc", Icon: Cookie },
  ];

  const handleWhatsApp = () => {
    const msg = `Hi Yogyahar! I would like to request a Sample Pack:%0A%0A*Sample Item:* ${encodeURIComponent(sampleType)}%0A*Preferred Slot:* ${encodeURIComponent(deliverySlot)}%0A*Name:* ${encodeURIComponent(name || "Customer")}%0A*Phone:* ${encodeURIComponent(phone || "N/A")}%0A*Nashik Area:* ${encodeURIComponent(area || "Nashik")}`;
    window.open(`https://wa.me/917499643234?text=${msg}`, "_blank");
    onClose();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(t("Please enter your name and phone number."));
      return;
    }
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          location: area || "Nashik",
          goal: `SAMPLE REQUEST: ${sampleType} (${deliverySlot})`,
          message: `Sample Request for ${sampleType}. Slot: ${deliverySlot}. Address: ${area}`,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Sample request submit error:", err);
      handleWhatsApp();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#faf8f5] border border-[#d4ddb9] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#cfe04a]/20 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2f4a1f] text-[#cfe04a] flex items-center justify-center text-3xl shadow-lg animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#2f4a1f] font-display">
                {t("Sample Request Received!")}
              </h3>
              <p className="text-sm text-stone-600 max-w-xs">
                {t("Our YOGYAHAR delivery coordinator will call you to confirm delivery timing.")}
              </p>
            </div>
          ) : (
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 bg-[#2f4a1f]/10 border border-[#2f4a1f]/20 w-fit px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#2f4a1f] mb-3">
                <Gift className="w-3.5 h-3.5 text-[#2f4a1f]" />
                <span>{t("Nashik Exclusive Sample Program")}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#a8b828]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#1f2b12] leading-tight font-display mb-1">
                {t("Grab Your Sample Pack")}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mb-5">
                {t("Taste 100% natural, preservative-free wellness delivered fresh in Nashik.")}
              </p>

              <form onSubmit={handleSubmitForm} className="space-y-4">
                {/* Step 1: Select Sample */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                    1. {t("Choose Your Sample Product")}:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleOptions.map((opt) => {
                      const IconComp = opt.Icon;
                      const isSelected = sampleType === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setSampleType(opt.id)}
                          className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1f2b12] border-[#1f2b12] text-[#cfe04a] shadow-md scale-[1.02]"
                              : "bg-white border-[#d4ddb9] text-stone-800 hover:bg-[#f0f4e2]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${isSelected ? "bg-[#cfe04a]/20 text-[#cfe04a]" : "bg-[#2f4a1f]/10 text-[#2f4a1f]"}`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold truncate">{t(opt.label)}</div>
                            <div className={`text-[10px] font-semibold ${isSelected ? "text-stone-300" : "text-stone-500"}`}>{opt.size}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Delivery Slot */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4a5f2e] mb-2">
                    2. {t("Preferred Delivery Slot")}:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliverySlot("Morning (6-9 AM)")}
                      className={`p-2.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        deliverySlot === "Morning (6-9 AM)"
                          ? "bg-[#2f4a1f] border-[#2f4a1f] text-white shadow-sm"
                          : "bg-white border-[#d4ddb9] text-stone-700 hover:bg-[#f0f4e2]"
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Morning 6–9 AM</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliverySlot("Evening (5-7 PM)")}
                      className={`p-2.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        deliverySlot === "Evening (5-7 PM)"
                          ? "bg-[#2f4a1f] border-[#2f4a1f] text-white shadow-sm"
                          : "bg-white border-[#d4ddb9] text-stone-700 hover:bg-[#f0f4e2]"
                      }`}
                    >
                      <Sunset className="w-4 h-4 text-orange-500" />
                      <span>Evening 5–7 PM</span>
                    </button>
                  </div>
                </div>

                {/* Step 3: Contact details */}
                <div className="space-y-2 pt-1">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder={t("Your Full Name *")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#d4ddb9] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        placeholder={t("Phone Number *")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#d4ddb9] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder={t("Area in Nashik")}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#d4ddb9] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2f4a1f]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#1f2b12] hover:bg-[#2a3818] text-[#cfe04a] font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? t("Submitting...") : t("Confirm Sample Request")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.075-1.33a9.97 9.97 0 004.937 1.33h.005c5.507 0 9.99-4.478 9.99-9.984a9.97 9.97 0 00-2.923-7.062A9.97 9.97 0 0012.012 2zm5.725 14.195c-.247.697-1.442 1.3-1.996 1.385-.503.078-1.157.143-3.328-.755-2.775-1.148-4.545-3.98-4.684-4.166-.138-.186-1.123-1.493-1.123-2.85 0-1.355.706-2.017.957-2.28.25-.262.553-.328.738-.328.184 0 .368.002.528.01.166.008.388-.063.606.464.225.545.767 1.866.833 2 .066.134.11.29.02.465-.09.18-.135.29-.27.447-.134.156-.285.347-.406.467-.135.132-.277.275-.12.545.158.27 1.01 1.666 2.164 2.69 1.488 1.32 2.733 1.728 3.12 1.884.388.156.613.13.842-.128.229-.26.974-1.135 1.236-1.52.261-.387.525-.325.882-.196.358.13 2.273 1.07 2.664 1.266.39.196.65.292.747.458.096.166.096.96-.151 1.657z" />
                    </svg>
                    <span>{t("WhatsApp Direct")}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
