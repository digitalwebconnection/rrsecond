"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const images = [
  "/ahmedabad-luxury-plot-4.png",
  "/ahmedabad-villa-plot-3.png",
  "/road-with-trees-around.jpg",
  "/luxury-modern-house-exterior.png",
  "/top-view-bridge.jpg",
]

export default function Gallery() {
  return (
    <main id="Gallery" className="bg-gradient-to-b from-green-50 via-emerald-50 to-blue-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 text-center">
        {/* Accent Backgrounds */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-28 w-36 h-36 bg-green-300/30 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-32 w-52 h-52 bg-emerald-400/30 blur-3xl rounded-full animate-pulse" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl lg:text-6xl font-bold text-green-900 mb-6"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl lg:text-2xl text-green-700 italic max-w-3xl mx-auto"
        >
          “A glimpse into the <span className="text-emerald-600">Everland lifestyle</span> —
          where architecture meets nature.”
        </motion.p>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="text-white text-sm">
                  {`Everland Space ${i + 1}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lifestyle & Vision Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-green-100 via-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center items-center flex gap-15">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=" flex-1/2 rounded-2xl"
          >
            <img src="/3.jpg" alt="" className=" rounded-2xl shadow-2xl" />
          </motion.h2>
          <div className="flex-1/2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl   text-amber-950 mb-4"
            >
              “એવર્લૅન્ડ માંકોલ માત્ર પ્લોટ નથી, આ છે તમારા પરિવાર માટેનું secure future.”
            </motion.p>
            <p className="text-green-700 text-base lg:text-lg">
              With peaceful surroundings, green spaces, and strong connectivity to Ahmedabad,
              this is where your dreams take shape.
            </p>
          </div>
        </div>
      </section>

      {/* Voice of Families Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-blue-50 via-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto text-center items-center  flex gap-15">

          <div className="flex-1/2">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg lg:text-xl text-amber-900 italic mb-4"
            >
              “અમે એવર્લૅન્ડ માંકોલ પસંદ કર્યું કારણ કે અહીં પ્લોટ સાથે મનની શાંતિ મળે છે.”
            </motion.blockquote>
            <p className="text-emerald-700 text-base lg:text-lg italic">
              “Owning land here feels like owning tomorrow.”
            </p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=" flex-1/2 "
          >
            <img src="/3.jpg" alt="" className=" rounded-2xl shadow-2xl" />
          </motion.h2>
        </div>
      </section>
    </main>
  )
}
