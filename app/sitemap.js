// app/sitemap.js
import { getCitySlugs } from "@/lib/content";

export const runtime = "nodejs"; // uses fs via getCitySlugs()
export const revalidate = 86400; // (optional) cache for 24h

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPaths = [
    "",
    "/hosts",
    "/renters",
    "/safety",
    "/terms",
    "/privacy",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
  }));

  const cities = getCitySlugs().map((slug) => ({
    url: `${base}/city/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPaths, ...cities];
}
