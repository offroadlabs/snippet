import { MetadataRoute } from 'next'
import { getUrl } from '@/lib/utils'

function robots(): MetadataRoute.Robots {
  const baseUrl = getUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/*.json$',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

export default robots 