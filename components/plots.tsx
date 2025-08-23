"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import Image from "next/image"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>
  }
}

const plots = [
  { phase: "Option #1", size: "400 sq. yards", desc: "Perfect for compact yet spacious living", status: "Available", statusColor: "bg-green-600" },
  { phase: "Option #2", size: "500–700 sq. yards", desc: "Ideal for family homes with garden space", status: "Available", statusColor: "bg-green-600" },
  { phase: "Option #3", size: "1000–1300 sq. yards", desc: "Premium choice for luxury living", status: "Booking Fast", statusColor: "bg-yellow-500" },
  { phase: "Option #4", size: "Above 1300 sq. yards", desc: "Exclusive plots for ultra-premium lifestyle", status: "Limited", statusColor: "bg-red-600" },
]

export default function PlotsPage() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [size, setSize] = useState("300 sq. yards")

  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""

  const pushDL = (payload: Record<string, any>) => {
    try {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "book_visit_event",
        component: "plots_section",
        ...payload,
      })
    } catch {}
  }

  // Lock body scroll when modal open + close on ESC
  useEffect(() => {
    if (!open) return
    pushDL({ action: "open" })
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose("esc")
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const handleClose = (reason: "button" | "backdrop" | "esc" | "after_submit") => {
    setOpen(false)
    pushDL({ action: "close", reason })
    // reset for next open
    setTimeout(() => {
      setOk(false)
      setErr(null)
      setName("")
      setPhone("")
      setSize("300 sq. yards")
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)

    if (!name || !phone) {
      setErr("Please enter your name and phone.")
      pushDL({ action: "submit_error", reason: "validation", fields: { name: !!name, phone: !!phone } })
      return
    }
    if (!WEB3FORMS_KEY) {
      setErr("Missing Web3Forms key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local")
      pushDL({ action: "submit_error", reason: "config_missing" })
      return
    }

    setLoading(true)
    pushDL({
      action: "submit_start",
      meta: { page: typeof window !== "undefined" ? window.location.href : "" },
    })

    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
      const gclid = params.get("gclid") || ""
      const utm_source = params.get("utm_source") || ""
      const utm_medium = params.get("utm_medium") || ""
      const utm_campaign = params.get("utm_campaign") || ""

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Everland: Book Site Visit (Plots Section)",
          from_name: "Everland Website",
          name,
          phone,
          plot_size: size,
          page: typeof window !== "undefined" ? window.location.href : "",
          gclid,
          utm_source,
          utm_medium,
          utm_campaign,
          form_id: "book_visit_plots",
        }),
      })

      const data = await res.json()
      if (data?.success) {
        setOk(true)
        pushDL({ action: "submit_success", submission_id: data?.data?.submission_id || null })
        // Optional GA4 lead event
        try {
          window.dataLayer?.push({ event: "generate_lead", form: "book_visit_plots" })
        } catch {}
        setTimeout(() => handleClose("after_submit"), 1200)
      } else {
        const message = data?.message || "Submission failed. Please try again."
        setErr(message)
        pushDL({ action: "submit_error", reason: "api", message })
      }
    } catch (error: any) {
      const message = error?.message || "Network error. Please try again."
      setErr(message)
      pushDL({ action: "submit_error", reason: "network", message })
    } finally {
      setLoading(false)
    }
  }

  const Modal = open
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose("backdrop")
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-[101] w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => handleClose("button")}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              ×
            </button>
            <div className="p-6 sm:p-8">
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-stone-900">
                Book a Free Site Visit
              </h3>
              {!ok ? (
                <>
                  <p className="mb-5 text-stone-600">
                    Share your details and preferred plot size. Our team will call to confirm your visit slot.
                  </p>
                  <form onSubmit={handleSubmit} className="grid gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
                    />
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="h-11 rounded-xl border border-gray-300 px-4 outline-none focus:border-green-600"
                    >
                      <option>300 sq. yards</option>
                      <option>500–700 sq. yards</option>
                      <option>1000–1300 sq. yards</option>
                      <option>Above 1300 sq. yards</option>
                    </select>

                    {err && <p className="text-sm text-red-600">{err}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-green-700 px-5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
                    >
                      {loading ? "Submitting..." : "Confirm Request"}
                    </button>
                    <p className="text-xs text-stone-500">We respect your privacy. No spam, ever.</p>
                  </form>
                </>
              ) : (
                <p className="text-stone-700">Thanks! We’ll call you shortly to finalize your visit.</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <main id="plots" className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 mb-4">
            Everland Mankol – <span className="text-green-700">Premium Plot Options</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Discover plots tailored for your lifestyle – from cozy living to luxury estates.
            Secure your future with Everland Mankol.
          </p>
        </motion.div>

        {/* Layout: Image + Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/ahmedabad-farmhouse-plot-6.png"
              alt="Everland Plots"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl object-cover"
            />
          </motion.div>

          {/* Right Timeline */}
          <div className="space-y-10">
            {plots.map((plot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-green-600"
              >
                <p className="text-sm uppercase tracking-wide text-green-700 mb-1">{plot.phase}</p>
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                  {plot.size}
                  <span className={`text-white text-xs font-semibold px-2 py-1 rounded ${plot.statusColor}`}>
                    {plot.status}
                  </span>
                </h3>
                <p className="text-stone-600 mt-2">{plot.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center py-16 mt-20 bg-gradient-to-r from-green-700/50 to-amber-900/60 rounded-2xl shadow-xl text-white">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Own Your Dream Plot Today
          </motion.h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Flexible sizes, prime location, and unmatched lifestyle. Book your visit now!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="px-8 py-4 bg-amber-900 text-white hover:bg-gray-800 font-semibold rounded-xl shadow-lg transition"
          >
            Book a Site Visit
          </motion.button>
        </section>
      </div>

      {/* Modal (portal) */}
      {Modal}
    </main>
  )
}
