"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import type { NewsPost } from "@/types";

const categoryMeta: Record<
  string,
  { labelKo: string; labelEn: string; badge: string }
> = {
  announcement: {
    labelKo: "공지",
    labelEn: "Notice",
    badge:
      "bg-red-50 dark:bg-[rgba(255,77,109,0.10)] text-red-700 dark:text-red-400 border border-red-200 dark:border-[rgba(255,77,109,0.20)]",
  },
  research: {
    labelKo: "연구내용",
    labelEn: "Research",
    badge:
      "bg-blue-50 dark:bg-[rgba(0,220,130,0.10)] text-blue-700 dark:text-emerald-400 border border-blue-200 dark:border-[rgba(0,220,130,0.20)]",
  },
  seminar: {
    labelKo: "세미나",
    labelEn: "Seminar",
    badge:
      "bg-purple-50 dark:bg-[rgba(139,92,246,0.10)] text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-[rgba(139,92,246,0.20)]",
  },
  general: {
    labelKo: "일반",
    labelEn: "General",
    badge:
      "bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08]",
  },
};

const ALL = "all";

export default function NewsListClient({ posts }: { posts: NewsPost[] }) {
  const { locale } = useTranslation();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const [activeTab, setActiveTab] = useState(ALL);
  const [search, setSearch] = useState("");

  const tabs = [
    { id: ALL,              labelKo: "전체",     labelEn: "All" },
    { id: "announcement",   labelKo: "공지",     labelEn: "Notice" },
    { id: "research",       labelKo: "연구내용", labelEn: "Research" },
    { id: "seminar",        labelKo: "세미나",   labelEn: "Seminar" },
    { id: "general",        labelKo: "일반",     labelEn: "General" },
  ];

  const filtered = posts.filter((p) => {
    const matchTab = activeTab === ALL || p.category === activeTab;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.title[locale].toLowerCase().includes(q) ||
      (p.summary?.[locale] ?? "").toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  function thumbSrc(url: string) {
    return url.startsWith("/") ? `${basePath}${url}` : url;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Header */}
      <div className="mb-10">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Lab News
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "연구실 소식" : "Lab News"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "연구실의 최신 소식, 논문 발표, 수상 내역, 행사 정보를 확인하세요."
            : "Stay updated with the latest news, publications, awards, and events from our lab."}
        </p>
      </div>

      {/* Controls: tabs + search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div className="flex gap-[2px] flex-wrap bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-[3px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-[5px] rounded-[7px] text-[12.5px] font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-white/[0.10] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {locale === "ko" ? tab.labelKo : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "ko" ? "검색..." : "Search..."}
            className="pl-9 pr-4 py-2 text-[13px] rounded-lg border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 dark:focus:border-primary-600 transition-all w-48"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-600">
          <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <p className="text-[14px]">
            {locale === "ko" ? "검색 결과가 없습니다." : "No results found."}
          </p>
        </div>
      ) : (
        <>
          {/* Featured card */}
          {featured && (
            <a
              href={`${basePath}/news/${featured.slug}/`}
              className="group block mb-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:border-gray-300 dark:hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`flex flex-col ${featured.thumbnail ? "md:flex-row" : ""}`}>
                {/* Thumbnail — only shown when thumbnail exists */}
                {featured.thumbnail && (
                  <div className="md:w-2/5 aspect-[16/9] md:aspect-auto relative overflow-hidden bg-gray-100 dark:bg-white/[0.04] border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/[0.06]">
                    <Image
                      src={thumbSrc(featured.thumbnail)}
                      alt={featured.title[locale]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-600 text-white"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      LATEST
                    </span>
                  </div>
                )}

                {/* Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  {!featured.thumbnail && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-600 text-white self-start mb-4"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      LATEST
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-[3px] rounded-md ${categoryMeta[featured.category]?.badge ?? categoryMeta.general.badge}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}
                    >
                      {locale === "ko"
                        ? categoryMeta[featured.category]?.labelKo
                        : categoryMeta[featured.category]?.labelEn}
                    </span>
                    <span
                      className="text-[11px] text-gray-400 dark:text-gray-500"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {featured.date}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3 leading-snug">
                    {featured.title[locale]}
                  </h2>
                  {featured.summary && (
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {featured.summary[locale]}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-1 text-[13px] font-medium text-primary-600 dark:text-primary-400">
                    {locale === "ko" ? "자세히 보기" : "Read more"}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Remaining posts — grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((post) => {
                const meta = categoryMeta[post.category] ?? categoryMeta.general;
                return (
                  <a
                    key={post.slug}
                    href={`${basePath}/news/${post.slug}/`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:border-gray-300 dark:hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-200"
                  >
                    {/* Thumbnail — only when available */}
                    {post.thumbnail && (
                      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 dark:bg-white/[0.04] border-b border-gray-100 dark:border-white/[0.06]">
                        <Image
                          src={thumbSrc(post.thumbnail)}
                          alt={post.title[locale]}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-[3px] rounded-md ${meta.badge}`}
                          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}
                        >
                          {locale === "ko" ? meta.labelKo : meta.labelEn}
                        </span>
                        <span
                          className="text-[11px] text-gray-400 dark:text-gray-500"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {post.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-[14px] leading-snug text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                        {post.title[locale]}
                      </h3>
                      {post.summary && (
                        <p className="text-[12.5px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed flex-1">
                          {post.summary[locale]}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-[12px] font-medium text-primary-600 dark:text-primary-400">
                        {locale === "ko" ? "자세히 보기" : "Read more"}
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </>
      )}

      {filtered.length > 0 && (
        <p
          className="mt-8 text-center text-[12px] text-gray-400 dark:text-gray-600"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {filtered.length} {locale === "ko" ? "개의 소식" : "posts"}
        </p>
      )}
    </div>
  );
}
