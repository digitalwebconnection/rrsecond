"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const plots = [
  {
    phase: "Option #1",
    size: "300 sq. yards",
    desc: "Perfect for compact yet spacious living",
    status: "Available",
    statusColor: "bg-green-600",
  },
  {
    phase: "Option #2",
    size: "500–700 sq. yards",
    desc: "Ideal for family homes with garden space",
    status: "Available",
    statusColor: "bg-green-600",
  },
  {
    phase: "Option #3",
    size: "1000–1300 sq. yards",
    desc: "Premium choice for luxury living",
    status: "Booking Fast",
    statusColor: "bg-yellow-500",
  },
  {
    phase: "Option #4",
    size: "Above 1300 sq. yards",
    desc: "Exclusive plots for ultra-premium lifestyle",
    status: "Limited",
    statusColor: "bg-red-600",
  },
]

export default function PlotsPage() {
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
            Everland Mankol –{" "}
            <span className="text-green-700">Premium Plot Options</span>
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
              src="/ahmedabad-farmhouse-plot-6.png" // replace with your uploaded image path
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
                <p className="text-sm uppercase tracking-wide text-green-700 mb-1">
                  {plot.phase}
                </p>
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                  {plot.size}
                  <span
                    className={`text-white text-xs font-semibold px-2 py-1 rounded ${plot.statusColor}`}
                  >
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
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-900 text-white hover:bg-gray-800 font-semibold rounded-xl shadow-lg transition"
            
          >
            Book a Site Visit
          </motion.a>
        </section>
      </div>
    </main>
  )
}
