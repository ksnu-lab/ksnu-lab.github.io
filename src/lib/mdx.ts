import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NewsPost, LocalizedString } from "@/types";

const newsDirectory = path.join(process.cwd(), "src/content/news");
const faqDirectory = path.join(process.cwd(), "src/content/faq");
const dataDirectory = path.join(process.cwd(), "src/data");

// ─── Localized field normalization ───────────────────────────────────────────

function normalizeLocalizedField(
  data: Record<string, unknown>,
  field: string
): LocalizedString | undefined {
  const value = data[field];
  if (value && typeof value === "object" && "ko" in (value as object)) {
    return value as LocalizedString;
  }
  const ko = data[`${field}_ko`] as string | undefined;
  const en = data[`${field}_en`] as string | undefined;
  if (ko) {
    return { ko, en: en || ko };
  }
  if (typeof value === "string") {
    return { ko: value, en: value };
  }
  return undefined;
}

// ─── JSON-based news (one file per category) ─────────────────────────────────

type JsonNewsCategory = "announcement" | "research" | "seminar" | "general";

interface RawJsonPost {
  id: string;
  title_ko: string;
  title_en?: string;
  date: string;
  summary_ko?: string;
  summary_en?: string;
  body_ko?: string;
  body_en?: string;
  thumbnail?: string;
  link?: string;
  pinned?: boolean;
}

const JSON_CATEGORIES: JsonNewsCategory[] = [
  "announcement",
  "research",
  "seminar",
  "general",
];

function readJsonNewsPosts(category: JsonNewsCategory): NewsPost[] {
  const filePath = path.join(dataDirectory, `news-${category}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      posts?: RawJsonPost[];
    };
    return (data.posts ?? []).map((entry) => ({
      slug: `jn__${category}__${entry.id}`,
      title: { ko: entry.title_ko, en: entry.title_en || entry.title_ko },
      date:
        typeof entry.date === "string"
          ? entry.date
          : new Date(entry.date).toISOString().split("T")[0],
      category,
      summary: entry.summary_ko
        ? { ko: entry.summary_ko, en: entry.summary_en || entry.summary_ko }
        : undefined,
      thumbnail: entry.thumbnail || undefined,
      pinned: entry.pinned === true,
    }));
  } catch {
    return [];
  }
}

function getAllJsonNewsPosts(): NewsPost[] {
  return JSON_CATEGORIES.flatMap(readJsonNewsPosts);
}

function getJsonNewsPostBySlug(
  slug: string
): { meta: NewsPost; content: string } | null {
  // slug format: "jn__{category}__{id}"
  const parts = slug.split("__");
  if (parts[0] !== "jn" || parts.length < 3) return null;
  const category = parts[1] as JsonNewsCategory;
  const id = parts.slice(2).join("__");

  const filePath = path.join(dataDirectory, `news-${category}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      posts?: RawJsonPost[];
    };
    const entry = (data.posts ?? []).find((p) => p.id === id);
    if (!entry) return null;
    return {
      meta: {
        slug,
        title: { ko: entry.title_ko, en: entry.title_en || entry.title_ko },
        date:
          typeof entry.date === "string"
            ? entry.date
            : new Date(entry.date).toISOString().split("T")[0],
        category,
        summary: entry.summary_ko
          ? { ko: entry.summary_ko, en: entry.summary_en || entry.summary_ko }
          : undefined,
        thumbnail: entry.thumbnail || undefined,
        pinned: entry.pinned === true,
      },
      content: entry.body_ko || entry.summary_ko || "",
    };
  } catch {
    return null;
  }
}

// ─── MDX-based news ───────────────────────────────────────────────────────────

function getMdxNewsSlugs(): string[] {
  if (!fs.existsSync(newsDirectory)) return [];
  return fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getMdxNewsPostBySlug(slug: string): {
  meta: NewsPost;
  content: string;
} {
  const filePath = path.join(newsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const title = normalizeLocalizedField(data, "title") || {
    ko: slug,
    en: slug,
  };
  const summary = normalizeLocalizedField(data, "summary");

  // Map old categories to new ones
  const rawCategory = data.category || "general";
  const categoryMap: Record<string, NewsPost["category"]> = {
    announcement: "announcement",
    publication: "general",
    award: "general",
    event: "seminar",
    general: "general",
    research: "research",
    seminar: "seminar",
  };
  const category: NewsPost["category"] = categoryMap[rawCategory] ?? "general";

  return {
    meta: {
      slug,
      title,
      date:
        typeof data.date === "string"
          ? data.date
          : new Date(data.date).toISOString().split("T")[0],
      category,
      summary,
      thumbnail: data.thumbnail,
      pinned: data.pinned === true,
    },
    content,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getNewsSlugs(): string[] {
  const mdxSlugs = getMdxNewsSlugs();
  const jsonSlugs = JSON_CATEGORIES.flatMap((cat) => {
    const filePath = path.join(dataDirectory, `news-${cat}.json`);
    if (!fs.existsSync(filePath)) return [];
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
        posts?: RawJsonPost[];
      };
      return (data.posts ?? []).map((p) => `jn__${cat}__${p.id}`);
    } catch {
      return [];
    }
  });
  return [...mdxSlugs, ...jsonSlugs];
}

export function getNewsPostBySlug(slug: string): {
  meta: NewsPost;
  content: string;
} {
  if (slug.startsWith("jn__")) {
    const result = getJsonNewsPostBySlug(slug);
    if (result) return result;
    throw new Error(`JSON post not found: ${slug}`);
  }
  return getMdxNewsPostBySlug(slug);
}

export function getAllNewsPosts(): NewsPost[] {
  const mdxPosts = getMdxNewsSlugs().map(
    (slug) => getMdxNewsPostBySlug(slug).meta
  );
  const jsonPosts = getAllJsonNewsPosts();
  return [...mdxPosts, ...jsonPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
}

export function getAllFaqItems(): FaqItem[] {
  if (!fs.existsSync(faqDirectory)) return [];
  const files = fs
    .readdirSync(faqDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const filePath = path.join(faqDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      const question = normalizeLocalizedField(data, "question") || {
        ko: "",
        en: "",
      };
      const answer = normalizeLocalizedField(data, "answer") || {
        ko: "",
        en: "",
      };

      return {
        question,
        answer,
        order: typeof data.order === "number" ? data.order : 99,
      };
    })
    .sort((a, b) => a.order - b.order);
}
