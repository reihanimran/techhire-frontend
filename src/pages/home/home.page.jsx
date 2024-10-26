import Carosuel from "./components/carousel"
import Hero from "./components/Hero"
import JobSection from "./components/JobSection"
import AIPJAI from "./components/AIPJAI"
import CallToAction from "./components/calltoaction"
import Footer from "@/components/shared/footer"

function HomePage() {
  return (
    <>
      <Hero />
      <JobSection />
      <Carosuel />
      <AIPJAI />
      <CallToAction />
      <Footer />
    </>
  )
}

export default HomePage
