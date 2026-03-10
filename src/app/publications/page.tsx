"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import publicationsJson from "@/data/publications.json";
import type { Publication } from "@/types";

const publications = publicationsJson.publications as Publication[];

type MainFilter = "papers" | "award" | "patent" | "other";
type SubFilter = "all" | "international" | "domestic";

const mainFilters: MainFilter[] = ["papers", "award", "patent", "other"];
const subFilters: SubFilter[] = ["all", "international", "domestic"];

export default function PublicationsPage() {
  const { t } = useTranslation();
  const [mainFilter, setMainFilter] = useState<MainFilter>("papers");
  const [subFilter, setSubFilter] = useState<SubFilter>("all");

  const filtered = publications.filter((p) => {
    if (mainFilter === "papers") {
      if (subFilter === "all") return p.type === "international" || p.type === "domestic";
      return p.type === subFilter;
    }
    return p.type === mainFilter;
  });

  const years = [...new Set(filtered.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-6">{t("publications.title")}</h1>

      {/* Main Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {mainFilters.map((type) => (
          <button
            key={type}
            onClick={() => {
              setMainFilter(type);
              setSubFilter("all");
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              mainFilter === type
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t(`publications.${type}`)}
          </button>
        ))}
      </div>

      {/* Sub Filter (only for papers) */}
      {mainFilter === "papers" && (
        <div className="flex flex-wrap gap-2 mb-10 pl-1">
          {subFilters.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubFilter(sub)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                subFilter === sub
                  ? "bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t(`publications.${sub}`)}
            </button>
          ))}
        </div>
      )}

      {/* Publications by year */}
      <div className={`space-y-10 ${mainFilter !== "papers" ? "mt-10" : ""}`}>
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {year}
            </h2>
            <div className="space-y-4">
              {filtered
                .filter((p) => p.year === year)
                .map((pub) => (
                  <div
                    key={pub.id}
                    className="pl-4 pr-3 py-1 border-l-2 border-gray-200 dark:border-gray-700 rounded-r-md hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-primary-400 dark:hover:border-primary-500 transition-all"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{pub.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                      {pub.authors.join(", ")}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1.5">
                      {pub.venue}, {pub.year}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-600 text-center py-12">
          No publications in this category.
        </p>
      )}
    </div>
  );
}
