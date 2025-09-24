// components/forms/LeadForm.jsx
"use client";

import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Step1Quick from "./Step1Quick";
import Step2Host from "./Step2Host";
import Step2Renter from "./Step2Renter";
import Modal from "../ui/Modal";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Role-aware, 2-step Lead form shell.
 * Back-compat:
 *  - accepts `type` prop from old usage ("host" | "renter")
 *  - maps to defaultRole for Step 2 routing
 */
export default function LeadForm({
  defaultRole,
  pageSource = "landing",
  citySlug,
  // legacy prop:
  type,
}) {
  // Back-compat mapping
  const initialRole = useMemo(() => {
    if (defaultRole) return defaultRole;
    if (type === "host") return "host";
    if (type === "renter") return "renter";
    // Landing default: host (as requested)
    return "host";
  }, [defaultRole, type]);

  const [role, setRole] = useState(initialRole); // 'host' | 'renter' | 'both'
  const [step, setStep] = useState(1); // 1 or 2
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { ok, msg }
  const [leadEmail, setLeadEmail] = useState(""); // key for enrich
  const [savedAt, setSavedAt] = useState(null);

  const [resetSignal, setResetSignal] = useState(0);
  const [openStep1Modal, setOpenStep1Modal] = useState(false);
  const [openStep2Modal, setOpenStep2Modal] = useState(false);

  const recaptchaRef = useRef(null);

  // Utilities
  const getIdem = () => {
    try {
      return crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    } catch {
      return `${Date.now()}-${Math.random()}`;
    }
  };
  const getUtm = () => {
    if (typeof window === "undefined") return {};
    const u = new URL(window.location.href);
    return {
      utmSource: u.searchParams.get("utm_source") || undefined,
      utmMedium: u.searchParams.get("utm_medium") || undefined,
      utmCampaign: u.searchParams.get("utm_campaign") || undefined,
      referrer: document?.referrer || undefined,
      pageSource,
    };
  };

  // Step 1 submit handler (POST /v1/leads)
  async function submitStep1(values) {
    if (loading) return;
    setLoading(true);
    setStatus(null);
    let captchaToken = "";
    try {
      captchaToken = await recaptchaRef.current?.executeAsync?.();
    } catch {}
    try {
      const payload = {
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim() || "",
        email: values.email?.trim(),
        phone: values.phone?.trim() || "",
        cityOrZip: values.cityOrZip?.trim(),
        role, // 'host'|'renter'|'both'
        consent: !!values.consent,
        captchaToken,
        honeypot: values.honeypot || "",
        citySlug: citySlug || "",
        ...getUtm(),
      };
      const res = await fetch(`${API_BASE}/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": getIdem(),
        },
        body: JSON.stringify(payload),
      });
      // safe body read
      let data = null;
      try {
        const t = await res.text();
        data = t ? JSON.parse(t) : null;
      } catch {}
      if (res.ok) {
        setLeadEmail(payload.email);
        setStatus({
          ok: true,
          msg: "Thanks! Add a few details to skip the line.",
        });
        setStep(2);
        setStatus({
          ok: true,
          msg: "Thanks! Add a few details to skip the line.",
        });
        setOpenStep1Modal(true); // show CTA
        return;
      }
      if (res.status === 429)
        return setStatus({
          ok: false,
          msg: "Too many requests. Try again later.",
        });
      if (res.status === 401)
        return setStatus({
          ok: false,
          msg: "Captcha check failed. Please try again.",
        });
      setStatus({
        ok: false,
        msg: (data && data.message) || `http_${res.status}`,
      });
    } catch (err) {
      console.error("Step1 error", err);
      setStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => {
        try {
          recaptchaRef.current?.reset();
        } catch {}
      }, 600);
    }
  }

  // Step 2 submit handler (PATCH /v1/leads/enrich)
  async function submitStep2({ hostDetails, renterDetails }) {
    if (loading) return;
    setLoading(true);
    setStatus(null);
    let captchaToken = "";
    try {
      captchaToken = await recaptchaRef.current?.executeAsync?.();
    } catch {}
    try {
      const body = { captchaToken };
      if (hostDetails) body.hostDetails = hostDetails;
      if (renterDetails) body.renterDetails = renterDetails;
      if (!leadEmail) {
        setStatus({
          ok: false,
          msg: "Missing email context. Please complete Step 1.",
        });
        return;
      }
      const res = await fetch(
        `${API_BASE}/v1/leads/enrich?email=${encodeURIComponent(leadEmail)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Idempotency-Key": getIdem(),
          },
          body: JSON.stringify(body),
        }
      );
      let data = null;
      try {
        const t = await res.text();
        data = t ? JSON.parse(t) : null;
      } catch {}
      if (res.ok) {
        setSavedAt(new Date());
        setStatus({ ok: true, msg: "Saved. You’re at the front of the line." });
        setStatus({ ok: true, msg: "Saved. You’re at the front of the line." });
        setResetSignal((n) => n + 1); // clear Step 2 forms
        setOpenStep2Modal(true);
        return;
      }
      if (res.status === 429)
        return setStatus({
          ok: false,
          msg: "Too many updates today. Try later.",
        });
      if (res.status === 401)
        return setStatus({
          ok: false,
          msg: "Captcha check failed. Please try again.",
        });
      setStatus({
        ok: false,
        msg: (data && data.message) || `http_${res.status}`,
      });
    } catch (err) {
      console.error("Step2 error", err);
      setStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => {
        try {
          recaptchaRef.current?.reset();
        } catch {}
      }, 600);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-card">
      {step === 1 ? (
        <Step1Quick
          role={role}
          setRole={setRole}
          onSubmit={submitStep1}
          loading={loading}
        />
      ) : (
        <div className="space-y-6">
          {role === "host" && (
            <Step2Host
              onSubmit={(hostDetails) => submitStep2({ hostDetails })}
              loading={loading}
              savedAt={savedAt}
              resetSignal={resetSignal}
            />
          )}
          {role === "renter" && (
            <Step2Renter
              onSubmit={(renterDetails) => submitStep2({ renterDetails })}
              loading={loading}
              savedAt={savedAt}
              resetSignal={resetSignal}
            />
          )}
          {role === "both" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Step2Host
                onSubmit={(hostDetails) => submitStep2({ hostDetails })}
                loading={loading}
                savedAt={savedAt}
                resetSignal={resetSignal}
              />
              <Step2Renter
                onSubmit={(renterDetails) => submitStep2({ renterDetails })}
                loading={loading}
                savedAt={savedAt}
                resetSignal={resetSignal}
              />
            </div>
          )}
        </div>
      )}

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={SITE_KEY}
        badge="bottomright"
        onExpired={() => {
          try {
            recaptchaRef.current?.reset();
          } catch {}
        }}
        onErrored={() => console.warn("reCAPTCHA errored (non-fatal)")}
      />

      {status && (
        <p
          aria-live="polite"
          className={`text-sm ${status.ok ? "text-green-700" : "text-red-600"}`}
        >
          {status.msg}
        </p>
      )}

      {/* Step 1 modal: CTA -> go to Step 2 */}
      <Modal
        open={openStep1Modal}
        title="You're on the list!"
        onClose={() => {
          setOpenStep1Modal(false);
          setStep(2);
        }}
        actionLabel="Skip the line — add details"
        onAction={() => {
          setOpenStep1Modal(false);
          setStep(2);
        }}
      >
        Add a few details now to get priority matching in your area.
      </Modal>

      {/* Step 2 modal: Done -> refresh */}
      <Modal
        open={openStep2Modal}
        title="Details saved"
        onClose={() => setOpenStep2Modal(false)}
        actionLabel="Done"
        onAction={() => {
          setOpenStep2Modal(false);
          if (typeof window !== "undefined") window.location.reload();
        }}
      >
        Thanks! We’ll reach out as vehicles become available.
      </Modal>
    </div>
  );
}
