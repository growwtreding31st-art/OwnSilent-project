import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay updated with the latest news, guides, and trends from the automotive world on OwnSilent.",
  alternates: {
    canonical: "https://ownsilent.international/blog",
  },
  openGraph: {
    title: "Blog | OwnSilent",
    description: "Expert automotive news and guides.",
    url: "https://ownsilent.international/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
