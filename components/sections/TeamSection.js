// components/sections/TeamSection.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BioModal from "@/components/modals/BioModal";

export default function TeamSection({ members = [] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const openerRef = useRef(null);

  function onCardClick(m, btn) {
    setSelected(m);
    setOpen(true);
    openerRef.current = btn;
  }

  function handleClose() {
    setOpen(false);
    // restore focus to the button that opened the modal
    requestAnimationFrame(() => openerRef.current?.focus());
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {members.map((m) => (
          <article
            key={m.name}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-gray-200">
                <Image
                  src={m.imageSrc || "/brand/personplaceholder.png"}
                  alt={`${m.name} headshot`}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-600">{m.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{m.oneLiner}</p>
            {/* Optional mini chips (show up to 2 across languages/favorites) */}
            {(() => {
              const langs = Array.isArray(m.languages) ? m.languages : [];
              const chips = [...langs].slice(0, 3);
              if (chips.length === 0) return null;
              return (
                <div className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 ring-1 ring-gray-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              );
            })()}
            <div className="mt-4">
              <button
                type="button"
                className="text-sm font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
                onClick={(e) => onCardClick(m, e.currentTarget)}
                aria-haspopup="dialog"
                aria-controls="bio-modal"
              >
                Read bio →
              </button>
            </div>

            {/* Decorative background blob */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-100"
            />
          </article>
        ))}
      </div>

      <BioModal
        id="bio-modal"
        isOpen={open}
        onClose={handleClose}
        member={
          selected || {
            name: "",
            role: "",
            oneLiner: "",
            imageSrc: "",
            bio: "",

            languages: [],
            favorites: [],
          }
        }
      />
    </>
  );
}
