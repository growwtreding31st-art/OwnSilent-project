import React from "react";
import FeatureDetail from "@/components/FeatureDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Services | Own Silent International",
  description: "Discover our premium automotive services.",
};

export function generateStaticParams() {
  return [
    { slug: "maintenance" },
    { slug: "warranty" },
    { slug: "performance" },
    { slug: "global-support" },
  ];
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  return <FeatureDetail slug={params.slug} />;
}
