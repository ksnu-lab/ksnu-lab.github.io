"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/components/ThemeProvider";
import siteConfig from "@/data/siteConfig.json";
import papersJson from "@/data/papers.json";
import researchJson from "@/data/research.json";
import type { Publication, ResearchArea } from "@/types";

const recentPapers = (papersJson.papers as Publication[])
  .sort((a, b) => b.year - a.year)
  .slice(0, 5);

const researchAreas = researchJson.research as ResearchArea[];

const researchIcons: Record<string, { emoji: string; bg: string; darkBg: string }> = {
  "crypto-side-channel": {
    emoji: "🔐",
    bg: "rgba(37,99,235,0.08)",
    darkBg: "rgba(0,220,130,0.10)",
  },
  "hacking-security": {
    emoji: "💻",
    bg: "rgba(239,68,68,0.08)",
    darkBg: "rgba(255,77,109,0.10)",
  },
  "ai-security": {
    emoji: "🤖",
    bg: "rgba(168,85,247,0.08)",
    darkBg: "rgba(255,214,10,0.08)",
  },
  "system-security": {
    emoji: "⚙️",
    bg: "rgba(245,158,11,0.08)",
    darkBg: "rgba(245,158,11,0.10)",
  },
  "network-web-security": {
    emoji: "🌐",
    bg: "rgba(6,182,212,0.08)",
    darkBg: "rgba(0,160,255,0.10)",
  },
  "hardware-security": {
    emoji: "🛡️",
    bg: "rgba(234,88,12,0.08)",
    darkBg: "rgba(255,120,0,0.10)",
  },
};

export default function HomeClient({ newsPosts: _newsPosts }: { newsPosts: unknown[] }) {
  const { t, locale } = useTranslation();
  const { theme } = useTheme();

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  void _newsPosts;
  const heroBg = theme === "dark"
    ? `${basePath}/images/hero-bg-dark.svg`
    : `${basePath}/images/hero-bg.svg`;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Announcement Banner */}
          {siteConfig.banner?.enabled && (
            <Link
              href={siteConfig.banner.link}
              className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 hover:bg-white/90 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/50 dark:border-gray-700/50"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {siteConfig.banner.text[locale]}
              </span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
            {locale === "ko" ? (
              <>
                더 안전한 디지털 세계를 위한
                <br />
                <span className="text-accent-500">사이버 보안</span> 연구
              </>
            ) : (
              <>
                Advancing{" "}
                <span className="text-accent-500">Cybersecurity</span>
                <br />
                for a Safer Digital World
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {locale === "ko"
              ? `${siteConfig.labName.ko}에서는 암호학, 부채널 분석, 인공지능 보안 등 차세대 보안 기술을 연구하고 있습니다.`
              : `At ${siteConfig.labName.en}, we research next-generation security technologies including cryptography, side-channel analysis, and AI security.`}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40"
            >
              {locale === "ko" ? "연구 분야 보기" : "Explore Research"} &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              {locale === "ko" ? "연구실 지원하기" : "Join Our Lab"}
            </Link>
          </div>
        </div>
      </section>

      {/* Lab Introduction */}
      <section className="py-16 md:py-20 bg-[#fafcfe] dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
              {locale === "ko" ? "연구실 소개" : "About Us"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {locale === "ko" ? siteConfig.labName.ko : siteConfig.labName.en}
            </h2>
            <p className="text-base md:text-lg text-gray-900 dark:text-gray-300 leading-relaxed">
              {locale === "ko" ? siteConfig.intro.ko : siteConfig.intro.en}
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p
                className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Research Areas
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                {locale === "ko" ? "주요 연구 분야" : "Research Areas"}
              </h2>
            </div>
            <Link
              href="/research"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {locale === "ko" ? "전체 보기" : "View all"} →
            </Link>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            style={{ scrollbarWidth: "thin" }}>
            {researchAreas.map((area, idx) => {
              const iconInfo = researchIcons[area.id] ?? {
                emoji: "🔒",
                bg: "rgba(107,114,128,0.08)",
                darkBg: "rgba(107,114,128,0.10)",
              };
              return (
                <Link
                  href="/research"
                  key={area.id}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl p-7 flex flex-col
                    bg-gray-50 dark:bg-white/[0.03]
                    border border-gray-100 dark:border-white/[0.07]
                    hover:bg-blue-50/50 dark:hover:bg-white/[0.06]
                    hover:border-gray-200 dark:hover:border-white/[0.14]
                    hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Number */}
                  <div
                    className="text-[11px] text-gray-400 dark:text-gray-500 mb-4"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    0{idx + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[22px] mb-5"
                    style={{
                      background: theme === "dark" ? iconInfo.darkBg : iconInfo.bg,
                    }}
                  >
                    {iconInfo.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {locale === "ko" ? area.title.ko : area.title.en}
                  </h3>

                  {/* Description */}
                  <p className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                    {locale === "ko"
                      ? area.description.ko.slice(0, 80) + "…"
                      : area.description.en.slice(0, 100) + "…"}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                    <span
                      className="text-[11px] text-gray-400 dark:text-gray-500"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {area.keywords[0]}
                    </span>
                    <span className="text-primary-500 dark:text-primary-400 text-lg">↗</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 md:py-20 bg-[#fafcfe] dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1"
                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Publications
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                {locale === "ko" ? "최근 논문" : "Recent Papers"}
              </h2>
            </div>
            <Link
              href="/publications"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {locale === "ko" ? "전체 보기" : "View all"} →
            </Link>
          </div>

          <table className="w-full border-collapse">
            <tbody>
              {recentPapers.map((pub) => (
                <tr
                  key={pub.id}
                  className="border-b border-gray-100 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
                >
                  {/* Year */}
                  <td
                    className="py-[18px] px-3 align-top text-[12px] text-gray-400 dark:text-gray-500 whitespace-nowrap w-[60px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {pub.year}
                  </td>

                  {/* Type badge */}
                  <td className="py-[18px] px-3 align-top w-[60px]">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-[3px] rounded-md border whitespace-nowrap ${
                        pub.type === "international"
                          ? "bg-cyan-50 dark:bg-[rgba(0,220,130,0.12)] text-cyan-700 dark:text-emerald-400 border-cyan-200 dark:border-[rgba(0,220,130,0.2)]"
                          : "bg-amber-50 dark:bg-[rgba(255,214,10,0.10)] text-amber-600 dark:text-yellow-400 border-amber-200 dark:border-[rgba(255,214,10,0.2)]"
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {pub.type === "international" ? "국제" : "국내"}
                    </span>
                  </td>

                  {/* Title + meta */}
                  <td className="py-[18px] px-3 align-top">
                    <div className="text-[13.5px] font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1">
                      {pub.title}
                    </div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400">
                      {pub.authors && <span>{pub.authors} · </span>}
                      <span className="text-primary-600 dark:text-primary-400 font-medium">{pub.venue}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </>
  );
}
