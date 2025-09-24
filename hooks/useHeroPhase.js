// hooks/useHeroPhase.js
"use client";

import { useEffect, useLayoutEffect, useState } from "react";

function computePhase(heroEl, headerEl) {
  const headerH = headerEl?.offsetHeight || 64;
  if (!heroEl) return "pre"; // stay safe; don't jump to post
  const r = heroEl.getBoundingClientRect();
  // header occupies [0, headerH)
  if (r.top <= headerH && r.bottom > headerH) return "over";
  if (r.bottom <= headerH) return "post";
  return "pre";
}

/**
 * Returns { phase: "pre" | "over" | "post", ready: boolean }
 * - Measures once before paint (no flash), then listens to scroll/resize.
 */
export default function useHeroPhase(heroId = "hero") {
  const [phase, setPhase] = useState("pre");
  const [ready, setReady] = useState(false);

  // 1) Synchronous initial measurement, before paint
  useLayoutEffect(() => {
    const hero = document.getElementById(heroId);
    const header =
      document.querySelector("header[role='banner']") ||
      document.querySelector("header");
    setPhase(computePhase(hero, header));
    setReady(true);
  }, [heroId]);

  // 2) Keep it updated after paint
  useEffect(() => {
    const hero = document.getElementById(heroId);
    const header =
      document.querySelector("header[role='banner']") ||
      document.querySelector("header");

    if (!header) return;

    let ticking = false;
    const recalc = () => {
      setPhase((prev) => {
        const next = computePhase(hero, header);
        return next === prev ? prev : next;
      });
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(recalc);
      }
    };

    // one more compute after first paint just in case fonts/URL bar shift
    requestAnimationFrame(recalc);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("orientationchange", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", onScrollOrResize);
    };
  }, [heroId]);

  return { phase, ready };
}
