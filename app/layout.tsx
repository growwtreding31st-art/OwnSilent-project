import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// === Providers ===
import ReduxProvider from "@/lib/redux/ReduxProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

// === UI Components ===
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ownsilent.international"),
  title: {
    default: "OwnSilent - Premium Auto Parts & Accessories",
    template: "%s | OwnSilent",
  },
  description:
    "Worldwide wholesale & retail of premium auto parts. OwnSilent offers high-quality car accessories, components, and custom solutions for enthusiasts and professionals.",
  keywords: [
    "auto parts",
    "car accessories",
    "premium car parts",
    "OwnSilent international",
    "car components",
    "wholesale auto parts",
  ],
  authors: [{ name: "OwnSilent Team" }],
  creator: "OwnSilent",
  publisher: "OwnSilent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ownsilent.international",
    siteName: "OwnSilent",
    title: "OwnSilent - Premium Auto Parts & Accessories",
    description:
      "Worldwide premium auto parts marketplace. Quality guaranteed.",
    images: [
      {
        url: "/og-image.jpg", // Need to ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "OwnSilent - Premium Auto Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OwnSilent - Premium Auto Parts & Accessories",
    description:
      "Worldwide premium auto parts marketplace. Quality guaranteed.",
    images: ["/og-image.jpg"],
    creator: "@ownsilent",
  },
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
  verification: {
    google: "5w-CgaXCySEQhYiSv5c6ylMOLtOt7UC-75zVu5dbTX8",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* 1. Redux Provider (Sabse Bahar) */}
        <ReduxProvider>
          {/* 2. Language Provider */}
          <LanguageProvider>
            {/* 3. Currency Provider */}
            <CurrencyProvider>
              <Toaster position="top-center" reverseOrder={false} />

              {/* 4. Aapka Layout Logic (Header/Footer control) */}
              <ConditionalLayout>{children}</ConditionalLayout>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      name: "OwnSilent",
                      url: "https://ownsilent.international",
                      logo: "https://ownsilent.international/logo.png",
                      contactPoint: {
                        "@type": "ContactPoint",
                        telephone: "+1-xxx-xxx-xxxx",
                        contactType: "customer service",
                      },
                      sameAs: [
                        "https://www.facebook.com/ownsilent",
                        "https://www.instagram.com/ownsilent",
                        "https://twitter.com/ownsilent",
                      ],
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: "OwnSilent",
                      url: "https://ownsilent.international",
                      potentialAction: {
                        "@type": "SearchAction",
                        target:
                          "https://ownsilent.international/shop?q={search_term_string}",
                        "query-input": "required name=search_term_string",
                      },
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        {
                          "@type": "ListItem",
                          position: 1,
                          name: "Home",
                          item: "https://ownsilent.international",
                        },
                        {
                          "@type": "ListItem",
                          position: 2,
                          name: "Shop",
                          item: "https://ownsilent.international/shop",
                        },
                        {
                          "@type": "ListItem",
                          position: 3,
                          name: "Blog",
                          item: "https://ownsilent.international/blog",
                        },
                      ],
                    },
                  ]),
                }}
              />
            </CurrencyProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
