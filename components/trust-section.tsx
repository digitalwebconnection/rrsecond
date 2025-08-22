"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const reasons = [
  {
    img: "/1.jpg",
    title: "Limited Plots Available",
    desc: "Secure your family’s future today with premium plots designed for growth and peace.",
    highlight: "“શહેરની ભીડથી દૂર, પણ તમારી દરેક જરૂરિયાત નજીક”",
  },
  {
    img: "/2.jpg",
    title: "Spacious Layouts",
    desc: "Perfectly sized plots from 300 sq. yards to 1300+ sq. yards for your dream bungalow.",
    highlight: "Spacious layouts ideal for your dream home",
  },
  {
    img: "/3.jpg",
    title: "Family-Centered Living",
    desc: "A community designed for togetherness, safety, and joy for every generation.",
    highlight: "“એક એવું society જ્યાં પરિવારને સાચો આનંદ મળે”",
  },
  {
    img: "/4.jpg",
    title: "Trusted Development",
    desc: "Backed by years of expertise, delivering only premium quality and secure investments.",
    highlight: "Everland Mankol – where trust meets opportunity.",
  },
]

export default function WhyChooseEverland() {
  return (
    <section id="trust" className="relative py-20 bg-gradient-to-br from-green-100 via-blue-100 to-green-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Why Choose <span className="text-blue-700">Everland Mankol?</span>
          </h2>
          <p className="text-lg text-green-800 max-w-2xl mx-auto">
            Limited plots available – secure your future today with space, peace, and community.
          </p>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl group"
            >
              {/* Background Image */}
              <Image
                src={reason.img}
                alt={reason.title}
                width={500}
                height={600}
                className="object-cover w-full h-[400px] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Nature-inspired Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-blue-800/70 to-transparent group-hover:from-green-950/90 transition-all duration-700" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{reason.desc}</p>
                <p className="italic text-green-300 font-medium">{reason.highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
