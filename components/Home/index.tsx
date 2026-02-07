"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Critical above-the-fold content - load immediately
import PremiumCarShowcase from "@/components/PremiumCarShowcase";
import CarsSection from "@/components/CarsSection";

// Lazy load below-the-fold sections with loading states
const WhatWeDo = dynamic(() => import("@/components/WhatWeDo"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const PremiumPartsCategories = dynamic(
  () => import("@/components/PremiumPartsCategories"),
  {
    loading: () => <SectionLoader />,
    ssr: true,
  },
);

const OurGallery = dynamic(() => import("@/components/OurGallery"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const HowWeWork = dynamic(() => import("@/components/HowWeWork"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const AboutUs = dynamic(() => import("../AboutUs"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const BlogSection = dynamic(() => import("@/components/NewsSection"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const FeaturesBanner = dynamic(() => import("../FeaturesBanner"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const InstagramFeedSection = dynamic(() => import("../InstagramFeedSection"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const PremiumReels = dynamic(() => import("../PremiumReels"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

// Lightweight loading component
function SectionLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#176FC0] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function HomePageContent() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Critical above-the-fold content - loads immediately */}
      {/* <PremiumCarShowcase /> */}
      <CarsSection part="1" />

      {/* Below-the-fold sections - lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <WhatWeDo />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PremiumPartsCategories />
      </Suspense>

      <CarsSection part="2" />
      {/* <Suspense fallback={<SectionLoader />}>
        <OurGallery />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <HowWeWork />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FeaturesBanner />
      </Suspense>

      {/* <Suspense fallback={<SectionLoader />}>
        <InstagramFeedSection />
      </Suspense> */}

      <Suspense fallback={<SectionLoader />}>
        <PremiumReels />
      </Suspense>
    </div>
  );
}
