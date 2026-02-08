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
import { CountryRedirect } from "@/components/CountryRedirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Car Tuning Parts",
  description:
    "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts for global luxury vehicles.",
  keywords: [
    "Own Silent International Limited",
    "OwnSilent luxury car tuning parts",
    "OwnSilent carbon ceramic brakes",
    "OwnSilent carbon fiber components",
    "OwnSilent conversion body kits",
    "OwnSilent OEM parts",
    "OwnSilent forged wheels",
    "OwnSilent carbon fiber body kits",
    "OwnSilent carbon fiber interiors",
    "OwnSilent custom luxury interiors",
    "OwnSilent bespoke steering wheels",
    "OwnSilent high-performance tuning parts",
    "OwnSilent diagnostics parts",
    "OwnSilent genuine car parts",
    "OwnSilent new and used auto parts",
    "OwnSilent Alcantara and leather interiors",
    "OwnSilent supercar tuning parts",
    "OwnSilent premium automotive components",
    "OwnSilent carbon ceramic brake pads",
    "OwnSilent carbon ceramic brake rotors",
  ],
  authors: [{ name: "OwnSilent Team" }],
  creator: "Own Silent International Limited",
  publisher: "Own Silent International Limited",
  formatDetection: { email: false, address: false, telephone: false },

  // === Open Graph ===
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ownsilent.international",
    siteName: "Own Silent International Limited",
    title: "Luxury Car Tuning Parts",
    description:
      "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts for global luxury vehicles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Own Silent International Limited - Luxury Car Tuning Parts",
      },
    ],
  },

  // === Twitter Card ===
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Tuning Parts",
    description:
      "Own Silent International Limited is a leading OEM manufacturer of luxury car tuning parts, carbon fiber components, carbon ceramic brakes, custom interiors, conversion body kits, and high-performance OEM parts.",
    images: ["/og-image.jpg"],
    creator: "@ownsilentintern",
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

  verification: { google: "5w-CgaXCySEQhYiSv5c6ylMOLtOt7UC-75zVu5dbTX8" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Blocking script for instant country redirect - runs BEFORE React */}
        <script src="/country-redirect.js" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ReduxProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <CountryRedirect />
              <Toaster position="top-center" reverseOrder={false} />
              <ConditionalLayout>{children}</ConditionalLayout>

              {/* === JSON-LD Schema === */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      name: "Own Silent International Limited",
                      url: "https://ownsilent.international",
                      logo: "https://ownsilent.international/logo.png",
                      contactPoint: {
                        "@type": "ContactPoint",
                        telephone: "+1-xxx-xxx-xxxx",
                        contactType: "customer service",
                      },
                      sameAs: [
                        "https://www.facebook.com/ownsilent",
                        "https://www.instagram.com/ownsilent.international/",
                        "https://x.com/ownsilentintern",
                        "https://www.threads.com/@ownsilent.international",
                        "https://hk.linkedin.com/company/own-silent-international-limited",
                        "https://www.youtube.com/channel/UCVLc73Mcd89bmyFG5-Ye91g",
                      ],
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: "Own Silent International Limited",
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
