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
  if (!endPart) return new Date(9999, 11); // no end = ongoing, sort first
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
    .map((p) => ({
      ...p,
      status: getStatus(p.period),
    }))
    .sort((a, b) => parseEndDate(b.period).getTime() - parseEndDate(a.period).getTime());

  const filtered =
    filter === "all"
      ? projectsWithStatus
      : projectsWithStatus.filter((p) => p.status === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-6">{t("projects.title")}</h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {(["all", "ongoing", "completed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {s === "all"
              ? locale === "ko" ? "전체" : "All"
              : t(`projects.${s}`)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-primary-300 dark:hover:border-primary-600 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {project.title[locale]}
              </h2>
              <span
                className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                  project.status === "ongoing"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {t(`projects.${project.status}`)}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
              {project.description[locale]}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>{project.funder[locale]}</span>
              <span>{project.period}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-600 text-center py-12">
          {locale === "ko" ? "해당 과제가 없습니다." : "No projects found."}
        </p>
      )}
    </div>
  );
}
