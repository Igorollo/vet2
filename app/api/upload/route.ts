import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "Nie znaleziono pliku" }, { status: 400 })
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
    })

    return NextResponse.json(blob)
  } catch (error) {
    return NextResponse.json({ error: "Błąd podczas przesyłania pliku" }, { status: 500 })
  }
}
