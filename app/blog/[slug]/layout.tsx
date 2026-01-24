import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ownsilent.international/api/v1'
  try {
    const res = await fetch(`${baseUrl}/blog/post/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const post = await getBlogPost(slug)

  if (!post) return { title: 'Blog Post Not Found' }

  return {
    title: post.title,
    description: post.summary || post.content?.substring(0, 160).replace(/<[^>]*>?/gm, ""),
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
