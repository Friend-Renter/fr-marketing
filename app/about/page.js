// app/about/page.jsx
import Image from "next/image";
import Button from "@/components/ui/Button";
import TeamSection from "@/components/sections/TeamSection";

export const metadata = {
  title: "About FriendRenter — Mission & Team",
  description:
    "FriendRenter is a friends-first vehicle sharing platform. Learn about our mission, story, and team.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero (no slogan) */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">
          About FriendRenter
        </h1>
        <p className="mt-3 text-lg text-brand-800">
          A trust-first way to share vehicles with people you actually know.
        </p>
        <p className="mt-1 text-brand-700">
          Real profiles. Host approval. Clear protection. Built by friends, for
          friends.
        </p>
      </header>

      {/* Our Mission — 2-col w/ image */}
      <section id="mission" className="mt-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Mission
            </h2>
            <div className="mt-3 space-y-4 text-gray-700">
              <p>
                FriendRenter exists to make sharing vehicles between friends
                simple, secure, and genuinely fun. We’re building a platform
                where trust is part of the booking flow—real profiles, host
                approval, and clear protection—so people can rent to their
                circle with peace of mind.
              </p>
              <p>
                We want to empower owners to be their own boss and build real
                businesses—keeping money in the community instead of sending it
                to traditional rental counters. And for renters, we want access
                to cool, unique vehicles you won’t find elsewhere, with a
                smooth, mobile-first experience.
              </p>
              <p>
                At our core, we’re about community: bookings happen between
                friends. Add → accept → book.
              </p>
            </div>
          </div>

          {/* Mission image (swap the asset when ready) */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-sm">
              <Image
                src="/brand/missionpic.png" // TODO: replace with your asset
                alt="Friends handing off keys — trust built in"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For — paragraphs (no bullets) */}
      <section id="principles" className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          What We Stand For
        </h2>
        <div className="mt-4 space-y-6 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Trust Built In.</span>{" "}
            Approvals, verification, and photo check-in/out aren’t
            add-ons—they’re part of how booking works. That creates a clear,
            transparent paper trail that respects both sides.
          </p>
          <p>
            <span className="font-semibold text-gray-900">
              Owner Control, Community Value.
            </span>{" "}
            Hosts decide daily rates, deposits, and minimum renter age. Earnings
            stay within your circle and community, not with a counter line and
            upsell desk.
          </p>
          <p>
            <span className="font-semibold text-gray-900">
              Simple, Mobile, Respectful.
            </span>{" "}
            Everything lives in the app: requests, approvals, photos, and
            receipts. It’s a friendlier way to find and drive unique
            vehicles—with real accountability.
          </p>
        </div>
      </section>

      {/* Team — visual grid + bio modal (client) */}
      <section id="team" className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">Team</h2>
        <p className="mt-2 text-gray-700">
          A small team with builder energy—focused on trust, good design, and
          real-world utility.
        </p>

        <TeamSection
          members={[
            {
              name: "Asa",
              role: "Founder & CEO",
              oneLiner:
                "Community-driven operator focused on practical, fair sharing.",
              imageSrc: "/brand/personplaceholder.png", // TODO: add your headshot
              bio: `Asa leads FriendRenter’s vision and operations. Obsessed with
making sharing safe, simple, and respectful for everyone involved.`,
              languages: ["English"],
              favorites: ["Ford Crown Vics"],
            },
            {
              name: "Omar",
              role: "Co-founder & CTO",
              oneLiner:
                "Full-stack builder leading product, app, and safety systems.",
              imageSrc: "/brand/omar.jpg", // TODO: add your headshot
              bio: `Omar builds the friend-to-friend flow under the hood: real profiles, approvals, receipts, and the photo 
              evidence system that keeps everyone honest. As Co-founder & CTO, he runs product and engineering end-to-end. 
              He’s big on entrepreneurship and keeping money local — if it helps people be their own boss, he’s building it. 
              Favorite hobbies: deleting code, exterminating bugs, and saying “one more deploy.`,
              languages: ["English", "Español", "日本語(少し)"],
              favorites: ["Nissan Z (all gens)", "Porsche (911/718)"],
            },
          ]}
        />
      </section>

      {/* CTA */}
      <section id="cta" className="mt-12">
        <div className="rounded-md bg-brand-50 p-5">
          <h2 className="text-lg font-semibold text-brand-900">
            Join early access
          </h2>
          <p className="mt-1 text-brand-800">
            Be part of a trust-first sharing community. Add → accept → book.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/#waitlist?type=host"
              variant="primary"
              ctaId="cta_about_host"
              prefetch={false}
            >
              Host early access
            </Button>
            <Button
              href="/#waitlist?type=renter"
              variant="outline"
              ctaId="cta_about_renter"
              prefetch={false}
            >
              Renter early access
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
