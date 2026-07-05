import { NextResponse } from "next/server"
import { deletePatientImage } from "@/lib/patients"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params
  console.log(`📥 API: DELETE /api/patients/${id}`)

  try {
    const success = await deletePatientImage(id)

    if (!success) {
      console.error(`❌ API: Patient image with ID: ${id} not found for deletion`)
      return NextResponse.json({ error: "Zdjęcie nie zostało znalezione" }, { status: 404 })
    }

    console.log(`📤 API: Deleted patient image with ID: ${id}`)
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("❌ API Error deleting patient image:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas usuwania zdjęcia" }, { status: 500 })
  }
}
