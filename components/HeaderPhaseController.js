// components/HeaderPhaseController.js
"use client";

import { useEffect, useLayoutEffect } from "react";

/** Compute which phase the header should be in relative to #hero and header height */
function computePhase(heroEl, headerEl) {
  const headerH = headerEl?.offsetHeight || 64;
  if (!heroEl) return "pre"; // be safe on first paint
  const r = heroEl.getBoundingClientRect();
  if (r.top <= headerH && r.bottom > headerH) return "over";
  if (r.bottom <= headerH) return "post";
  return "pre";
}

export default function HeaderPhaseController({ heroId = "hero" }) {
  // 1) Set an initial phase BEFORE paint
  useLayoutEffect(() => {
    const hero = document.getElementById(heroId);
    const header =
      document.querySelector('header[role="banner"]') ||
      document.querySelector("header");
    const phase = computePhase(hero, header);
    document.documentElement.dataset.headerPhase = phase; // "pre" | "over" | "post"
  }, [heroId]);

  // 2) Keep it updated with scroll/resize (post-paint)
  useEffect(() => {
    const hero = document.getElementById(heroId);
    const header =
      document.querySelector('header[role="banner"]') ||
      document.querySelector("header");
    if (!header) return;

    let ticking = false;
    const recalc = () => {
      const phase = computePhase(hero, header);
      if (document.documentElement.dataset.headerPhase !== phase) {
        document.documentElement.dataset.headerPhase = phase;
      }
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(recalc);
      }
    };

    requestAnimationFrame(recalc); // one more after first paint
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("orientationchange", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", onScrollOrResize);
    };
  }, [heroId]);

  return null;
}
