import React from "react";
import HowItWorksDetail from "@/components/HowItWorksDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | Own Silent International",
  description:
    "Learn how we deliver premium automotive excellence from selection to delivery.",
};

export function generateStaticParams() {
  return [
    { slug: "find-your-part" },
    { slug: "ordering-process" },
    { slug: "fast-shipping" },
    { slug: "quality-delivery" },
  ];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function HowItWorksPage({ params }: Props) {
  const { slug } = await params;
  return <HowItWorksDetail slug={slug} />;
}
