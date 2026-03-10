"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import type { NewsPost } from "@/types";

const categoryColors: Record<string, string> = {
  publication: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  award: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  event: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  announcement: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  general: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export default function NewsListClient({ posts }: { posts: NewsPost[] }) {
  const { t, locale } = useTranslation();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-10">{t("news.title")}</h1>

      {posts.length === 0 && (
        <p className="text-gray-600 text-center py-12">
          {locale === "ko" ? "등록된 소식이 없습니다." : "No news yet."}
        </p>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`${basePath}/news/${post.slug}/`}
            className="flex gap-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all"
          >
            {/* Thumbnail */}
            {post.thumbnail ? (
              <div className="w-28 h-20 shrink-0 rounded-lg overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src={post.thumbnail.startsWith("/") ? `${basePath}${post.thumbnail}` : post.thumbnail}
                  alt={post.title[locale]}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    categoryColors[post.category] || categoryColors.general
                  }`}
                >
                  {t(`news.${post.category}`)}
                </span>
                <span className="text-sm text-gray-600">{post.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                {post.title[locale]}
              </h2>
              {post.summary && (
                <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                  {post.summary[locale]}
                </p>
              )}
            </div>

            <svg
              className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 self-center"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
