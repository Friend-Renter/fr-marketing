import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import { faqJsonLd } from "@/lib/seo";
import SeoJsonLd from "@/components/SeoJsonLd";

const hostFaq = [
  {
    q: "How do payouts work?",
    a: "Weekly payouts to your bank, typically 2–3 business days after trip end.",
  },
  {
    q: "What if a renter returns the car late or dirty?",
    a: "Submit time-stamped photos. Late/cleaning fees can be charged per policy.",
  },
  {
    q: "Who pays for fuel?",
    a: "Renter replaces fuel; otherwise refueling fee applies.",
  },
  {
    q: "Can I set mileage limits?",
    a: "Yes. Set limits per listing and disclose clearly.",
  },
  {
    q: "What screening happens?",
    a: "Government ID, selfie match, and fraud checks before booking.",
  },
];

export const metadata = {
  title: "For Hosts | FR",
  description:
    "Turn your car into income—on your terms. Protections, payouts, and simple onboarding.",
};

export default function HostsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Turn your car into income—on your terms.
      </h1>
      <p className="mt-2 text-gray-700">
        Transparent fees, weekly payouts, and verified renters.
      </p>

      {/* Earnings snapshot */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            t: "Typical sedan (2018–2021)",
            d: "2–3 days/week could net ~$300–$600/mo after fees. Varies by demand.",
          },
          {
            t: "Protections & screening",
            d: "ID & fraud checks, trip photos, and deposits on every booking.",
          },
          {
            t: "Payouts timeline",
            d: "Funds settle typically 2–3 business days after trip completion.",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
          >
            <h3 className="font-semibold text-gray-900">{c.t}</h3>
            <p className="mt-1 text-sm text-gray-700">{c.d}</p>
          </div>
        ))}
      </section>

      {/* Fees table */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Fees (example)</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="border-b border-gray-200 px-3 py-2">Item</th>
                <th className="border-b border-gray-200 px-3 py-2">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr>
                <td className="border-b border-gray-200 px-3 py-2">
                  Platform fee
                </td>
                <td className="border-b border-gray-200 px-3 py-2">
                  ~15% of booking (covers support, payments, KYC)
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-3 py-2">
                  Cleaning & late
                </td>
                <td className="border-b border-gray-200 px-3 py-2">
                  Pass-through to renter when applicable
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">Payout speed</td>
                <td className="px-3 py-2">
                  Weekly batches; 2–3 business days after trip end
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Onboarding checklist */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">
          Get listed in 4 steps
        </h2>
        <ol className="mt-3 grid gap-4 md:grid-cols-2">
          {[
            "Upload clear photos (exterior + interior).",
            "Provide registration and proof of insurance.",
            "Set availability, pickup spot, and house rules.",
            "Add bank details for payouts.",
          ].map((item, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
            >
              <span className="text-xs font-semibold text-brand-700">
                Step {i + 1}
              </span>
              <div className="mt-1 text-sm text-gray-800">{item}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Host FAQ</h2>
        <div className="mt-4">
          <Accordion items={hostFaq} page="hosts" />
        </div>
        <SeoJsonLd json={faqJsonLd(hostFaq)} />
      </section>

      {/* Lead form */}
      <section className="mt-10 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">
          Tell us about your car
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          We’ll follow up with next steps.
        </p>
        <div className="mt-4">
          <LeadForm defaultRole="host" pageSource="hosts" />
        </div>
      </section>
    </div>
  );
}
