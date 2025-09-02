"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "@/components/ui/Button";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function LeadForm({ type = "host", citySlug }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    // Honeypot: if filled → bail quietly
    if (formData.get("website")) {
      setLoading(false);
      setStatus({ ok: true, msg: "Thanks! We received your request." });
      return;
    }

    try {
      // Recaptcha: invisible execute
      const captchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const payload = {
        type,
        firstName: formData.get("firstName")?.trim(),
        lastName: formData.get("lastName")?.trim() || "",
        email: formData.get("email")?.trim(),
        phone: formData.get("phone")?.trim() || "",
        citySlug: formData.get("citySlug") || citySlug || "",
        message: formData.get("message")?.trim() || "",
        consentMarketing: formData.get("consentMarketing") === "on",
        captchaToken,
      };

      const res = await fetch(`${API_BASE}/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        setStatus({ ok: true, msg: "Thanks! We’ll reach out soon." });
        e.currentTarget.reset();
      } else if (res.status === 429) {
        setStatus({ ok: false, msg: "Too many requests. Please try again later." });
      } else if (res.status === 401) {
        setStatus({ ok: false, msg: "Could not verify you’re human. Please try again." });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({ ok: false, msg: data?.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-card">
      <input type="hidden" name="citySlug" defaultValue={citySlug || ""} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm text-gray-700">First name *</label>
          <input name="firstName" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Last name</label>
          <input name="lastName" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email *</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Phone</label>
          <input name="phone" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
      </div>

      {/* Honeypot */}
      <div className="hp-hidden" aria-hidden="true">
        <label>Website</label>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {type === "host" && (
        <div>
          <label className="block text-sm text-gray-700">Message</label>
          <textarea name="message" rows={3} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input id="consentMarketing" name="consentMarketing" type="checkbox" required className="h-4 w-4" />
        <label htmlFor="consentMarketing" className="text-sm text-gray-700">
          I agree to be contacted about FR.
        </label>
      </div>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={SITE_KEY}
        badge="inline"
      />

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Submitting…" : type === "host" ? "Send interest" : "Join waitlist"}
        </Button>
        {status && (
          <p className={`text-sm ${status.ok ? "text-green-700" : "text-red-600"}`}>{status.msg}</p>
        )}
      </div>
    </form>
  );
}
