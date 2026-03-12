import type {
  Professor,
  Member,
  Alumni,
  Publication,
  ResearchArea,
  SiteConfig,
} from "@/types";

import siteConfigData from "@/data/siteConfig.json";
import professorData from "@/data/professor.json";
import membersJson from "@/data/members.json";
import alumniJson from "@/data/alumni.json";
import papersJson from "@/data/papers.json";
import researchJson from "@/data/research.json";

export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

export function getProfessor(): Professor {
  return professorData as Professor;
}

export function getMembers(): Member[] {
  return membersJson.members as Member[];
}

export function getAlumni(): Alumni[] {
  return alumniJson.alumni as Alumni[];
}

export function getPublications(): Publication[] {
  return papersJson.papers as Publication[];
}

export function getPublicationsByYear(): Record<number, Publication[]> {
  const pubs = getPublications();
  const grouped: Record<number, Publication[]> = {};
  for (const pub of pubs) {
    if (!grouped[pub.year]) {
      grouped[pub.year] = [];
    }
    grouped[pub.year].push(pub);
  }
  return grouped;
}

export function getFeaturedPublications(): Publication[] {
  return getPublications().filter((p) => p.featured);
}

export function getResearchAreas(): ResearchArea[] {
  return researchJson.research as ResearchArea[];
}
