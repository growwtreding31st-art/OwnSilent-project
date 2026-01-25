import PremiumCarShowcase from "@/components/PremiumCarShowcase";
import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import BrandProductsSection from "@/components/BrandProductsSection";
import AboutUs from "@/components/AboutUs";
import BlogSection from "@/components/NewsSection";
import FeaturesBanner from "@/components/FeaturesBanner";
import CollectionsSection from "@/components/CollectionsSection";
import BannerSegment from "@/components/BannerSegment";

export default function HomePageContent() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <PremiumCarShowcase />
      <Hero />
      <CarsSection />
      {/* <BrandProductsSection /> */}
      {/* <CollectionsSection /> */}
      <AboutUs />
      <BlogSection />
      <BannerSegment />
      <FeaturesBanner />
    </div>
  );
}
