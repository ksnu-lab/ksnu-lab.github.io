"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import roadmapJson from "@/data/roadmap.json";
import type { RoadmapCategory } from "@/types";

const categories = roadmapJson.categories as RoadmapCategory[];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RoadmapPage() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-3">{t("roadmap.title")}</h1>
      <p className="text-gray-700 dark:text-gray-400 mb-8 text-lg">
        {t("roadmap.subtitle")}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-10 border-b border-gray-200 dark:border-gray-700">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === cat.id
                ? "border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400"
                : "border-transparent text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            {cat.title[locale]}
          </button>
        ))}
      </div>

      {/* Active category content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeCategory.techniques.map((tech) => (
          <div
            key={tech.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:shadow-md transition-all"
          >
            {/* SVG + 이름 */}
            <div className="flex items-center gap-4 p-4 pb-2">
              <img
                src={`${basePath}${tech.image}`}
                alt={tech.name[locale]}
                className="w-20 h-20 shrink-0 object-contain"
              />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {tech.name[locale]}
              </h3>
            </div>
            {/* 설명 */}
            <p className="px-4 pb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tech.description[locale]}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="text-center py-10 mt-8">
        <p className="text-gray-700 dark:text-gray-400 mb-4">
          {locale === "ko"
            ? "보안 분야에 관심이 있으신가요?"
            : "Interested in security research?"}
        </p>
        <Link
          href={`${basePath}/contact/`}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {locale === "ko" ? "연구실 지원하기" : "Join Our Lab"} &rarr;
        </Link>
      </section>
    </div>
  );
}
