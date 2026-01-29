import type { Metadata } from "next";

async function getCategory(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${slug}`,
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
  const category = await getCategory(params.slug);

  if (!category) {
    return {
      title: "Category",
    };
  }

  return {
    title: category.name,
    description: `Browse our collection of ${category.name} at OwnSilent. Premium quality auto parts and accessories.`,
    alternates: {
      canonical: `https://ownsilent.international/category/${params.slug}`,
    },
    openGraph: {
      title: `${category.name} | OwnSilent`,
      description: `Premium ${category.name} for your vehicle.`,
      url: `https://ownsilent.international/category/${params.slug}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
