import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "@/lib/site"

type PageMetadata = {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
}

export function createPageMetadata({ title, description, path, keywords = [] }: PageMetadata): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(siteConfig.ogImage.path)

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [imageUrl],
    },
  }
}
