"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import papersJson from "@/data/papers.json";
import awardsJson from "@/data/awards.json";
import patentsJson from "@/data/patents.json";
import othersJson from "@/data/others.json";
import type { Publication } from "@/types";

const papers = papersJson.papers as Publication[];
const awards = awardsJson.awards as Omit<Publication, "type">[];
const patents = patentsJson.patents as Omit<Publication, "type">[];
const others = othersJson.others as Omit<Publication, "type">[];

type MainFilter = "papers" | "award" | "patent" | "other";
type SubFilter = "all" | "international" | "domestic";

const mainFilters: MainFilter[] = ["papers", "award", "patent", "other"];
const subFilters: SubFilter[] = ["all", "international", "domestic"];

const typeBadge: Record<string, string> = {
  international: "bg-cyan-50 dark:bg-[rgba(0,220,130,0.10)] text-cyan-700 dark:text-emerald-400 border border-cyan-200 dark:border-[rgba(0,220,130,0.20)]",
  domestic:      "bg-amber-50 dark:bg-[rgba(255,214,10,0.10)] text-amber-600 dark:text-yellow-400 border border-amber-200 dark:border-[rgba(255,214,10,0.20)]",
};

export default function PublicationsPage() {
  const { t, locale } = useTranslation();
  const [mainFilter, setMainFilter] = useState<MainFilter>("papers");
  const [subFilter, setSubFilter] = useState<SubFilter>("all");

  const getItems = () => {
    if (mainFilter === "papers") {
      if (subFilter === "all") return papers;
      return papers.filter((p) => p.type === subFilter);
    }
    if (mainFilter === "award") return awards;
    if (mainFilter === "patent") return patents;
    return others;
  };

  const filtered = getItems();
  const years = [...new Set(filtered.map((p) => p.year))].sort((a, b) => b - a);

  const mainLabels: Record<MainFilter, { ko: string; en: string }> = {
    papers: { ko: "논문", en: "Papers" },
    award:  { ko: "수상", en: "Awards" },
    patent: { ko: "특허", en: "Patents" },
    other:  { ko: "기타", en: "Others" },
  };
  const subLabels: Record<SubFilter, { ko: string; en: string }> = {
    all:           { ko: "전체",     en: "All" },
    international: { ko: "국제논문", en: "International" },
    domestic:      { ko: "국내논문", en: "Domestic" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Page header */}
      <div className="mb-10">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Publications
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "연구 성과" : "Research Output"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "논문, 특허, 수상 등 연구실의 주요 성과물을 확인하세요."
            : "Browse our lab's papers, patents, awards, and other research output."}
        </p>
      </div>

      {/* Main filter — pill style */}
      <div className="flex gap-[2px] bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-[3px] w-fit mb-4">
        {mainFilters.map((type) => (
          <button
            key={type}
            onClick={() => { setMainFilter(type); setSubFilter("all"); }}
            className={`px-4 py-[5px] rounded-[7px] text-[12.5px] font-medium transition-all whitespace-nowrap ${
              mainFilter === type
                ? "bg-white dark:bg-white/[0.10] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {locale === "ko" ? mainLabels[type].ko : mainLabels[type].en}
          </button>
        ))}
      </div>

      {/* Sub filter — only for papers */}
      {mainFilter === "papers" && (
        <div className="flex gap-[2px] bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-[3px] w-fit mb-10">
          {subFilters.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubFilter(sub)}
              className={`px-3 py-[5px] rounded-[7px] text-[12px] font-medium transition-all whitespace-nowrap ${
                subFilter === sub
                  ? "bg-white dark:bg-white/[0.10] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {locale === "ko" ? subLabels[sub].ko : subLabels[sub].en}
            </button>
          ))}
        </div>
      )}

      {/* Publications by year */}
      <div className={`space-y-10 ${mainFilter !== "papers" ? "mt-10" : ""}`}>
        {years.map((year) => (
          <div key={year}>
            <h2
              className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 dark:border-white/[0.06]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {year}
            </h2>
            <table className="w-full border-collapse">
              <tbody>
                {filtered
                  .filter((p) => p.year === year)
                  .map((pub) => (
                    <tr
                      key={pub.id}
                      className="border-b border-gray-100 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Type badge — only for papers */}
                      {mainFilter === "papers" && (
                        <td className="py-4 pr-3 align-top w-[72px]">
                          {"type" in pub && pub.type && (
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-[3px] rounded-md whitespace-nowrap ${typeBadge[pub.type as string] ?? ""}`}
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {pub.type === "international"
                                ? (locale === "ko" ? "국제" : "INTL")
                                : (locale === "ko" ? "국내" : "DOM")}
                            </span>
                          )}
                        </td>
                      )}
                      <td className="py-4 align-top">
                        <div className="text-[13.5px] font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1">
                          {pub.title}
                        </div>
                        {pub.authors && (
                          <div className="text-[12px] text-gray-500 dark:text-gray-400 mb-0.5">{pub.authors}</div>
                        )}
                        <div className="text-[12px] text-primary-600 dark:text-primary-400 font-medium">
                          {pub.venue}
                          {pub.year && `, ${pub.year}`}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[14px] text-gray-400 dark:text-gray-600 text-center py-16">
          {locale === "ko" ? "해당 항목이 없습니다." : "No items in this category."}
        </p>
      )}
    </div>
  );
}
