"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WhyChooseEverland() {
  return (
    <>
    <section id="locations" className="relative py-20">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <Image
          src="/5.jpg" // <-- replace with your image path
          alt="Everland Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r bg-black/80"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl  text-white mb-4 drop-shadow-lg font-extrabold">
            Why Choose <span className="text-amber-700">Everland Mankol?</span>
          </h2>
          <p className="text-lg text-gray-100 font-semibold">
            Limited plots available – secure your future today
          </p>
        </motion.div>

        {/* Content List */}
        <div className="space-y-10 text-white max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="italic text-white text-xl font-extrabold"
          >
            “શહેરની ભીડથી દૂર, પણ તમારી દરેક જરૂરિયાત નજીક”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl font-extrabold text-amber-700"
          >
            Spacious layouts ideal for your dream home
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="italic text-white font-extrabold text-xl"
          >
            “એક એવું society જ્યાં પરિવારને સાચો આનંદ મળે”
          </motion.p>
        </div>
      </div>

      
    </section>
    <section className="relative bg-gradient-to-b from-green-50 to-blue-50 py-16">
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
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.523157382406!2d72.5714!3d22.9999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU5JzU5LjciTiA3MsKwMzQnMTYuOSJF!5e0!3m2!1sen!2sin!4v1694511111111`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="w-full"
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
