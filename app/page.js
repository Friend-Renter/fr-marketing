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
} from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "FriendRenter™ — Rent from friends (Coming Soon)",
  description:
    "A friend-first rental marketplace. Add the host as a friend, get accepted, then book. A tighter, trust-first way to rent",
  openGraph: {
    images: [
      `/og?title=${encodeURIComponent(
        "Rent from friends"
      )}&subtitle=${encodeURIComponent("Add • Accept • Book")}`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      `/og?title=${encodeURIComponent(
        "Rent from friends"
      )}&subtitle=${encodeURIComponent("Add • Accept • Book")}`,
    ],
  },
};

const homeFaq = [
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
        <div className="mx-auto flex min-h-[85vh] sm:min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl md:text-6xl ">
              Peer-to-peer vehicle sharing between friends.
            </h1>
            <p className=" max-w-prose text-base text-slate-100 sm:text-lg font-sans">
              Add a friend, get accepted, then pick up—simple. <br></br>A
              tighter, trust-first way to rent local cars.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-slate-100 bg-brand-600 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Join the Waitlist
              </Link>
              <Link
                href="#become-host"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-slate-100/90 ring-1 ring-inset ring-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Become a Host
              </Link>
            </div>

            {/* Social proof / location teaser (optional lightweight) */}
            <p className="mt-6 text-sm  text-slate-100/80">
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

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main heading centered above both columns */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-900">
            How It Works
          </h2>
          {/* under the main H2 */}
          <p className="mt-3 text-base text-brand-700 max-w-xl mx-auto">
            Add <span className="font-medium text-brand-900">→</span> accept{" "}
            <span className="font-medium text-brand-900">→</span> book — a
            friend-first flow for safer, smoother trips.
          </p>
          {/* <div className="mt-3 mx-auto h-px w-90 bg-brand-400 rounded" /> */}
        </div>

        <div className="mt-8 grid gap-12 px-2 lg:grid-cols-2 ">
          {/* Renters */}
          <div>
            <h3 className="text-3xl text-left px-2 sm:px-0 font-semibold tracking-tight text-brand-900">
              Renters
            </h3>
            <ul className="mt-4 sm:mt-6 space-y-4 px-2 text-brand-800">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon icon={faIdBadge} className="text-[25px]" />
                </span>
                <div className="leading-normal ">
                  <span className="font-medium text-lg text-brand-800">
                    Create your profile
                  </span>{" "}
                  — a real face behind the request.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon icon={faUserPlus} className="text-[25px]" />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Add the host as a friend
                  </span>{" "}
                  — or send a booking request that includes a friend request.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[25px]"
                  />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Get accepted
                  </span>{" "}
                  — hosts approve friends before confirming trips.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon icon={faKey} className="text-[25px]" />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Pick up & go
                  </span>{" "}
                  — smooth handoff, clear return.
                </div>
              </li>
            </ul>
          </div>

          {/* Hosts */}
          <div id="become-host">
            <h3 className="text-3xl text-left px-2 sm:px-0 font-semibold tracking-tight text-brand-900">
              Hosts
            </h3>
            <ul className="mt-4 sm:mt-6 px-2 space-y-4 text-brand-800">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon icon={faCarSide} className="text-[25px]" />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    List your car
                  </span>{" "}
                  — set availability, pickup, and house rules.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="text-[25px]"
                  />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Friends only
                  </span>{" "}
                  — you choose who can book by accepting friend requests.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon icon={faUsers} className="text-[25px]" />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Lower risk, better guests
                  </span>{" "}
                  — real profiles, mutuals, and verifications.
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-none items-center justify-center text-brand-500">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-[25px]"
                  />
                </span>
                <div className="leading-normal">
                  <span className="font-medium text-lg text-brand-800">
                    Get paid
                  </span>{" "}
                  — fast payouts after the trip ends.
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-md bg-brand-600 px-8 py-2 text-lg font-medium text-slate-100 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            Join waitlist
          </a>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="grid gap-6 py-8 md:grid-cols-3 mx-auto max-w-7xl">
        {[
          {
            t: "Friends-only booking",
            d: "Requests include a friend add. You approve who books.",
          },
          {
            t: "Photo check-in & receipts",
            d: "Government ID & fraud checks before anyone can book.",
          },
          {
            t: "Easy-to-use app",
            d: "Manage friends, requests, and trips from your phone.",
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

      {/* CITIES */}
      <section className="py-8 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold text-gray-900">
          Cities (launching soon)
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          Starting local and growing through friends.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
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

      {/* FINAL CTA BANNER */}
      <section className="py-14 mx-auto max-w-7xl">
        <div className="rounded-lg bg-brand-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Ready when your friends are.
          </h3>
          <p className="mt-1 text-sm text-gray-700">
            Renters add hosts as friends and book with confidence; hosts approve
            friends and stay in control—coming soon.
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
      {/* WAITLIST FORM (anchor only; plug in your component or keep simple form) */}
      <section
        id="waitlist"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-8 md:scroll-mt-10"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-brand-900">
          Be first in line
        </h2>
        <p className="mb-4 mt-1 text-brand-700">
          Tell us how you plan to use FriendRenter (rent, host, or both) and
          your city. We’ll send next steps soon.
        </p>

        <LeadForm defaultRole="host" pageSource="landing" />
      </section>
    </div>
  );
}
