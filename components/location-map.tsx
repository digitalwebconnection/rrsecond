import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Mail } from "lucide-react"

export default function LocationMap() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Us on <span className="text-cyan-600">Map</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our offices across Ahmedabad or schedule a site visit to explore properties in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="h-96 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center relative">
                {/* Placeholder for actual map */}
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Explore all our locations and properties</p>
                </div>

                {/* Location Markers */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-24 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-24 left-32 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              {/* Map Controls */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                    <Button variant="outline" size="sm">
                      Satellite View
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">Showing 6 locations in Ahmedabad</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Main Office */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Main Office</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    123 SG Highway, Ahmedabad
                    <br />
                    Gujarat 380015
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>info@propertypro.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch Office */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bopal Branch</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    456 Bopal Road, Ahmedabad
                    <br />
                    Gujarat 380058
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43211</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>bopal@propertypro.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Visit */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl shadow-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Schedule Site Visit</h3>
              <p className="text-cyan-100 text-sm mb-4">
                Book a free consultation and site visit with our property experts.
              </p>
              <Button className="w-full bg-white text-cyan-600 hover:bg-gray-100">Book Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
