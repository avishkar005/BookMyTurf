import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SportsEcosystem from './components/SportsEcosystem'
import ForPlayers from './components/ForPlayers'
import ForVenueOwners from './components/ForVenueOwners'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-deepgreen-700">
      <Navbar />
      <main>
        <Hero />
        <SportsEcosystem />
        <ForPlayers />
        <ForVenueOwners />
        <HowItWorks />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
