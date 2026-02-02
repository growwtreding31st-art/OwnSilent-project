import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with OwnSilent for any inquiries about our premium auto parts, wholesale opportunities, or customer support.",
  alternates: {
    canonical: "https://ownsilent.international/contact-us",
  },
  openGraph: {
    title: "Contact Us | OwnSilent",
    description: "Get in touch with our expert team at OwnSilent.",
    url: "https://ownsilent.international/contact-us",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
