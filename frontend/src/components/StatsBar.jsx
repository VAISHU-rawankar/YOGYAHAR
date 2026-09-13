import { useState, useEffect, useRef } from "react";
import { useSectionContent } from "../hooks/useSectionContent";
import { Smile, Leaf, Truck, Users } from "lucide-react";

const defaultContent = {
  stats: [
    { icon: "😊", number: "1400+", label: "Registered Happy Customers" },
    { icon: "🥗", number: "100+", label: "Salads and Juices" },
    { icon: "🛵", number: "180+", label: "Km of Daily Doorstep Delivery" },
    { icon: "🤝", number: "50+", label: "Direct-Indirect Employment" },
  ],
};

const iconMap = {
  "😊": Smile,
  "🥗": Leaf,
  "🛵": Truck,
  "🤝": Users,
};

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  const stringValue = String(value || "");
  const matches = stringValue.match(/^(\d+)(.*)$/);
  const target = matches ? parseInt(matches[1], 10) : 0;
  const suffix = matches ? matches[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 4500; // 4.5 seconds
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            const currentCount = Math.floor(easeProgress * target);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const [{ stats }] = useSectionContent("statsBar", defaultContent);

  return (
    <section className="bg-[#561a2c] border-y border-white/10 py-5 md:py-7">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
        {stats.map((s, idx) => {
          let IconComponent = iconMap[s.icon];
          if (!IconComponent) {
            const fallbacks = [Smile, Leaf, Truck, Users];
            IconComponent = fallbacks[idx % 4];
          }

          return (
            <div
              key={s.label}
              className="flex flex-col items-center text-center px-4 md:px-6"
            >
              <IconComponent className="w-8 h-8 text-[#eee3cf] mb-3" strokeWidth={1.5} />
              <span className="text-3xl md:text-[38px] font-extrabold text-white font-sans tracking-tight leading-none">
                <AnimatedNumber value={s.number} />
              </span>
              <span className="text-[13px] font-semibold text-[#eee3cf]/80 tracking-wide uppercase mt-3 max-w-[180px] leading-relaxed">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

