import type { Metadata } from "next";

async function getCollection(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections/${slug}`,
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
  const collection = await getCollection(params.slug);

  if (!collection) {
    return {
      title: "Collection",
    };
  }

  return {
    title: collection.name,
    description:
      collection.description ||
      `Browse our ${collection.name} collection at OwnSilent.`,
    alternates: {
      canonical: `https://ownsilent.international/collections/${params.slug}`,
    },
    openGraph: {
      title: `${collection.name} | OwnSilent`,
      description: collection.description,
      url: `https://ownsilent.international/collections/${params.slug}`,
      images: [
        {
          url: collection.coverImage || "/og-image.jpg",
          alt: collection.name,
        },
      ],
    },
  };
}

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
