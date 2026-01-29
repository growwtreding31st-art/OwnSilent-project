import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Read our policies on shipping and returns. We ensure smooth delivery of your premium auto parts and hassle-free returns.",
  alternates: {
    canonical: "https://ownsilent.international/shipping-returns",
  },
};

export default function ShippingReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
