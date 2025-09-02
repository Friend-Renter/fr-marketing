import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqJsonLd } from "@/lib/seo";

const renterFaq = [
  { q: "Minimum age and ID?", a: "Minimum age 21 (example). Valid license and ID verification required." },
  { q: "Deposit release timing?", a: "Temporary hold (e.g., $200–$300) released after return if no issues." },
  { q: "Can I extend my trip?", a: "Yes, if the car’s available. Request in advance." },
  { q: "Mileage limits?", a: "Shown on each listing; confirm with the host if unsure." },
  { q: "Fuel & cleaning policy?", a: "Return with the same fuel level and reasonable cleanliness." },
];

export const metadata = {
  title: "For Renters | FR",
  description: "Skip the counter. Book local, verified cars. Requirements, pricing, and pickup walkthrough.",
};

export default function RentersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Skip the counter. Book local, verified cars.</h1>
      <p className="mt-2 text-gray-700">Simple requirements, transparent pricing, and quick pickup.</p>

      {/* Requirements */}
      <section className="mt-8 grid gap-6 md:grid-cols-4">
        {[
          { t: "Valid license", d: "U.S. driver’s license—unexpired." },
          { t: "ID verification", d: "Government ID & selfie check." },
          { t: "Refundable hold", d: "Temporary deposit hold during the trip." },
          { t: "Major card", d: "Visa, Mastercard, etc." },
        ].map((c, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
            <h3 className="font-semibold text-gray-900">{c.t}</h3>
            <p className="mt-1 text-sm text-gray-700">{c.d}</p>
          </div>
        ))}
      </section>

      {/* Pricing overview */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Pricing (example)</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-800">
          <li>Daily rate set by host (varies by car and date)</li>
          <li>Service fee ~10% (processing & support)</li>
          <li>Refundable deposit hold (e.g., $200–$300)</li>
        </ul>
      </section>

      {/* Pickup/return */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Pickup & return</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {[
            { t: "Meet at a public spot", d: "Garage or lot chosen by your host." },
            { t: "Quick verification", d: "Show your verified ID and do a few photos." },
            { t: "Return & confirm", d: "Fuel, odometer, exterior pics—then handoff." },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
              <div className="text-xs font-semibold text-brand-700">Step {i + 1}</div>
              <div className="mt-1 font-medium text-gray-900">{s.t}</div>
              <div className="mt-1 text-sm text-gray-700">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Renter FAQ</h2>
        <div className="mt-4">
          <Accordion items={renterFaq} page="renters" />
        </div>
        <SeoJsonLd json={faqJsonLd(renterFaq)} />
      </section>

      {/* Waitlist form */}
      <section className="mt-10 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Join the waitlist</h2>
        <p className="mt-1 text-sm text-gray-700">We’ll notify you when cars are available in your area.</p>
        <div className="mt-4">
          <LeadForm type="renter" />
        </div>
      </section>
    </div>
  );
}
