// hooks/useOverHero.js
"use client";
import { useEffect, useState } from "react";

export default function useOverHero(heroId = "hero", rootMargin = "-64px 0px 0px 0px") {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const el = document.getElementById(heroId);
    if (!el) {
      setOverHero(false);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { root: null, threshold: 0, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [heroId, rootMargin]);

  return overHero;
}
