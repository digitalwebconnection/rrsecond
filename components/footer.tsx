"use client"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-amber-950  text-white py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-200 mb-4">
              <img src="/logo.png" alt="" className="w-80" />
            </h3>
            <p className="mb-4 max-w-md text-gray-100 leading-relaxed">
              ✨ Everland Mankol – A premium plotting scheme designed for families.
              <br />
              <span className="italic text-amber-300 font-bold">
                “જ્યાં સપના માત્ર ઘર સુધી નહીં, પરંતુ જમીનથી શરૂ થાય છે.”
              </span>
            </p>
            <p className="text-sm text-gray-200">
              📞 Contact:{" "}
              <a href="tel:+917211161521" className="font-semibold hover:underline hover:text-amber-300">
                +91 7211161521
              </a>
              
            </p>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-amber-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#locations" className="hover:text-amber-300 transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <a href="#plots" className="hover:text-amber-300 transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-amber-200 mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  Buy Plot
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  Property Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-300 transition-colors">
                  Investment Consulting
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} Everland Mankol. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-amber-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-amber-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-amber-300 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
