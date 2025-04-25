import { NextResponse } from "next/server"
import { getAllNews, createNews } from "@/lib/news"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  console.log("📥 API: GET /api/news")

  try {
    // Get URL parameters
    const url = new URL(request.url)
    const limitParam = url.searchParams.get("limit")
    const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined

    const news = await getAllNews()

    // Apply limit if provided
    const limitedNews = limit ? news.slice(0, limit) : news

    console.log(`📤 API: Returning ${limitedNews.length} news items${limit ? ` (limited from ${news.length})` : ""}`)
    return NextResponse.json(limitedNews, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("❌ API Error fetching news:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas pobierania aktualności" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  console.log("📥 API: POST /api/news")

  try {
    const body = await request.json()
    console.log("📦 Request body:", body)

    // Walidacja danych
    if (!body.title || !body.content) {
      console.error("❌ API: Missing title or content")
      return NextResponse.json({ error: "Tytuł i treść są wymagane" }, { status: 400 })
    }

    const newsItem = await createNews({
      title: body.title,
      content: body.content,
      date: body.date || new Date().toISOString(),
    })

    console.log(`📤 API: Created news item with ID: ${newsItem.id}`)
    return NextResponse.json(newsItem, {
      status: 201,
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ API Error creating news:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas dodawania aktualności" }, { status: 500 })
  }
}
