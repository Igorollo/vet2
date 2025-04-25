"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/lib/news"

export default function LatestNewsSection() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        console.log("🔄 LatestNewsSection: Fetching latest news...")
        setLoading(true)

        // Fetch data from the API
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/news?t=${timestamp}&limit=3`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        console.log(`✅ LatestNewsSection: Fetched ${data.length} news items`)
        setLatestNews(data)
        setError(null)
      } catch (err) {
        console.error("❌ LatestNewsSection: Error fetching news:", err)
        if (latestNews.length === 0) {
          setError("Nie udało się załadować aktualności.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  if (latestNews.length === 0 && !loading && !error) {
    return null
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Aktualności</h2>

        {loading && latestNews.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Ładowanie aktualności...</p>
          </div>
        ) : error && latestNews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  className="flex flex-col overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        {new Date(news.date).toLocaleDateString("pl-PL")}
                      </p>
                      <div className="mt-2">
                        <h3 className="text-xl font-semibold leading-7">{news.title}</h3>
                        <p
                          style={{ textIndent: 0 }}
                          className="mt-3 line-clamp-3 text-base leading-6 text-muted-foreground"
                        >
                          {news.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/aktualnosci">Zobacz wszystkie aktualności</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
