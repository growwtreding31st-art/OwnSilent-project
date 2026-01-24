import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ownsilent.international/api/v1'
  try {
    const res = await fetch(`${baseUrl}/products/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const product = await getProduct(slug)

  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: product.description?.fullDescription || product.description || `Buy ${product.name} at OwnSilent.`,
    openGraph: {
      images: product.images || [],
    }
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
