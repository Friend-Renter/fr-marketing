"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm ${active ? "text-brand-700" : "text-gray-700 hover:text-brand-700"}`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* swap with your real logo */}
          <div className="h-6 w-6 rounded-sm bg-brand-600" />
          <span className="text-base font-semibold text-gray-900">FR</span>
        </Link>

        <nav className="hidden items-center md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/hosts">For Hosts</NavLink>
          <NavLink href="/renters">For Renters</NavLink>
          <NavLink href="/safety">Safety</NavLink>
          <NavLink href="/legal/terms">Legal</NavLink>
        </nav>

        <div className="hidden gap-2 md:flex">
          <Link href="/hosts">
            <Button variant="primary">List your car</Button>
          </Link>
          <Link href="/renters">
            <Button variant="ghost">Find a rental</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
