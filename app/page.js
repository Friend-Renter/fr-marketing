import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import heroimage from "../public/brand/heroimagedesktop.png";

export const metadata = {
  title: "FriendRenter™ — Local car rentals made simple",
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
    <div className="">
      {/* HERO — full-bleed background with overlay */}

      <section
        className="relative isolate min-h-[75vh] sm:min-h-[80vh]"
        id="hero"
      >
        {/* Sentinels for header intersection logic (1px so IO can intersect) */}
        <div
          id="hero-sentinel-start"
          aria-hidden="true"
          className="h-px w-full opacity-0 pointer-events-none"
        />

        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroimage}
            alt=""
            priority
            fill
            sizes="(max-width: 640px) 100vw, 100vw"
            className="object-cover object-center md:object-[center_40%]"
          />
          <div className="absolute inset-0 hero-overlay" aria-hidden />
        </div>

        {/* Content */}
        <div className="mx-auto flex min-h-[75vh] sm:min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Local car rentals made simple.
            </h1>
            <p className="mt-4 max-w-prose text-base text-white/90 sm:text-lg">
              Verified people, fair prices, no counter lines.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Join the Waitlist
              </Link>
              <Link
                href="#become-host"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-white/90 ring-1 ring-inset ring-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Become a Host
              </Link>
            </div>

            {/* Social proof / location teaser (optional lightweight) */}
            <p className="mt-6 text-xs text-white/70">
              Launching soon — be first in line in your city.
            </p>
          </div>
        </div>
        {/* End sentinel MUST be the last child inside #hero */}
        <div
          id="hero-sentinel-end"
          aria-hidden="true"
          className="h-px w-full opacity-0 pointer-events-none"
        />
      </section>

      {/* HOW IT WORKS (Renters + Hosts) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
              How it works for renters
            </h2>
            <ul className="mt-6 space-y-4 text-zinc-300">
              <li>
                <span className="font-medium text-emerald-400">
                  Verify once
                </span>
                — keep the community safe.
              </li>
              <li>
                <span className="font-medium text-emerald-400">
                  Book in minutes
                </span>
                — local pickup, no counters.
              </li>
              <li>
                <span className="font-medium text-emerald-400">Drive away</span>
                — simple hand-off, clear return.
              </li>
            </ul>
          </div>

          <div id="become-host">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Earn with your car
            </h2>
            <ul className="mt-6 space-y-4 text-zinc-300">
              <li>
                <span className="font-medium text-emerald-400">
                  List your car
                </span>
                — set availability & pickup details.
              </li>
              <li>
                <span className="font-medium text-emerald-400">
                  Get verified guests
                </span>
                — you’re always in control.
              </li>
              <li>
                <span className="font-medium text-emerald-400">
                  Hand off & get paid
                </span>
                — smooth check-in / check-out.
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Join host waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="grid gap-6 py-8 md:grid-cols-3 mx-auto max-w-7xl">
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
      {/* CITIES */}
      <section className="py-8 mx-auto max-w-7xl">
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

      {/* FAQS */}
      <section className="py-10 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
        <div className="mt-4">
          <Accordion items={homeFaq} />
        </div>
      </section>
      {/* LIIL BANNER */}
      <section className="py-14 mx-auto max-w-7xl">
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
      {/* WAITLIST FORM (anchor only; plug in your component or keep simple form) */}
      <section
        id="waitlist"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Be first in line
        </h2>
        <p className="mt-2 text-zinc-300">
          Tell us how you’d like to use FriendRenter. We’ll email next steps
          soon.
        </p>

        <LeadForm defaultRole="host" pageSource="landing" />
      </section>
    </div>
  );
}
