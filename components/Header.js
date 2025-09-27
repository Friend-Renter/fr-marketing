"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";
import cities from "../content/cities/_list.json";
import frlogo from "../public/brand/friendrenterlogo.svg";
import MobileDrawer from "./header/MobileDrawer";
import { track } from "@/lib/analytics";

// Basic nav link that can render in light (over hero) or dark (default) tone
const NavLink = ({ href, children, tone }) => {
  const base =
    "px-3 py-2 text-base transition-colors " +
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
  // Only the text tone flips; the mark stays branded (multi-color)
  const textTone = tone === "light" ? "text-brand-50" : "text-brand-900";
  return (
    <Link href="/" className="flex items-start gap-2">
      <img
        src="/brand/friendrenterfavicon.svg"
        alt="FriendRenter"
        className="h-10"
        decoding="async"
        loading="eager"
      />
      <span
        className={`text-xl font-extrabold ${textTone} leading-4.5 tracking-[2px]`}
      >
        Friend<br></br>Renter
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
        className={`px-3 py-2 text-base transition-colors ${
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
  const pathname = usePathname(); // trigger re-bind on client navigation
  const [overHero, setOverHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ioStart = null;
    let ioEnd = null;

    const HEADER_H = 64; // px (matches h-16)

    const startEl = document.getElementById("hero-sentinel-start");
    const endEl = document.getElementById("hero-sentinel-end");

    // If either sentinel is missing, treat as non-home (opaque header)
    if (!startEl || !endEl) {
      setOverHero(false);
      return () => {
        ioStart?.disconnect?.();
        ioEnd?.disconnect?.();
      };
    }

    let topPassed = false; // true after crossing hero top
    let bottomNotPassed = true; // true until crossing hero bottom

    const update = () => setOverHero(topPassed && bottomNotPassed);

    const opts = {
      root: null,
      rootMargin: `-${HEADER_H}px 0px 0px 0px`,
      threshold: 0,
    };

    ioStart = new IntersectionObserver((entries) => {
      const e = entries[0];
      topPassed = !e.isIntersecting;
      requestAnimationFrame(update);
    }, opts);

    ioEnd = new IntersectionObserver((entries) => {
      const e = entries[0];
      bottomNotPassed = e.isIntersecting;
      requestAnimationFrame(update);
    }, opts);

    ioStart.observe(startEl);
    ioEnd.observe(endEl);

    // Compute initial state immediately (covers landing mid-hero)
    const startTop = startEl.getBoundingClientRect().top;
    const endTop = endEl.getBoundingClientRect().top;
    topPassed = startTop - HEADER_H < 0;
    bottomNotPassed = endTop - HEADER_H > 0;
    update();

    return () => {
      ioStart?.disconnect?.();
      ioEnd?.disconnect?.();
    };
  }, [pathname]); // re-run on every client navigation

  // Close the mobile drawer when the route changes (including hash nav)
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Tone + frame swap (2-state)
  const tone = overHero ? "light" : "dark";
  const frame =
    "sticky top-0 z-50 transition-colors" +
    (overHero ? " bg-transparent" : " bg-white shadow-sm");
  const row =
    "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8";

  return (
    <header className={frame} role="banner">
      <div className={row}>
        {/* Left: brand */}
        <div className="min-w-0">
          <Logo tone={tone === "light" ? "light" : "dark"} />
        </div>

        {/* Center: nav (desktop) */}
        <nav
          className="hidden items-center gap-1 md:flex font-sans"
          aria-label="Primary"
        >
          <NavLink href="/hosts" tone={tone === "light" ? "light" : "dark"}>
            Host
          </NavLink>
          <NavLink href="/renters" tone={tone === "light" ? "light" : "dark"}>
            Renters
          </NavLink>
          <CitiesMenu tone={tone === "light" ? "light" : "dark"} />
          <NavLink
            href="#why-friendrenter"
            tone={tone === "light" ? "light" : "dark"}
          >
            Why FriendRenter™
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
              className="hidden md:inline-flex border border-white/70 bg-transparent text-white hover:bg-white/10 "
              href="/#waitlist"
              ctaId="cta_header_join"
            >
              Join waitlist
            </Button>
          ) : (
            <Button
              variant="primary"
              href="/#waitlist"
              ctaId="cta_header_join"
              className="hidden md:inline-flex "
            >
              Join waitlist
            </Button>
          )}
          {/* Hamburger — visible on mobile only */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-drawer"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(true);
              try {
                track("nav_open", { surface: "header" });
              } catch {}
            }}
            className={
              "md:hidden inline-flex items-center justify-center rounded p-2 transition-colors " +
              (tone === "light"
                ? "text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                : "text-emerald-900 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20")
            }
          >
            {/* Icon (3 lines) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M3 6.75h18v1.5H3zM3 11.25h18v1.5H3zM3 15.75h18v1.5H3z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={(reason = "dismiss") => {
          setMobileOpen(false);
          try {
            track("nav_close", { surface: "header", reason });
          } catch {}
        }}
      />
    </header>
  );
}
