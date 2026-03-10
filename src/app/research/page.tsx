"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import researchJson from "@/data/research.json";
import type { ResearchArea } from "@/types";

const researchAreas = researchJson.research as ResearchArea[];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ResearchPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-10">{t("research.title")}</h1>

      <div className="space-y-12">
        {researchAreas.map((area) => (
          <div
            key={area.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            <div className="md:col-span-1">
              {area.image && (
                <div className="rounded-xl aspect-video relative overflow-hidden">
                  <Image
                    src={area.image.startsWith("/") ? `${basePath}${area.image}` : area.image}
                    alt={area.title[locale]}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-3">
                {area.title[locale]}
              </h2>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-4">
                {area.description[locale]}
              </p>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                  {t("research.keywords")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-sm bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
