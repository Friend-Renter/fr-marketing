// components/ConsentBanner.js
"use client";

import { useEffect, useState } from "react";
import { initAnalytics } from "@/lib/analytics";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem("fr_analytics_consent");
    setShow(c !== "granted" && c !== "denied");
  }, []);

  if (!show) return null;

  function setConsent(val) {
    localStorage.setItem("fr_analytics_consent", val);
    setShow(false);
    if (val === "granted") initAnalytics();
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-4 shadow-card">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          We use cookies/analytics to improve your experience. You can change this later in your settings.
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-brand-300 px-3 py-2 text-sm text-brand-700 hover:bg-brand-50"
            onClick={() => setConsent("denied")}
          >
            Decline
          </button>
          <button
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            onClick={() => setConsent("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
