import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Dealer",
  description:
    "Join the OwnSilent network. Become an authorized dealer and partner with us to distribute premium auto parts and accessories.",
  alternates: {
    canonical: "https://ownsilent.international/become-dealer",
  },
  openGraph: {
    title: "Become a Dealer | OwnSilent",
    description: "Partner with OwnSilent and grow your business.",
    url: "https://ownsilent.international/become-dealer",
  },
};

export default function BecomeDealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
