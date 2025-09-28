// app/city/[slug]/page.jsx
import { getCitySlugs, getCityContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import SeoJsonLd from "@/components/SeoJsonLd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCheckCircle,
  faKey,
  faCarSide,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

export const runtime = "nodejs"; // uses fs

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  return getCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await the Params object
  const city = getCityContent(slug);
  if (!city) return { title: "City not found" };
  const base = siteUrl;
  const title =
    city?.seo?.title ?? `${city.cityName} car rentals | FriendRenter`;
  const description = city?.seo?.metaDescription ?? city?.hero?.subhead ?? "";
  const ogTitle = city?.hero?.headline || city?.cityName || "FriendRenter";
  const ogSub = city?.hero?.subhead || "";
  const ogImage =
    city?.seo?.ogImage ||
    `${base}/og?title=${encodeURIComponent(
      ogTitle
    )}&subtitle=${encodeURIComponent(ogSub)}`;

  return {
    title,
    description,
    alternates: { canonical: city?.seo?.canonicalPath ?? `/city/${city.id}` },
    openGraph: {
      title,
      description,
      images: [ogImage],
      url: `${base}/city/${city.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const iconForStep = (s, i) => {
  const t = (s?.title || "").toLowerCase();
  if (t.includes("add")) return faUserPlus;
  if (t.includes("request") || t.includes("confirm")) return faCheckCircle;
  if (t.includes("meet") || t.includes("pickup") || t.includes("pick up"))
    return faKey;
  return faCarSide; // fallback
};

export default async function CityPage({ params, searchParams }) {
  const { slug } = await params; // ✅ await the Params object
  const city = getCityContent(slug);
  if (!city) return notFound();
  const heroBg = city?.hero?.bgImage;
  const badge = city?.hero?.badge || "Friends-first rentals";
  const headline =
    city?.hero?.headline || `${city.cityName} car rentals — friends only.`;
  const subhead =
    city?.hero?.subhead || "Verified people, clear protections, simple pickup.";

  // Defaults (no back-compat):
  const qType = (searchParams?.type || "").toString().toLowerCase();
  const defaultRole = ["host", "renter", "both"].includes(qType)
    ? qType
    : city?.defaults?.role || "host";
  const pageSourceBase = `city_${city.id}`;
  const editorial = city?.editorial || {};
  const thingsToDo = Array.isArray(editorial.thingsToDo)
    ? editorial.thingsToDo
    : [];
  const howItWorks =
    Array.isArray(editorial.howItWorks) && editorial.howItWorks.length
      ? editorial.howItWorks
      : [
          {
            step: 1,
            title: "Add a friend",
            desc: "Verify your ID and circle.",
          },
          {
            step: 2,
            title: "Request & confirm",
            desc: "Pick a car, agree on details, lock it in.",
          },
          {
            step: 3,
            title: "Meet & go",
            desc: "Public meetup, quick photos, keys, done.",
          },
        ];
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="relative isolate overflow-hidden rounded-xl mt-8 min-h-[360px]">
        {/* Optional hero background image */}
        {heroBg ? (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src={heroBg}
              alt="" // decorative bg
              fill
              sizes="100vw"
              className="object-cover"
              priority // helps LCP on city pages
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        ) : null}

        <div
          className={`relative px-5 z-10 py-10 sm:py-14 ${
            heroBg ? "text-white" : ""
          }`}
        >
          {badge && (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium drop-shadow-md text-shadow-sm ${
                heroBg
                  ? "border border-white/40 bg-white/10 text-white/95 backdrop-blur"
                  : "border border-brand-300 bg-brand-50 text-brand-900"
              }`}
            >
              {badge}
            </span>
          )}

          <h1
            className={`mt-3 text-4xl font-bold tracking-tight ${
              heroBg ? "text-white text-shadow-lg/30" : "text-brand-900"
            }`}
          >
            {headline}
          </h1>
          <p
            className={`mt-2 text-lg ${
              heroBg ? "text-white/90 text-shadow-md/30" : "text-brand-800"
            }`}
          >
            {subhead}
          </p>

          <div className="mt-6 flex  flex-col gap-3 sm:flex-row ">
            <Button
              href={city.primaryCta?.href || "/#waitlist"}
              ctaId={city.primaryCta?.id || "cta_city_primary"}
              variant="primary"
            >
              {city.primaryCta?.label || `List your car in ${city.cityName}`}
            </Button>
            {city.secondaryCta ? (
              <Button
                href={city.secondaryCta.href}
                ctaId={city.secondaryCta.id}
                variant="custom"
                className="border border-brand-300 text-brand-50 hover:bg-brand-400 text-shadow-sm"
              >
                {city.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* MAKE THE MOST OF {CITY} (flavor list) */}
      {thingsToDo.length > 0 && (
        <section className="py-8">
          <h2 className="text-xl font-semibold text-brand-900">
            Make the most of {city.cityName}
          </h2>
          <ul className="mt-4 space-y-3 px-2 sm:px-0">
            {thingsToDo.map((t, i) => (
              <li key={i} className="leading-snug text-gray-800">
                <span className="mr-2">•</span>
                <span className="font-medium">{t.title}</span>
                {t.desc ? (
                  <span className="text-gray-700"> — {t.desc}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* HOW IT WORKS HERE (cards + icons + app caption) */}
      <section className="py-6">
        <h2 className="text-xl font-semibold text-gray-900">
          How it works here
        </h2>
        <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faMobileScreenButton}
            className="text-[14px] text-brand-600"
            aria-hidden="true"
          />
          <span>All steps happen in the FriendRenter app.</span>
        </div>

        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {howItWorks.map((s, i) => (
            <li key={i} className="list-none">
              <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-card">
                <div className="text-xs font-semibold text-brand-700">
                  Step {s.step ?? i + 1}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={iconForStep(s, i)}
                    className="text-[18px] text-brand-600"
                    aria-hidden="true"
                  />
                  <div className="font-medium text-gray-900">{s.title}</div>
                </div>
                {s.desc ? (
                  <div className="mt-2 text-sm text-gray-700">{s.desc}</div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ (moved up, before form) */}
      {Array.isArray(city.faq) && city.faq.length > 0 ? (
        <section className="py-8">
          <h2 className="text-xl font-semibold text-brand-900">FAQ</h2>
          <div className="mt-4">
            <Accordion items={city.faq} />
          </div>
        </section>
      ) : null}

      {/* GET STARTED (single unified form) */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-brand-900">
          Get started in {city.cityName}
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          Pick your role, add your info, and we’ll follow up for early access.
        </p>
        <div className="mt-4">
          <LeadForm
            defaultRole={defaultRole}
            // Let the form compute pageSource with current radio role:
            pageSourceBase={`city_${city.id}`}
          />
        </div>
      </section>

      {/* SEO: Breadcrumbs */}
      <SeoJsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${siteUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cities",
              item: `${siteUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: `${city.cityName}, ${city.state}`,
              item: `${siteUrl}/city/${city.id}`,
            },
          ],
        }}
      />
    </div>
  );
}
