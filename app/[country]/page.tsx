import type { Metadata } from "next";
import HomePageContent from "@/components/Home";
import { getCountryCode, getAllCountrySlugs } from "@/lib/country-utils";

interface CountryHomePageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({
  params,
}: CountryHomePageProps): Promise<Metadata> {
  const { country } = await params;
  const countryCode = getCountryCode(country);

  return {
    title: `Home | Luxury Car Tuning Parts - Own Silent International Limited (${country.toUpperCase()})`,
    description:
      "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts for global luxury vehicles.",
    alternates: {
      canonical: `https://ownsilent.international/${country}`,
    },
  };
}

// Generate static params for all supported countries
export async function generateStaticParams() {
  const countries = getAllCountrySlugs();
  return countries.map((country) => ({
    country,
  }));
}

export default async function CountryHomePage({
  params,
}: CountryHomePageProps) {
  const { country } = await params;

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ownsilent.international/#organization",
        name: "Own Silent International Limited",
        url: `https://ownsilent.international/${country}`,
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
        "@type": "WebPage",
        "@id": `https://ownsilent.international/${country}/#webpage`,
        url: `https://ownsilent.international/${country}`,
        name: "Luxury Car Tuning Parts - Own Silent International Limited",
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
