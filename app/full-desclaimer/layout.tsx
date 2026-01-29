import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Disclaimer",
  description:
    "Important legal disclaimer regarding the use of auto parts and information provided on OwnSilent.",
  alternates: {
    canonical: "https://ownsilent.international/full-desclaimer",
  },
};

export default function FullDesclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
