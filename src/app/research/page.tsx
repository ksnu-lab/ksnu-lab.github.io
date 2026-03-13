"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import researchJson from "@/data/research.json";
import type { ResearchArea } from "@/types";

const researchAreas = researchJson.research as ResearchArea[];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ResearchPage() {
  const { locale } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Page header */}
      <div className="mb-12">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Research Areas
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "연구 분야" : "Research"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "암호, 인공지능 보안, 시스템 보안, 네트워크 보안, 하드웨어 보안 등 다양한 분야를 연구합니다."
            : "We conduct research in cryptography, AI security, system security, network security, and hardware security."}
        </p>
      </div>

      {/* Research area cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {researchAreas.map((area, index) => (
          <div
            key={area.id}
            className="group flex flex-col bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Image */}
            {area.image && (
              <div className="aspect-[16/7] bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.06] overflow-hidden shrink-0">
                <Image
                  src={area.image.startsWith("/") ? `${basePath}${area.image}` : area.image}
                  alt={area.title[locale]}
                  width={640}
                  height={280}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  unoptimized
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              {/* Number + Title */}
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="text-[11px] text-primary-500 dark:text-primary-400 shrink-0 tabular-nums"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug">
                  {area.title[locale]}
                </h2>
              </div>

              {/* Description */}
              <p className="text-[13.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                {area.description[locale]}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5">
                {area.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[11.5px] bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md border border-gray-200 dark:border-white/[0.07]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
