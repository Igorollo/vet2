"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload, Trash2, RefreshCw } from "lucide-react"
import Image from "next/image"
import type { PatientImage } from "@/lib/patients"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PropagationNotice } from "./propagation-notice"

export function PatientImageManager() {
  const [images, setImages] = useState<PatientImage[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  // Fetch patient images
  const fetchImages = async () => {
    try {
      console.log("🔄 PatientImageManager: Fetching patient images...")
      setLoading(true)
      setError(null)

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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Błąd HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ PatientImageManager: Fetched ${data.length} patient images`)
      setImages(data)
    } catch (error) {
      console.error("❌ PatientImageManager: Error fetching patient images:", error)
      setError("Nie udało się pobrać zdjęć pacjentów. Spróbuj ponownie później.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Fetch patient images on component mount
  useEffect(() => {
    console.log("🔄 PatientImageManager: Component mounted, fetching data...")
    fetchImages()
  }, [])

  const handleRefresh = async () => {
    console.log("🔄 PatientImageManager: Manual refresh requested")
    setRefreshing(true)
    await fetchImages()
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Błąd",
        description: "Proszę wybrać plik do przesłania",
        variant: "destructive",
      })
      return
    }

    try {
      console.log(`🔄 PatientImageManager: Uploading file: ${file.name} (${file.size} bytes, ${file.type})...`)
      setUploading(true)
      setUploadProgress(10)

      const formData = new FormData()
      formData.append("file", file)

      setUploadProgress(30)

      const response = await fetch("/api/patients", {
        method: "POST",
        body: formData,
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      setUploadProgress(90)

      if (!response.ok) {
        const data = await response.json()

        // Handle specific error types
        if (data.tokenStatus === "missing" || data.tokenStatus === "invalid") {
          throw new Error(`Błąd autoryzacji: ${data.error}. Sprawdź konfigurację tokenu Vercel Blob.`)
        }

        if (data.errorType === "network") {
          throw new Error("Problem z połączeniem sieciowym. Sprawdź swoje połączenie internetowe.")
        }

        throw new Error(data.error || "Błąd podczas przesyłania pliku")
      }

      const data = await response.json()
      console.log(`✅ PatientImageManager: Successfully uploaded image with ID: ${data.id}`)

      // Refresh the images list
      fetchImages()

      setFile(null)

      // Reset the file input
      const fileInput = document.getElementById("patient-image-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      toast({
        title: "Sukces",
        description: "Zdjęcie zostało przesłane pomyślnie. Będzie widoczne w ciągu kilku minut.",
      })
    } catch (error) {
      console.error("❌ PatientImageManager: Error uploading image:", error)
      toast({
        title: "Błąd",
        description: error instanceof Error ? error.message : "Nie udało się przesłać zdjęcia",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      console.log(`🔄 PatientImageManager: Deleting image with ID: ${id}...`)

      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`)
      }

      console.log(`✅ PatientImageManager: Successfully deleted image with ID: ${id}`)

      // Refresh the images list
      fetchImages()

      toast({
        title: "Sukces",
        description: "Zdjęcie zostało usunięte pomyślnie. Zmiany będą widoczne w ciągu kilku minut.",
      })
    } catch (error) {
      console.error("❌ PatientImageManager: Error deleting image:", error)
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć zdjęcia",
        variant: "destructive",
      })
    }
  }

  if (loading && images.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Ładowanie zdjęć pacjentów...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PropagationNotice />
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Input
            id="patient-image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />
        </div>
        <Button type="submit" disabled={uploading || !file}>
          {uploading ? (
            <>
              Przesyłanie... {uploadProgress > 0 ? `(${uploadProgress}%)` : ""}
              <Upload className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Dodaj zdjęcie pacjenta
              <Upload className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Galeria zdjęć pacjentów</h3>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                Odświeżanie...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Odśwież
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Błąd</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {images.length === 0 ? (
          <p className="text-muted-foreground">Brak zdjęć do wyświetlenia.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={`group relative aspect-square rounded-md overflow-hidden border ${
                  image.id.startsWith("temp-") ? "opacity-70" : ""
                }`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt="Zdjęcie pacjenta"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
                />
                {image.id.startsWith("temp-") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <p className="text-white text-sm font-medium">Przesyłanie...</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                    className="h-8 w-8"
                    disabled={image.id.startsWith("temp-")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
