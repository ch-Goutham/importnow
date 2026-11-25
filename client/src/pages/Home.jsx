import {
  Hero,
  RouteMarquee,
  EndToEndImports,
  HowItWorks,
  Industries,
  ChinaOffice,
  BusinessTrips,
  CaseStudies,
  Testimonials,
  ImportGuides,
  FAQ,
  ContactForm,
} from '../components/sections'

function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <RouteMarquee />
      <EndToEndImports />
      <HowItWorks />
      <Industries />
      <ChinaOffice />
      <BusinessTrips />
      <CaseStudies />
      <Testimonials />
      <ImportGuides />
      <FAQ />
      <ContactForm />
    </div>
  )
}

export default Home