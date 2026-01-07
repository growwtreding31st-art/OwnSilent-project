import Hero from "@/components/Hero"
import CarsSection from "@/components/CarsSection"
import BrandProductsSection from "@/components/BrandProductsSection"
import AboutUs from "@/components/AboutUs"
import BlogSection from "@/components/NewsSection"
import FeaturesBanner from "@/components/FeaturesBanner"
import CollectionsSection from "@/components/CollectionsSection"

export default function HomePageContent() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <CarsSection />
      {/* <BrandProductsSection /> */}
      {/* <CollectionsSection /> */}
      <AboutUs />
      <BlogSection />
      <FeaturesBanner />
    </div>
  )
}

