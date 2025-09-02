"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";
import { useEffect, useRef, useState } from "react";
import cities from "@/content/cities/_list.json";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm ${
        active ? "text-brand-700" : "text-gray-700 hover:text-brand-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [openCities, setOpenCities] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenCities(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-brand-600" />
          <span className="text-base font-semibold text-gray-900">FR</span>
        </Link>

        <nav className="hidden items-center md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/hosts">For Hosts</NavLink>
          <NavLink href="/renters">For Renters</NavLink>
          <NavLink href="/safety">Safety</NavLink>

          <div className="relative">
            <button
              ref={btnRef}
              className="px-3 py-2 text-sm text-gray-700 hover:text-brand-700"
              aria-haspopup="menu"
              aria-expanded={openCities}
              onClick={() => setOpenCities((v) => !v)}
              onBlur={() => setTimeout(() => setOpenCities(false), 150)}
              onKeyDown={(e) => e.key === "ArrowDown" && setOpenCities(true)}
            >
              Cities ▾
            </button>
            {openCities && (
              <div
                role="menu"
                aria-label="Cities menu"
                className="absolute left-0 mt-1 w-56 rounded-md border border-gray-200 bg-white p-1 shadow-card"
              >
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    role="menuitem"
                    className="block rounded px-3 py-2 text-sm hover:bg-brand-50"
                    href={`/city/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink href="/legal/terms">Legal</NavLink>
        </nav>

        <div className="hidden gap-2 md:flex">
          <Link href="/hosts">
            <Button variant="primary">List your car</Button>
          </Link>
          <Link href="/renters">
            <Button variant="ghost">Find a rental</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
