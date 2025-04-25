import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { addPatientImage, getAllPatientImages } from "@/lib/patients"
import { getBlobToken } from "@/lib/blob-config"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  console.log("📥 API: GET /api/patients")

  try {
    const images = await getAllPatientImages()

    console.log(`📤 API: Returning ${images.length} patient images`)
    return NextResponse.json(images, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("❌ API Error fetching patient images:", error)
    return NextResponse.json({ error: "Wystąpił błąd podczas pobierania zdjęć pacjentów" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  console.log("📥 API: POST /api/patients")

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("❌ API: No file found in request")
      return NextResponse.json({ error: "Nie znaleziono pliku" }, { status: 400 })
    }

    console.log(`📦 Received file: ${file.name} (${file.size} bytes, ${file.type})`)

    // Get the token from our configuration
    const token = getBlobToken()

    if (!token) {
      console.error("❌ API: Missing Blob token")
      return NextResponse.json(
        {
          error: "Brak tokenu Vercel Blob. Sprawdź konfigurację środowiska.",
          tokenStatus: "missing",
        },
        { status: 500 },
      )
    }

    // Generate a unique filename with original extension
    const fileExtension = file.name.split(".").pop() || ""
    const filename = `patients/patient-${Date.now()}.${fileExtension}`
    console.log(`🔄 Generated filename: ${filename}`)

    try {
      // Upload to Vercel Blob with explicit token
      console.log(`🔄 Uploading file to Vercel Blob...`)
      const blob = await put(filename, file, {
        access: "public",
        token: token,
        addRandomSuffix: false,
      })
      console.log(`✅ File uploaded successfully to: ${blob.url}`)

      // Save to our database
      console.log(`🔄 Adding patient image to metadata...`)
      const patientImage = await addPatientImage(blob.url)
      console.log(`✅ Patient image added with ID: ${patientImage.id}`)

      return NextResponse.json(patientImage, {
        status: 201,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      })
    } catch (uploadError) {
      console.error("❌ Blob upload error:", uploadError)

      // Check for specific error types
      if (uploadError instanceof Error) {
        if (uploadError.message.includes("token")) {
          return NextResponse.json(
            {
              error: "Błąd autoryzacji Vercel Blob. Token może być nieprawidłowy.",
              tokenStatus: "invalid",
            },
            { status: 401 },
          )
        }

        if (uploadError.message.includes("network") || uploadError.message.includes("fetch")) {
          return NextResponse.json(
            {
              error: "Błąd sieci podczas przesyłania pliku. Sprawdź połączenie internetowe.",
              errorType: "network",
            },
            { status: 500 },
          )
        }
      }

      return NextResponse.json(
        {
          error:
            uploadError instanceof Error
              ? `Błąd podczas przesyłania pliku: ${uploadError.message}`
              : "Nieznany błąd podczas przesyłania pliku",
          errorType: "upload",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ API Error processing request:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Błąd podczas przetwarzania żądania: ${error.message}`
            : "Wystąpił nieoczekiwany błąd podczas przetwarzania żądania",
        errorType: "general",
      },
      { status: 500 },
    )
  }
}
