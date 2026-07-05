"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { PatientImage } from "@/lib/patients"

export default function PatientGallery() {
  const [images, setImages] = useState<PatientImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = async () => {
    try {
      console.log("🔄 PatientGallery: Fetching patient images...")
      setLoading(true)

      // Fetch data from the API
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/patients?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ PatientGallery: Fetched ${data.length} patient images`)
      setImages(data)
      setError(null)
    } catch (err) {
      console.error("❌ PatientGallery: Error fetching patient images:", err)
      setError("Nie udało się załadować zdjęć. Spróbuj odświeżyć stronę.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("🔄 PatientGallery: Component mounted, fetching data...")
    fetchImages()
  }, [])

  if (loading && images.length === 0) {
    return (
      <div className="mt-16 text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Ładowanie galerii...</p>
      </div>
    )
  }

  if (error && images.length === 0) {
    return (
      <div className="mt-16 text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Spróbuj ponownie
        </Button>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-lg text-muted-foreground">Brak zdjęć do wyświetlenia.</p>
      </div>
    )
  }

  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt="Pacjent Przychodni Małych Zwierząt"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
