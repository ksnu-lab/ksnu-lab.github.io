"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/components/ThemeProvider";
import siteConfig from "@/data/siteConfig.json";
import type { NewsPost } from "@/types";

const categoryColors: Record<string, string> = {
  publication: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  award: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  event: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  announcement: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  general: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export default function HomeClient({ newsPosts }: { newsPosts: NewsPost[] }) {
  const { t, locale } = useTranslation();
  const { theme } = useTheme();

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const heroBg = theme === "dark"
    ? `${basePath}/images/hero-bg-dark.svg`
    : `${basePath}/images/hero-bg.svg`;

  const recentPosts = newsPosts.slice(0, 6);

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
                <span className="text-accent-500">컴퓨터 보안</span> 연구
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

      {/* Lab News */}
      <section className="py-16 md:py-20 bg-[#eef3fb] dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">News</p>
              <h2 className="text-2xl md:text-3xl font-bold">
                {locale === "ko" ? "연구실 소식" : "Lab News"}
              </h2>
            </div>
            <Link
              href="/news"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium"
            >
              {t("home.viewAll")} &rarr;
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p className="text-gray-600 text-center py-12">
              {locale === "ko" ? "등록된 소식이 없습니다." : "No news yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`${basePath}/news/${post.slug}/`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  {post.thumbnail && (
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                      <Image
                        src={post.thumbnail.startsWith("/") ? `${basePath}${post.thumbnail}` : post.thumbnail}
                        alt={post.title[locale]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          categoryColors[post.category] || categoryColors.general
                        }`}
                      >
                        {t(`news.${post.category}`)}
                      </span>
                      <span className="text-xs text-gray-600">{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title[locale]}
                    </h3>
                    {post.summary && (
                      <p className="text-sm text-gray-700 dark:text-gray-400 mt-1.5 line-clamp-2">
                        {post.summary[locale]}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
