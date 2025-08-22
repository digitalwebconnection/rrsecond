"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>
  }
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""

  const pushDL = (payload: Record<string, any>) => {
    try {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "contact_form_event",
        component: "contact_section",
        ...payload,
      })
    } catch {}
  }

  useEffect(() => {
    pushDL({ action: "open" })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)

    const { name, email, phone, message } = formData

    if (!name || !email || !message) {
      setErr("Please fill in your name, email, and message.")
      pushDL({
        action: "submit_error",
        reason: "validation",
        fields: { name: !!name, email: !!email, message: !!message },
      })
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
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams()
      const gclid = params.get("gclid") || ""
      const utm_source = params.get("utm_source") || ""
      const utm_medium = params.get("utm_medium") || ""
      const utm_campaign = params.get("utm_campaign") || ""

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Everland: Contact Form Lead",
          from_name: "Everland Website",
          name,
          email,
          phone,
          message,
          page: typeof window !== "undefined" ? window.location.href : "",
          gclid,
          utm_source,
          utm_medium,
          utm_campaign,
          form_id: "contact_section",
        }),
      })

      const data = await res.json()

      if (data?.success) {
        setOk(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        pushDL({
          action: "submit_success",
          submission_id: data?.data?.submission_id || null,
        })
        // Optional GA4 lead event
        try {
          window.dataLayer?.push({ event: "generate_lead", form: "contact_section" })
        } catch {}
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onInfoClick = (type: "phone" | "email" | "map") => {
    pushDL({ action: "cta_click", cta: type })
  }

  return (
    <section id="contact" className="py-20 bg-[#4b840194]/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#4E342E] mb-4">Get In Touch</h2>
          <p className="text-lg text-[#6D4C41] max-w-2xl mx-auto">
            Ready to find your dream plot? Contact us today for a free consultation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-[#4E342E]">Contact Information</h3>

            <div className="space-y-5">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#6D9F71]/20 rounded-full mr-4">
                  <Phone className="w-6 h-6 text-[#6D9F71]" />
                </div>
                <div>
                  <div className="font-medium text-[#4E342E]">Phone</div>
                  <div className="text-[#6D4C41]">
                    <a href="tel:+917211161521" onClick={() => onInfoClick("phone")}>
                      917211161521
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#6D9F71]/20 rounded-full mr-4">
                  <Mail className="w-6 h-6 text-[#6D9F71]" />
                </div>
                <div>
                  <div className="font-medium text-[#4E342E]">Email</div>
                  <div className="text-[#6D4C41]">
                    <a href="mailto:info@everlandplots.com" onClick={() => onInfoClick("email")}>
                      info@everlandplots.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#6D9F71]/20 rounded-full mr-4">
                  <MapPin className="w-6 h-6 text-[#6D9F71]" />
                </div>
                <div>
                  <div className="font-medium text-[#4E342E]">Office</div>
                  <div className="text-[#6D4C41]">
                    Everland Plots Office
                    <br />
                    Ahmedabad, Gujarat
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E6DCD0] p-6 rounded-xl shadow-md">
              <h4 className="font-semibold text-[#4E342E] mb-2">Office Hours</h4>
              <div className="space-y-1 text-[#5D4037]">
                <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                <div>Saturday: 10:00 AM - 4:00 PM</div>
                <div>Sunday: By Appointment Only</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#FFFDF7] border border-[#E6DCD0] shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#4E342E]">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {!ok ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-[#F5F5DC] border-[#D7CCC8] text-[#4E342E]"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[#F5F5DC] border-[#D7CCC8] text-[#4E342E]"
                      />
                    </div>

                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-[#F5F5DC] border-[#D7CCC8] text-[#4E342E]"
                    />

                    <Textarea
                      name="message"
                      placeholder="Tell us about your plot requirement..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="bg-[#F5F5DC] border-[#D7CCC8] text-[#4E342E] resize-none"
                    />

                    {err && <p className="text-sm text-red-600">{err}</p>}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#4E342E] hover:bg-[#3E2723] text-white transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-lg text-[#4E342E] font-medium">
                      Thanks! Your message has been received. Our team will get back to you shortly.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-[#A0522D]/10 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#4E342E] mb-4">
            Limited plots. High demand. Don’t wait.
          </h3>
          <p className="text-[#5D4037] mb-6">
            “આજે જ તમારો પ્લોટ બુક કરો અને પરિવારને આપો lifetime investment જે ક્યારેય ઘટતું નથી.”
          </p>
          <Button
            onClick={() => pushDL({ action: "cta_click", cta: "call_now" })}
            className="px-8 py-6 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-full text-lg shadow-lg transition-transform hover:scale-105"
          >
            <a href="tel:+917211161521">📞 Call Now | આજે જ કોલ કરો</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
