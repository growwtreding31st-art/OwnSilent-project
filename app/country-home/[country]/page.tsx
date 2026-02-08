import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HomePageContent from "@/components/Home";
import { getCountryCode, getAllCountrySlugs } from "@/lib/country-utils";

interface PageProps {
    params: Promise<{ country: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { country } = await params;
    const countryCode = getCountryCode(country);

    if (!countryCode) {
        // If not a valid country, we will redirect in the component, but here we can return basic metadata or null
        return {
            title: 'Own Silent International',
        };
    }

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
}: PageProps) {
    const { country } = await params;
    const countryCode = getCountryCode(country);

    if (!countryCode) {
        // Redirect to home page if country is invalid
        redirect('/');
    }

    return (
        <div className="min-h-screen">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                            },
                            {
                                "@type": "WebPage",
                                "@id": `https://ownsilent.international/${country}/#webpage`,
                                url: `https://ownsilent.international/${country}`,
                                name: "Luxury Car Tuning Parts - Own Silent International Limited",
                            },
                        ],
                    }),
                }}
            />
            <HomePageContent />
        </div>
    );
}
