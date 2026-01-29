import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Solutions",
  description:
    "Bespoke automotive solutions for unique requirements. OwnSilent provides custom parts and expert consulting for specialized automotive needs.",
  alternates: {
    canonical: "https://ownsilent.international/custom-solution",
  },
  openGraph: {
    title: "Custom Automotive Solutions | OwnSilent",
    description: "Tailored parts and expert consulting for your vehicle.",
    url: "https://ownsilent.international/custom-solution",
  },
};

export default function CustomSolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
