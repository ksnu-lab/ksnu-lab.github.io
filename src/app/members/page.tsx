"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import professorData from "@/data/professor.json";
import membersJson from "@/data/members.json";
import alumniJson from "@/data/alumni.json";
import type { Professor, Member, Alumni } from "@/types";

const professor = professorData as Professor;
const members = membersJson.members as Member[];
const alumni = alumniJson.alumni as Alumni[];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const roleOrder: Record<string, number> = {
  postdoc: 0,
  phd: 1,
  ms: 2,
  researcher: 3,
  undergraduate: 4,
  intern: 5,
};

type Tab = "professor" | "current" | "alumni";

export default function MembersPage() {
  const { t, locale } = useTranslation();
  const [tab, setTab] = useState<Tab>("professor");

  const sortedMembers = [...members].sort(
    (a, b) => (roleOrder[a.role] ?? 9) - (roleOrder[b.role] ?? 9)
  );
  const roles = [...new Set(sortedMembers.map((m) => m.role))];

  const tabs: { key: Tab; labelKo: string; labelEn: string }[] = [
    { key: "professor", labelKo: "교수",   labelEn: "Professor" },
    { key: "current",   labelKo: "연구원", labelEn: "Researchers" },
    { key: "alumni",    labelKo: "졸업생", labelEn: "Alumni" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Page header */}
      <div className="mb-10">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Lab Members
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "구성원" : "Members"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "사이버 보안 연구실의 교수, 연구원, 졸업생을 소개합니다."
            : "Meet the professor, researchers, and alumni of our cybersecurity lab."}
        </p>
      </div>

      {/* Pill tabs */}
      <div className="flex gap-[2px] mb-10 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-[3px] w-fit">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-[5px] rounded-[7px] text-[12.5px] font-medium transition-all whitespace-nowrap ${
              tab === item.key
                ? "bg-white dark:bg-white/[0.10] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {locale === "ko" ? item.labelKo : item.labelEn}
          </button>
        ))}
      </div>

      {/* Professor Tab */}
      {tab === "professor" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="max-w-[66%]">
              <div className="bg-gray-100 dark:bg-white/[0.04] rounded-xl aspect-[3/4] relative overflow-hidden mb-4 border border-gray-200 dark:border-white/[0.07]">
                {professor.photo ? (
                  <Image
                    src={professor.photo.startsWith("/") ? `${basePath}${professor.photo}` : professor.photo}
                    alt={professor.name[locale]}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold">{professor.name[locale]}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-[14px]">{professor.title[locale]}</p>

            <div className="mt-6 space-y-2 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-400 dark:text-gray-500">Email</span>
                <a href={`mailto:${professor.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                  {professor.email}
                </a>
              </div>
              {professor.phone && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-400 dark:text-gray-500">Tel</span>
                  <span>{professor.phone}</span>
                </div>
              )}
              {professor.office && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-400 dark:text-gray-500">Office</span>
                  <span>{professor.office}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {professor.links.googleScholar && (
                <a href={professor.links.googleScholar} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/[0.08] hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors">
                  Google Scholar
                </a>
              )}
              {professor.links.dblp && (
                <a href={professor.links.dblp} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/[0.08] hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors">
                  DBLP
                </a>
              )}
              {professor.links.orcid && (
                <a href={professor.links.orcid} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/[0.08] hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors">
                  ORCID
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-10">

            {/* Research Interests */}
            <section>
              <h3 className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-4 pb-2.5 border-b border-gray-100 dark:border-white/[0.06]">
                <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t("members.researchInterests")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {professor.researchInterests.map((interest) => (
                  <span
                    key={interest}
                    className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium border border-primary-100 dark:border-primary-800/40"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-4 pb-2.5 border-b border-gray-100 dark:border-white/[0.06]">
                <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                {t("members.education")}
              </h3>
              <div className="relative pl-5">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-200 dark:bg-white/[0.08]" />
                {professor.education.map((edu, i) => (
                  <div key={i} className="relative mb-5 last:mb-0">
                    <div className="absolute -left-5 top-[5px] w-2 h-2 rounded-full bg-primary-500 ring-2 ring-white dark:ring-[#030712]" />
                    <span
                      className="text-[11.5px] text-primary-600 dark:text-primary-400 font-medium"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {edu.year}
                    </span>
                    <p className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{edu.degree}</p>
                    <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Career */}
            <section>
              <h3 className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-4 pb-2.5 border-b border-gray-100 dark:border-white/[0.06]">
                <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t("members.career")}
              </h3>
              <div className="relative pl-5">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-200 dark:bg-white/[0.08]" />
                {professor.career.map((item, i) => (
                  <div key={i} className="relative mb-5 last:mb-0">
                    <div className="absolute -left-5 top-[5px] w-2 h-2 rounded-full bg-primary-500 ring-2 ring-white dark:ring-[#030712]" />
                    <span
                      className="text-[11.5px] text-primary-600 dark:text-primary-400 font-medium"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.period}
                    </span>
                    <p className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{item.position}</p>
                    <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5">{item.organization}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      )}

      {/* Researchers Tab */}
      {tab === "current" && (
        <div className="space-y-12">
          {roles.map((role) => (
            <div key={role}>
              <h2 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {t(`members.${role}`)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedMembers
                  .filter((m) => m.role === role)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl p-5 hover:border-gray-300 dark:hover:border-white/[0.15] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/[0.08]">
                          <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[14px] text-gray-900 dark:text-gray-100">
                            {member.name[locale]}
                          </h3>
                          <p className="text-[12px] text-gray-500 dark:text-gray-400">
                            {t(`members.${member.role}`)} · {member.enrollYear}~
                          </p>
                        </div>
                      </div>
                      {member.email && (
                        <p className="text-[11.5px] text-gray-400 dark:text-gray-500 mt-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{member.email}</p>
                      )}
                      {member.researchInterests && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.researchInterests.map((ri) => (
                            <span key={ri} className="text-[11px] bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-white/[0.06]">
                              {ri}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alumni Tab */}
      {tab === "alumni" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/[0.06]">
                {[
                  { label: locale === "ko" ? "이름" : "Name", w: "w-24" },
                  { label: locale === "ko" ? "학위" : "Degree", w: "w-16" },
                  { label: t("members.graduationYear"), w: "w-20" },
                  { label: t("members.currentAffiliation"), w: "" },
                ].map((col) => (
                  <th key={col.label} className={`pb-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest ${col.w}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumni
                .sort((a, b) => b.graduationYear - a.graduationYear)
                .map((al) => (
                  <tr key={al.id} className="border-b border-gray-100 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-[13.5px] font-medium text-gray-800 dark:text-gray-200">{al.name[locale]}</td>
                    <td className="py-3 text-[13px] text-gray-600 dark:text-gray-400">{al.degree}</td>
                    <td className="py-3 text-[13px] text-gray-500 dark:text-gray-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{al.graduationYear}</td>
                    <td className="py-3 text-[13px] text-gray-600 dark:text-gray-400">
                      {al.currentAffiliation && al.currentPosition
                        ? `${al.currentAffiliation} (${al.currentPosition})`
                        : al.currentAffiliation || "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
