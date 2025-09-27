// app/legal/terms/page.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl  py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-brand-700">
          Last updated: September 27, 2025
        </p>
      </div>

      {/* Content card */}
      <article className="bg-white py-6 px-4 sm:p-8 max-w-none text-justify">
        <p className="text-gray-700 ">
          These Terms of Use (<strong>“Terms”</strong>) govern your access to
          and use of the FriendRenter marketing website, waitlist, and lead-
          capture forms (the <strong>“Site”</strong>). The Site is operated by
          FriendRenter, Inc., a Delaware corporation (
          <strong>“FriendRenter”</strong>, <strong>“we”</strong>,{" "}
          <strong>“our”</strong>, or <strong>“us”</strong>). By using the Site,
          you agree to these Terms. If you do not agree, do not use the Site.
        </p>

        <p className="mt-3 text-gray-700">
          For information about how we collect and use personal information,
          please see our{" "}
          <Link
            className="text-brand-700 underline"
            href="/privacy"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <hr className="my-6 border-gray-200" />

        {/* 1) Who we are & contact */}
        <section id="contact">
          <h2 className="text-xl font-semibold text-gray-900">
            1) Who we are &amp; contact
          </h2>
          <p className="text-gray-700">
            FriendRenter, Inc. is incorporated in Delaware. You can contact us
            at{" "}
            <a
              className="text-brand-700 underline"
              href="mailto:info@friendrenter.com"
            >
              info@friendrenter.com
            </a>
            .
          </p>
        </section>

        {/* 2) Scope; informational only */}
        <section id="scope" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            2) Scope; informational only
          </h2>
          <p className="text-gray-700">
            The Site provides general information about FriendRenter and allows
            visitors to express interest or join a waitlist. The Site does{" "}
            <strong>not</strong> govern, offer, or conduct actual rentals,
            payments, or transactions. If and when the operational application
            launches, separate terms and policies will apply.
          </p>
        </section>

        {/* 3) Eligibility */}
        <section id="eligibility" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            3) Eligibility
          </h2>
          <p className="text-gray-700">
            The Site is intended for individuals who are{" "}
            <strong>18 years of age or older</strong>. By using the Site, you
            represent that you are 18+ and have authority to agree to these
            Terms.
          </p>
        </section>

        {/* 4) Waitlist; no guarantees */}
        <section id="waitlist" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            4) Waitlist; no guarantees
          </h2>
          <p className="text-gray-700">
            Submitting your information may place you on a waitlist; however,
            <strong> access is not guaranteed</strong>. We may determine
            priority or eligibility <strong>at our discretion</strong>, and we
            may change or discontinue waitlist rules at any time.
          </p>
        </section>

        {/* 5) Acceptable use */}
        <section id="acceptable-use" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            5) Acceptable use
          </h2>
          <p className="text-gray-700">
            You may use the Site only for lawful, personal, non-commercial
            purposes. You agree not to:
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              access or use the Site in violation of any law or regulation;
            </li>
            <li>
              probe, scan, or test the vulnerability of the Site or any network;
            </li>
            <li>interfere with, disrupt, or damage the Site or servers;</li>
            <li>
              use bots, scrapers, or automated means without our prior written
              permission;
            </li>
            <li>submit spam, misleading, or fraudulent information;</li>
            <li>
              infringe, misappropriate, or violate others’ rights or our rights.
            </li>
          </ul>
        </section>

        {/* 6) Your submissions */}
        <section id="submissions" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            6) Your submissions
          </h2>
          <p className="text-gray-700">
            You are responsible for the accuracy of information you submit. By
            submitting information through the Site (for example, joining the
            waitlist or contacting us), you grant us a non-exclusive, worldwide,
            royalty-free license to use, reproduce, and process that information
            for operating, improving, and securing the Site; managing interest
            and early access; and communicating with you.
          </p>
        </section>

        {/* 7) Third-party services (reCAPTCHA, maps, email) */}
        <section id="third-parties" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            7) Third-party services
          </h2>
          <p className="text-gray-700">
            The Site may use third-party services such as Google reCAPTCHA,
            Google Maps, analytics, and email delivery. Your use of those
            features may be subject to the third parties’ terms and privacy
            policies.{" "}
            <strong>
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                className="underline text-brand-700"
                href="https://policies.google.com/privacy"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="underline text-brand-700"
                href="https://policies.google.com/terms"
              >
                Terms of Service
              </a>{" "}
              apply.
            </strong>
          </p>
        </section>

        {/* 8) Intellectual property */}
        <section id="ip" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            8) Intellectual property
          </h2>
          <p className="text-gray-700">
            The Site and its content, including text, designs, graphics, logos,
            and trademarks, are owned by or licensed to FriendRenter and are
            protected by intellectual-property laws. “FriendRenter” and related
            logos/marks are trademarks or pending trademarks of FriendRenter,
            Inc. Subject to these Terms, we grant you a limited, revocable,
            non-transferable license to access and use the Site for personal,
            non-commercial purposes. No other rights are granted. You may not
            copy, modify, distribute, or create derivative works without our
            prior written consent.
          </p>
        </section>

        {/* 9) Disclaimers */}
        <section id="disclaimers" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            9) Disclaimers
          </h2>
          <p className="text-gray-700">
            THE SITE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
            INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do not warrant
            that the Site will be uninterrupted, secure, or error-free, or that
            information will be current or complete.
          </p>
        </section>

        {/* 10) Limitation of liability */}
        <section id="limitation" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            10) Limitation of liability
          </h2>
          <p className="text-gray-700">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, FRIENDRENTER AND ITS
            OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
            PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR
            GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE. TO THE
            MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS
            ARISING OUT OF OR RELATED TO THE SITE WILL NOT EXCEED{" "}
            <strong>$100</strong>. Some jurisdictions do not allow certain
            limitations; in such cases, the limitations will apply to the
            fullest extent permitted.
          </p>
        </section>

        {/* 11) Indemnification */}
        <section id="indemnification" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            11) Indemnification
          </h2>
          <p className="text-gray-700">
            You agree to defend, indemnify, and hold harmless FriendRenter and
            its affiliates, officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, and expenses,
            including reasonable attorneys’ fees, arising out of or related to
            your violation of these Terms or misuse of the Site.
          </p>
        </section>

        {/* 12) Dispute resolution: arbitration & class-action waiver */}
        <section id="arbitration" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            12) Dispute resolution: arbitration &amp; class-action waiver
          </h2>
          <p className="text-gray-700">
            <strong>Binding arbitration.</strong> You and FriendRenter agree
            that any dispute, claim, or controversy arising out of or relating
            to these Terms or the Site will be resolved by{" "}
            <strong>binding arbitration</strong> administered by the American
            Arbitration Association (<strong>AAA</strong>) under its Consumer
            Arbitration Rules, except that either party may (a) seek relief in{" "}
            <strong>small-claims court</strong> for eligible matters or (b)
            bring an action in court solely for{" "}
            <strong>injunctive or other equitable relief</strong> to protect
            intellectual-property or proprietary rights. The arbitration seat,
            or legal place, shall be Delaware. Judgment on the award may be
            entered in any court of competent jurisdiction.
          </p>
          <p className="mt-3 text-gray-700">
            <strong>Class-action and jury trial waiver.</strong> You and
            FriendRenter agree that each may bring claims against the other only
            in your or its individual capacity and <strong>not</strong> as a
            plaintiff or class member in any purported class or representative
            proceeding. <strong>Jury trial is waived.</strong>
          </p>
          <p className="mt-3 text-gray-700">
            <strong>Opt-out.</strong> You may opt out of this arbitration and
            class-action waiver by sending an email to{" "}
            <a
              className="text-brand-700 underline"
              href="mailto:info@friendrenter.com"
            >
              info@friendrenter.com
            </a>{" "}
            within <strong>30 days</strong> of the date you first agree to these
            Terms, stating that you wish to opt out. If you opt out, or if this
            section is found unenforceable, disputes will be resolved in the
            courts specified below.
          </p>
        </section>

        {/* 13) Governing law & venue */}
        <section id="law-venue" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            13) Governing law &amp; venue
          </h2>
          <p className="text-gray-700">
            These Terms and any disputes not subject to arbitration are governed
            by the laws of the <strong>State of Delaware</strong>, without
            regard to conflicts of law principles. For the carve-outs above and
            to enforce arbitral awards, the exclusive venue shall be the state
            or federal courts located in <strong>Wilmington, Delaware</strong>,
            and you consent to personal jurisdiction there.
          </p>
        </section>

        {/* 14) Changes */}
        <section id="changes" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">14) Changes</h2>
          <p className="text-gray-700">
            We may update these Terms from time to time. If we make material
            changes, we will update the “Last updated” date above and post the
            revised Terms on this page. Your continued use of the Site after
            changes become effective constitutes your acceptance of the updated
            Terms.
          </p>
        </section>

        {/* 15) General */}
        <section id="general" className="mt-8 text-left">
          <h2 className="text-xl font-semibold text-gray-900">15) General</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>
              <strong>Entire agreement.</strong> These Terms are the entire
              agreement between you and us regarding the Site.
            </li>
            <li>
              <strong>Severability.</strong> If any provision is found
              unenforceable, the remaining provisions will remain in full force.
            </li>
            <li>
              <strong>No assignment.</strong> You may not assign or transfer
              these Terms without our consent; we may assign them as permitted
              by law.
            </li>
            <li>
              <strong>No waiver.</strong> Our failure to enforce a provision is
              not a waiver of our right to do so later.
            </li>
            <li>
              <strong>Headings.</strong> Headings are for convenience only.
            </li>
          </ul>
        </section>

        {/* 16) Contact */}
        <section id="contact-bottom" className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">16) Contact</h2>
          <p className="text-gray-700">
            Questions about these Terms? Email{" "}
            <a
              className="text-brand-700 underline"
              href="mailto:info@friendrenter.com"
            >
              info@friendrenter.com
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
