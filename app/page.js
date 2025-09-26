import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import LeadForm from "@/components/forms/LeadForm";
import heroimage from "../public/brand/heroimagedesktop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faUserPlus,
  faCheckCircle,
  faKey,
  faCarSide,
  faUserShield,
  faUsers,
  faDollarSign,
  faShieldHalved,
  faMobileScreenButton,
  faLocationDot,
  faCheck,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import CitiesSection from "@/components/CitiesSection";

export const metadata = {
  title: "FriendRenter™ — Rent from friends (Coming Soon)",
  description:
    "A friend-first rental marketplace. Join early access to the FriendRenter app. Add the host as a friend, get accepted, then book.",
  openGraph: {
    images: [
      `/og?title=${encodeURIComponent(
        "Rent from friends"
      )}&subtitle=${encodeURIComponent("Early Access • Add • Accept • Book")}`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      `/og?title=${encodeURIComponent(
        "Rent from friends"
      )}&subtitle=${encodeURIComponent("Early Access • Add • Accept • Book")}`,
    ],
  },
};

const homeFaq = [
  {
    q: "Is the app available now?",
    a: "We’re inviting early users city by city. Join the early access list and we’ll email your invite as your area opens.",
  },
  {
    q: "Do I have to be friends to book?",
    a: "Yes. You add the host as a friend (or request + add at the same time). Once the host accepts, your booking can be confirmed.",
  },
  {
    q: "Why “friends-only”?",
    a: "It reduces randomness. Hosts stay in control, and renters join a community that values trust and respect.",
  },
  {
    q: "What if the host doesn’t accept me?",
    a: "No hard feelings—you can add other hosts or try again after completing your profile and verifications.",
  },
  {
    q: "Do you verify renters and hosts?",
    a: "Yes. We use third-party ID (KYC) and fraud checks before booking.",
  },
  {
    q: "Is there a deposit or hold?",
    a: "A temporary hold (e.g., $200–$300) may apply and is released after return if no issues.",
  },
  {
    q: "How do payouts work for hosts?",
    a: "Fast payouts, typically 2–3 business days after the trip ends.",
  },
  {
    q: "Is FriendRenter like Turo?",
    a: "Similar mechanics, different vibe—bookings happen between friends. Add → accept → book.",
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
            className="object-cover object-center md:object-[center_50%]"
          />
          <div className="absolute inset-0 hero-overlay" aria-hidden />
        </div>

        {/* Content */}
        <div className="mx-auto flex min-h-[85vh] sm:min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8 py-24 sm:py-0">
          <div className="grid w-full items-center gap- sm:gap-10 lg:grid-cols-12">
            {/* LEFT: copy + CTAs */}
            <div className="lg:col-span-7">
              {/* Early access pill */}
              <div className="mb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur">
                  Early access • Limited cities
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl md:text-6xl ">
                Peer-to-peer vehicle sharing between friends.
              </h1>
              <p className="max-w-prose text-base text-slate-100 sm:text-lg font-sans">
                Add a friend, get accepted, then pick up—simple. <br />
                Join the early access waitlist for the FriendRenter app.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-slate-100 bg-brand-600 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label="Join Early Access to the FriendRenter app"
                >
                  Join Early Access
                </Link>
                <Link
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-slate-100/90 ring-1 ring-inset ring-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label="Become a Host"
                >
                  Become a Host
                </Link>
              </div>
            </div>

            {/* RIGHT: phone mockup (image + bottom fade) */}
            <div className="lg:col-span-5">
              <div
                className="relative mx-auto mt-6 w-[320px] sm:w-[260px] lg:w-[260px]  h-[420px] overflow-hidden md:h-auto"
                aria-label="Preview of the FriendRenter app"
              >
                {/* Glow behind */}
                <div
                  className="pointer-events-none absolute -z-10 left-8 top-8 blur-2xl"
                  aria-hidden="true"
                  style={{
                    width: 260,
                    height: 260,
                    background:
                      "radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.35), rgba(16,185,129,0) 70%)",
                  }}
                />

                {/* Device mockup from Mockuphone */}
                <Image
                  src="/brand/hero-phone-mockup.png" // <-- put your exported mockup here
                  alt="FriendRenter app preview"
                  width={800} // any large intrinsic size, keeps it crisp
                  height={1600}
                  priority={false}
                  sizes="(min-width:1024px) 36vw, 60vw"
                  className="
        w-full h-auto block object-top
        [mask-image:linear-gradient(to_bottom,black_60%,transparent_65%)]
        [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_65%)]
        md:[mask-image:none]
        md:[-webkit-mask-image:none]
      "
                />
              </div>
            </div>
          </div>
        </div>

        {/* End sentinel MUST be the last child inside #hero */}
        <div
          id="hero-sentinel-end"
          aria-hidden="true"
          className="h-px w-full opacity-0 pointer-events-none"
        />
      </section>

      {/* HOW IT WORKS — Option 2: Column wrapper cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-900">
            How It Works
          </h2>
          <p className="mt-3 text-base text-brand-700 max-w-xl mx-auto">
            Add <span className="font-medium text-brand-900">→</span> accept{" "}
            <span className="font-medium text-brand-900">→</span> book — a
            friend-first flow for safer, smoother trips.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 ">
          {/* Renters */}
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-card">
            <h3 className="text-3xl font-semibold tracking-tight text-brand-900">
              Renters
            </h3>
            <ul className="mt-6 space-y-4  px-2 text-brand-800">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon icon={faIdBadge} className="text-[24px]" />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Create your profile
                  </span>{" "}
                  — a real face behind the request.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon icon={faUserPlus} className="text-[24px]" />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Add the host as a friend
                  </span>{" "}
                  — or send a booking request that includes a friend request.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[24px]"
                  />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Get accepted
                  </span>{" "}
                  — hosts approve friends before confirming trips.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon icon={faKey} className="text-[24px]" />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Pick up & go
                  </span>{" "}
                  — smooth handoff, clear return.
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-2 text-base font-medium text-slate-100 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                Join renter waitlist
              </a>
            </div>
          </div>

          {/* Hosts */}
          <div
            id="become-host"
            className="rounded-lg border border-gray-200 bg-white p-8 shadow-card"
          >
            <h3 className="text-3xl font-semibold tracking-tight text-brand-900">
              Hosts
            </h3>
            <ul className="mt-6 space-y-4 px-2 text-brand-800">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon icon={faCarSide} className="text-[24px]" />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    List your car
                  </span>{" "}
                  — set availability, pickup, and house rules.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="text-[24px]"
                  />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Friends only
                  </span>{" "}
                  — you choose who can book by accepting friend requests.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon icon={faUsers} className="text-[24px]" />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Lower risk, better guests
                  </span>{" "}
                  — real profiles, mutuals, and verifications.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-[24px]"
                  />
                </span>
                <div>
                  <span className="font-medium text-lg text-brand-800">
                    Get paid
                  </span>{" "}
                  — fast payouts after the trip ends.
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-2 text-base font-medium text-slate-100 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                Join host waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FRIENDRENTER */}
      <section
        id="why"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-900">
            Why FriendRenter
          </h2>
          <p className="mt-3 text-base text-brand-700 max-w-2xl mx-auto">
            Trust isn’t an add-on—it’s how booking works here.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Friends-only booking */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                <FontAwesomeIcon icon={faUserPlus} className="text-[24px]" />
              </span>
              <h3 className="font-semibold text-gray-900">
                Friends-only booking
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Bookings only happen between friends (or soon-to-be). Add → accept
              → book.
            </p>
          </div>

          {/* Local convenience */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                <FontAwesomeIcon icon={faLocationDot} className="text-[24px]" />
              </span>
              <h3 className="font-semibold text-gray-900">Local convenience</h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Meet where it’s easy for both of you. No counter lines, no upsell
              desk.
            </p>
          </div>

          {/* Mobile-first */}
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-600">
                <FontAwesomeIcon
                  icon={faMobileScreenButton}
                  className="text-[24px]"
                />
              </span>
              <h3 className="font-semibold text-gray-900">Mobile-first</h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Manage friends, requests, and trips from your phone. Photo
              check-in/out built in.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON STRIP */}
      <section
        id="compare"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 justify-center flex flex-col"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-900">
            How we compare
          </h2>
          <p className="mt-2 text-base text-brand-700 max-w-2xl mx-auto">
            The friend-first way vs. the usual way.
          </p>
        </div>

        {/* Responsive compare: cards on mobile, table on md+ */}
        <div className="mt-6">
          {/* Mobile (stacked cards) */}
          <div className="md:hidden space-y-3">
            {[
              { label: "Book between friends", fr: true, tr: false },
              { label: "Host approval required", fr: true, tr: false },
              { label: "Photo check-in/out & receipts", fr: true, tr: false },
              { label: "No counter lines", fr: true, tr: false },
              {
                label: "Transparent, app-first experience",
                fr: true,
                tr: false,
              },
              { label: "Local, flexible meetup", fr: true, tr: false },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-card"
              >
                <div className="text-sm font-medium text-gray-900">
                  {row.label}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {/* FriendRenter */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      FriendRenter
                    </span>
                    <span className="inline-flex items-center text-emerald-700">
                      <FontAwesomeIcon icon={faCheck} className="text-[14px]" />
                      <span className="sr-only">Yes</span>
                    </span>
                  </div>
                  {/* Traditional */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                      Traditional
                    </span>
                    <span className="inline-flex items-center text-gray-500">
                      <FontAwesomeIcon icon={faMinus} className="text-[14px]" />
                      <span className="sr-only">No</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop (table) */}
          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="bg-brand-50 px-4 py-3 text-left text-base font-semibold text-brand-900">
                      Feature
                    </th>
                    <th className="bg-brand-50 px-4 py-3 text-center text-base font-semibold text-brand-900">
                      FriendRenter
                    </th>
                    <th className="bg-gray-50 px-4 py-3 text-center text-base font-semibold text-gray-900">
                      Traditional Rentals
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {[
                    { label: "Book between friends", fr: true, tr: false },
                    { label: "Host approval required", fr: true, tr: false },
                    {
                      label: "Photo check-in/out & receipts",
                      fr: true,
                      tr: false,
                    },
                    { label: "No counter lines", fr: true, tr: false },
                    {
                      label: "Transparent, app-first experience",
                      fr: true,
                      tr: false,
                    },
                    { label: "Local, flexible meetup", fr: true, tr: false },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-normal text-gray-900">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center text-brand-700">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mr-2 text-[16px]"
                          />
                          <span className="sr-only">Yes</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center text-gray-500">
                          <FontAwesomeIcon
                            icon={faMinus}
                            className="mr-2 text-[16px]"
                          />
                          <span className="sr-only">No</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <CitiesSection />

      {/* FAQS */}
      <section className="py-10 px-4 mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold tracking-tight text-brand-900 text-center">
          FAQ
        </h2>
        <p className="mt-2 text-sm text-brand-700 text-center">
          Answers to the most common questions.
        </p>
        <div className="mt-4">
          <Accordion items={homeFaq} />
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-14 mx-auto max-w-6xl">
        <div className="rounded-lg bg-brand-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Ready when your friends are.
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Join early access to the FriendRenter app. Renters add hosts as
            friends and book with confidence; hosts approve friends and stay in
            control.
          </p>
          <div className="mt-4">
            <Link href="#waitlist">
              <Button ctaId="cta_home_get_started" variant="primary">
                Join waitlist
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* WAITLIST / LEAD FORM */}
      <section
        id="waitlist"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-8 md:scroll-mt-10"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-900">
            Be First In Line
          </h2>
          <p className="mt-2 text-sm text-brand-700">
            Tell us how you plan to use FriendRenter (rent, host, or both) and
            your city.
          </p>

          {/* tiny value badges (optional but nice) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">
              <FontAwesomeIcon icon={faUserPlus} className="text-[12px]" />
              Early access invites
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 font-medium text-gray-700 ring-1 ring-gray-200">
              <FontAwesomeIcon icon={faShieldHalved} className="text-[12px]" />
              No spam. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* Card wrapper for the form */}

        <LeadForm defaultRole="host" pageSource="landing" />
      </section>
    </div>
  );
}
