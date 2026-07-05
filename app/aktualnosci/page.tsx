import type { Metadata } from "next"
import NewsPageClient from "@/app/aktualnosci/news-page-client"
import { createPageMetadata } from "@/lib/metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Aktualności",
  description:
    "Aktualności i informacje organizacyjne z Przychodni Małych Zwierząt w Ostrowie Wielkopolskim.",
  path: "/aktualnosci",
  keywords: ["aktualności weterynarz Ostrów Wielkopolski", "informacje z przychodni weterynaryjnej"],
})

export default function NewsPage() {
  return <NewsPageClient />
}
