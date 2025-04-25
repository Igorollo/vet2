"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { NewsItem } from "@/lib/news"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("🔄 NewsPage: Fetching news data...")
        setLoading(true)

        // Fetch data from the API
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/news?t=${timestamp}`, {
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
        console.log(`✅ NewsPage: Fetched ${data.length} news items`)
        setNews(data)
        setError(null)
      } catch (err) {
        console.error("❌ NewsPage: Error fetching news:", err)
        if (news.length === 0) {
          setError("Nie udało się załadować aktualności. Spróbuj odświeżyć stronę.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Aktualności</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Bądź na bieżąco z informacjami z naszej przychodni
          </p>
        </div>

        {loading && news.length === 0 ? (
          <div className="mt-16 text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Ładowanie aktualności...</p>
          </div>
        ) : error && news.length === 0 ? (
          <div className="mt-16 text-center py-8">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Odśwież stronę
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">Brak aktualności do wyświetlenia.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="bg-secondary/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p style={{ textIndent: 0 }} className="whitespace-pre-wrap">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
