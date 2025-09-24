// components/forms/Step2Renter.jsx
"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Step2Renter({
  onSubmit,
  loading,
  savedAt,
  resetSignal,
}) {
  const [pickup, setPickup] = useState({ city: "", state: "", zip5: "" });
  const [dates, setDates] = useState({
    earliestStart: "",
    latestStart: "",
    typicalDurationBand: "1-3",
  });
  const [prefs, setPrefs] = useState({
    bodyType: "No preference",
    seats: "5",
    transmission: "No preference",
    extras: [],
  });
  const [budgetBand, setBudgetBand] = useState("50_80");
  const [ageBand, setAgeBand] = useState("25_plus");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (resetSignal != null) {
      setPickup({ city: "", state: "", zip5: "" });
      setDates({
        earliestStart: "",
        latestStart: "",
        typicalDurationBand: "1-3",
      });
      setPrefs({
        bodyType: "No preference",
        seats: "5",
        transmission: "No preference",
        extras: [],
      });
      setBudgetBand("50_80");
      setAgeBand("25_plus");
      setNotes("");
    }
  }, [resetSignal]);

  function toggleExtra(x) {
    setPrefs((p) =>
      p.extras.includes(x)
        ? { ...p, extras: p.extras.filter((e) => e !== x) }
        : { ...p, extras: [...p.extras, x] }
    );
  }

  function handleSave(e) {
    e.preventDefault();
    onSubmit({
      pickup,
      dates,
      prefs: { ...prefs, seats: Number(prefs.seats || 0) },
      budgetBand,
      ageBand,
      notes: notes?.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-lg border border-gray-200 p-4"
    >
      <h3 className="text-lg font-semibold text-gray-900">Renter details</h3>
      <p className="mt-1 text-sm text-gray-600">What you’re looking for.</p>

      {/* pickup */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">City</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={pickup.city}
            onChange={(e) => setPickup((p) => ({ ...p, city: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">State</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={pickup.state}
            onChange={(e) =>
              setPickup((p) => ({ ...p, state: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">ZIP</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={pickup.zip5}
            onChange={(e) => setPickup((p) => ({ ...p, zip5: e.target.value }))}
          />
        </div>
      </div>

      {/* when */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">Earliest start</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={dates.earliestStart}
            onChange={(e) =>
              setDates((d) => ({ ...d, earliestStart: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Latest start</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={dates.latestStart}
            onChange={(e) =>
              setDates((d) => ({ ...d, latestStart: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Typical duration
          </label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={dates.typicalDurationBand}
            onChange={(e) =>
              setDates((d) => ({ ...d, typicalDurationBand: e.target.value }))
            }
          >
            <option value="1-3">1–3 days</option>
            <option value="4-7">4–7 days</option>
            <option value="8+">8+ days</option>
          </select>
        </div>
      </div>

      {/* prefs */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-700">Body type</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={prefs.bodyType}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, bodyType: e.target.value }))
            }
          >
            {["Sedan", "SUV", "Truck", "Van", "EV", "No preference"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Seats</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={prefs.seats}
            onChange={(e) => setPrefs((p) => ({ ...p, seats: e.target.value }))}
          >
            {["2", "4", "5", "6", "7", "8"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Transmission</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={prefs.transmission}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, transmission: e.target.value }))
            }
          >
            {["Auto", "Manual", "No preference"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-sm text-gray-700">Extras</label>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          {[
            "Car seat",
            "Ski rack",
            "Bike rack",
            "Snow tires",
            "No preference",
          ].map((x) => (
            <label key={x} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={prefs.extras.includes(x)}
                onChange={() => toggleExtra(x)}
              />
              {x}
            </label>
          ))}
        </div>
      </div>

      {/* budget / age */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm text-gray-700">
            Budget (per day)
          </label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={budgetBand}
            onChange={(e) => setBudgetBand(e.target.value)}
          >
            <option value="<50">&lt; $50</option>
            <option value="50_80">$50–$80</option>
            <option value="80_120">$80–$120</option>
            <option value="120_plus">$120+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">Age band</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={ageBand}
            onChange={(e) => setAgeBand(e.target.value)}
          >
            <option value="u21">Under 21</option>
            <option value="21_24">21–24</option>
            <option value="25_plus">25+</option>
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-sm text-gray-700">Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
          {loading ? "Saving…" : "Save renter details"}
        </Button>
      </div>
    </form>
  );
}
