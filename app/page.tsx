import type { Metadata } from "next";
import HomePageContent from "@/components/Home";

export const metadata: Metadata = {
  title: "Home | Luxury Car Tuning Parts - Own Silent International Limited",
  description:
    "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts for global luxury vehicles. Explore premium auto parts and accessories with worldwide shipping and professional support.",
  keywords: [
    "Own Silent International Limited",
    "Luxury car tuning parts",
    "OEM car parts",
    "Carbon fiber components",
    "Carbon ceramic brakes",
    "Custom interiors",
    "Conversion body kits",
    "High-performance auto parts",
    "Premium car accessories",
    "Worldwide shipping",
    "Professional support"
  ],
  alternates: {
    canonical: "https://ownsilent.international",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomePageContent />
    </div>
  );
}
