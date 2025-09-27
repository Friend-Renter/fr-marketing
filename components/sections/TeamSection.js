// components/sections/TeamSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BioModal from "@/components/modals/BioModal";

type Member = {
  name: string;
  role: string;
  oneLiner: string;
  imageSrc: string;
  bio: string;
};

export default function TeamSection({ members }: { members: Member[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);

  function onCardClick(m: Member, btn: HTMLButtonElement | null) {
    setSelected(m);
    setOpen(true);
    openBtnRef.current = btn;
  }

  function handleClose() {
    setOpen(false);
    // restore focus to the button that opened the modal
    requestAnimationFrame(() => openBtnRef.current?.focus());
  }

  // Close on Cmd/Ctrl+W guard within modal? (Optional)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
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
                  src={m.imageSrc}
                  alt={`${m.name} headshot`}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{m.oneLiner}</p>

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
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-50"
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
          }
        }
      />
    </>
  );
}
