"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


import Image from "next/image";

export default function HeroSlider() {
  return (
    <div  id="home" className="relative w-full h-[600px] mb-20">
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
      <div className="absolute top-0 left-0 w-[420px] z-30 h-full bg-black/80 text-white p-8 flex flex-col justify-center rounded-2xl  mt-20 ms-20">
        {/* New Heading */}
        <h1 className="text-4xl font-bold mb-4 leading-snug">
          Everland Mankol – <br /> Limited Plots, Unlimited Happiness
        </h1>

        {/* Gujarati tagline */}
        <p className="mb-6 text-lg font-medium text-green-300">
          એવર્લૅન્ડ માંકોલમાં આજે જ તમારો પ્લોટ બુક કરો – આવતી કાલે મોડું થઈ શકે છે.
        </p>

        {/* Email Form */}
        <form className="flex flex-col gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold"
          >
            Get More Details
          </button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white text-lg font-semibold">
            Book Your Plot Today
          </button>
          <button className="border-2 border-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md text-white text-lg font-semibold">
            આજે જ કોલ કરો
          </button>
          
        </div>
      </div>
       
    </div>
  );
}
