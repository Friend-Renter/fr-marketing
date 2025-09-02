import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900">We couldn’t find that page.</h1>
      <p className="mt-2 text-gray-700">Try going back home or exploring cities.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="text-brand-700 hover:underline">Home</Link>
        <Link href="/city/lincoln-ne" className="text-brand-700 hover:underline">Lincoln</Link>
        <Link href="/city/omaha-ne" className="text-brand-700 hover:underline">Omaha</Link>
      </div>
    </div>
  );
}
