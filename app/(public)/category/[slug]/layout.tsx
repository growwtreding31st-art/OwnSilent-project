import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ownsilent.international/api/v1'
  try {
    const res = await fetch(`${baseUrl}/categories/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const category = await getCategory(slug)

  if (!category) return { title: 'Category Not Found' }

  return {
    title: category.name,
    description: `Browse our collection of ${category.name} at OwnSilent.`,
  }
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
