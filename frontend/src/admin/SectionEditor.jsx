import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/apiClient";
import RecursiveFieldEditor from "./RecursiveFieldEditor";

function ensureStatuses(sectionKey, obj) {
  if (!obj || typeof obj !== "object") return obj;

  const copy = Array.isArray(obj) ? [...obj] : { ...obj };

  // Ensure root section object has status
  if (!Array.isArray(copy) && copy.status === undefined) {
    copy.status = "Active";
  }

  // Ensure array items on any page have status and stockStatus where applicable
  Object.keys(copy).forEach((k) => {
    if (Array.isArray(copy[k])) {
      copy[k] = copy[k].map((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const itemCopy = { ...item };
          if (itemCopy.status === undefined) {
            itemCopy.status = "Active";
          }
          if (
            (sectionKey === "products" ||
              k === "juices" ||
              k === "salads" ||
              k === "nonSubItems" ||
              k === "detox")
          ) {
            if (itemCopy.dietGoal === undefined) {
              itemCopy.dietGoal = "General Health, Detox";
            }
            if (itemCopy.deliverySlots === undefined) {
              itemCopy.deliverySlots = "Both";
            }
          }
          return itemCopy;
        }
        return item;
      });
    }
  });

  return copy;
}

export default function SectionEditor() {
  const { key } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | saving | saved | error
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");
    window.scrollTo({ top: 0, behavior: "instant" });
    api
      .get(`/api/sections/${key}`)
      .then((section) => {
        const processed = ensureStatuses(key, section.data || {});
        setData(processed);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [key]);

  const handleSave = async () => {
    setStatus("saving");
    setError("");
    try {
      await api.put(`/api/sections/${key}`, { data });
      setStatus("saved");
      setTimeout(() => setStatus("ready"), 3000); // revert to ready after 3s
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const getSectionTitle = (k) => {
    if (!k) return "";
    return k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto text-[#2b2b1f]">
      {/* Section Header */}
      <header className="bg-white rounded-3xl border border-[#eee3cf] px-8 py-6 mb-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
        <div>
          <div className="text-xl font-bold tracking-tight text-[#2f4a1f] font-display">
            Editing: {getSectionTitle(key)}
          </div>
          <p className="text-xs text-[#6b6b5c] mt-0.5">Modify fields and press save to update the live website</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {status === "saved" && (
            <span className="text-xs font-bold text-[#2f4a1f] bg-[#eef4e2] px-3.5 py-2.5 rounded-full border border-[#dcecc4] animate-pulse">
              ✓ Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={status === "saving" || status === "loading"}
            className="rounded-full bg-[#f0b429] hover:bg-[#d99e1f] disabled:opacity-60 px-6 py-3 text-xs font-bold text-[#2b2b1f] transition-all shadow-sm flex items-center gap-2"
          >
            {status === "saving" ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#2b2b1f] border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </header>

      {status === "loading" && (
        <div className="bg-white rounded-3xl border border-[#eee3cf] p-12 text-center shadow-sm">
          <div className="inline-block w-8 h-8 border-3 border-[#2f4a1f] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-semibold text-[#6b6b5c]">Fetching section content...</p>
        </div>
      )}

      {error && (
        <div className="bg-[#fcf1f3] border border-[#f5d6dc] rounded-2xl p-4 text-left mb-6 text-sm text-[#6e2438] font-semibold">
          ⚠️ Error: {error}
        </div>
      )}

      {data && (
        <div className="bg-white rounded-3xl border border-[#eee3cf] p-8 shadow-sm text-left flex flex-col min-h-[calc(100vh-12rem)]">
          <div className="flex-grow">
            <RecursiveFieldEditor value={data} onChange={setData} sectionKey={key} />
          </div>
        </div>
      )}
    </div>
  );
}
