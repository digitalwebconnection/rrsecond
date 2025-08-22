import Header from "@/components/header"
import Footer from "@/components/footer"
import LocationHero from "@/components/location-hero"
import LocationGrid from "@/components/location-grid"
import LocationMap from "@/components/location-map"

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LocationHero />
        <LocationGrid />
        <LocationMap />
      </main>
      <Footer />
    </div>
  )
}
