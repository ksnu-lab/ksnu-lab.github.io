"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import siteConfig from "@/data/siteConfig.json";
import type { LocalizedString } from "@/types";

const GOOGLE_FORM_URL = siteConfig.banner?.link || "";

interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
}

export default function SupportPageClient({
  faqItems,
}: {
  faqItems: FaqItem[];
}) {
  const { t, locale } = useTranslation();

  const positions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      titleKo: "대학원생 (석·박사)",
      titleEn: "Graduate Students (M.S. / Ph.D.)",
      descKo: "정보보안, 암호, AI 보안에 관심 있는 석·박사 과정 지원자를 모집합니다. 연구 장학금 및 인건비를 지원합니다.",
      descEn: "We recruit M.S. and Ph.D. students interested in cybersecurity, cryptography, and AI security. Research scholarships and stipends are provided.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      titleKo: "학부 연구생",
      titleEn: "Undergraduate Researchers",
      descKo: "보안·프로그래밍에 관심 있는 학부생을 모집합니다. 연구 경험을 통해 대학원 진학 및 취업을 준비할 수 있습니다.",
      descEn: "We recruit undergraduates interested in security and programming. Gain research experience to prepare for graduate school or industry.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      titleKo: "인턴",
      titleEn: "Interns",
      descKo: "방학 중 단기 인턴십 프로그램을 운영합니다. 보안 연구·개발 프로젝트에 참여할 수 있습니다.",
      descEn: "Short-term internship programs are available during vacations. Participate in security research and development projects.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      {/* Page header */}
      <div className="mb-12">
        <p
          className="text-[11px] font-medium text-primary-600 dark:text-primary-400 mb-2 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Support & Contact
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          {locale === "ko" ? "지원 안내" : "Join Our Lab"}
        </h1>
        <p className="text-[14px] text-gray-500 dark:text-gray-400 max-w-xl">
          {locale === "ko"
            ? "연구실 지원 방법, 자주 묻는 질문, 연락처를 안내합니다."
            : "Learn how to apply, read our FAQ, and find our contact information."}
        </p>
      </div>

      {/* Recruitment positions */}
      <section className="mb-14">
        <h2
          className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {locale === "ko" ? "모집 대상" : "Open Positions"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positions.map((pos) => (
            <div
              key={pos.titleEn}
              className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl p-5 hover:border-gray-300 dark:hover:border-white/[0.15] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 border border-primary-100 dark:border-primary-800/30">
                {pos.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {locale === "ko" ? pos.titleKo : pos.titleEn}
              </h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {locale === "ko" ? pos.descKo : pos.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Apply */}
      <section className="mb-14">
        <h2
          className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {locale === "ko" ? "지원 방법" : "How to Apply"}
        </h2>
        <div className={`grid grid-cols-1 ${GOOGLE_FORM_URL ? "md:grid-cols-2" : ""} gap-4`}>

          {/* Email */}
          <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 flex items-center justify-center border border-gray-200 dark:border-white/[0.08]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
                {locale === "ko" ? "이메일 지원" : "Apply via Email"}
              </h3>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {locale === "ko"
                ? "부담 없이 아래 주소로 메일 주세요. 형식은 자유롭고, 아래 내용을 간단히 담아주시면 됩니다."
                : "Feel free to send an email to the address below. No strict format — just include the details below."}
            </p>
            <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] rounded-lg p-4 mb-4">
              <p
                className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {locale === "ko" ? "수신 이메일" : "Send to"}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[14px] font-medium text-primary-600 dark:text-primary-400 hover:underline"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-2.5">
                {locale === "ko" ? "메일에 이런 내용을 담아주세요 😊" : "Just mention the following in your email:"}
              </p>
              <ul className="space-y-1.5">
                {(locale === "ko"
                  ? ["이름 및 연락처", "소속 (학교 / 학과 / 학년)", "관심 있는 연구 분야", "수강한 관련 교과목", "간단한 자기소개 또는 지원 동기"]
                  : ["Name and contact info", "Affiliation (school / dept. / year)", "Research interests", "Relevant courses taken", "Brief introduction or motivation"]
                ).map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5 text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Google Form — only shown if URL is set */}
          {GOOGLE_FORM_URL && (
            <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 flex items-center justify-center border border-gray-200 dark:border-white/[0.08]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
                  {locale === "ko" ? "온라인 폼 지원" : "Apply via Form"}
                </h3>
              </div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                {locale === "ko"
                  ? "구글 폼을 통해 간편하게 지원할 수 있습니다. 기본 정보와 관심 연구 분야를 입력해 주세요."
                  : "Apply conveniently through our Google Form. Enter your basic information and research interests."}
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[13.5px] font-medium transition-colors"
              >
                {locale === "ko" ? "지원 폼 열기" : "Open Application Form"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-14">
        <h2
          className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {locale === "ko" ? "자주 묻는 질문" : "FAQ"}
        </h2>
        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <FaqAccordion
              key={index}
              question={item.question[locale]}
              answer={item.answer[locale]}
            />
          ))}
          {faqItems.length === 0 && (
            <p className="text-[14px] text-gray-400 dark:text-gray-600 text-center py-8">
              {locale === "ko" ? "등록된 질문이 없습니다." : "No FAQs available."}
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2
          className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {locale === "ko" ? "연락처" : "Contact"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-1">
                {siteConfig.labName[locale]}
              </h3>
              <p className="text-[13.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {siteConfig.department[locale]}
                <br />
                {siteConfig.university[locale]}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: t("contact.address"), value: siteConfig.address[locale], href: undefined as string | undefined },
                { label: t("contact.phone"),   value: siteConfig.phone,          href: undefined as string | undefined },
                { label: t("contact.email"),   value: siteConfig.email,          href: `mailto:${siteConfig.email}` },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <p
                    className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0 mt-0.5 w-14"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="text-[13.5px] text-primary-600 dark:text-primary-400 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[13.5px] text-gray-700 dark:text-gray-300">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <p
              className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {t("contact.directions")}
            </p>
            <div className="rounded-xl overflow-hidden aspect-[4/3] border border-gray-100 dark:border-white/[0.07]">
              <iframe
                src="https://maps.google.com/maps?q=%EC%A0%84%EB%B6%81%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84%20%EA%B5%B0%EC%82%B0%EC%8B%9C%20%EB%8C%80%ED%95%99%EB%A1%9C%20558%20%EA%B5%AD%EB%A6%BD%EA%B5%B0%EC%82%B0%EB%8C%80%ED%95%99%EA%B5%90%20%EB%94%94%EC%A7%80%ED%84%B8%EC%A0%95%EB%B3%B4%EA%B4%80&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={locale === "ko" ? "군산대학교 디지털정보관 위치" : "Kunsan National University Digital Info Bldg"}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-white/[0.07] rounded-xl overflow-hidden bg-white dark:bg-white/[0.02]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
      >
        <span className="font-medium text-[14px] text-gray-900 dark:text-gray-100 pr-4">
          {question}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-gray-100 dark:border-white/[0.06]">
          <p className="text-[13.5px] text-gray-600 dark:text-gray-400 leading-relaxed pt-3">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
