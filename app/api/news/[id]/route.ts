import { NextResponse } from "next/server"
import { getNewsById, updateNews, deleteNews } from "@/lib/news"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log(`📥 API: GET /api/news/${params.id}`)

  try {
    const id = params.id
    const newsItem = await getNewsById(id)

    if (!newsItem) {
      console.error(`❌ API: News item with ID: ${id} not found`)
      return NextResponse.json({ error: "Aktualność nie została znaleziona" }, { status: 404 })
    }

    console.log(`📤 API: Returning news item with ID: ${id}`)
    return NextResponse.json(newsItem, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ API Error fetching news item:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas pobierania aktualności" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  console.log(`📥 API: PUT /api/news/${params.id}`)

  try {
    const id = params.id
    const body = await request.json()
    console.log("📦 Request body:", body)

    // Walidacja danych
    if (!body.title && body.title !== "" && !body.content && body.content !== "") {
      console.error("❌ API: Missing data to update")
      return NextResponse.json({ error: "Brak danych do aktualizacji" }, { status: 400 })
    }

    const updatedNews = await updateNews(id, {
      title: body.title,
      content: body.content,
    })

    if (!updatedNews) {
      console.error(`❌ API: News item with ID: ${id} not found for update`)
      return NextResponse.json({ error: "Aktualność nie została znaleziona" }, { status: 404 })
    }

    console.log(`📤 API: Updated news item with ID: ${id}`)
    return NextResponse.json(updatedNews, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ API Error updating news item:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas aktualizacji aktualności" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  console.log(`📥 API: DELETE /api/news/${params.id}`)

  try {
    const id = params.id
    const success = await deleteNews(id)

    if (!success) {
      console.error(`❌ API: News item with ID: ${id} not found for deletion`)
      return NextResponse.json({ error: "Aktualność nie została znaleziona" }, { status: 404 })
    }

    console.log(`📤 API: Deleted news item with ID: ${id}`)
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("❌ API Error deleting news item:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas usuwania aktualności" }, { status: 500 })
  }
}
