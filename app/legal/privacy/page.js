// app/privacy/page.tsx (or wherever your route lives)
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-700">
          Last updated: September 27, 2025
        </p>{" "}
      </div>

      {/* Content card */}
      <article className=" bg-white p-6 sm:p-8  max-w-none">
        <p className="text-gray-700">
          FriendRenter (<strong>“FriendRenter”</strong>, <strong>“we”</strong>,{" "}
          <strong>“our”</strong>, or <strong>“us”</strong>) cares about your
          privacy. This Privacy Policy explains what personal information we
          collect on our marketing website and lead-capture forms (the{" "}
          <strong>“Site”</strong>), how we use it, and the choices you have.
          This policy does <strong>not</strong> cover the production app for
          bookings; we’ll publish a separate policy when that launches.
        </p>
        <p className="text-gray-700">
          If you have questions or requests, contact us at{" "}
          <a
            className="text-brand-700 underline"
            href="mailto:info@friendrenter.com"
          >
            info@friendrenter.com
          </a>
          .
        </p>
        <p className="mt-2 text-gray-700">
          Use of the Site is also subject to our{" "}
          <Link
            className="text-brand-700 underline"
            href="/legal/terms"
            prefetch={false}
          >
            Terms of Use
          </Link>
          .{" "}
        </p>
        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* 1) What we collect */}
        <section id="what-we-collect">
          <h2 className="text-xl font-semibold text-gray-900">
            1) What we collect
          </h2>
          <p className="text-gray-700">
            We collect information you choose to give us when you submit a form
            or interact with the Site:
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Contact details:</strong> first name, last name, email,
              phone.
            </li>
            <li>
              <strong>Interest &amp; location info:</strong> the city/area where
              you want to <strong>host</strong> or <strong>rent</strong>.
            </li>
            <li>
              <strong>Vehicle details (hosts):</strong> make, model, year, and
              other details you provide.
            </li>
            <li>
              <strong>Preferences:</strong> rental preferences you select (e.g.,
              body type, seats, transmission), budget band, age band, and
              extras.
            </li>
            <li>
              <strong>Timing:</strong> dates or general availability windows you
              enter.
            </li>
            <li>
              <strong>Communications:</strong> content of messages you send us.
            </li>
            <li>
              <strong>Device &amp; usage data:</strong> IP address, browser/OS,
              pages viewed, and similar analytics signals (standard web logs and
              cookies—see Cookies &amp; Similar Tech below).
            </li>
            <li>
              <strong>Referral/UTM data:</strong> basic campaign and referrer
              parameters (e.g., utm_source, utm_medium, utm_campaign) when
              present.
            </li>
            <li>
              <strong>reCAPTCHA anti-abuse data:</strong> when present, Google
              reCAPTCHA may collect device/interaction metadata to block bots.
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            We do <strong>not</strong> knowingly collect sensitive data (e.g.,
            SSNs, driver’s license numbers) on this Site. Please don’t include
            it in free-text fields.
          </p>
        </section>

        {/* 2) How we use */}
        <section id="how-we-use" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            2) How we use your information
          </h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Respond</strong> to your inquiries and{" "}
              <strong>provide updates</strong> about FriendRenter services and
              app progress.
            </li>
            <li>
              <strong>Manage early access</strong> invitations and waitlist
              priorities.
            </li>
            <li>
              <strong>Understand demand</strong> (e.g., which cities/vehicles
              people are interested in) to plan our rollout.
            </li>
            <li>
              <strong>Improve the Site</strong> (debugging, analytics, and
              security/anti-abuse).
            </li>
            <li>
              <strong>Comply with law</strong> and enforce our policies.
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            <strong>No selling or sharing for ads.</strong> We do{" "}
            <strong>not</strong> sell your personal information. We do{" "}
            <strong>not</strong> “share” personal information for cross-context
            behavioral advertising.
          </p>
        </section>

        {/* 3) Legal bases */}
        <section id="legal-bases" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            3) Legal bases (for visitors where applicable)
          </h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Consent</strong> (when you submit forms or opt-in to
              updates).
            </li>
            <li>
              <strong>Legitimate interests</strong> (site security, basic
              analytics, interest measurement).
            </li>
            <li>
              <strong>Compliance with legal obligations.</strong>
            </li>
          </ul>
        </section>

        {/* 4) Disclosures */}
        <section id="disclosures" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            4) How we disclose information
          </h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Service providers</strong> (e.g., website hosting, email
              delivery, form processing, analytics, anti-abuse tools). They may
              process data only under our instructions.
            </li>
            <li>
              <strong>Legal/Compliance</strong>: if required by law, to protect
              rights, safety, and security.
            </li>
            <li>
              <strong>Business transfers</strong>: if we undergo a merger,
              acquisition, or similar event.
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            We do <strong>not</strong> sell personal information. We do{" "}
            <strong>not</strong> allow service providers to use your data for
            their own marketing.
          </p>
        </section>

        {/* 5) Cookies */}
        <section id="cookies" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            5) Cookies &amp; similar technologies
          </h2>
          <p className="text-gray-700">
            We do <strong>not</strong> use non-essential cookies (e.g.,
            analytics, ads) on this Site. The Site may use{" "}
            <strong>strictly necessary</strong> cookies and similar technologies
            for security and basic functionality — for example, Google reCAPTCHA
            to protect our forms from abuse. You can control cookies via your
            browser settings. We do not respond to “Do Not Track” signals at
            this time.
          </p>
          <p className="mt-3 text-gray-700">
            <strong>Google reCAPTCHA &amp; Maps (if shown):</strong> These
            services may collect device/interaction data to provide security and
            mapping features. Your use may be subject to Google’s privacy terms.
          </p>
        </section>

        {/* 6) Choices */}
        <section id="choices" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            6) Your choices
          </h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Consent checkbox:</strong> By submitting a form, you
              consent to our collection and use of your info as described here.
            </li>
            <li>
              <strong>Unsubscribe:</strong> You can opt out of marketing emails
              at any time using the link in our messages.
            </li>
            <li>
              <strong>Access/Correction/Deletion:</strong> Email{" "}
              <a
                className="text-brand-700 underline"
                href="mailto:info@friendrenter.com"
              >
                info@friendrenter.com
              </a>{" "}
              to request a copy, correction, or deletion of your personal
              information (subject to legal allowances/requirements).
            </li>
          </ul>
        </section>

        {/* 7) Retention */}
        <section id="retention" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            7) Data retention
          </h2>
          <p className="text-gray-700">
            For lead-capture purposes, we generally keep personal information
            for <strong>up to 24 months</strong> from your last interaction (or
            longer if required by law or to resolve disputes). We may keep
            non-identifiable, aggregated statistics indefinitely.
          </p>
        </section>

        {/* 8) Security */}
        <section id="security" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">8) Security</h2>
          <p className="text-gray-700">
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect personal information. No method of
            transmission or storage is 100% secure.
          </p>
        </section>

        {/* 9) Children */}
        <section id="children" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">9) Children</h2>
          <p className="text-gray-700">
            The Site is not intended for individuals under <strong>18</strong>.
            We do not knowingly collect personal information from anyone under
            18.
          </p>
        </section>

        {/* 10) International */}
        <section id="international" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            10) International visitors
          </h2>
          <p className="text-gray-700">
            We operate in the United States and may process information in the
            U.S. and other locations. Those locations may have different
            data-protection rules than your region.
          </p>
        </section>

        {/* 11) Changes */}
        <section id="changes" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            11) Changes to this policy
          </h2>
          <p className="text-gray-700">
            If we make material changes, we’ll update the “Last updated” date
            and post the revised policy on this page. Continued use of the Site
            means you accept the updated policy.
          </p>
        </section>

        {/* 12) Contact */}
        <section id="contact" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            12) Contact us
          </h2>
          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              className="text-brand-700 underline"
              href="mailto:info@friendrenter.com"
            >
              info@friendrenter.com
            </a>
            <br />
            <span className="text-gray-600">
              (You can add your business address here if you want a physical
              mailing address shown.)
            </span>
          </p>
        </section>

        {/* California Notice */}
        <section id="ccpa" className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            California Notice at Collection (CCPA/CPRA)
          </h2>
          <p className="text-gray-700">
            We collect the following categories of personal information from
            California residents for the purposes described above:
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Identifiers:</strong> name, email, phone.
            </li>
            <li>
              <strong>Internet/Device activity:</strong> IP address, basic
              device/browser data, Site interactions.
            </li>
            <li>
              <strong>Geolocation (approximate):</strong> derived from IP or the
              city you provide.
            </li>
            <li>
              <strong>Inferences:</strong> simple interest indicators (e.g.,
              “wants to host in Austin”).
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            <strong>Purposes:</strong> provide updates, manage early access,
            respond to inquiries, plan rollout, analytics, security/compliance.
            <br />
            <strong>Sources:</strong> directly from you (forms), your
            device/browser (when you visit the Site), and our service providers
            (anti-abuse/analytics metadata).
            <br />
            <strong>Retention:</strong> typically up to{" "}
            <strong>24 months</strong> from last interaction (see Retention
            above).
            <br />
            <strong>Selling/Sharing:</strong> We <strong>do not sell</strong>{" "}
            personal information and <strong>do not share</strong> it for
            cross-context behavioral advertising.
          </p>
          <p className="mt-3 text-gray-700">
            <strong>Your rights:</strong> access, delete, correct, and limit
            certain uses, without discrimination. To exercise rights, email{" "}
            <a
              className="text-brand-700 underline"
              href="mailto:info@friendrenter.com"
            >
              info@friendrenter.com
            </a>
            . We’ll verify your request (and California residency as applicable)
            before acting.
          </p>
        </section>
      </article>
    </div>
  );
}
