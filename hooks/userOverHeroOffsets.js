"use client";
import { useEffect, useLayoutEffect, useState } from "react";

export default function useOverHeroOffsets(heroId = "hero") {
  const [over, setOver] = useState(false);

  useLayoutEffect(() => {
    const header = document.querySelector('header[role="banner"]') || document.querySelector("header");
    const hero = document.getElementById(heroId);

    if (!header || !hero) {
      setOver(false); // no hero → always white header
      return;
    }

    let headerH = 64;
    let heroTop = 0;

    const measure = () => {
      headerH = header.offsetHeight || 64;
      // get the static document offset of hero top (not affected by sticky header)
      const rect = hero.getBoundingClientRect();
      heroTop = rect.top + window.scrollY;
    };

    const compute = () => {
      const next = window.scrollY >= (heroTop - headerH);
      setOver(prev => (prev === next ? prev : next));
    };

    // measure once before paint, then compute
    measure();
    compute();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { compute(); ticking = false; });
      }
    };
    const onResize = () => {
      // re-measure on resize/load (fonts/images can shift layout)
      measure();
      compute();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [heroId]);

  return over; // boolean
}
