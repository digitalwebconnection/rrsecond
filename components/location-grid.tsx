"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WhyChooseEverland() {
  return (
    <>
      
      <section id="locations" className="relative bg-gradient-to-b from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-green-900">Location</h2>
            <p className="text-lg text-gray-600">Where You'll Be Living</p>
          </div>

          {/* Map + Info */}
          <div className="items-center">
            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-green-200">
              <iframe
                src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6986.634746239896!2d72.2635!3d22.907421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ebceb8e1bfbfd%3A0x548a2a43be8297f1!2sMankol%20Kabaddi%20Club!5e1!3m2!1sen!2sin!4v1755929792367!5m2!1sen!2sin"}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full shadow-2xl"
              ></iframe>
            </div>

            {/* Info Box */}
            {/* <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Everland Mankol
            </h3>
            <p className="text-gray-600 mb-4">
              Peaceful surroundings with excellent connectivity to Ahmedabad.
              Limited plots available – secure your future today.
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-green-700">Address:</span>{" "}
                Mankol, Ahmedabad, Gujarat
              </p>
              <p>
                <span className="font-semibold text-green-700">Latitude:</span>{" "}
                22.9999
              </p>
              <p>
                <span className="font-semibold text-green-700">Longitude:</span>{" "}
                72.5714
              </p>
            </div>
          </div> */}
          </div>
        </div>
      </section>
    </>
  )
}