import Link from "next/link";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";

export const metadata = {
  title: "FR — Local car rentals made simple",
  description: "Verified people, fair prices, no counter lines.",
  openGraph: {
    images: [
      `/og?title=${encodeURIComponent(
        "Local car rentals made simple"
      )}&subtitle=${encodeURIComponent(
        "Verified people • Fair prices • No counter lines"
      )}`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      `/og?title=${encodeURIComponent(
        "Local car rentals made simple"
      )}&subtitle=${encodeURIComponent(
        "Verified people • Fair prices • No counter lines"
      )}`,
    ],
  },
};

const homeFaq = [
  {
    q: "Do you verify renters and hosts?",
    a: "Yes. We use third-party KYC to verify ID and reduce fraud.",
  },
  {
    q: "Is there a deposit?",
    a: "A temporary hold (e.g., $200–$300) is released after return if no issues.",
  },
  {
    q: "How do payouts work for hosts?",
    a: "Weekly payouts, typically 2–3 business days after trip end.",
  },
  {
    q: "What’s covered?",
    a: "See Safety for coverage overview in plain English.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-14">
        <h1 className="text-4xl font-bold text-gray-900">
          Local car rentals made simple.
        </h1>
        <p className="mt-3 max-w-2xl text-gray-700">
          Verified people, fair prices, no counter lines.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/hosts">
            <Button ctaId="cta_home_primary" variant="primary">
              List your car
            </Button>
          </Link>
          <Link href="/renters">
            <Button ctaId="cta_home_secondary" variant="outline">
              Find a rental
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          Verified IDs • Secure payments • Local support
        </div>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-3">
        {[
          {
            t: "Keep more of your earnings",
            d: "Transparent fees and weekly payouts.",
          },
          {
            t: "Verified community",
            d: "Government ID + fraud checks before booking.",
          },
          { t: "No counter lines", d: "Contactless pickup options available." },
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

      <section className="py-8">
        <h2 className="text-xl font-semibold text-gray-900">Cities</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link
            href="/city/lincoln-ne"
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-card hover:border-brand-300"
          >
            <div className="font-medium text-gray-900">Lincoln, NE</div>
            <div className="text-sm text-gray-700">
              Quick pickup near Haymarket and UNL.
            </div>
          </Link>
          <Link
            href="/city/omaha-ne"
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-card hover:border-brand-300"
          >
            <div className="font-medium text-gray-900">Omaha, NE</div>
            <div className="text-sm text-gray-700">
              Meet at Eppley area, Old Market, or Midtown.
            </div>
          </Link>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
        <div className="mt-4">
          <Accordion items={homeFaq} />
        </div>
      </section>

      <section className="py-14">
        <div className="rounded-lg bg-brand-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Ready to roll?
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Get verified in minutes and book with confidence.
          </p>
          <div className="mt-4">
            <Link href="/renters">
              <Button ctaId="cta_home_get_started" variant="primary">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
