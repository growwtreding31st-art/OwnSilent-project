import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "Get the latest updates and announcements from OwnSilent and the automotive industry.",
  alternates: {
    canonical: "https://ownsilent.international/news",
  },
  openGraph: {
    title: "News | OwnSilent",
    description: "Latest updates and announcements.",
    url: "https://ownsilent.international/news",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
