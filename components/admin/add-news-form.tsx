"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { NewsItem } from "@/lib/news"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define a callback prop type for updating the parent component
interface AddNewsFormProps {
  onNewsAdded?: (newsItem: NewsItem) => void
}

export function AddNewsForm({ onNewsAdded }: AddNewsFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!title.trim() || !content.trim()) {
      setError("Tytuł i treść są wymagane")
      toast({
        title: "Błąd",
        description: "Tytuł i treść są wymagane",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("🔄 AddNewsForm: Adding new news item...")
      setLoading(true)

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify({
          title,
          content,
          date: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Błąd podczas dodawania aktualności")
      }

      console.log(`✅ AddNewsForm: Successfully added news item with ID: ${data.id}`)

      // Show success message
      setSuccess(true)
      toast({
        title: "Sukces",
        description: "Aktualność została dodana pomyślnie. Będzie widoczna w ciągu kilku minut.",
      })

      // Reset form
      setTitle("")
      setContent("")

      // Notify parent component about the new news item
      if (onNewsAdded) {
        onNewsAdded(data)
      }
    } catch (error) {
      console.error("❌ AddNewsForm: Error adding news:", error)
      setError(error instanceof Error ? error.message : "Nie udało się dodać aktualności")
      toast({
        title: "Błąd",
        description: error instanceof Error ? error.message : "Nie udało się dodać aktualności",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>Aktualność została dodana pomyślnie! Będzie widoczna w ciągu kilku minut.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Wprowadź tytuł aktualności"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Treść</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Wprowadź treść aktualności"
          rows={6}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
            Dodawanie...
          </>
        ) : (
          "Dodaj aktualność"
        )}
      </Button>
    </form>
  )
}
