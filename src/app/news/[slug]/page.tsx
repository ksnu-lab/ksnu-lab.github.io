import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import { getNewsSlugs, getNewsPostBySlug } from "@/lib/mdx";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const categoryColors: Record<string, string> = {
  publication: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  award: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  event: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  announcement: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  general: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

function resolveImageSrc(src: string): string {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

// Extract first image from markdown and return it separately
function extractFirstImage(content: string): {
  firstImage: { src: string; alt: string } | null;
  bodyContent: string;
} {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const match = content.match(imageRegex);
  if (match) {
    return {
      firstImage: { alt: match[1], src: match[2] },
      bodyContent: content.replace(match[0], "").trim(),
    };
  }
  return { firstImage: null, bodyContent: content };
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Post not found</h1>
        <Link
          href="/news/"
          className="text-primary-600 dark:text-primary-400 hover:underline mt-4 inline-block"
        >
          Back to News
        </Link>
      </div>
    );
  }

  // Use thumbnail from frontmatter, or extract first image from content
  const { firstImage, bodyContent } = extractFirstImage(content);
  const heroImageSrc = meta.thumbnail
    ? resolveImageSrc(meta.thumbnail)
    : firstImage
      ? resolveImageSrc(firstImage.src)
      : null;
  // If thumbnail exists in frontmatter, keep all content; otherwise use content with first image removed
  const displayContent = meta.thumbnail ? content : bodyContent;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link
        href="/news/"
        className="text-sm text-gray-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6 inline-block"
      >
        &larr; Back to News
      </Link>

      <div className="flex items-center gap-2 mb-4">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            categoryColors[meta.category] || categoryColors.general
          }`}
        >
          {meta.category}
        </span>
        <span className="text-sm text-gray-600">{meta.date}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{meta.title.ko}</h1>

      {/* Hero image below title */}
      {heroImageSrc && (
        <div className="mb-8">
          <Image
            src={heroImageSrc}
            alt={firstImage?.alt || meta.title.ko}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
            unoptimized
          />
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <Markdown
          components={{
            img: ({ src, alt }) => {
              const srcStr = typeof src === "string" ? src : "";
              const imgSrc = resolveImageSrc(srcStr);
              return (
                <Image
                  src={imgSrc}
                  alt={alt || ""}
                  width={800}
                  height={450}
                  className="rounded-lg my-4 w-full h-auto"
                  unoptimized
                />
              );
            },
          }}
        >
          {displayContent}
        </Markdown>
      </div>
    </div>
  );
}
