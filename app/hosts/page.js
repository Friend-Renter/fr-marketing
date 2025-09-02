import LeadForm from "@/components/forms/LeadForm";

export default function HostsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Turn your car into income—on your terms.</h1>
      <p className="mt-2 text-gray-700">Earnings snapshot, protections, payouts, onboarding steps—full page coming next.</p>
      <div className="mt-6 max-w-xl">
        <LeadForm type="host" />
      </div>
    </div>
  );
}
