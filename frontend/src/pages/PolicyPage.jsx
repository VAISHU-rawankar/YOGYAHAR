import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSectionContent } from "../hooks/useSectionContent";
import { useLanguage } from "../context/LanguageContext";

function parseBody(body) {
  if (!body) return [];
  const lines = body.split("\n").filter((l) => l.trim() !== "");
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      blocks.push({ type: "ul", items: currentList });
      currentList = null;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("[TABLE]")) {
      flushList();
      try {
        blocks.push({ type: "table", rows: JSON.parse(line.slice(7)) });
      } catch {
        blocks.push({ type: "p", text: line });
      }
      return;
    }
    const boldMatch = line.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      flushList();
      blocks.push({ type: "subhead", text: boldMatch[1] });
      return;
    }
    if (line.startsWith("- ")) {
      if (!currentList) currentList = [];
      currentList.push(line.slice(2));
      return;
    }
    flushList();
    blocks.push({ type: "p", text: line });
  });
  flushList();
  return blocks;
}

function slugify(str, idx) {
  const base = (str || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `sec-${idx}-${base}`;
}

export default function PolicyPage({ sectionKey, defaultContent }) {
  const [{ title, legalEntity, website, effectiveDate, updatedOn, intro, sections, tagline, copyright }] =
    useSectionContent(sectionKey, defaultContent);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const introParas = (intro || "").split("\n\n").filter(Boolean);
  const sectionList = sections || [];

  return (
    <div className="text-[#2b2b1f] bg-[#fcfaef] min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />

      <section className="bg-gradient-to-b from-[#f5f8eb] via-[#fcfaef] to-[#f7f9ed] border-b border-[#e5ecd0] py-14 sm:py-20 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1f2b12] mb-4">
          {t(title)}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#6b6b5c] font-bold uppercase tracking-wider">
          {effectiveDate && (
            <span>{t("Effective Date")}: {effectiveDate}</span>
          )}
          {effectiveDate && updatedOn && <span className="text-[#c9d94a]">•</span>}
          {updatedOn && <span>{t("Last Updated")}: {updatedOn}</span>}
        </div>
        {legalEntity && (
          <p className="mt-2 text-xs text-[#8c8c7a]">
            {t("A brand operated by")} {legalEntity}
            {website ? ` · ${website}` : ""}
          </p>
        )}
      </section>

      <section className="flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#eef0e5] shadow-sm p-6 sm:p-10">
          {introParas.length > 0 && (
            <div className="mb-8 pb-8 border-b border-[#eef0e5] space-y-3">
              {introParas.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-[#4b553d] leading-relaxed">
                  {t(p)}
                </p>
              ))}
            </div>
          )}

          {sectionList.length > 6 && (
            <div className="mb-10 p-5 rounded-2xl bg-[#f7f9f0] border border-[#eef0e5]">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1f2b12] mb-3">
                {t("Table of Contents")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {sectionList.map((sec, i) => (
                  <a
                    key={i}
                    href={`#${slugify(sec.heading, i)}`}
                    className="text-xs sm:text-sm text-[#4a5f2e] hover:text-[#1f2b12] hover:underline leading-relaxed"
                  >
                    {i + 1}. {t(sec.heading)}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {sectionList.map((sec, i) => (
              <div key={i} id={slugify(sec.heading, i)} className="scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-bold text-[#1f2b12] mb-3 font-display">
                  {i + 1}. {t(sec.heading)}
                </h2>
                {parseBody(sec.body).map((block, bi) => {
                  if (block.type === "subhead") {
                    return (
                      <p key={bi} className="font-bold text-[#1f2b12] mt-4 mb-1.5 text-sm sm:text-base">
                        {t(block.text)}
                      </p>
                    );
                  }
                  if (block.type === "ul") {
                    return (
                      <ul key={bi} className="list-disc pl-5 space-y-1 mb-3 marker:text-[#8ac926]">
                        {block.items.map((item, ii) => (
                          <li key={ii} className="text-sm sm:text-base text-[#4b553d] leading-relaxed">
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "table") {
                    const [head, ...rows] = block.rows;
                    return (
                      <div key={bi} className="overflow-x-auto mb-4 rounded-xl border border-[#eef0e5]">
                        <table className="w-full text-sm text-left border-collapse">
                          {head && (
                            <thead className="bg-[#f5f8eb]">
                              <tr>
                                {head.map((h, hi) => (
                                  <th key={hi} className="px-4 py-2.5 font-bold text-[#1f2b12] border-b border-[#eef0e5]">
                                    {t(h)}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {rows.map((row, ri) => (
                              <tr key={ri} className={ri % 2 ? "bg-[#faf9f0]" : ""}>
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-4 py-2.5 text-[#4b553d] border-b border-[#f2f3ea] align-top">
                                    {t(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={bi} className="text-sm sm:text-base text-[#4b553d] leading-relaxed mb-3">
                      {t(block.text)}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>

          {(tagline || copyright) && (
            <div className="mt-10 pt-6 border-t border-[#eef0e5] text-center">
              {tagline && (
                <p className="text-sm font-bold text-[#1f2b12] mb-1">{t(tagline)}</p>
              )}
              {copyright && (
                <p className="text-xs text-[#8c8c7a]">{copyright}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
