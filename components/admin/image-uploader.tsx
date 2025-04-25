"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
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
      setUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Błąd podczas przesyłania pliku")
      }

      const blob = await response.json()
      setUploadedUrl(blob.url)

      toast({
        title: "Sukces",
        description: "Plik został przesłany pomyślnie",
      })
    } catch (error) {
      console.error("Błąd:", error)
      toast({
        title: "Błąd",
        description: "Nie udało się przesłać pliku",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />
        </div>
        <Button type="submit" disabled={uploading || !file}>
          {uploading ? "Przesyłanie..." : "Prześlij zdjęcie"}
          <Upload className="ml-2 h-4 w-4" />
        </Button>
      </form>

      {uploadedUrl && (
        <div className="mt-4 space-y-2">
          <p className="font-medium">Przesłane zdjęcie:</p>
          <div className="overflow-hidden rounded-md border">
            <img src={uploadedUrl || "/placeholder.svg"} alt="Przesłane zdjęcie" className="h-auto w-full" />
          </div>
          <p className="text-sm break-all">
            <span className="font-medium">URL: </span>
            {uploadedUrl}
          </p>
        </div>
      )}
    </div>
  )
}
