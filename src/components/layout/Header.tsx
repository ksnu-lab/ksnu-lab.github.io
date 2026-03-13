"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n";
import { useTheme } from "@/components/ThemeProvider";
import type { Locale } from "@/types";

const navItems = [
  { key: "home",         href: "/" },
  { key: "members",      href: "/members" },
  { key: "research",     href: "/research" },
  { key: "publications", href: "/publications" },
  { key: "projects",     href: "/projects" },
  { key: "news",         href: "/news" },
  { key: "support",      href: "/contact" },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleLocale = () => setLocale(locale === "ko" ? "en" : ("ko" as Locale));

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.45)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.95"/>
                <path d="M9 12l2 2 4-4" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>Security Lab</span>
            <span className="hidden sm:block text-[11.5px] text-gray-500 mt-px" style={{ fontFamily: "'JetBrains Mono', monospace" }}>@ksnu-lab</span>
          </Link>

          {/* Desktop Nav — pill container */}
          <nav className="hidden lg:flex items-center gap-[2px] bg-white/[0.05] border border-white/[0.07] rounded-[10px] p-[3px]">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3.5 py-[6px] rounded-[7px] text-[13px] font-medium transition-all whitespace-nowrap ${
                  isActive(item.href)
                    ? "bg-white/[0.10] text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.08]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="h-[34px] px-3.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg className="w-[15px] h-[15px] text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
              ) : (
                <svg className="w-[15px] h-[15px] text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
                </svg>
              )}
            </button>

            {/* Locale toggle */}
            <button
              onClick={toggleLocale}
              className="h-[34px] px-3.5 rounded-full border border-white/[0.12] bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all text-[12px] font-bold font-mono"
              aria-label="Toggle language"
            >
              {locale === "ko" ? "EN" : "KO"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-[34px] w-[34px] rounded-full border border-white/[0.12] bg-white/[0.04] text-gray-400 hover:text-white flex items-center justify-center transition-all"
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-3 border-t border-white/[0.06] grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-white/[0.10] text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
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
