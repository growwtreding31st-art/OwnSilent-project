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

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  return <FeatureDetail slug={slug} />;
}
