import { Header } from "@/components/header"
import  HeroSlider from "@/components/hero-section"
import { AboutScheme } from "@/components/property-showcase"
import WhyChooseEverland from "@/components/trust-section"
import LocationGrid from "@/components/location-grid"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import PlotsPage from "@/components/plots"
import LifestylePage from "@/components/lifestyle"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <AboutScheme />
      <WhyChooseEverland />
      <LocationGrid />
      <PlotsPage/>
      <LifestylePage/>
      <ContactForm />
      <Footer />
    </main>
  )
}
