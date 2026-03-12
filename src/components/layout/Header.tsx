"use client";

import Link from "next/link";
import { useState } from "react";
import { campInfo } from "../../data/campInfo";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { href: "/apply", label: "報名資訊" },
  { href: "/courses", label: "課程介紹" },
  { href: "/activities", label: "活動介紹" },
  { href: "/qa", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="bg-gray backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-ivory sm:text-xl"
          onClick={close}
        >
          {campInfo.title} - {campInfo.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-md sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-md text-ivory transition-all duration-300 ease-in-out hover:font-bold hover:text-aqua
                after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-0 after:bg-aqua after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={campInfo.formUrl}
            className="rounded-md bg-aqua px-4 py-1.5 text-md font-bold text-gray transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange"
          >
            前往報名
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ivory sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="開啟主選單"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-ivory/20 bg-gray/95 sm:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-ivory">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-md px-2 py-2 transition-colors hover:bg-ivory/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={campInfo.formUrl}
              onClick={close}
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

