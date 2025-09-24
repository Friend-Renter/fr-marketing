// components/forms/Step2Host.jsx
"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

export default function Step2Host({ onSubmit, loading, savedAt, resetSignal }) {
  const initialRow = {
    year: "",
    make: "",
    model: "",
    bodyType: "Sedan",
    seats: "5",
    transmission: "Auto",
    mileageBand: "<50k",
    availability: "Both",
    readiness: "Ready now",
    condition: "Good",
  };
  const [rows, setRows] = useState([initialRow]);

  const [meta, setMeta] = useState({
    city: "",
    state: "",
    zip5: "",
    insuranceStatus: "unsure",
    handoff: "both",
    pricingExpectation: "",
    fleetSize: "1",
    notes: "",
  });

  useEffect(() => {
    if (resetSignal != null) {
      setRows([initialRow]);
      setMeta({
        city: "",
        state: "",
        zip5: "",
        insuranceStatus: "unsure",
        handoff: "both",
        pricingExpectation: "",
        fleetSize: "1",
        notes: "",
      });
    }
  }, [resetSignal]);

  function addRow() {
    setRows((r) => [...r, { ...initialRow }]);
  }
  function removeRow(i) {
    setRows((r) => r.filter((_, idx) => idx !== i));
  }
  function updateRow(i, k, v) {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)));
  }

  function handleSave(e) {
    e.preventDefault();
    const vehicles = rows.map((r) => ({
      year: r.year?.trim(),
      make: r.make?.trim(),
      model: r.model?.trim(),
      bodyType: r.bodyType,
      seats: Number(r.seats || 0),
      transmission: r.transmission,
      mileageBand: r.mileageBand,
      condition: r.condition,
      availability: r.availability,
      readiness: r.readiness,
    }));
    onSubmit({
      locations:
        meta.city || meta.zip5
          ? [
              {
                city: meta.city || undefined,
                state: meta.state || undefined,
                zip5: meta.zip5 || undefined,
              },
            ]
          : [],
      vehicles,
      insuranceStatus: meta.insuranceStatus,
      handoff: meta.handoff,
      pricingExpectation: meta.pricingExpectation?.trim() || undefined,
      fleetSize: meta.fleetSize,
      notes: meta.notes?.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-lg border border-gray-200 p-4"
    >
      <h3 className="text-lg font-semibold text-gray-900">Host details</h3>
      <p className="mt-1 text-sm text-gray-600">
        Tell us about your vehicle(s) and setup.
      </p>

      {/* location */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">City</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={meta.city}
            onChange={(e) => setMeta((m) => ({ ...m, city: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">State</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={meta.state}
            onChange={(e) => setMeta((m) => ({ ...m, state: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">ZIP</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={meta.zip5}
            onChange={(e) => setMeta((m) => ({ ...m, zip5: e.target.value }))}
          />
        </div>
      </div>

      {/* vehicles */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Vehicle(s)</h4>
          <button type="button" onClick={addRow} className="text-sm underline">
            Add vehicle
          </button>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="rounded-md border border-gray-200 p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                placeholder="Year *"
                value={row.year}
                onChange={(e) => updateRow(i, "year", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
                required
              />
              <input
                placeholder="Make *"
                value={row.make}
                onChange={(e) => updateRow(i, "make", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
                required
              />
              <input
                placeholder="Model *"
                value={row.model}
                onChange={(e) => updateRow(i, "model", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
              <select
                value={row.bodyType}
                onChange={(e) => updateRow(i, "bodyType", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["Sedan", "SUV", "Truck", "Van", "EV", "Other"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                value={row.seats}
                onChange={(e) => updateRow(i, "seats", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["2", "4", "5", "6", "7", "8"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                value={row.transmission}
                onChange={(e) => updateRow(i, "transmission", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["Auto", "Manual"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                value={row.mileageBand}
                onChange={(e) => updateRow(i, "mileageBand", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["<50k", "50–100k", "100–150k", "150k+"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
              <select
                value={row.availability}
                onChange={(e) => updateRow(i, "availability", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["Weekdays", "Weekends", "Both"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                value={row.readiness}
                onChange={(e) => updateRow(i, "readiness", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["Ready now", "In 1–3 mo", "Just exploring"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <select
                value={row.condition}
                onChange={(e) => updateRow(i, "condition", e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {["Excellent", "Good", "Fair"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <div className="flex justify-end">
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    className="text-sm text-red-600 underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* misc */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">Insurance</label>
          <select
            value={meta.insuranceStatus}
            onChange={(e) =>
              setMeta((m) => ({ ...m, insuranceStatus: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="personal">Personal</option>
            <option value="commercial">Commercial</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Handoff</label>
          <select
            value={meta.handoff}
            onChange={(e) =>
              setMeta((m) => ({ ...m, handoff: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="in_person">In-person</option>
            <option value="lockbox">Lockbox</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Fleet size</label>
          <select
            value={meta.fleetSize}
            onChange={(e) =>
              setMeta((m) => ({ ...m, fleetSize: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="1">1</option>
            <option value="2_3">2–3</option>
            <option value="4_9">4–9</option>
            <option value="10_plus">10+</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-700">
          Pricing comfort (optional)
        </label>
        <input
          placeholder="$ per night"
          value={meta.pricingExpectation}
          onChange={(e) =>
            setMeta((m) => ({ ...m, pricingExpectation: e.target.value }))
          }
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="mt-3">
        <label className="block text-sm text-gray-700">Notes</label>
        <textarea
          rows={3}
          value={meta.notes}
          onChange={(e) => setMeta((m) => ({ ...m, notes: e.target.value }))}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {savedAt
            ? `Saved at ${savedAt.toLocaleTimeString()}`
            : "Not saved yet"}
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving…" : "Save host details"}
        </Button>
      </div>
    </form>
  );
}
