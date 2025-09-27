// app/why-friendrenter/page.tsx
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Why FriendRenter — Friends-first vehicle sharing",
  description:
    "See how FriendRenter works: friends-only approvals, verification, clear protections, and mobile-first booking. Add → accept → book.",
};

export default function WhyFriendRenterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">
          Why FriendRenter
        </h1>
        <p className="mt-3 text-lg text-brand-800">
          Friends-first rentals for cars, boats, jet skis, and more — with trust built in.
        </p>
        <p className="mt-1 text-brand-700">
          Rent from your circle, not random strangers. Hosts approve, verification checks run,
          and every booking has a clear paper trail.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/#waitlist?type=host" variant="primary" ctaId="cta_why_host" prefetch={false}>
            Join host early access
          </Button>
          <Button href="/#waitlist?type=renter" variant="outline" ctaId="cta_why_renter" prefetch={false}>
            Join renter early access
          </Button>
        </div>
      </header>

      {/* Card */}
      <article className="mt-6 bg-white py-6 sm:p-8 max-w-none">
        {/* What we are */}
        <section id="what-we-are">
          <h2 className="text-xl font-semibold text-gray-900">What we are</h2>
          <p className="mt-2 text-gray-700">
            FriendRenter is a friends-first way to share vehicles locally. Hosts choose who can rent,
            renters book in a few taps, and trust isn’t an add-on — it’s part of the flow:
            approvals, verification, and check-ins baked into every trip.
          </p>
        </section>

        {/* How it works */}
        <section id="how" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">How it works</h2>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-gray-900">For hosts</h3>
              <ul className="mt-2 list-disc  text-gray-700 px-5">
                <li>Be your own boss: set daily rates, deposits, and minimum renter age.</li>
                <li>Share your vehicle details and verify your account (18+ to host).</li>
                <li>Approve who counts as a “friend” before they can book.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">For renters</h3>
              <ul className="mt-2 list-disc px-5 text-gray-700">
                <li>Book from people you know. Keep it local and simple with mobile booking.</li>
                <li>Skip the counter — communicate directly and know who you’re renting from.</li>
                <li>Clear paper trail with check-in/out photos, condition notes, and receipts.</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            We’re starting with cars, then expanding to marine (boats, jet skis), and later adding smaller categories.
            The app brings it all together — friends-first access, clean UX, and transparent records.
          </p>
        </section>

        {/* Trust & Safety */}
        <section id="trust" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Trust &amp; safety built in</h2>
          <ul className="mt-3 list-disc px-5 text-gray-700">
            <li><strong>Verification:</strong> KYC/ID checks at sign-up. Hosts are 18+; hosts set renter age minimums (e.g., 21+ or higher for certain vehicles).</li>
            <li><strong>Approvals:</strong> Hosts approve friends before booking; first-time requests include a friend request + booking request.</li>
            <li><strong>Coverage:</strong> Rentals include baseline liability coverage, and renters can purchase optional protection plans for their trip.</li>
            <li><strong>Check-in / check-out:</strong> Photo evidence, odometer readings, and condition notes to document every booking.</li>
            <li><strong>Support:</strong> Online support to start. We encourage friend-to-friend resolution first, with structured help when needed.</li>
          </ul>
        </section>

        {/* What makes us different */}
        <section id="why-different" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">What makes us different</h2>
          <ul className="mt-3 list-disc px-5 text-gray-700">
            <li><strong>Friends-first access:</strong> No randos. Hosts choose who can book.</li>
            <li><strong>Trust inside the flow:</strong> Verification, approvals, and check-ins are part of booking — not a bolt-on.</li>
            <li><strong>Owner control:</strong> You set rates, deposits, and age minimums.</li>
            <li><strong>Local money stays local:</strong> Keep earnings within your circle and community.</li>
            <li><strong>Simple mobile booking:</strong> Clean, modern app experience.</li>
          </ul>
        </section>

        {/* Garage vision — intentionally commented for later enablement */}
        {/*
        <section id="vision" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">The garage vision</h2>
          <p className="mt-2 text-gray-700">
            We’re building a two-lane experience: a <strong>Public Garage</strong> for broad discovery
            and a <strong>Private Friends’ Garage</strong> for exclusive listings you share only with your circle.
            It keeps discovery open — while giving hosts fine-grained control over who sees and books their vehicles.
          </p>
          <p className="mt-2 text-gray-700">This is our north star and may evolve as we learn with the community.</p>
        </section>
        */}

        {/* CTA */}
        <section id="cta" className="mt-8">
          <div className="rounded-md bg-brand-50 p-5">
            <h3 className="text-lg font-semibold text-brand-900">Join early access</h3>
            <p className="mt-1 text-brand-800">
              Hosts and renters — help shape the future of friends-first rentals.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href="/#waitlist?type=host" variant="primary" ctaId="cta_why_host_footer" prefetch={false}>
                Host early access
              </Button>
              <Button href="/#waitlist?type=renter" variant="outline" ctaId="cta_why_renter_footer" prefetch={false}>
                Renter early access
              </Button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
