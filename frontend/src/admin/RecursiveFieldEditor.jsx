import ImageField from "./ImageField";
import VideoField from "./VideoField";

const IMAGE_FIELD_PATTERN = /(image|img|photo|picture|bg|logo|src)/i;
const VIDEO_FIELD_PATTERN = /video/i;
const ACTIVE_FIELD_PATTERN = /^(active|isactive|status)$/i;
const STOCK_FIELD_PATTERN = /^(instock|isstock|stock|stockstatus)$/i;

function formatLabel(str) {
  if (!str) return "";
  let spaced = str.replace(/([A-Z])/g, " $1");
  spaced = spaced.replace(/[_-]/g, " ");
  return spaced.trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

function blankLike(value) {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blankLike(v)]));
  }
  return "";
}

export default function RecursiveFieldEditor({ label, value, onChange, sectionKey }) {
  const displayLabel = formatLabel(label);

  // Special Video Editor
  if (typeof value === "string" && label && VIDEO_FIELD_PATTERN.test(label)) {
    return <VideoField label={displayLabel} value={value} onChange={onChange} />;
  }

  // Special Image Editor
  if (typeof value === "string" && label && IMAGE_FIELD_PATTERN.test(label)) {
    return <ImageField label={displayLabel} value={value} onChange={onChange} />;
  }

  // Active / Inactive Button Control - ONLY for products section
  if (sectionKey === "products" && label && ACTIVE_FIELD_PATTERN.test(label)) {
    const isActive =
      value === true ||
      value === "Active" ||
      value === "active" ||
      value === "1" ||
      value === 1;

    return (
      <div className="flex flex-col gap-2 mb-5 text-left">
        <span className="text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">
          STATUS
        </span>
        <div className="inline-flex rounded-[18px] p-1.5 bg-[#eee5d3] border border-[#e2d6c0] w-fit gap-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => onChange(typeof value === "boolean" ? true : "Active")}
            className={`px-5 py-2 rounded-[12px] text-xs font-extrabold transition-all flex items-center gap-2 ${
              isActive
                ? "bg-[#253f19] text-white shadow-md scale-[1.02]"
                : "text-[#665e4e] hover:text-[#253f19]"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#8ce91c] shadow-sm"></span>
            Active
          </button>
          <button
            type="button"
            onClick={() => onChange(typeof value === "boolean" ? false : "Inactive")}
            className={`px-5 py-2 rounded-[12px] text-xs font-extrabold transition-all flex items-center gap-2 ${
              !isActive
                ? "bg-[#6e2438] text-white shadow-md scale-[1.02]"
                : "text-[#665e4e] hover:text-[#6e2438]"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff7315] shadow-sm"></span>
            Inactive
          </button>
        </div>
      </div>
    );
  }

  // In Stock / Out of Stock Button Control - ONLY for products section
  if (sectionKey === "products" && label && STOCK_FIELD_PATTERN.test(label)) {
    const isInStock =
      value === true ||
      value === "In Stock" ||
      value === "instock" ||
      value === "1" ||
      value === 1;

    return (
      <div className="flex flex-col gap-2 mb-5 text-left">
        <span className="text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">
          STOCK STATUS
        </span>
        <div className="inline-flex rounded-[18px] p-1.5 bg-[#eee5d3] border border-[#e2d6c0] w-fit gap-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => onChange(typeof value === "boolean" ? true : "In Stock")}
            className={`px-5 py-2 rounded-[12px] text-xs font-extrabold transition-all flex items-center gap-2 ${
              isInStock
                ? "bg-[#253f19] text-white shadow-md scale-[1.02]"
                : "text-[#665e4e] hover:text-[#253f19]"
            }`}
          >
            <span>📦</span>
            In Stock
          </button>
          <button
            type="button"
            onClick={() => onChange(typeof value === "boolean" ? false : "Out of Stock")}
            className={`px-5 py-2 rounded-[12px] text-xs font-extrabold transition-all flex items-center gap-2 ${
              !isInStock
                ? "bg-[#6e2438] text-white shadow-md scale-[1.02]"
                : "text-[#665e4e] hover:text-[#6e2438]"
            }`}
          >
            <span>🚫</span>
            Out of Stock
          </button>
        </div>
      </div>
    );
  }

  // Diet Goal Filter Control in CMS
  if (label && /dietgoal/i.test(label)) {
    const goals = ["Weight Loss", "Detox", "Muscle Gain", "General Health"];
    const currentVal = value || "";
    return (
      <div className="flex flex-col gap-2 mb-5 text-left">
        <span className="text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">
          DIET GOAL (PRODUCT FILTER CATEGORY)
        </span>
        <div className="flex flex-wrap gap-2 mb-1">
          {goals.map((g) => {
            const isSelected = currentVal.toLowerCase().includes(g.toLowerCase());
            return (
              <button
                key={g}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    const newArr = currentVal
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s.toLowerCase() !== g.toLowerCase());
                    onChange(newArr.join(", "));
                  } else {
                    const existing = currentVal
                      ? currentVal.split(",").map((s) => s.trim())
                      : [];
                    existing.push(g);
                    onChange(existing.join(", "));
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#253f19] text-white shadow-sm"
                    : "bg-[#eee5d3] text-[#4a4235] hover:bg-[#e0d6c0]"
                }`}
              >
                {isSelected ? "✓ " : "+ "} {g}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Weight Loss, Detox"
          className="rounded-xl border border-[#e6dcc8] bg-white px-4.5 py-2.5 text-xs text-[#2b2b1f] outline-none focus:border-[#2f4a1f]"
        />
      </div>
    );
  }

  // Delivery Slots Control in CMS
  if (label && /deliveryslot/i.test(label)) {
    const slots = [
      { id: "Morning", label: "Morning (6-9 AM)" },
      { id: "Evening", label: "Evening (5-7 PM)" },
      { id: "Both", label: "Both Slots" },
    ];
    return (
      <div className="flex flex-col gap-2 mb-5 text-left">
        <span className="text-[11px] font-extrabold text-[#2f4a1f] uppercase tracking-wider">
          DELIVERY SLOT (PRODUCT FILTER CATEGORY)
        </span>
        <div className="inline-flex rounded-[18px] p-1.5 bg-[#eee5d3] border border-[#e2d6c0] w-fit gap-1.5 shadow-inner">
          {slots.map((s) => {
            const isSelected =
              (value || "Both").toLowerCase() === s.id.toLowerCase();
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange(s.id)}
                className={`px-4 py-2 rounded-[12px] text-xs font-extrabold transition-all ${
                  isSelected
                    ? "bg-[#253f19] text-white shadow-md scale-[1.02]"
                    : "text-[#665e4e] hover:text-[#253f19]"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (typeof value === "string") {
    const isLong = value.length > 60;
    return (
      <label className="flex flex-col gap-1.5 mb-4 text-left">
        {label && <span className="text-xs font-semibold text-[#2f4a1f] uppercase tracking-wider">{displayLabel}</span>}
        {isLong ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="rounded-xl border border-[#e6dcc8] bg-white px-4 py-3 text-sm text-[#2b2b1f] placeholder-[#a69d85] outline-none focus:border-[#2f4a1f] focus:ring-1 focus:ring-[#2f4a1f] transition-all shadow-sm"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-xl border border-[#e6dcc8] bg-white px-4 py-3 text-sm text-[#2b2b1f] placeholder-[#a69d85] outline-none focus:border-[#2f4a1f] focus:ring-1 focus:ring-[#2f4a1f] transition-all shadow-sm"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="flex flex-col gap-1.5 mb-4 text-left">
        {label && <span className="text-xs font-semibold text-[#2f4a1f] uppercase tracking-wider">{displayLabel}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="rounded-xl border border-[#e6dcc8] bg-white px-4 py-3 text-sm text-[#2b2b1f] outline-none focus:border-[#2f4a1f] focus:ring-1 focus:ring-[#2f4a1f] transition-all shadow-sm w-full max-w-xs"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 mb-4 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-[#e6dcc8] text-[#2f4a1f] focus:ring-[#2f4a1f] h-4.5 w-4.5 cursor-pointer"
        />
        {label && <span className="text-xs font-semibold text-[#2f4a1f] uppercase tracking-wider">{displayLabel}</span>}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="mb-8">
        {label && (
          <span className="text-xs font-extrabold text-[#2f4a1f] block mb-4 border-b border-[#eef4e2]/60 pb-1.5 uppercase tracking-widest">
            {displayLabel}
          </span>
        )}
        <div className="flex flex-col gap-5 border-l-2 border-dashed border-[#dcecc4] pl-5">
          {value.map((item, idx) => (
            <div key={idx} className="bg-[#fcfaef] rounded-2xl p-6 border border-[#eef0e5] relative hover:shadow-md hover:border-[#cfe04a]/40 transition-all duration-300">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#a69d85] uppercase tracking-wider bg-stone-100 px-2 py-1 rounded">Item {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== idx))}
                  className="text-[10px] font-extrabold text-white hover:text-white bg-[#6e2438] hover:bg-[#b03554] px-3 py-1 rounded-full transition-all shadow-sm"
                >
                  Remove
                </button>
              </div>
              <div className="pt-6">
                <RecursiveFieldEditor
                  label=""
                  value={item}
                  sectionKey={sectionKey}
                  onChange={(next) => {
                    const copy = value.slice();
                    copy[idx] = next;
                    onChange(copy);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              const blank = value.length ? blankLike(value[value.length - 1]) : "";
              const next =
                sectionKey === "testimonials" && label === "testimonials" && blank && typeof blank === "object"
                  ? { ...blank, ...("isVideo" in blank ? { isVideo: false } : {}) }
                  : blank;
              onChange([...value, next]);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2f4a1f] hover:text-[#4a6b2a] bg-[#eef4e2] hover:bg-[#dcecc4] px-5 py-3 rounded-full border border-[#dcecc4] transition-all shadow-sm"
          >
            <span>+ Add {displayLabel ? displayLabel.replace(/s$/, '') : 'Item'}</span>
          </button>
          {sectionKey === "testimonials" && label === "testimonials" && (
            <button
              type="button"
              onClick={() =>
                onChange([
                  ...value,
                  {
                    ...(value.length ? blankLike(value[value.length - 1]) : { name: "", role: "", text: "", image: "" }),
                    videoUrl: "",
                    isVideo: true,
                  },
                ])
              }
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#2f4a1f] hover:bg-[#4a6b2a] px-5 py-3 rounded-full border border-[#2f4a1f] transition-all shadow-sm"
            >
              <span>🎬 + Add Video Testimonial</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const isRootOrComponent = label === undefined;
    const hasImageField = Object.keys(value).some((k) => IMAGE_FIELD_PATTERN.test(k));
    const hasVideoField = Object.keys(value).some((k) => VIDEO_FIELD_PATTERN.test(k));

    return (
      <div className={isRootOrComponent ? "" : "mb-6"}>
        {(label || label === "") && (
          <div className="flex flex-wrap justify-between items-center mb-3 gap-2 pb-1 border-b border-[#f5f5f0]">
            {displayLabel && (
              <span className="text-xs font-extrabold text-[#2f4a1f] uppercase tracking-widest">
                {displayLabel}
              </span>
            )}
            <div className="flex items-center gap-2 ml-auto">
              {!hasImageField && !Array.isArray(value) && (
                <button
                  type="button"
                  onClick={() => onChange({ ...value, image: "" })}
                  className="text-[10px] font-bold text-[#2f4a1f] hover:text-[#4a6b2a] bg-[#eef4e2] hover:bg-[#dcecc4] px-2.5 py-1 rounded-full border border-[#dcecc4] transition-all"
                >
                  + Add Image
                </button>
              )}
              {sectionKey === "testimonials" && !hasVideoField && !Array.isArray(value) && (
                <button
                  type="button"
                  onClick={() => onChange({ ...value, videoUrl: "", isVideo: true })}
                  className="text-[10px] font-bold text-[#2f4a1f] hover:text-[#4a6b2a] bg-[#eef4e2] hover:bg-[#dcecc4] px-2.5 py-1 rounded-full border border-[#dcecc4] transition-all"
                >
                  + Add Video
                </button>
              )}
            </div>
          </div>
        )}
        <div className={isRootOrComponent ? "flex flex-col gap-4" : "flex flex-col gap-4 border-l-2 border-dashed border-[#e6eecd] pl-5"}>
          {Object.entries(value).map(([key, val]) => (
            <RecursiveFieldEditor
              key={key}
              label={key}
              value={val}
              sectionKey={sectionKey}
              onChange={(next) => onChange({ ...value, [key]: next })}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
