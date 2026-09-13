import { useState } from "react";
import { api, resolveImage } from "../lib/apiClient";

export default function VideoField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await api.upload("/api/upload", file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const previewSrc = resolveImage(value);

  return (
    <div className="flex flex-col gap-2 mb-5 text-left">
      {label && <span className="text-xs font-bold text-[#2f4a1f] uppercase tracking-wider">{label}</span>}

      <div className="flex items-start gap-4 p-4 rounded-xl border border-[#eee3cf] bg-[#fbf3e7]/30 max-w-lg">
        {previewSrc ? (
          <div className="relative group w-28 aspect-[4/5] rounded-lg overflow-hidden border border-[#e6dcc8] shadow-sm bg-black shrink-0">
            <video src={previewSrc} className="w-full h-full object-cover" muted playsInline controls />
          </div>
        ) : (
          <div className="w-28 aspect-[4/5] rounded-lg border border-dashed border-[#e6dcc8] bg-white flex flex-col items-center justify-center text-[#a69d85] shrink-0">
            <span className="text-2xl mb-1">🎬</span>
            <span className="text-[10px]">No Video</span>
          </div>
        )}

        <div className="flex flex-col justify-center h-full self-center gap-2">
          <div className="flex items-center gap-2.5">
            <label className="cursor-pointer text-xs font-bold text-white bg-[#2f4a1f] hover:bg-[#4a6b2a] rounded-full px-4.5 py-2.5 transition-all shadow-sm">
              {uploading ? "Uploading..." : previewSrc ? "Replace Video" : "Upload Video"}
              <input type="file" accept="video/*" className="hidden" onChange={handleFile} disabled={uploading} />
            </label>
            {previewSrc && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs font-bold text-[#6e2438] hover:text-[#b03554] bg-white hover:bg-[#fbf3e7] border border-[#eee3cf] px-3.5 py-2.5 rounded-full transition-all"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#6b6b5c]">Supports MP4, WEBM, MOV — 4:5 ratio recommended</p>
        </div>
      </div>

      {error && <span className="text-xs font-semibold text-[#6e2438] mt-1">{error}</span>}
    </div>
  );
}
