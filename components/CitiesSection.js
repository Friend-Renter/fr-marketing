"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const CITIES = [
  {
    name: "Lincoln, NE",
    slug: "lincoln-ne",
    blurb:
      "Stroll the Haymarket, roll out with friends, and make the city your passenger.",
    waitlist: 128,
    seedInitials: ["AL", "JB", "KM", "RS"],
  },
  {
    name: "Omaha, NE",
    slug: "omaha-ne",
    blurb:
      "Old Market energy, riverfront sunsets, and easy drives with friends.",
    waitlist: 203,
    seedInitials: ["TT", "DG", "MS", "CY"],
  },
];

function Avatar({ label }) {
  // simple colored circle with initials
  return (
    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold ring-1 ring-emerald-200">
      {label}
    </div>
  );
}

export default function CitiesSection() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return CITIES;
    return CITIES.filter(
      (c) => c.name.toLowerCase().includes(term) || c.slug.includes(term)
    );
  }, [q]);

  return (
    <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-brand-900">
          Available Cities
        </h2>
        <p className="mt-1 text-sm text-brand-700">
          Starting local and growing through friends.
        </p>
      </div>

      {/* Find your city */}
      <div className="mx-auto mt-6 max-w-xl">
        <label className="sr-only" htmlFor="city-search">
          Search city
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-card">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-400 text-[14px]"
          />
          <input
            id="city-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search city…"
            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        {/* quick chips */}
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm">
          {CITIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setQ(c.name)}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-100"
            >
              {c.name}
            </button>
          ))}
          <a
            href="#waitlist"
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-gray-700 hover:bg-gray-50"
          >
            Your city?
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/city/${c.slug}`}
            className="group rounded-lg border border-gray-200 bg-white p-5 shadow-card hover:border-brand-300 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-medium text-brand-700 ring-1 ring-brand-200">
                  Launching soon
                </div>
              </div>
              <div className="text-xs text-gray-500">#{c.slug}</div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
              <div className="inline-flex items-center gap-1 text-emerald-700">
                <FontAwesomeIcon icon={faUserGroup} className="text-[14px]" />
                <span className="text-sm font-medium">
                  Friends joined: {c.waitlist}+
                </span>
              </div>
            </div>

            <p className="mt-1 text-sm text-gray-700">{c.blurb}</p>

            {/* avatar stack */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {c.seedInitials.slice(0, 4).map((i) => (
                  <span key={i} className="ring-2 ring-white rounded-full">
                    <Avatar label={i} />
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">and more friends</span>
            </div>

            {/* per-city CTA */}
            <div className="mt-5">
              <a
                href={`#waitlist?city=${encodeURIComponent(c.name)}`}
                className="inline-flex items-center justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-brand-500"
                onClick={(e) => e.stopPropagation()}
              >
                Join city waitlist
              </a>
            </div>
          </Link>
        ))}

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
            No cities match “{q}”.{" "}
            <a
              href="#waitlist"
              className="text-brand-700 underline underline-offset-2 hover:text-brand-600"
            >
              Request your city
            </a>
            .
          </div>
        )}
      </div>
    </section>
  );
}
