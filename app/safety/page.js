export const metadata = {
  title: "Safety & Verification | FR",
  description: "How we verify identity, handle data, and outline coverage. Dispute steps and response times.",
};

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Safety & Verification</h1>
      <p className="mt-2 text-gray-700">
        We verify identity, reduce fraud, and keep expectations clear for every trip.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Why we verify</h2>
        <p className="mt-2 text-sm text-gray-800">
          Before booking, we confirm government ID, match a selfie to that ID, and run basic fraud checks via a trusted verification provider.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Data handling</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-800">
          <li>Encrypted in transit and at rest.</li>
          <li>Used only for verification, compliance, and safety.</li>
          <li>Not sold; never used for marketing without consent.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Coverage overview (plain English)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
            <div className="font-semibold text-gray-900">Included</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-800">
              <li>Identity verification on all users</li>
              <li>Trip photo protocol for pickup/return</li>
              <li>Refundable deposit hold during the trip</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-card">
            <div className="font-semibold text-gray-900">Not included</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-800">
              <li>Fuel, tickets/tolls, personal items</li>
              <li>Non-compliant driving or misuse</li>
              <li>Unapproved drivers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Disputes</h2>
        <ol className="mt-2 list-decimal pl-5 text-sm text-gray-800">
          <li>Report within 24 hours with time-stamped photos.</li>
          <li>We review and respond in 24–48 hours.</li>
          <li>Qualified fees/holds are assessed per policy.</li>
        </ol>
      </section>
    </div>
  );
}
