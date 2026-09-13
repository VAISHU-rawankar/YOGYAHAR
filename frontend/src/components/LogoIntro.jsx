import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Safety net: if the video is slow to load or fails, don't block the site forever.
const MAX_INTRO_MS = 9000;

export default function LogoIntro({ onDone }) {
  const [phase, setPhase] = useState("playing"); // playing | exit
  const [show, setShow] = useState(true);
  const finishedRef = useRef(false);
  const fallbackTimerRef = useRef(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearTimeout(fallbackTimerRef.current);
    setPhase("exit");
    onDone?.();
    setTimeout(() => setShow(false), 500);
  }, [onDone]);

  const handleVideoRef = useCallback((el) => {
    if (el && !fallbackTimerRef.current) {
      fallbackTimerRef.current = setTimeout(finish, MAX_INTRO_MS);
    }
  }, [finish]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#ffffff",
            pointerEvents: "all",
          }}
        >
          <video
            ref={handleVideoRef}
            src="/intro-logo.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finish}
            onError={finish}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="splash-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#ffffff",
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
