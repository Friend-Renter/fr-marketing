import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import { faqJsonLd } from "@/lib/seo";
import SeoJsonLd from "@/components/SeoJsonLd";
import Button from "@/components/ui/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup, // if this errors, use faUsers
  faShield, // ⟵ replace faShieldCheck
  faReceipt,
  faClock,
  faListOl,
  faCircleCheck,
  faCamera,
  faGauge,
  faLocationDot, // if this errors, use faMapMarkerAlt
  faIdCard,
  faHandHoldingDollar,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const hostFaq = [
  {
    q: "How do payouts work?",
    a: "Weekly batches; funds typically land 2–3 business days after the trip completes.",
  },
  {
    q: "What if a renter returns the car late or dirty?",
    a: "Submit time-stamped photos at check-in/out. Late/cleaning fees can be passed through per policy.",
  },
  {
    q: "Who pays for fuel?",
    a: "Renters refuel to the original level. If not, a refueling fee applies.",
  },
  {
    q: "Can I set mileage limits?",
    a: "Yes—set per-listing mileage caps and disclose clearly in your rules.",
  },
  {
    q: "What screening happens?",
    a: "Government ID + selfie match, plus fraud checks before booking.",
  },
  {
    q: "Do I choose deposits and age?",
    a: "Yes. You can set a deposit (or none) and a minimum age. Platform minimum is 18+.",
  },
  {
    q: "Do I need special insurance?",
    a: "Baseline protections apply; local requirements can vary. We’ll guide you during onboarding.",
  },
];

export const metadata = {
  title: "For Hosts | FriendRenter",
  description:
    "Host to friends, stay in control. Approvals, deposits, check-in/out photos, and fast payouts after trips.",
};

export default function HostsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO (text-first w/ soft gradient + faint pattern) */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-brand-50 to-zinc-50 p-6 md:p-10">
        {/* faint brand dots pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-brand-100"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.95))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.95))",
          }}
        />
        {/* subtle glow accent in corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl"
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Host to friends. Stay in control.
          </h1>
          <p className="mt-2 text-gray-700">
            Approve who can book. Set your rate, deposit, and minimum age. Photo
            check-in/out keeps it friendly and documented.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href="#lead" variant="primary" ctaId="cta_hosts_hero">
              Host early access
            </Button>
            <Link
              href="#how"
              className="rounded-md px-4 py-2 text-sm font-medium text-brand-700 hover:underline"
            >
              How it works
            </Link>
          </div>

          {/* quick chips */}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {[
              { icon: faUserGroup, label: "Friends-only requests" },
              { icon: faShield, label: "ID + fraud checks" }, // using faShield per your version
              { icon: faReceipt, label: "Receipts & paper trail" },
            ].map((c, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-brand-800 ring-1 ring-brand-100 backdrop-blur"
              >
                <FontAwesomeIcon icon={c.icon} className="h-4 w-4" />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mt-10 grid gap-6 md:grid-cols-4">
        {[
          {
            icon: faUserGroup,
            t: "Friends-only booking",
            d: "No random requests. You approve first.",
          },
          {
            icon: faHandHoldingDollar,
            t: "Owner control",
            d: "You set rate, deposit, and minimum age (18+ platform minimum).",
          },
          {
            icon: faCamera,
            t: "Check-in/out photos",
            d: "Timestamped photos, odometer, and notes protect both sides.",
          },
          {
            icon: faClock,
            t: "Fast payouts",
            d: "Weekly batches; typically 2–3 business days after trip end.",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <FontAwesomeIcon icon={c.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900">{c.t}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">{c.d}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mt-12 scroll-mt-22 md:scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900">
          How hosting works
        </h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              step: 1,
              icon: faCamera,
              t: "Create your listing",
              d: "Add clear exterior/interior photos and basics.",
            },
            {
              step: 2,
              icon: faListOl,
              t: "Set rules & details",
              d: "Availability, pickup spot, mileage limits, and house rules.",
            },
            {
              step: 3,
              icon: faUserShield,
              t: "Approve friends",
              d: "Only verified friends can request; you tap accept.",
            },
            {
              step: 4,
              icon: faReceipt,
              t: "Check-in/out + receipts",
              d: "Photos, odometer, notes; receipts create a clean paper trail.",
            },
            {
              step: 5,
              icon: faHandHoldingDollar,
              t: "Get paid",
              d: "Payouts batch weekly; funds typically arrive 2–3 business days after trip end. Deposits release if no issues.",
            },
          ].map((c, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-brand-700">
                  Step {c.step}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-50 text-brand-700">
                  <FontAwesomeIcon icon={c.icon} className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                {c.t}
              </h3>
              <p className="mt-1 text-sm text-gray-700">{c.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PROTECTION & PAPER TRAIL */}
      <section className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-gray-900">
          Protections & the paper trail
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: faIdCard,
              t: "Verification",
              d: "Government ID + selfie match and fraud checks before booking.",
            },
            {
              icon: faUserShield,
              t: "You’re in control",
              d: "Approve who can book. Set deposits and minimum age.",
            },
            {
              icon: faCamera,
              t: "Evidence built-in",
              d: "Timestamped photos and notes at check-in/out keep things clear.",
            },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <FontAwesomeIcon icon={c.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{c.t}</h3>
                <p className="mt-1 text-sm text-gray-700">{c.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mini frames */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: faCamera,
              t: "Check-in",
              d: "Exterior, interior & fuel/odometer photos when handing off.",
            },
            {
              icon: faGauge,
              t: "During",
              d: "Optional mid-trip notes/photos if something comes up.",
            },
            {
              icon: faReceipt,
              t: "Check-out",
              d: "Return photos + auto receipt for a clear wrap-up.",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-2 text-brand-700">
                <FontAwesomeIcon icon={c.icon} className="h-4 w-4" />
                <span className="text-sm font-semibold">{c.t}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MONEY & RULES */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: faHandHoldingDollar,
            t: "Platform fee",
            d: "~15% of booking (covers support, payments, KYC).",
          },
          {
            icon: faClock,
            t: "Payout speed",
            d: "Weekly batches; funds typically arrive 2–3 business days after trip end.",
          },
          {
            icon: faCircleCheck,
            t: "Pass-through fees",
            d: "Cleaning, late return, and refuel fees can be charged per policy.",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <FontAwesomeIcon icon={c.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900">{c.t}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">{c.d}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Host FAQ</h2>
        <div className="mt-4">
          <Accordion items={hostFaq} page="hosts" />
        </div>
        <SeoJsonLd json={faqJsonLd(hostFaq)} />
      </section>

      {/* LEAD FORM */}
      <section id="lead" className="mt-12 max-w-xl">
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
