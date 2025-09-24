"use client";

import Link from "next/link";
import Button from "./ui/Button";
import { useLayoutEffect, useState } from "react";
import cities from "../content/cities/_list.json";

// Basic nav link that can render in light (over hero) or dark (default) tone
const NavLink = ({ href, children, tone }) => {
  const base =
    "px-3 py-2 text-sm transition-colors " +
    (tone === "light"
      ? "text-white/85 hover:text-white"
      : "text-emerald-900 hover:text-emerald-700");
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
};

// Logo lockup — keeps the tiny square + FR text; flips depending on tone
function Logo({ tone }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={`inline-block h-6 w-6 rounded-sm ${
          tone === "light" ? "bg-white/90" : "bg-emerald-600"
        }`}
        aria-hidden="true"
      />
      <span
        className={`text-base font-semibold ${
          tone === "light" ? "text-white" : "text-emerald-900"
        }`}
      >
        FR
      </span>
    </Link>
  );
}

// Simple Cities menu (preserves your cities JSON + basic a11y)
function CitiesMenu({ tone }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className={`px-3 py-2 text-sm transition-colors ${
          tone === "light"
            ? "text-white/85 hover:text-white"
            : "text-emerald-900 hover:text-emerald-700"
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => e.key === "ArrowDown" && setOpen(true)}
      >
        Cities ▾
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-48 rounded-md border border-zinc-200 bg-white p-2 shadow-lg"
        >
          {cities.map((c) => (
            <Link
              key={c.slug}
              role="menuitem"
              className="block rounded px-3 py-2 text-sm text-zinc-800 hover:bg-emerald-50"
              href={`/city/${c.slug}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  // Over-hero state driven by #hero-sentinel presence + IntersectionObserver
  const [overHero, setOverHero] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const start = document.getElementById("hero-sentinel-start");
    const end = document.getElementById("hero-sentinel-end");

    // If either sentinel is missing, treat as non-home (opaque header forever)
    if (!start || !end) {
      setOverHero(false);
      return;
    }

    let topPassed = false; // true once we’ve scrolled past the hero’s top
    let bottomNotPassed = true; // true until we’ve scrolled past the hero’s bottom

    const update = () => {
      // over = between top and bottom
      setOverHero(topPassed && bottomNotPassed);
    };

    const opts = {
      root: null,
      rootMargin: "-64px 0px 0px 0px", // header height
      threshold: 0,
    };

    const ioStart = new IntersectionObserver((entries) => {
      const e = entries[0];
      topPassed = !e.isIntersecting;
      requestAnimationFrame(update);
    }, opts);

    const ioEnd = new IntersectionObserver((entries) => {
      const e = entries[0];
      // While the header line is ABOVE the hero’s bottom, end is still intersecting.
      // Once we scroll past the bottom, it stops intersecting.
      bottomNotPassed = e.isIntersecting;
      requestAnimationFrame(update);
    }, opts);

    ioStart.observe(start);
    ioEnd.observe(end);
    return () => {
      ioStart.disconnect();
      ioEnd.disconnect();
    };
  }, []);

  // Tone + frame swap (2-state)
  const tone = overHero ? "light" : "dark";
  const frame =
    "sticky top-0 z-50 transition-colors" +
    (overHero ? " bg-transparent" : " bg-white shadow-sm");
  const row =
    "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8";

  return (
    <header className={frame} role="banner">
      <div className={row}>
        {/* Left: brand */}
        <div className="min-w-0">
          <Logo tone={tone === "light" ? "light" : "dark"} />
        </div>

        {/* Center: nav (desktop) */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink href="/hosts" tone={tone === "light" ? "light" : "dark"}>
            Host
          </NavLink>
          <NavLink href="/renters" tone={tone === "light" ? "light" : "dark"}>
            Renters
          </NavLink>
          <CitiesMenu tone={tone === "light" ? "light" : "dark"} />
          <NavLink href="/safety" tone={tone === "light" ? "light" : "dark"}>
            Safety
          </NavLink>
          <NavLink
            href="/legal/terms"
            tone={tone === "light" ? "light" : "dark"}
          >
            Legal
          </NavLink>
        </nav>

        {/* Right: primary CTA */}
        <div className="flex items-center gap-2">
          {overHero ? (
            <Button
              variant="custom"
              className="border border-white/70 bg-transparent text-white hover:bg-white/10"
              href="/join"
              ctaId="cta_header_join"
            >
              Join waitlist
            </Button>
          ) : (
            <Button variant="primary" href="/join" ctaId="cta_header_join">
              Join waitlist
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
