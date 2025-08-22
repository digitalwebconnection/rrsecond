"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PopupProps = {
  delayMs?: number;
  storageKey?: string;
  snoozeDays?: number;
  title?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

export default function Popup({
  delayMs = 2000,
  storageKey = "everland_popup_dismissed_until",
  snoozeDays = 7,
  title = "Get a free site visit",
}: PopupProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const pushDL = (data: Record<string, any>) => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "popup_event",
        popup_name: "everland_home_popup",
        ...data,
      });
    } catch {}
  };

  useEffect(() => {
    setMounted(true);

    // Respect prior dismissal
    const now = Date.now();
    try {
      const until = Number(localStorage.getItem(storageKey) || 0);
      if (until && now < until) return;
    } catch {}

    const t = setTimeout(() => {
      setOpen(true);
      pushDL({ action: "open", timing_ms: delayMs });
    }, delayMs);

    return () => clearTimeout(t);
  }, [delayMs, storageKey]); // eslint-disable-line

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose("esc");
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const snooze = () => {
    try {
      const until = Date.now() + snoozeDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, String(until));
    } catch {}
  };

  const handleClose = (reason: "esc" | "backdrop" | "button" | "after_submit") => {
    setOpen(false);
    snooze();
    pushDL({ action: "close", reason });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const name = nameRef.current?.value?.trim() || "";
    const phone = phoneRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";

    if (!name || !phone) {
      setErr("Please enter your name and phone.");
      pushDL({ action: "submit_validate_error", missing: { name: !name, phone: !phone } });
      return;
    }

    if (!WEB3FORMS_KEY) {
      setErr("Missing Web3Forms key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local");
      pushDL({ action: "submit_config_error" });
      return;
    }

    setLoading(true);
    pushDL({
      action: "submit_start",
      form: "popup",
      meta: { page: typeof window !== "undefined" ? window.location.href : "" },
    });

    try {
      // Capture simple attribution if present
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
      const gclid = params.get("gclid") || "";
      const utm_source = params.get("utm_source") || "";
      const utm_medium = params.get("utm_medium") || "";
      const utm_campaign = params.get("utm_campaign") || "";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Everland: Popup Lead",
          from_name: "Everland Website",
          name,
          phone,
          email,
          page: typeof window !== "undefined" ? window.location.href : "",
          gclid,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        setOk(true);
        pushDL({ action: "submit_success", form: "popup", submission_id: data?.data?.submission_id });
        // Close after a short delay and snooze
        setTimeout(() => handleClose("after_submit"), 1200);
      } else {
        const message = data?.message || "Submission failed. Please try again.";
        setErr(message);
        pushDL({ action: "submit_error", message });
      }
    } catch (error: any) {
      const message = error?.message || "Network error. Please try again.";
      setErr(message);
      pushDL({ action: "submit_error", message });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !open) return null;

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose("backdrop");
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-[101] w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <button
          ref={closeBtnRef}
          onClick={() => handleClose("button")}
          aria-label="Close popup"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ×
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
            {ok ? "Thank you!" : title}
          </h3>

          {!ok ? (
            <>
              <p className="mb-5 text-gray-600">
                Book a free on-site consultation and get personalized plot options, pricing & layout details.
              </p>

              <form className="grid gap-3" onSubmit={onSubmit}>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Your name"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
                  required
                />
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="Phone"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
                  required
                />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email (optional)"
                  className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
                />

                {err && <p className="text-sm text-red-600">{err}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Request a Call Back"}
                </button>

                <p className="text-xs text-gray-500">We respect your privacy. No spam, ever.</p>
              </form>
            </>
          ) : (
            <p className="text-gray-700">
              We’ve received your details. Our team will contact you shortly.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
