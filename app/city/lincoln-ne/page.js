import { getCitySlugs, getCityContent } from "@/lib/content";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";

export async function generateStaticParams() {
  return getCitySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const city = getCityContent(params.slug);
  return {
    title: city?.seo?.title ?? `${city.cityName} car rentals | FR`,
    description: city?.seo?.metaDescription ?? "",
    alternates: { canonical: city?.seo?.canonicalPath ?? `/city/${city.id}` },
  };
}

export default function CityPage({ params }) {
  const city = getCityContent(params.slug);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-12">
        <h1 className="text-3xl font-bold text-gray-900">{city.hero.headline}</h1>
        <p className="mt-2 text-gray-700">{city.hero.subhead}</p>
        <div className="mt-6 flex gap-3">
          <Link href={city.primaryCta.href}>
            <Button variant="primary">{city.primaryCta.label}</Button>
          </Link>
          {city.secondaryCta && (
            <Link href={city.secondaryCta.href}>
              <Button variant="outline">{city.secondaryCta.label}</Button>
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-3">
        {city.valueProps.map((v, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
            <h3 className="font-semibold text-gray-900">{v.title}</h3>
            <p className="mt-1 text-sm text-gray-700">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="py-8">
        <h2 className="text-xl font-semibold text-gray-900">How pickup works here</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {city.howItWorksLocal.map((s) => (
            <div key={s.step} className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
              <div className="text-xs font-semibold text-brand-700">Step {s.step}</div>
              <div className="mt-1 font-medium text-gray-900">{s.title}</div>
              <div className="mt-1 text-sm text-gray-700">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-xl font-semibold text-gray-900">Popular pickup areas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {city.pickupAreas.map((a, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
              <div className="font-medium text-gray-900">{a.name}</div>
              <div className="text-sm text-gray-700">{a.tip}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
        <div className="mt-4">
          <Accordion items={city.faq} />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-xl font-semibold text-gray-900">Get started in {city.cityName}</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900">Hosts</h3>
            <p className="mt-1 text-sm text-gray-700">List your car and start earning.</p>
            <div className="mt-3">
              <LeadForm type="host" citySlug={city.id} />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Renters</h3>
            <p className="mt-1 text-sm text-gray-700">Join the waitlist for {city.cityName}.</p>
            <div className="mt-3">
              <LeadForm type="renter" citySlug={city.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
