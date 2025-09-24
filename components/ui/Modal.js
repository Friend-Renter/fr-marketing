// components/ui/Modal.tsx
"use client";
import { useEffect } from "react";

export default function Modal({ open, title, children, onClose, actionLabel, onAction }) {
  useEffect(() => {
    function onEsc(e) { if (e.key === "Escape") onClose?.(); }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-3 text-sm text-gray-700">{children}</div>
        <div className="mt-5 flex justify-end gap-3">
          <button className="rounded-md border px-3 py-1.5 text-sm" onClick={onClose}>Close</button>
          {onAction && (
            <button className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white" onClick={onAction}>
              {actionLabel || "OK"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
