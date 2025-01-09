import { MetadataRoute } from 'next'
import { getUrl } from '@/lib/utils'

function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getUrl()
  
  // Routes statiques de base
  const staticRoutes = [
    '',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  return [...staticRoutes]
}

export default sitemap 