import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ownsilent.international'
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ownsilent.international/api/v1'

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/shop',
    '/blog',
    '/news',
    '/about-us',
    '/contact-us',
    '/become-dealer',
    '/custom-solution',
    '/shipping-returns',
    '/privacy-policy',
    '/terms-conditions',
    '/full-desclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    // 2. Fetch Dynamic Routes in Parallel
    const [productsRes, categoriesRes, collectionsRes, newsRes, blogRes] = await Promise.all([
      fetch(`${apiBaseUrl}/products?limit=1000`).then(r => r.json()).catch(() => ({ parts: [] })),
      fetch(`${apiBaseUrl}/categories`).then(r => r.json()).catch(() => []),
      fetch(`${apiBaseUrl}/collections`).then(r => r.json()).catch(() => []),
      fetch(`${apiBaseUrl}/news`).then(r => r.json()).catch(() => ({ articles: [] })),
      fetch(`${apiBaseUrl}/blog/posts`).then(r => r.json()).catch(() => ({ posts: [] })),
    ])

    const productRoutes = (productsRes.parts || []).map((p: any) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(p.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const categoryRoutes = (categoriesRes || []).map((c: any) => ({
      url: `${baseUrl}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const collectionRoutes = (collectionsRes || []).map((c: any) => ({
      url: `${baseUrl}/collections/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const newsRoutes = (newsRes.articles || []).map((a: any) => ({
      url: `${baseUrl}/news/${a.slug}`,
      lastModified: new Date(a.createdAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    const blogRoutes = (blogRes.posts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...collectionRoutes, ...newsRoutes, ...blogRoutes]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return staticRoutes
  }
}
