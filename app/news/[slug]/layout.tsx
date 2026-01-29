import type { Metadata } from "next";

async function getNews(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${slug}`,
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
  const news = await getNews(params.slug);

  if (!news) {
    return {
      title: "News Article",
    };
  }

  const description = news.content?.substring(0, 160).replace(/<[^>]*>?/gm, "");

  return {
    title: news.title,
    description: description,
    alternates: {
      canonical: `https://ownsilent.international/news/${params.slug}`,
    },
    openGraph: {
      title: news.title,
      description: description,
      url: `https://ownsilent.international/news/${params.slug}`,
      images: [
        {
          url: news.image || "/og-image.jpg",
          alt: news.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: description,
      images: [news.image || "/og-image.jpg"],
    },
  };
}

export default function NewsArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
