import SpecialPageContent from "@/components/SpecialPage/SpecialPageContent";
import { getCountryCode } from "@/lib/country-utils";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface SpecialPageProps {
    params: Promise<{
        country: string;
        special_slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: SpecialPageProps): Promise<Metadata> {
    const { country, special_slug } = await params;
    const countryCode = getCountryCode(country);

    if (!countryCode) {
        return {};
    }

    // We can fetch initial SEO metadata here if we move the fetch logic to server side,
    // otherwise the client component handles it. 
    // For now, returning basic structure.
    return {
        title: 'Special Page',
        alternates: {
            canonical: `https://ownsilent.international/${country}/${special_slug}`,
        }
    };
}

export default async function SpecialPage({ params }: SpecialPageProps) {
    const { country, special_slug } = await params;

    // Validate Country - if invalid, redirect to home
    const countryCode = getCountryCode(country);
    if (!countryCode) {
        redirect('/');
    }

    // Render the Special Page Content
    // We pass the special_slug to identify the content
    // We could also pass country context if needed
    return <SpecialPageContent slug={special_slug} />;
}
