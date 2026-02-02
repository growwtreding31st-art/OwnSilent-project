import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Premium Auto Parts",
  description:
    "Browse our extensive collection of premium auto parts and car accessories. Quality parts for all major brands and models.",
  alternates: {
    canonical: "https://ownsilent.international/shop",
  },
  openGraph: {
    title: "Shop Premium Auto Parts | OwnSilent",
    description: "Quality parts for your vehicle, shipped worldwide.",
    url: "https://ownsilent.international/shop",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
