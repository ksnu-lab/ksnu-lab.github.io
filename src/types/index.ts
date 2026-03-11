export interface LocalizedString {
  ko: string;
  en: string;
}

export interface Professor {
  name: LocalizedString;
  title: LocalizedString;
  photo: string;
  email: string;
  phone?: string;
  office?: string;
  education: Array<{
    degree: string;
    institution: string;
    year: number;
    period?: string;
    note?: string;
  }>;
  career: Array<{
    position: string;
    organization: string;
    period: string;
  }>;
  researchInterests: string[];
  awards?: Array<{
    title: string;
    year: number;
    organization: string;
  }>;
  links: {
    googleScholar?: string;
    dblp?: string;
    orcid?: string;
    website?: string;
  };
}

export interface Member {
  id: string;
  name: LocalizedString;
  photo?: string;
  email?: string;
  role: "phd" | "ms" | "undergraduate" | "intern" | "postdoc" | "researcher";
  enrollYear: number;
  researchInterests?: string[];
  homepage?: string;
}

export interface Alumni {
  id: string;
  name: LocalizedString;
  photo?: string;
  email?: string;
  degree: "PhD" | "MS" | "BS";
  enrollYear: number;
  graduationYear: number;
  currentAffiliation?: string;
  currentPosition?: string;
  thesisTitle?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  volume?: string;
  pages?: string;
  year: number;
  type: "international" | "domestic" | "patent" | "award" | "other";
  doi?: string;
  pdf?: string;
  abstract?: string;
  tags?: string[];
  citations?: number;
  featured?: boolean;
}

export interface ResearchArea {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image?: string;
  keywords: string[];
}

export interface NewsPost {
  slug: string;
  title: LocalizedString;
  date: string;
  category: "announcement" | "publication" | "award" | "event" | "general";
  summary?: LocalizedString;
  thumbnail?: string;
  pinned?: boolean;
}

export interface SiteConfig {
  labName: LocalizedString;
  university: LocalizedString;
  department: LocalizedString;
  address: LocalizedString;
  phone: string;
  email: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
  };
}

export interface Technique {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
}

export interface RoadmapCategory {
  id: string;
  title: LocalizedString;
  color: string;
  techniques: Technique[];
}

export type Locale = "ko" | "en";
