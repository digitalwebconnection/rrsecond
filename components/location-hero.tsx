import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react"

export default function LocationHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-cyan-50 to-blue-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex justify-center mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-cyan-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-cyan-600 font-medium">Locations</li>
            </ol>
          </nav>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Prime Locations
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              <MapPin className="w-6 h-6 text-cyan-600" />
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover premium plots and properties across Ahmedabad's most sought-after locations. From bustling
              commercial hubs to serene residential areas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search locations in Ahmedabad..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <Button className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
