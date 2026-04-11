"use client";

import Link from "next/link";
import { useState } from "react";
import { campInfo } from "@data/campInfo";
import { trackEvent } from "@utils/analytics";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { href: "/apply", label: "報名資訊" },
  { href: "/courses", label: "課程介紹" },
  { href: "/activities", label: "活動介紹" },
  { href: "/faq", label: "常見問題" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleNavClick = (label: string, href: string, position: "header_desktop" | "header_mobile") => {
    trackEvent("navigation_click", {
      label,
      href,
      position,
    });
  };

  const handleApplyClick = (position: "header_desktop" | "header_mobile") => {
    trackEvent("apply_click", {
      source: position,
    });
  };

  return (
    <header className="relative z-40 bg-gray backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-ivory lg:text-xl"
          onClick={() => {
            close();
            handleNavClick("首頁", "/", "header_desktop");
          }}
        >
          {campInfo.title} - {campInfo.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-md md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.label, item.href, "header_desktop")}
              className="relative text-md text-ivory transition-all duration-300 ease-in-out hover:font-bold hover:text-aqua
                after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-0 after:bg-aqua after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={campInfo.formUrl}
            onClick={() => handleApplyClick("header_desktop")}
            className="rounded-md bg-aqua px-4 py-1.5 text-md font-bold text-gray transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange hover:text-white"
          >
            前往報名
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ivory md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="開啟主選單"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-ivory/20 bg-gray/95 shadow-lg backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-ivory">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  close();
                  handleNavClick(item.label, item.href, "header_mobile");
                }}
                className="rounded-md px-2 py-2 transition-colors hover:bg-ivory/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={campInfo.formUrl}
              onClick={() => {
                close();
                handleApplyClick("header_mobile");
              }}
              className="mt-2 rounded-md bg-aqua px-3 py-2 text-center text-sm font-bold text-white"
            >
              前往報名
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

