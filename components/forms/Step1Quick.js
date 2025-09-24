// components/forms/Step1Quick.jsx
"use client";
import { useRef } from "react";
import Button from "../ui/Button";

export default function Step1Quick({
  role, // 'host' | 'renter' | 'both'
  setRole,
  onSubmit,
  loading,
}) {
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot quick bail on client
    if (fd.get("website")) {
      // pretend success to bots
      onSubmit({
        firstName: "Bot",
        lastName: "Bot",
        email: "bot@example.com",
        phone: "",
        cityOrZip: "",
        consent: true,
        honeypot: "1",
      });
      return;
    }
    onSubmit({
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      cityOrZip: fd.get("cityOrZip"),
      consent: fd.get("consent") === "on",
      honeypot: fd.get("website") || "",
    });
    try {
      formRef.current?.reset();
    } catch {}
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* name / email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">First name *</label>
          <input
            name="firstName"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Last name</label>{" "}
          <input
            name="lastName"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />{" "}
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {/* phone */}
      <div>
        <label className="block text-sm text-gray-700">Phone (optional)</label>
        <input
          name="phone"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* city or zip */}
      <div>
        <label className="block text-sm text-gray-700">City or ZIP *</label>
        <input
          name="cityOrZip"
          required
          placeholder="Lincoln, NE or 68508"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* role picker */}
      <fieldset className="mt-1">
        <legend className="block text-sm text-gray-700">
          I’m interested as *
        </legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {[
            { value: "host", label: "Host" },
            { value: "renter", label: "Renter" },
            { value: "both", label: "Both" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="inline-flex items-center gap-2 text-sm text-gray-800"
            >
              <input
                type="radio"
                name="role"
                value={opt.value}
                checked={role === opt.value}
                onChange={() => setRole(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* consent */}
      <div className="flex items-center gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="h-4 w-4"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to be contacted about FR.{" "}
          <a href="/legal/privacy" className="underline">
            Privacy Policy
          </a>
        </label>
      </div>

      {/* Honeypot */}
      <div className="hp-hidden" aria-hidden="true">
        <label>Website</label>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Submitting…" : "Join early access"}
        </Button>
      </div>
    </form>
  );
}
