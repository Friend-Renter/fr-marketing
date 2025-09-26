import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Image
              src="/brand/friendrenterfavicon.svg" // or "/brand/logo-mark.png"
              alt="FriendRenter logo"
              width={24}
              height={24}
              className="h-6 w-6"
              priority={false}
            />
            <span className="text-base font-semibold text-brand-900">
              FriendRenter™
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Local car rentals made simple. Verified people, fair prices, no
            counter lines.
          </p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-900">Company</div>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/about" className="hover:text-brand-700">
                About
              </Link>
            </li>
            <li>
              <Link href="/safety" className="hover:text-brand-700">
                Safety
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-brand-700">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-brand-700">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-gray-600">
          <div className="font-semibold text-gray-900">Cities</div>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/city/lincoln-ne" className="hover:text-brand-700">
                Lincoln, NE
              </Link>
            </li>
            <li>
              <Link href="/city/omaha-ne" className="hover:text-brand-700">
                Omaha, NE
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4">
        <div className="mx-auto max-w-6xl px-4 text-xs text-gray-500">
          © {new Date().getFullYear()} FriendRenter™ All rights reserved.
        </div>
      </div>
    </footer>
  );
}
