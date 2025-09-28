// app/why-friendrenter/page.tsx
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faShieldHalved,
  faCircleCheck,
  faClipboardList,
  faCamera,
  faLifeRing,
  faIdCard,
  faReceipt,
  faListOl,
  faGaugeHigh,
  faCheck,
  faXmark,
  faMobileScreen,
  faComments,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const metadata = {
  title: "Why FriendRenter — Friends-first vehicle sharing",
  description:
    "See how FriendRenter works: friends-only approvals, verification, clear protections, and mobile-first booking. Add → accept → book.",
};

/* ---------------------------------- */
/* Small shared UI bits (JSX only)    */
/* ---------------------------------- */

function SectionHeader({ eyebrow, title, subtitle, align = "center", id }) {
  return (
    <header id={id} className={align === "left" ? "text-left" : "text-center"}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-wider text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-brand-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-brand-800 leading-relaxed">{subtitle}</p>
      ) : null}
    </header>
  );
}

function AnchorNav() {
  const items = [
    { href: "#what", label: "What" },
    { href: "#how", label: "How it works" },
    { href: "#trust", label: "Trust & safety" },
    { href: "#paper-trail", label: "Paper trail" },
    { href: "#coverage", label: "Coverage & deposits" },
    { href: "#compare", label: "Compare" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <nav className="sticky top-14 z-10 overflow-x-auto border-b border-zinc-200 bg-white/70 px- py-2 backdrop-blur sm:mx-0 ">
      <ul className="flex gap-4 text-base ">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              className="text-brand-800 hover:text-brand-900 whitespace-nowrap pr-"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function IconBullets({ items }) {
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-3">
      {items.map((it, i) => (
        <li key={i} className="rounded-lg border border-zinc-200 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <FontAwesomeIcon
                icon={it.icon}
                className="h-5 w-5 text-brand-700"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{it.label}</h3>
              <p className="mt-1 text-gray-700">{it.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StepList({ heading, steps, ctaHref, ctaId }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-5">
      <h3 className="text-base font-semibold text-gray-900">{heading}</h3>
      <ol className="mt-3 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-brand-200 text-xs font-semibold text-brand-800">
              {i + 1}
            </div>
            <div>
              <p className="font-medium text-gray-900">{s.title}</p>
              <p className="text-gray-700">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4">
        <Button
          href={ctaHref}
          variant="custom"
          className="border border-brand-50 text-brand-700 hover:bg-brand-50"
          prefetch={false}
          ctaId={ctaId}
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}

function PillarGrid({ items }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((p, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 p-4 text-center"
        >
          <FontAwesomeIcon icon={p.icon} className="h-6 w-6 text-brand-700" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {p.title}
          </h3>
          <p className="mt-1 text-sm text-gray-700">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

function CompareTable({ columns, rows }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="px-3 py-2 text-left font-semibold text-gray-900">
              Feature
            </th>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-3 py-2 text-left font-semibold text-gray-900"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-zinc-100">
              <td className="px-3 py-3 font-medium text-gray-900">
                {r.feature}
              </td>
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-3 text-gray-800">
                  <span className="inline-flex items-center gap-2">
                    {typeof r[c.key] === "boolean" ? (
                      r[c.key] ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="h-4 w-4 text-brand-700"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="h-4 w-4 text-zinc-400"
                        />
                      )
                    ) : (
                      r[c.key]
                    )}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FramesStrip({ frames }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3">
      {frames.map((f, i) => (
        <div key={i} className="rounded-lg border border-zinc-200 p-4">
          {/* Icon badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
              <FontAwesomeIcon
                icon={f.icon}
                className="h-5 w-5 text-brand-700"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{f.caption}</h3>
          </div>

          {/* Bullets */}
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            {f.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="mt-1 h-4 w-4 text-brand-700"
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InlineCtas() {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Button
        href="/#waitlist?type=host"
        variant="primary"
        ctaId="cta_why_inline_host"
        prefetch={false}
      >
        Host early access
      </Button>
      <Button
        href="/#waitlist?type=renter"
        variant="outline"
        ctaId="cta_why_inline_renter"
        prefetch={false}
      >
        Renter early access
      </Button>
    </div>
  );
}

export default function WhyFriendRenterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">
          Why FriendRenter
        </h1>
        <p className="mt-3 text-lg text-brand-800">
          Friends-first rentals for cars, boats, jet skis, and more — with trust
          built in.
        </p>
        <p className="mt-1 text-brand-700">
          Rent from your circle, not random strangers. Hosts approve,
          verification checks run, and every booking has a clear paper trail.
        </p>

        {/* Simple visual placeholder */}
        {/* Flow chips: Add → Accept → Book */}
        <div className="mx-auto mt-6 max-w-3xl">
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            role="list"
            aria-label="How it works: Add, Accept, Book"
          >
            <span
              role="listitem"
              aria-label="Step 1: Add host"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-sm text-zinc-700 shadow-sm"
            >
              <FontAwesomeIcon
                icon={faUsers}
                className="h-4 w-4 text-brand-700"
              />
              <span className="font-medium text-gray-900">Add host</span>
            </span>

            <span className="hidden text-zinc-400 sm:inline">→</span>

            <span
              role="listitem"
              aria-label="Step 2: Get accepted"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-sm text-zinc-700 shadow-sm"
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="h-4 w-4 text-brand-700"
              />
              <span className="font-medium text-gray-900">Get accepted</span>
            </span>

            <span className="hidden text-zinc-400 sm:inline">→</span>

            <span
              role="listitem"
              aria-label="Step 3: Book & go"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-sm text-zinc-700 shadow-sm"
            >
              <FontAwesomeIcon
                icon={faReceipt}
                className="h-4 w-4 text-brand-700"
              />
              <span className="font-medium text-gray-900">Book & go</span>
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-row items-center justify-center gap-3">
          <Button
            href="/#waitlist"
            variant="primary"
            ctaId="cta_why_host"
            prefetch={false}
          >
            Join Early Access
          </Button>{" "}
          <Button
            href="/#waitlist"
            variant="outline"
            ctaId="cta_why_host"
            prefetch={false}
          >
            Contact Us
          </Button>
        </div>
      </header>

      {/* Anchor nav */}
      <div className="mt-8">
        <AnchorNav />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* WHAT */}
        <section className="mt-10 scroll-mt-18 md:scroll-mt-10" id="what">
          <SectionHeader
            eyebrow="What we are"
            title="A friends-only way to share vehicles locally"
            subtitle="Keep it in your circle. Simple mobile booking, owner control on rates, deposits, and renter age."
            align="left"
          />
          <IconBullets
            items={[
              {
                icon: faUsers,
                label: "Friends-only access",
                body: "Hosts approve who can book. No random requests flooding your inbox.",
              },
              {
                icon: faShieldHalved,
                label: "Trust built-in",
                body: "KYC/ID checks, approvals, and check-in/out evidence inside the flow.",
              },
              {
                icon: faHandHoldingDollar,
                label: "Owner control",
                body: "You set rates, deposits, and age minimums for your vehicles.",
              },
            ]}
          />
          <p className="mt-3 text-sm text-brand-700">
            Note: Hosts decide deposits & renter age; platform minimum is 18+.
          </p>
        </section>

        {/* HOW */}
        <section className="mt-14 scroll-mt-18 md:scroll-mt-10" id="how">
          <SectionHeader
            eyebrow="How it works"
            title="Two simple flows"
            subtitle="Hosts control listings and approvals. Renters add, request, book. Everyone checks in/out."
            align="left"
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <StepList
              heading="For Hosts"
              ctaHref="/hosts"
              ctaId="cta_why_how_host"
              steps={[
                {
                  title: "Create your listing",
                  body: "Share photos and details. Verification (18+) is required to host.",
                },
                {
                  title: "Set your rules",
                  body: "Choose daily rate, deposit, and minimum renter age.",
                },
                {
                  title: "Approve friends",
                  body: "Only your approved people can book your vehicle.",
                },
                {
                  title: "Check-in / check-out",
                  body: "Capture photos, odometer, and notes for a clean paper trail.",
                },
                {
                  title: "Fast payouts",
                  body: "Weekly batches; typically 2–3 business days after trip end.",
                },
              ]}
            />
            <StepList
              heading="For Renters"
              ctaHref="/renters"
              ctaId="cta_why_how_renter"
              steps={[
                {
                  title: "Add the host",
                  body: "Send a friend request; first booking includes approval + request.",
                },
                {
                  title: "Get approved",
                  body: "Once accepted, you can see rules and book.",
                },
                {
                  title: "Book & pay",
                  body: "Skip the counter. Clear pricing and receipts in-app.",
                },
                {
                  title: "Check-in / check-out",
                  body: "Photos and notes protect both sides and keep friends friendly.",
                },
              ]}
            />
          </div>
        </section>

        {/* TRUST & SAFETY */}
        <section className="mt-14 scroll-mt-18 md:scroll-mt-10" id="trust">
          <SectionHeader
            eyebrow="Trust & safety"
            title="Protection pillars"
            subtitle="Confidence built into every booking."
            align="left"
          />
          <PillarGrid
            items={[
              {
                icon: faIdCard,
                title: "Verification",
                body: "KYC/ID checks at sign-up for real-person confidence.",
              },
              {
                icon: faUsers,
                title: "Approvals",
                body: "Hosts approve friends before any booking can happen.",
              },
              {
                icon: faShieldHalved,
                title: "Coverage",
                body: "Baseline liability included; optional protection plans for renters.",
              },
              {
                icon: faCamera,
                title: "Check-in/out",
                body: "Photos, odometer, and condition notes create a clear record.",
              },
              {
                icon: faLifeRing,
                title: "Support",
                body: "Peer-first resolution with structured help when needed.",
              },
            ]}
          />
          <p className="mt-3 text-sm text-brand-700">
            Availability and terms may vary by location. Details shown in-app at
            booking.
          </p>
        </section>

        {/* PAPER TRAIL */}
        <section
          className="mt-14 scroll-mt-18 md:scroll-mt-10"
          id="paper-trail"
        >
          <SectionHeader
            eyebrow="Receipts & records"
            title="A clean paper trail keeps it friendly"
            subtitle="Evidence protects both sides. Everything tied to your booking."
            align="left"
          />
          <FramesStrip
            frames={[
              {
                caption: "Check-in",
                icon: faCamera,
                bullets: [
                  "Timestamped photos",
                  "Odometer reading",
                  "Condition notes",
                ],
              },
              {
                caption: "During trip",
                icon: faComments,
                bullets: [
                  "Messages & updates",
                  "Any mid-trip notes",
                  "Change logs",
                ],
              },
              {
                caption: "Check-out",
                icon: faReceipt,
                bullets: [
                  "Return photos & odometer",
                  "Auto receipts",
                  "Easy dispute clarity",
                ],
              },
            ]}
          />
        </section>

        {/* COVERAGE / DEPOSITS CARD */}
        <section className="mt-14 scroll-mt-18 md:scroll-mt-10" id="coverage">
          <div className="rounded-xl border border-zinc-200 bg-brand-50 p-6">
            <SectionHeader
              eyebrow="Money & rules"
              title="Coverage, deposits, and age — clearly explained"
              subtitle="We keep it transparent so there are no surprises."
              align="left"
            />
            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faHandHoldingDollar}
                  className="mt-1 h-4 w-4 text-brand-700"
                />
                <span>
                  <strong>Deposits:</strong> Hosts decide deposit amount (or
                  none).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="mt-1 h-4 w-4 text-brand-700"
                />
                <span>
                  <strong>Age:</strong> Hosts set minimum renter age; platform
                  minimum is 18+.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="mt-1 h-4 w-4 text-brand-700"
                />
                <span>
                  <strong>Protection:</strong> Baseline liability included;
                  optional protection plans are available for renters.
                </span>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <a
                href="/legal/terms"
                className="text-brand-800 underline underline-offset-4 hover:text-brand-900"
              >
                Terms of Service
              </a>
              <a
                href="/legal/privacy"
                className="text-brand-800 underline underline-offset-4 hover:text-brand-900"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </section>

        {/* COMPARE */}
        <section className="mt-14 scroll-mt-18 md:scroll-mt-10" id="compare">
          <SectionHeader
            eyebrow="Why FriendRenter"
            title="How we compare"
            subtitle="Owner control, friends-only access, and a built-in paper trail."
            align="left"
          />
          <CompareTable
            columns={[
              { key: "fr", label: "FriendRenter" },
              { key: "counter", label: "Big rental counter" },
            ]}
            rows={[
              {
                feature: "Access control",
                fr: "Friends-only, host approvals",
                counter: "Anyone with card & license",
              },
              {
                feature: "Who sets deposit & age",
                fr: "Host decides",
                counter: "Company decides",
              },
              {
                feature: "Paper trail (photos, notes)",
                fr: true,
                counter: false,
              },
              {
                feature: "Fees clarity",
                fr: "Transparent in-app",
                counter: "Often add-ons & upsells",
              },
              {
                feature: "Communication",
                fr: (
                  <>
                    <FontAwesomeIcon icon={faComments} /> Direct with host
                  </>
                ),
                counter: "Counter agents",
              },
              {
                feature: "Local money stays local",
                fr: true,
                counter: false,
              },
            ]}
          />
        </section>

        {/* FAQ (teaser) */}
        <section className="mt-14 scroll-mt-18 md:scroll-mt-10" id="faq">
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers"
            subtitle="A few common questions — see city pages for local details."
            align="left"
          />
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-gray-900">
                Who sets deposits and age rules?
              </h3>
              <p className="text-gray-700">
                Hosts do. Platform minimum is 18+ to join; hosts may set higher
                minimums.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                Is verification required?
              </h3>
              <p className="text-gray-700">
                Yes — KYC/ID checks run before you can host or rent.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                What if a host doesn’t accept me?
              </h3>
              <p className="text-gray-700">
                Only approved friends can book. You can request again later or
                add another host you know.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Where are you live?</h3>
              <p className="text-gray-700">
                We’re opening city-by-city. Join early access and we’ll email
                when your area opens.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-14" id="cta">
          <div className="rounded-md bg-brand-50 p-5">
            <h3 className="text-lg font-semibold text-brand-900">
              Join early access
            </h3>
            <p className="mt-1 text-brand-800">
              Hosts and renters — help shape the future of friends-first
              rentals.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/#waitlist?type=host"
                variant="primary"
                ctaId="cta_why_host_footer"
                prefetch={false}
              >
                Host early access
              </Button>
              <Button
                href="/#waitlist?type=renter"
                variant="outline"
                ctaId="cta_why_renter_footer"
                prefetch={false}
              >
                Renter early access
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
