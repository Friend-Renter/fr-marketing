import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqJsonLd } from "@/lib/seo";
import Button from "@/components/ui/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,            // friends-only / community
  faShield,           // verification/protection
  faIdCard,           // ID verification
  faCamera,           // check-in/out photos
  faReceipt,          // receipts / paper trail
  faClock,            // timing
  faCreditCard,       // payment card
  faHandHoldingDollar,// deposit/payout concepts
  faCarSide,          // cars / driving
  faMapMarkerAlt,     // pickup location
  faCircleCheck,      // confirmations
} from "@fortawesome/free-solid-svg-icons";

const renterFaq = [
  {
    q: "Minimum age and ID?",
    a: "Platform minimum is 18+. Some hosts may set a higher minimum. You’ll need a valid, unexpired driver’s license and to pass ID + selfie verification.",
  },
  {
    q: "Deposit release timing?",
    a: "It’s a temporary hold (e.g., $200–$300) and is released after return if there are no issues. Your bank’s release window may vary.",
  },
  {
    q: "Can I extend my trip?",
    a: "Usually—if the car is available. Request the extension early so your host can approve it.",
  },
  {
    q: "Mileage limits?",
    a: "Shown on each listing. If unsure, message your host before booking.",
  },
  {
    q: "Fuel & cleaning policy?",
    a: "Return with the same fuel level and reasonable cleanliness. Otherwise, pass-through fees may apply per host rules.",
  },
  {
    q: "What if something comes up during the trip?",
    a: "Message your host in-app and add a quick photo note if it helps. The paper trail keeps things clear.",
  },
];

export const metadata = {
  title: "For Renters | FriendRenter",
  description:
    "Book from friends. Verified IDs, upfront pricing, quick pickup with photo check-in/out, and simple deposit holds.",
};

export default function RentersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO (text-first w/ soft gradient + faint pattern) */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-brand-50 to-zinc-50 p-6 md:p-10">
        {/* faint brand dots pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-brand-100"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
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
            Book from friends. Skip the counter.
          </h1>
          <p className="mt-2 text-gray-700">
            Verified IDs, upfront pricing, and quick pickup with photo check-in/out.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href="#lead" variant="primary" ctaId="cta_renters_hero">
              Join waitlist
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
              { icon: faShield, label: "Verified ID" },
              { icon: faHandHoldingDollar, label: "Upfront pricing" },
              { icon: faCamera, label: "Check-in/out photos" },
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
            icon: faMapMarkerAlt,
            t: "Local & flexible",
            d: "Meet nearby—no airport counter or long lines.",
          },
          {
            icon: faUsers,
            t: "Friends-only access",
            d: "Hosts approve who can book. No random requests.",
          },
          {
            icon: faHandHoldingDollar,
            t: "Upfront pricing",
            d: "Rate and fees shown clearly. Deposits are temporary holds.",
          },
          {
            icon: faReceipt,
            t: "Paper trail built-in",
            d: "Photos, odometer, and receipts keep things clear.",
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

      {/* HOW IT WORKS (renter view, 5 steps) */}
      <section id="how" className="mt-12 scroll-mt-22 md:scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900">How it works</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              step: 1,
              icon: faIdCard,
              t: "Verify & browse",
              d: "ID + selfie match, then browse available cars near you.",
            },
            {
              step: 2,
              icon: faUsers,
              t: "Request to book",
              d: "Hosts approve friends—once accepted, you’re set.",
            },
            {
              step: 3,
              icon: faMapMarkerAlt,
              t: "Meet & check-in",
              d: "Public spot chosen by your host. Do quick photos together.",
            },
            {
              step: 4,
              icon: faCarSide,
              t: "Enjoy the trip",
              d: "Drive. Message your host if anything comes up.",
            },
            {
              step: 5,
              icon: faReceipt,
              t: "Return & wrap-up",
              d: "Fuel + odometer photos. Deposit hold is released if there are no issues.",
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
              <h3 className="mt-2 text-sm font-semibold text-gray-900">{c.t}</h3>
              <p className="mt-1 text-sm text-gray-700">{c.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="mt-12 scroll-mt-22 md:scroll-mt-24">
   <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
   <div className="mt-4 grid gap-6 md:grid-cols-4">
     {[
          { icon: faIdCard, t: "Valid license", d: "Unexpired driver’s license." },
          { icon: faShield, t: "ID verification", d: "Government ID + selfie check." },
          { icon: faCreditCard, t: "Payment card", d: "Major credit/debit card." },
          {
            icon: faHandHoldingDollar,
            t: "Refundable hold",
            d: "Temporary deposit hold during the trip.",
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
   </div>
 </section>

      {/* PRICING (compact cards) */}
      {/* PRICING (compact cards) */}
 <section id="pricing" className="mt-12 scroll-mt-22 md:scroll-mt-24">
   <h2 className="text-xl font-semibold text-gray-900">Pricing & deposits</h2>
   <div className="mt-4 grid gap-6 md:grid-cols-3">
     {[
          {
            icon: faHandHoldingDollar,
            t: "Daily rate (host-set)",
            d: "Varies by car and date—shown upfront before booking.",
          },
          {
            icon: faClock,
            t: "Service fee (~10%)",
            d: "Processing & support, displayed clearly at checkout.",
          },
          {
            icon: faReceipt,
            t: "Refundable hold",
            d: "Example $200–$300. Released after return if no issues.",
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
   </div>
 </section>

      {/* PICKUP & RETURN */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Pickup & return</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Meet at a public spot",
              d: "Garage or lot chosen by your host.",
              icon: faMapMarkerAlt,
            },
            {
              t: "Quick verification",
              d: "Show your verified ID and do a few photos.",
              icon: faIdCard,
            },
            {
              t: "Return & confirm",
              d: "Fuel, odometer, exterior pics—then handoff.",
              icon: faCamera,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
            >
              <div className="text-xs font-semibold text-brand-700">Step {i + 1}</div>
              <div className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                <FontAwesomeIcon icon={s.icon} className="h-4 w-4 text-brand-700" />
                {s.t}
              </div>
              <div className="mt-1 text-sm text-gray-700">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Renter FAQ</h2>
        <div className="mt-4">
          <Accordion items={renterFaq} page="renters" />
        </div>
        <SeoJsonLd json={faqJsonLd(renterFaq)} />
      </section>

      {/* WAITLIST FORM */}
      <section id="lead" className="mt-12 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Join the waitlist</h2>
        <p className="mt-1 text-sm text-gray-700">
          We’ll notify you when cars are available in your area.
        </p>
        <div className="mt-4">
          <LeadForm defaultRole="renter" pageSource="renters" />
        </div>
      </section>
    </div>
  );
}
