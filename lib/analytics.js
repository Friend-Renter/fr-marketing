// lib/analytics.js
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export function initAnalytics() {
  try {
    const consent = localStorage.getItem("fr_analytics_consent");
    if (consent !== "granted") return;

    // PostHog
    if (PH_KEY && !posthog.__initialized) {
      posthog.init(PH_KEY, {
        api_host: PH_HOST,
        capture_pageview: true,
      });
      posthog.__initialized = true;
    }

    // GA4
    if (GA_ID && !window.__gaInitialized) {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s1);

      const s2 = document.createElement("script");
      s2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date()); gtag('config', '${GA_ID}', { anonymize_ip: true });
      `;
      document.head.appendChild(s2);
      window.__gaInitialized = true;
    }
  } catch (_) {}
}

export function track(event, props = {}) {
  try {
    const consent = localStorage.getItem("fr_analytics_consent");
    if (consent !== "granted") return;

    if (PH_KEY) posthog.capture(event, props);
    if (GA_ID && window.gtag) window.gtag("event", event, props);
  } catch (_) {}
}

export function AnalyticsProvider({ children }) {
  useEffect(() => {
    initAnalytics();
    const onStorage = (e) => {
      if (e.key === "fr_analytics_consent") initAnalytics();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return children;
}
