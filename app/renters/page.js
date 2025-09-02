import LeadForm from "@/components/forms/LeadForm";

export default function RentersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Skip the counter. Book local, verified cars.</h1>
      <p className="mt-2 text-gray-700">Requirements, pricing overview, pickup/return walkthrough—full page coming next.</p>
      <div className="mt-6 max-w-xl">
        <LeadForm type="renter" />
      </div>
    </div>
  );
}
