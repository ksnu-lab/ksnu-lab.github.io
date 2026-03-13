import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import { getNewsSlugs, getNewsPostBySlug } from "@/lib/mdx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const categoryMeta: Record<string, { labelKo: string; badge: string }> = {
  announcement: { labelKo: "공지",     badge: "bg-red-50 dark:bg-[rgba(255,77,109,0.10)] text-red-700 dark:text-red-400 border border-red-200 dark:border-[rgba(255,77,109,0.20)]" },
  research:     { labelKo: "연구내용", badge: "bg-blue-50 dark:bg-[rgba(0,220,130,0.10)] text-blue-700 dark:text-emerald-400 border border-blue-200 dark:border-[rgba(0,220,130,0.20)]" },
  seminar:      { labelKo: "세미나",   badge: "bg-purple-50 dark:bg-[rgba(139,92,246,0.10)] text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-[rgba(139,92,246,0.20)]" },
  general:      { labelKo: "일반",     badge: "bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08]" },
};

function resolveImageSrc(src: string): string {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getNewsPostBySlug(slug);
    return { title: meta.title.ko };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let meta, content;
  try {
    const post = getNewsPostBySlug(slug);
    meta = post.meta;
    content = post.content;
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>404</p>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">게시글을 찾을 수 없습니다</h1>
          <Link href="/news/" className="text-[13px] text-blue-600 dark:text-blue-400 hover:underline">
            ← 연구실 소식으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const cm = categoryMeta[meta.category] || categoryMeta.general;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* Breadcrumb */}
      <div
        className="flex items-center gap-1.5 mb-8 text-[11px] text-gray-400 dark:text-gray-500"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <Link href="/news/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          연구실 소식
        </Link>
        <span>/</span>
        <span>{cm.labelKo}</span>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px] sm:max-w-none">
          {meta.title.ko}
        </span>
      </div>

      {/* Article header */}
      <div className="mb-10 pb-8 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-block text-[10px] font-bold px-2.5 py-[3px] rounded-md whitespace-nowrap ${cm.badge}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {cm.labelKo}
          </span>
          <span
            className="text-[11px] text-gray-400 dark:text-gray-500"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {meta.date}
          </span>
        </div>

        <h1 className="text-[26px] sm:text-[30px] font-bold text-gray-900 dark:text-white leading-tight mb-3">
          {meta.title.ko}
        </h1>

        {meta.summary?.ko && (
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed">
            {meta.summary.ko}
          </p>
        )}
      </div>

      {/* Article body — react-markdown with explicit component styling */}
      <div>
        <Markdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-[22px] font-bold text-gray-900 dark:text-white mt-10 mb-5 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-[19px] font-bold text-gray-900 dark:text-white mt-10 mb-4 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-[1.8] my-3">
                {children}
              </p>
            ),
            hr: () => (
              <hr className="border-0 border-t border-gray-100 dark:border-white/[0.06] my-8" />
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-800 dark:text-gray-200">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="my-3 space-y-1.5 pl-5 list-disc marker:text-gray-400 dark:marker:text-gray-600">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 space-y-1.5 pl-5 list-decimal marker:text-gray-400 dark:marker:text-gray-600">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-4 pl-4 border-l-4 border-primary-300 dark:border-primary-700 text-gray-600 dark:text-gray-400 italic">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes("language-");
              if (isBlock) {
                return (
                  <code className="block my-4 p-4 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-[13px] font-mono text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre">
                    {children}
                  </code>
                );
              }
              return (
                <code className="inline font-mono text-[12.5px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/[0.08] text-gray-800 dark:text-gray-200">
                  {children}
                </code>
              );
            },
            img: ({ src, alt }) => {
              const srcStr = typeof src === "string" ? src : "";
              const imgSrc = resolveImageSrc(srcStr);
              return (
                <span className="block my-6 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={alt || ""}
                    className="inline-block max-w-full w-auto max-h-[280px] rounded-xl border border-gray-100 dark:border-white/[0.06] shadow-sm"
                    style={{ display: "inline-block" }}
                  />
                  {alt && (
                    <span className="block mt-2 text-[11px] text-gray-400 dark:text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {alt}
                    </span>
                  )}
                </span>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-6 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
        <Link
          href="/news/"
          className="flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7"/>
          </svg>
          연구실 소식으로 돌아가기
        </Link>
        <span
          className="text-[11px] text-gray-300 dark:text-gray-700"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {meta.date}
        </span>
      </div>

    </div>
  );
}
