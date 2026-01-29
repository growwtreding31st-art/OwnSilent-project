import type { Metadata } from "next";
import HomePageContent from "@/components/Home";

export const metadata: Metadata = {
  title: "Home | OwnSilent - Premium Auto Parts & Accessories",
  description:
    "Explore OwnSilent for the best in premium auto parts, car accessories, and custom solutions. Worldwide shipping and professional support.",
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
