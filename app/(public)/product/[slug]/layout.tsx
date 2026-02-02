import type { Metadata } from "next";

async function getProduct(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const description =
    typeof product.description === "string"
      ? product.description.substring(0, 160)
      : product.description?.fullDescription?.substring(0, 160) || "";

  return {
    title: product.name,
    description: description,
    alternates: {
      canonical: `https://ownsilent.international/product/${params.slug}`,
    },
    openGraph: {
      title: product.name,
      description: description,
      url: `https://ownsilent.international/product/${params.slug}`,
      images: [
        {
          url: product.images[0] || "/og-image.jpg",
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: description,
      images: [product.images[0] || "/og-image.jpg"],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
