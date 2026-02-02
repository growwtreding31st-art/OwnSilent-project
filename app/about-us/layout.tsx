import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about OwnSilent, our mission to power industries internationally, and our commitment to premium auto parts and quality.",
  alternates: {
    canonical: "https://ownsilent.international/about-us",
  },
  openGraph: {
    title: "About Us | OwnSilent",
    description: "Powering Industries Internationally with Premium Auto Parts.",
    url: "https://ownsilent.international/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
