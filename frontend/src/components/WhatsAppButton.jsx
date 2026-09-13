import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "917499643234";
const WA_MESSAGE = "Hello Yogyahar! I'd like to know more about your products and services.";

export default function WhatsAppButton() {
  const [showLabel, setShowLabel] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show button after slight delay for polish
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-show label after 3s to draw attention, then hide
  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setShowLabel(true), 2000);
    const t2 = setTimeout(() => setShowLabel(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed z-50 flex items-center gap-3"
          style={{ bottom: "96px", right: "24px" }}
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {showLabel && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-[#128C7E] text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-[#128C7E]/10 whitespace-nowrap select-none"
              >
                💬 Chat on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: "#25D366" }}
            />
            {/* WA Icon SVG */}
            <svg
              viewBox="0 0 32 32"
              className="w-8 h-8 relative z-10"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.463.655 4.772 1.797 6.773L2 30l7.43-1.748A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 01-5.88-1.607l-.42-.25-4.41 1.037.996-4.3-.274-.44A11.56 11.56 0 014.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6z"/>
              <path d="M22.003 19.09c-.328-.164-1.94-.957-2.24-1.066-.3-.11-.518-.164-.737.164-.218.328-.847 1.066-.037 1.285.219.22.437.219.656.328 2.185 1.066 4.588 3.062 6.063 4.69.219.24.437.438.437.657 0 .383-.328.711-.656.711s-.656-.164-.875-.493c-1.12-1.422-2.786-2.625-4.47-3.5-.22-.109-.438-.109-.656-.109-.438 0-.876.164-1.094.492l-1.04 1.477c-.218.328-.655.438-.984.22-3.39-1.697-5.687-4.965-5.796-5.184-.109-.219 0-.547.218-.766.218-.219.492-.547.71-.766.22-.218.22-.547.11-.765l-1.203-2.953c-.11-.22-.328-.328-.547-.328-.328 0-.656.109-.875.328-.218.218-1.202 1.148-1.202 2.843 0 1.696 1.202 3.281 1.421 3.5.218.219 2.405 3.5 5.906 4.895 3.5 1.422 3.5.93 4.156.875.656-.055 1.969-.82 2.296-1.586.328-.766.328-1.422.22-1.586-.11-.164-.328-.22-.547-.328z"/>
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
