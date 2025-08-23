"use client"

import { motion } from "framer-motion"

export function AboutScheme() {
  return (
    <section
      id="about"
      className="relative py-24 bg-white bg-[url('/images/bg-pattern.png')] bg-cover bg-center overflow-hidden"
    >
      <div className="container relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            About the Scheme
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
            At <span className="font-semibold text-yellow-700">Everland Mankol</span>, 
            we bring you premium residential plots designed for families who value peace, space, and growth.
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            અહીં તમને મળશે <span className="text-yellow-700 font-semibold">400 sq. yards</span> થી લઈને{" "}
            <span className="text-yellow-700 font-semibold">1300 sq. yards</span> સુધીના અને તેનાથી પણ મોટા
            પ્લોટ્સ – તમારા સપનાના ઘર માટે perfect જગ્યા.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutScheme
