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
    "Professional support",
  ],
  authors: [{ name: "Own Silent International Limited" }],
  creator: "Own Silent International Limited",
  publisher: "Own Silent International Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ownsilent.international",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ownsilent.international",
    siteName: "Own Silent International Limited",
    title: "Luxury Car Tuning Parts - Own Silent International Limited",
    description:
      "Leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, and high-performance auto parts. Worldwide shipping available.",
    images: [
      {
        url: "https://ownsilent.international/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Own Silent International Limited - Luxury Car Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Tuning Parts - Own Silent International Limited",
    description:
      "Leading OEM manufacturer of luxury car tuning parts, carbon fiber components, and high-performance auto parts. Worldwide shipping.",
    images: ["https://ownsilent.international/og-image.jpg"],
    creator: "@ownsilent",
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Automotive",
};

export default function HomePage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ownsilent.international/#organization",
        name: "Own Silent International Limited",
        url: "https://ownsilent.international",
        logo: {
          "@type": "ImageObject",
          url: "https://ownsilent.international/logo.png",
          width: 250,
          height: 60,
        },
        description:
          "Leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, and high-performance auto parts.",
        sameAs: [
          "https://www.facebook.com/ownsilent",
          "https://www.instagram.com/ownsilent",
          "https://twitter.com/ownsilent",
          "https://www.linkedin.com/company/ownsilent",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          availableLanguage: ["English", "Chinese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ownsilent.international/#website",
        url: "https://ownsilent.international",
        name: "Own Silent International Limited",
        description:
          "Premium luxury car tuning parts and high-performance automotive components",
        publisher: {
          "@id": "https://ownsilent.international/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://ownsilent.international/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://ownsilent.international/#webpage",
        url: "https://ownsilent.international",
        name: "Luxury Car Tuning Parts - Own Silent International Limited",
        isPartOf: {
          "@id": "https://ownsilent.international/#website",
        },
        about: {
          "@id": "https://ownsilent.international/#organization",
        },
        description:
          "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts.",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageContent />
    </div>
  );
}
