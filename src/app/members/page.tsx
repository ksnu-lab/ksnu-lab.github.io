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

  const tabs: { key: Tab; label: string }[] = [
    { key: "professor", label: t("members.professor") },
    { key: "current", label: t("members.current") },
    { key: "alumni", label: t("members.alumni") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-6">{t("members.title")}</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-10 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === item.key
                ? "border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400"
                : "border-transparent text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Professor Tab */}
      {tab === "professor" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="max-w-[66%]">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-[3/4] relative overflow-hidden mb-4">
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
            <p className="text-gray-700 dark:text-gray-400 mt-1">{professor.title[locale]}</p>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${professor.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                  {professor.email}
                </a>
              </div>
              {professor.phone && (
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
                  <span className="font-medium">Tel:</span>
                  <span>{professor.phone}</span>
                </div>
              )}
              {professor.office && (
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-300">
                  <span className="font-medium">Office:</span>
                  <span>{professor.office}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {professor.links.googleScholar && (
                <a href={professor.links.googleScholar} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Google Scholar
                </a>
              )}
              {professor.links.dblp && (
                <a href={professor.links.dblp} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  DBLP
                </a>
              )}
              {professor.links.orcid && (
                <a href={professor.links.orcid} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  ORCID
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-10">
            {/* Research Interests */}
            <section>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {t("members.researchInterests")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {professor.researchInterests.map((interest) => (
                  <span key={interest} className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {t("members.education")}
              </h3>
              <div className="space-y-3">
                {professor.education.map((edu, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span className="text-sm text-gray-600 font-mono w-12 shrink-0">{edu.year}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{edu.degree}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-400">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Career */}
            <section>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {t("members.career")}
              </h3>
              <div className="space-y-3">
                {professor.career.map((item, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span className="text-sm text-gray-600 w-28 shrink-0">{item.period}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{item.position}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-400">{item.organization}</p>
                    </div>
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
                {t(`members.${role}`)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedMembers
                  .filter((m) => m.role === role)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:bg-blue-100 dark:hover:bg-blue-900/10 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <svg className="w-8 h-8 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {member.name[locale]}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {t(`members.${member.role}`)} | {member.enrollYear}~
                          </p>
                        </div>
                      </div>
                      {member.email && (
                        <p className="text-xs text-gray-700 dark:text-gray-400 mt-3">{member.email}</p>
                      )}
                      {member.researchInterests && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.researchInterests.map((ri) => (
                            <span key={ri} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                <th className="pb-3 font-semibold text-gray-700 dark:text-gray-300 w-20">
                  {locale === "ko" ? "이름" : "Name"}
                </th>
                <th className="pb-3 font-semibold text-gray-700 dark:text-gray-300 w-16">
                  {locale === "ko" ? "학위" : "Degree"}
                </th>
                <th className="pb-3 font-semibold text-gray-700 dark:text-gray-300 w-20">
                  {t("members.graduationYear")}
                </th>
                <th className="pb-3 font-semibold text-gray-700 dark:text-gray-300">
                  {t("members.currentAffiliation")}
                </th>
              </tr>
            </thead>
            <tbody>
              {alumni
                .sort((a, b) => b.graduationYear - a.graduationYear)
                .map((al) => (
                  <tr key={al.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 font-medium text-gray-800 dark:text-gray-200">{al.name[locale]}</td>
                    <td className="py-3 text-gray-800 dark:text-gray-300">{al.degree}</td>
                    <td className="py-3 text-gray-800 dark:text-gray-300">{al.graduationYear}</td>
                    <td className="py-3 text-gray-800 dark:text-gray-300">
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
