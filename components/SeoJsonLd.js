// components/SeoJsonLd.js
"use client";

export default function SeoJsonLd({ json }) {
  if (!json) return null;
  return (
    <script
      type="application/ld+json"
      // ensure it’s a string
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
