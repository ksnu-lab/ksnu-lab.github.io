"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import projectsJson from "@/data/projects.json";

type Project = {
  id: string;
  title: { ko: string; en: string };
  funder: { ko: string; en: string };
  period: string;
  description: { ko: string; en: string };
};

const projects = projectsJson.projects as Project[];

function parseEndDate(period: string): Date {
  const endPart = period.split(" - ")[1]?.trim();
  if (!endPart) return new Date(9999, 11);
  const [yearStr, monthStr] = endPart.split(".");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  if (isNaN(year) || isNaN(month)) return new Date(9999, 11);
  return new Date(year, month - 1);
}

function getStatus(period: string): "ongoing" | "completed" {
  const endPart = period.split(" - ")[1]?.trim();
  if (!endPart) return "ongoing";
  const [yearStr, monthStr] = endPart.split(".");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  if (isNaN(year) || isNaN(month)) return "ongoing";
  const endDate = new Date(year, month, 0);
  return new Date() <= endDate ? "ongoing" : "completed";
}

export default function ProjectsPage() {
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");

  const projectsWithStatus = projects
    .map((p) => ({ ...p, status: getStatus(p.period) }))
    .sort((a, b) => parseEndDate(b.period).getTime() - parseEndDate(a.period).getTime());

  const filtered =
    filter === "all"
      ? projectsWithStatus
      : projectsWithStatus.filter((p) => p.status === filter);

  const filterTabs = [
    { key: "all" as const,       labelKo: "전체",    labelEn: "All" },
    { key: "ongoing" as const,   labelKo: "진행 중", labelEn: "Ongoing" },
    { key: "completed" as const, labelKo: "완료",    labelEn: "Completed" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Page header */}
      <div className="mb-10">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Research Projects
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "과제" : "Projects"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "연구실에서 수행 중이거나 완료된 연구 과제 목록입니다."
            : "A list of ongoing and completed research projects carried out by our lab."}
        </p>
      </div>

      {/* Pill filter */}
      <div className="flex gap-[2px] bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-[3px] w-fit mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-[5px] rounded-[7px] text-[12.5px] font-medium transition-all whitespace-nowrap ${
              filter === tab.key
                ? "bg-white dark:bg-white/[0.10] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {locale === "ko" ? tab.labelKo : tab.labelEn}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl p-6 hover:border-gray-300 dark:hover:border-white/[0.15] transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                {project.title[locale]}
              </h2>
              <span
                className={`shrink-0 text-[10px] font-bold px-2.5 py-[3px] rounded-md whitespace-nowrap ${
                  project.status === "ongoing"
                    ? "bg-emerald-50 dark:bg-[rgba(0,220,130,0.10)] text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-[rgba(0,220,130,0.20)]"
                    : "bg-gray-100 dark:bg-white/[0.05] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08]"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {t(`projects.${project.status}`)}
              </span>
            </div>
            <p className="text-[13.5px] text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              {project.description[locale]}
            </p>
            <div className="flex items-center gap-4 text-[12px] text-gray-400 dark:text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span>{project.funder[locale]}</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>{project.period}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[14px] text-gray-400 dark:text-gray-600 text-center py-16">
          {locale === "ko" ? "해당 과제가 없습니다." : "No projects found."}
        </p>
      )}
    </div>
  );
}
