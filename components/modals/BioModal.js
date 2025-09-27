// components/modals/BioModal.jsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BioModal({
  id = "bio-modal",
  isOpen,
  onClose,
  member,
}) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    // Basic focus & scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={`${member?.name || ""} — Bio`}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onMouseDown={(e) => {
        // close on backdrop click (ignore inner clicks)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-[101] w-full max-w-lg rounded-xl bg-white p-5 shadow-xl ring-1 ring-black/5">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-gray-200">
            {member?.imageSrc ? (
              <Image
                src={member.imageSrc}
                alt={`${member.name} headshot`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-gray-900">
              {member?.name}
            </h3>
            <p className="text-sm text-gray-600">{member?.role}</p>
            {member?.oneLiner ? (
              <p className="mt-2 text-sm text-gray-700">{member.oneLiner}</p>
            ) : null}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
            aria-label="Close bio"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6l6.3-6.31z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 text-[15px] leading-relaxed text-gray-700">
          {member?.bio}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
