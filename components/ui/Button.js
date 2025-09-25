// components/ui/Button.js
"use client";

import { track } from "@/lib/analytics";
import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ctaId,            // optional: if passed, fires `cta_click`
  trackProps = {},  // optional: extra analytics props
  onClick,
  href,
 target,
  rel,
  prefetch = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm";
  const variants = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600/30",
    outline: "border border-brand-300 text-brand-700 hover:bg-brand-50",
    ghost: "text-brand-700 hover:bg-brand-50",
     custom: "", // allow caller to fully control styles
  };

  function handleClick(e) {
    if (ctaId) track("cta_click", { cta_id: ctaId, ...trackProps });
    onClick?.(e);
  }

    // If an href is provided, render a Next.js Link styled like a button
  if (href) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        onClick={handleClick}
        target={target}
        rel={rel}
        className={`${base} ${variants[variant] ?? ""} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render a native button
  return (
    <button
      type="button"
      className={`${base} ${variants[variant] ?? ""} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
