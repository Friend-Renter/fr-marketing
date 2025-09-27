// app/city/[slug]/page.jsx
import { getCitySlugs, getCityContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import SeoJsonLd from "@/components/SeoJsonLd";
import Image from "next/image";
import { notFound } from "next/navigation";

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

export default async function CityPage({ params }) {
  const { slug } = await params; // ✅ await the Params object
  const city = getCityContent(slug);
  if (!city) return notFound();
  console.log("heroBg:", city?.hero?.bgImage);
  const heroBg = city?.hero?.bgImage;
  const badge = city?.hero?.badge || "Friends-first rentals";
  const headline =
    city?.hero?.headline || `${city.cityName} car rentals — friends only.`;
  const subhead =
    city?.hero?.subhead || "Verified people, clear protections, simple pickup.";

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

      {/* WHY HERE / VALUE PROPS */}
      {Array.isArray(city.valueProps) && city.valueProps.length > 0 ? (
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {city.valueProps.map((v, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-card"
            >
              <h3 className="font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-700">{v.desc}</p>
            </div>
          ))}
        </section>
      ) : null}

      {/* HOW PICKUP WORKS LOCALLY */}
      {Array.isArray(city.howItWorksLocal) &&
      city.howItWorksLocal.length > 0 ? (
        <section className="py-10">
          <h2 className="text-xl font-semibold text-gray-900">
            How pickup works here
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {city.howItWorksLocal.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
              >
                <div className="text-xs font-semibold text-brand-700">
                  Step {s.step ?? i + 1}
                </div>
                <div className="mt-1 font-medium text-gray-900">{s.title}</div>
                <div className="mt-1 text-sm text-gray-700">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* POPULAR PICKUP AREAS */}
      {Array.isArray(city.pickupAreas) && city.pickupAreas.length > 0 ? (
        <section className="py-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Popular pickup areas
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {city.pickupAreas.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
              >
                <div className="font-medium text-gray-900">{a.name}</div>
                <div className="text-sm text-gray-700">{a.tip}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {Array.isArray(city.faq) && city.faq.length > 0 ? (
        <section className="py-8">
          <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
          <div className="mt-4">
            <Accordion items={city.faq} />
          </div>
        </section>
      ) : null}

      {/* GET STARTED (FORMS) */}
      <section className="py-12">
        <h2 className="text-xl font-semibold text-gray-900">
          Get started in {city.cityName}
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900">Hosts</h3>
            <p className="mt-1 text-sm text-gray-700">
              List your car and start earning with your circle.
            </p>
            <div className="mt-3">
              <LeadForm
                defaultRole="host"
                pageSource={`city_${city.id}_host`}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Renters</h3>
            <p className="mt-1 text-sm text-gray-700">
              Join the waitlist for {city.cityName}.
            </p>
            <div className="mt-3">
              <LeadForm
                defaultRole="renter"
                pageSource={`city_${city.id}_renter`}
              />
            </div>
          </div>
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
