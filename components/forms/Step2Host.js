"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const VEH_API = `${API_BASE}/v1/vehicles`;

export default function Step2Host({ onSubmit, loading, savedAt, resetSignal }) {
  const initialRow = {
    year: "",
    make: "",
    model: "",
    trim: "",
    bodyType: "Sedan",
    seats: "5",
    transmission: "Auto",
    mileageBand: "<50k",
    availability: "Both",
    readiness: "Ready now",
    condition: "Good",
    // manual-entry toggles
    makeManual: false,
    modelManual: false,
    trimManual: false,
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

  // ---- vehicle options + caches (per component)
  const [years, setYears] = useState({
    min: 1980,
    max: new Date().getFullYear(),
  });
  const makesCache = useRef(new Map()); // key: year -> string[]
  const modelsCache = useRef(new Map()); // key: `${year}|${make}` -> string[]
  const trimsCache = useRef(new Map()); // key: `${year}|${make}|${model}` -> string[]

  // prefetch years once
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${VEH_API}/years`, { cache: "force-cache" });
        const data = await res.json();
        if (!alive) return;
        if (data?.years?.min && data?.years?.max) setYears(data.years);
      } catch {
        // keep defaults
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // helpers
  async function fetchMakes(year) {
    if (!year) return [];
    const k = String(year);
    if (makesCache.current.has(k)) return makesCache.current.get(k);
    const res = await fetch(
      `${VEH_API}/makes?year=${encodeURIComponent(year)}`
    );
    const data = await res.json();
    const list = Array.isArray(data?.makes) ? data.makes : [];
    makesCache.current.set(k, list);
    return list;
  }

  async function fetchModels(year, make) {
    if (!year || !make) return [];
    const k = `${year}|${make}`;
    if (modelsCache.current.has(k)) return modelsCache.current.get(k);
    const qs = new URLSearchParams({ year: String(year), make });
    const res = await fetch(`${VEH_API}/models?${qs.toString()}`);
    const data = await res.json();
    const list = Array.isArray(data?.models) ? data.models : [];
    modelsCache.current.set(k, list);
    return list;
  }

  async function fetchTrims(year, make, model) {
    if (!year || !make || !model) return [];
    const k = `${year}|${make}|${model}`;
    if (trimsCache.current.has(k)) return trimsCache.current.get(k);
    const qs = new URLSearchParams({ year: String(year), make, model });
    const res = await fetch(`${VEH_API}/trims?${qs.toString()}`);
    const data = await res.json();
    const list = Array.isArray(data?.trims) ? data.trims : [];
    // Store the full payload so we can look up specs later
    trimsCache.current.set(k, {
      trims: list,
      specByTrim: data?.specByTrim || {},
    });
    return { trims: list, specByTrim: data?.specByTrim || {} };
  }

  // derived options per row
  function useOptionsForRow(row) {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [specByTrim, setSpecByTrim] = useState({});

    useEffect(() => {
      let alive = true;
      if (row.year) {
        fetchMakes(row.year).then((m) => alive && setMakes(m));
      } else {
        setMakes([]);
      }
      return () => {
        alive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row.year]);

    useEffect(() => {
      let alive = true;
      if (row.year && row.make) {
        fetchModels(row.year, row.make).then((m) => alive && setModels(m));
      } else {
        setModels([]);
      }
      return () => {
        alive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row.year, row.make]);

    useEffect(() => {
      let alive = true;
      if (row.year && row.make && row.model) {
        // FETCH TRIMS (+ possible specs)
        const k = `${row.year}|${row.make}|${row.model}`;
        // if cached payload is already an object, use it
        const cached = trimsCache.current.get(k);
        if (cached && cached.trims) {
          setTrims(cached.trims);
          setSpecByTrim(cached.specByTrim || {});
        } else {
          fetchTrims(row.year, row.make, row.model).then((payload) => {
            if (!alive) return;
            setTrims(payload.trims || []);
            setSpecByTrim(payload.specByTrim || {});
          });
        }
      } else {
        setTrims([]);
        setSpecByTrim({});
      }
      return () => {
        alive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row.year, row.make, row.model]);

    return { makes, models, trims, specByTrim };
  }

  // reset support from parent
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

  // updating parent-dependent values: clear on parent change
  function onYearChange(i, year) {
    setRows((r) =>
      r.map((row, idx) =>
        idx === i
          ? {
              ...row,
              year,
              make: "",
              model: "",
              trim: "",
              modelManual: false,
              trimManual: false,
            }
          : row
      )
    );
  }
  function onMakeChange(i, make) {
    setRows((r) =>
      r.map((row, idx) =>
        idx === i
          ? {
              ...row,
              make,
              model: "",
              trim: "",
              modelManual: false,
              trimManual: false,
            }
          : row
      )
    );
  }
  function onModelChange(i, model) {
    setRows((r) =>
      r.map((row, idx) =>
        idx === i ? { ...row, model, trim: "", trimManual: false } : row
      )
    );
  }

  function handleSave(e) {
    e.preventDefault();
    const vehicles = rows.map((r) => ({
      year: r.year?.trim(),
      make: r.make?.trim(),
      model: r.model?.trim(),
      trim: r.trim?.trim() || undefined,
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

  // years list array (desc, recent first)
  const yearList = useMemo(() => {
    const arr = [];
    for (let y = years.max; y >= years.min; y--) arr.push(String(y));
    return arr;
  }, [years]);

  return (
    <form
      onSubmit={handleSave}
      className="rounded-lg border border-gray-200 p-4 bg-white"
    >
      <h3 className="text-lg font-semibold text-gray-900">Host details</h3>
      <p className="mt-1 text-sm text-gray-700">
        Tell us about your vehicle(s) and setup.
      </p>

      {/* location */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            City
          </label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            value={meta.city}
            onChange={(e) => setMeta((m) => ({ ...m, city: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            State
          </label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            value={meta.state}
            onChange={(e) => setMeta((m) => ({ ...m, state: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">ZIP</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            value={meta.zip5}
            onChange={(e) => setMeta((m) => ({ ...m, zip5: e.target.value }))}
            inputMode="numeric"
            pattern="\d{5}"
          />
        </div>
      </div>

      {/* vehicles */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Vehicle(s)</h4>
          <button
            type="button"
            onClick={addRow}
            className="text-sm text-green-700 underline"
          >
            Add vehicle
          </button>
        </div>

        {rows.map((row, i) => {
         {rows.map((row, i) => {
          const { makes, models, trims, specByTrim } = useOptionsForRow(row);
          const yearDisabled = false;
          const makeDisabled = !row.year || row.makeManual;
          const modelDisabled = !row.year || !row.make || row.modelManual;
          const trimDisabled =
            !row.year || !row.make || !row.model || row.trimManual;

          return (
            <div
              key={i}
              className="rounded-md border border-gray-200 p-3 bg-white"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Year <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={row.year}
                    onChange={(e) => onYearChange(i, e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    <option value="">Select year</option>
                    {yearList.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Make */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900">
                      Make <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-xs text-green-700 underline"
                      onClick={() =>
                        updateRow(i, "makeManual", !row.makeManual)
                      }
                      disabled={!row.year}
                      title="Type manually if you can't find your make"
                    >
                      {row.makeManual ? "Use list" : "Type manually"}
                    </button>
                  </div>
                  {row.makeManual ? (
                    <input
                      placeholder="e.g. Honda"
                      value={row.make}
                      onChange={(e) => updateRow(i, "make", e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={!row.year}
                    />
                  ) : (
                    <select
                      value={row.make}
                      onChange={(e) => onMakeChange(i, e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={makeDisabled}
                    >
                      <option value="">
                        {row.year ? "Select make" : "Select year first"}
                      </option>
                      {makes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Model */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900">
                      Model <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      className="text-xs text-green-700 underline"
                      onClick={() =>
                        updateRow(i, "modelManual", !row.modelManual)
                      }
                      disabled={!row.year || !row.make}
                      title="Type manually if you can't find your model"
                    >
                      {row.modelManual ? "Use list" : "Type manually"}
                    </button>
                  </div>
                  {row.modelManual ? (
                    <input
                      placeholder="e.g. Accord"
                      value={row.model}
                      onChange={(e) => updateRow(i, "model", e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={!row.year || !row.make}
                    />
                  ) : (
                    <select
                      value={row.model}
                      onChange={(e) => onModelChange(i, e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={modelDisabled}
                    >
                      <option value="">
                        {row.make ? "Select model" : "Select make first"}
                      </option>
                      {models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Trim (optional) */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900">
                      Trim
                    </label>
                    <button
                      type="button"
                      className="text-xs text-green-700 underline"
                      onClick={() =>
                        updateRow(i, "trimManual", !row.trimManual)
                      }
                      disabled={!row.year || !row.make || !row.model}
                      title="Type manually if you can't find your trim"
                    >
                      {row.trimManual ? "Use list" : "Type manually"}
                    </button>
                  </div>
                  {row.trimManual ? (
                    <input
                      placeholder="e.g. Sport"
                      value={row.trim}
                      onChange={(e) => updateRow(i, "trim", e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={!row.year || !row.make || !row.model}
                    />
                  ) : (
                    <select
                      value={row.trim}
                     onChange={(e) => {
                        const nextTrim = e.target.value;
                        // Set trim
                        updateRow(i, "trim", nextTrim);
                        // PREFILL FROM SPEC (only if user hasn't touched these fields yet)
                        const spec = specByTrim?.[nextTrim] || {};
                        setRows((rws) =>
                          rws.map((rw, idx) => {
                            if (idx !== i) return rw;
                            const updates = {};
                            // Only prefill if current value equals the default (user hasn't edited)
                            if (spec.bodyType && rw.bodyType === "Sedan") updates.bodyType = spec.bodyType;
                            if (Number.isFinite(spec.seats) && String(rw.seats) === "5") updates.seats = String(spec.seats);
                            if (spec.transmission && rw.transmission === "Auto") updates.transmission = spec.transmission;
                            return Object.keys(updates).length ? { ...rw, ...updates } : rw;
                          })
                        );
                      }}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                      disabled={trimDisabled}
                    >
                      <option value="">
                        {row.model
                          ? "Select trim (optional)"
                          : "Select model first"}
                      </option>
                      {trims.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* secondary vehicle fields */}
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Body type
                  </label>
                  <select
                    value={row.bodyType}
                    onChange={(e) => updateRow(i, "bodyType", e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["Sedan", "SUV", "Truck", "Van", "EV", "Other"].map(
                      (v) => (
                        <option key={v}>{v}</option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Seats
                  </label>
                  <select
                    value={row.seats}
                    onChange={(e) => updateRow(i, "seats", e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["2", "4", "5", "6", "7", "8"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Transmission
                  </label>
                  <select
                    value={row.transmission}
                    onChange={(e) =>
                      updateRow(i, "transmission", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["Auto", "Manual"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Mileage
                  </label>
                  <select
                    value={row.mileageBand}
                    onChange={(e) =>
                      updateRow(i, "mileageBand", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["<50k", "50–100k", "100–150k", "150k+"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Availability
                  </label>
                  <select
                    value={row.availability}
                    onChange={(e) =>
                      updateRow(i, "availability", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["Weekdays", "Weekends", "Both"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Readiness
                  </label>
                  <select
                    value={row.readiness}
                    onChange={(e) => updateRow(i, "readiness", e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["Ready now", "In 1–3 mo", "Just exploring"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Condition
                  </label>
                  <select
                    value={row.condition}
                    onChange={(e) => updateRow(i, "condition", e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    {["Excellent", "Good", "Fair"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end justify-end">
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
          );
        })}
      </div>

      {/* misc */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Insurance
          </label>
          <select
            value={meta.insuranceStatus}
            onChange={(e) =>
              setMeta((m) => ({ ...m, insuranceStatus: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          >
            <option value="personal">Personal</option>
            <option value="commercial">Commercial</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Handoff
          </label>
          <select
            value={meta.handoff}
            onChange={(e) =>
              setMeta((m) => ({ ...m, handoff: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          >
            <option value="in_person">In-person</option>
            <option value="lockbox">Lockbox</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Fleet size
          </label>
          <select
            value={meta.fleetSize}
            onChange={(e) =>
              setMeta((m) => ({ ...m, fleetSize: e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          >
            <option value="1">1</option>
            <option value="2_3">2–3</option>
            <option value="4_9">4–9</option>
            <option value="10_plus">10+</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-900">
          Pricing comfort (optional)
        </label>
        <input
          placeholder="$ per night"
          value={meta.pricingExpectation}
          onChange={(e) =>
            setMeta((m) => ({ ...m, pricingExpectation: e.target.value }))
          }
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-900">Notes</label>
        <textarea
          rows={3}
          value={meta.notes}
          onChange={(e) => setMeta((m) => ({ ...m, notes: e.target.value }))}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-gray-600">
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
