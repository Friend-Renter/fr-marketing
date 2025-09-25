// components/header/MobileDrawer.js
"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/ui/Button";
import cities from "@/content/cities/_list.json";

// Logo lockup — keeps the tiny square + FR text; flips depending on tone
function Logo({ tone = "dark", onClick }) {
  // Only the text tone flips; the mark stays branded (multi-color)
  const textTone = tone === "light" ? "text-white" : "text-zinc-900";
  return (
    <Link href="/" className="flex items-start gap-2" onClick={onClick}>
      <img
        src="/brand/friendrenterfavicon.svg"
        alt="FriendRenter"
        className="h-10"
        decoding="async"
        loading="eager"
      />
      <span
        className={`text-xl font-display font-extrabold ${textTone} leading-4.5 tracking-[2px]`}
      >
        Friend<br></br>Renter
      </span>
    </Link>
  );
}

export default function MobileDrawer({ open, onClose }) {
  const closeBtnRef = useRef(null);

  // Lock background scroll while drawer is open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[60]"
        onClose={onClose}
        initialFocus={closeBtnRef}
        aria-label="Mobile navigation"
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto h-full w-[85%] max-w-sm bg-white shadow-xl">
                <div className="flex h-full flex-col">
                  {/* Header row (close) */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
                    {/* Visual logo (clicking it navigates home and closes) */}
                    <Logo tone="dark" onClick={() => onClose("logo")} />
                    {/* A11y title for the dialog */}
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={() => onClose("close_button")}
                      aria-label="Close menu"
                      className="rounded p-2 text-zinc-600 hover:bg-zinc-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                      >
                        <path
                          fill="currentColor"
                          d="M6.4 5.3 5.3 6.4 10.9 12l-5.6 5.6 1.1 1.1L12 13.1l5.6 5.6 1.1-1.1L13.1 12l5.6-5.6-1.1-1.1L12 10.9z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Links */}
                  <nav className="flex-1 overflow-y-auto px-5 py-4">
                    <ul className="space-y-1 text-emerald-900">
                      <li>
                        <Link
                          href="/hosts"
                          className="block rounded px-3 py-3 text-base hover:bg-emerald-50"
                          onClick={() => onClose("nav_link")}
                        >
                          Host
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/renters"
                          className="block rounded px-3 py-3 text-base hover:bg-emerald-50"
                          onClick={() => onClose("nav_link")}
                        >
                          Renters
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/why-friendrenter"
                          className="block rounded px-3 py-3 text-base hover:bg-emerald-50"
                          onClick={() => onClose("nav_link")}
                        >
                          Why FriendRenter™
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/legal/terms"
                          className="block rounded px-3 py-3 text-base hover:bg-emerald-50"
                          onClick={() => onClose("nav_link")}
                        >
                          Legal
                        </Link>
                      </li>
                    </ul>

                    {/* Cities */}
                    <div className="mt-6 border-t border-zinc-200 pt-4">
                      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        Cities
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {cities.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/city/${c.slug}`}
                              className="block rounded px-3 py-2 text-sm text-zinc-800 hover:bg-emerald-50"
                              onClick={() => onClose("city_link")}
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>

                  {/* CTA */}
                  <div className="border-t border-zinc-200 p-5">
                    <Button
                      variant="primary"
                      href="/#waitlist"
                      ctaId="cta_mobile_drawer_join"
                      className="w-full"
                      onClick={() => onClose("cta_button")}
                    >
                      Join waitlist
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
