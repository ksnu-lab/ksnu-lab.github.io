"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/components/ThemeProvider";
import type { Locale } from "@/types";

const navItems = [
  { key: "home", href: "/" },
  { key: "members", href: "/members" },
  { key: "research", href: "/research" },
  { key: "roadmap", href: "/roadmap" },
  { key: "publications", href: "/publications" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "support", href: "/contact" },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLocale = () => {
    setLocale(locale === "ko" ? "en" : ("ko" as Locale));
  };

  return (
    <header className="bg-[#eaf3ff] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect width="36" height="36" rx="8" fill="#2563eb"/>
              {/* Key — bow at top-left, tip at bottom-right (-45°) */}
              <g transform="rotate(-45, 18, 18)">
                {/* Bow outer ring */}
                <circle cx="18" cy="10" r="5.5" fill="white"/>
                {/* Bow inner hole */}
                <circle cx="18" cy="10" r="2.8" fill="#2563eb"/>
                {/* Shaft */}
                <rect x="16.5" y="15" width="3" height="16" rx="1.5" fill="white"/>
                {/* Tooth 1 */}
                <rect x="19.5" y="21" width="4" height="2.5" rx="1" fill="white"/>
                {/* Tooth 2 */}
                <rect x="19.5" y="26" width="3" height="2.5" rx="1" fill="white"/>
              </g>
            </svg>
            <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
              Security Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-3 py-2 text-base font-bold text-gray-800 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors [font-family:'Noto_Sans_KR',sans-serif]"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Locale toggle */}
            <button
              onClick={toggleLocale}
              className="flex w-10 h-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors text-xs font-bold"
              aria-label="Toggle language"
            >
              {locale === "ko" ? "EN" : "KO"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-2 divide-y divide-gray-100 dark:divide-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-bold text-gray-800 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-900 [font-family:'Noto_Sans_KR',sans-serif]"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
