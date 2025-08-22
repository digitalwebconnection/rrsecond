"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

export default function HeroSlider() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const pushDL = (payload: Record<string, any>) => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "hero_form_event",
        component: "hero_slider",
        ...payload,
      });
    } catch {}
  };

  useEffect(() => {
    pushDL({ action: "open" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const email = emailRef.current?.value?.trim() || "";
    if (!email) {
      setErr("Please enter your email.");
      pushDL({ action: "submit_error", reason: "validation", fields: { email: false } });
      return;
    }
    if (!WEB3FORMS_KEY) {
      setErr("Missing Web3Forms key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local");
      pushDL({ action: "submit_error", reason: "config_missing" });
      return;
    }

    setLoading(true);
    pushDL({
      action: "submit_start",
      meta: { page: typeof window !== "undefined" ? window.location.href : "" },
    });

    try {
      // Basic UTM/GCLID capture
      const params =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
      const gclid = params.get("gclid") || "";
      const utm_source = params.get("utm_source") || "";
      const utm_medium = params.get("utm_medium") || "";
      const utm_campaign = params.get("utm_campaign") || "";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Everland: Hero Email Lead",
          from_name: "Everland Website",
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
        pushDL({ action: "submit_success", submission_id: data?.data?.submission_id || null });
        emailRef.current && (emailRef.current.value = "");
      } else {
        const message = data?.message || "Submission failed. Please try again.";
        setErr(message);
        pushDL({ action: "submit_error", reason: "api", message });
      }
    } catch (error: any) {
      const message = error?.message || "Network error. Please try again.";
      setErr(message);
      pushDL({ action: "submit_error", reason: "network", message });
    } finally {
      setLoading(false);
    }
  };

  const handleCta = (name: "book_plot" | "call_now") => {
    pushDL({ action: "cta_click", cta: name });
  };

  return (
    <div id="home" className="relative w-full h-[600px] mb-20">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-full z-0"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <Image
            src="/view-land-plot-real-estate-business-development.jpg"
            alt="Greenfield Plot 1"
            fill
            className="object-cover"
            priority
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <Image
            src="/beautiful-landscape-with-small-village.jpg"
            alt="Greenfield Plot 2"
            fill
            className="object-cover"
          />
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <Image
            src="/aerial-view-agricultural-land-division-property-lines-farmland-planning-rural-landscape.jpg"
            alt="Greenfield Plot 3"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute top-0 left-0 w-[420px] z-30 h-full bg-black/80 text-white p-8 flex flex-col justify-center rounded-2xl mt-20 ms-20">
        <h1 className="text-4xl font-bold mb-4 leading-snug">
          Everland Mankol – <br /> Limited Plots, Unlimited Happiness
        </h1>

        <p className="mb-6 text-lg font-medium text-green-300">
          એવર્લૅન્ડ માંકોલમાં આજે જ તમારો પ્લોટ બુક કરો – આવતી કાલે મોડું થઈ શકે છે.
        </p>

        {/* Email Form (Web3Forms) */}
        <form className="flex flex-col gap-3 mb-3" onSubmit={handleSubmit}>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Get More Details"}
          </button>
        </form>

        {/* Inline state */}
        {ok && <p className="mb-3 text-sm text-green-300">Thanks! We’ll email you the details shortly.</p>}
        {err && <p className="mb-3 text-sm text-red-300">{err}</p>}

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold"
            onClick={() => handleCta("book_plot")}
          >
            Book Your Plot Today
          </button>
          <a
            href="tel:+91XXXXXXXXXX"
            onClick={() => handleCta("call_now")}
            className="text-center border-2 border-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md text-white text-lg font-semibold"
          >
            આજે જ કોલ કરો
          </a>
        </div>
      </div>
    </div>
  );
}
