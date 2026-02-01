import PremiumCarShowcase from "@/components/PremiumCarShowcase";
import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import BrandProductsSection from "@/components/BrandProductsSection";
// import AboutUs from "@/components/AboutUs";
import BlogSection from "@/components/NewsSection";
// import FeaturesBanner from "@/components/FeaturesBanner";
import CollectionsSection from "@/components/CollectionsSection";
import BannerSegment from "@/components/BannerSegment";
import AboutUs from "../AboutUs";
import FeaturesBanner from "../FeaturesBanner";
import WhatWeDo from "@/components/WhatWeDo";
import PremiumPartsCategories from "@/components/PremiumPartsCategories";
import OurGallery from "@/components/OurGallery";
import HowWeWork from "@/components/HowWeWork";
import Reviews from "@/components/Reviews";

export default function HomePageContent() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <PremiumCarShowcase />
      <Hero />
      <CarsSection />
      {/* <BrandProductsSection /> */}
      {/* <CollectionsSection /> */}
      <WhatWeDo />
      <PremiumPartsCategories />
      <OurGallery />
      <HowWeWork />
      <Reviews />
      <AboutUs />
      <BlogSection />
      <BannerSegment />
      <FeaturesBanner />
    </div>
  );
}
