"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, RefreshCw } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { NewsItem } from "@/lib/news"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PropagationNotice } from "./propagation-notice"

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch news data
  const fetchNewsData = async () => {
    try {
      console.log("🔄 NewsManager: Fetching news data...")
      setLoading(true)
      setError(null)
      setSuccessMessage(null)

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
        throw new Error(`Błąd HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ NewsManager: Fetched ${data.length} news items`)
      setNews(data)
    } catch (error) {
      console.error("❌ NewsManager: Error fetching news:", error)
      setError("Nie udało się pobrać aktualności. Spróbuj ponownie później.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Pobieranie aktualności przy montowaniu komponentu
  useEffect(() => {
    console.log("🔄 NewsManager: Component mounted, fetching data...")
    fetchNewsData()
  }, [])

  const handleRefresh = () => {
    console.log("🔄 NewsManager: Manual refresh requested")
    setRefreshing(true)
    fetchNewsData()
  }

  const handleEdit = (newsItem: NewsItem) => {
    console.log(`🔄 NewsManager: Editing news item with ID: ${newsItem.id}`)
    setCurrentNews(newsItem)
    setEditTitle(newsItem.title)
    setEditContent(newsItem.content)
    setEditDialogOpen(true)
  }

  const handleDelete = (newsItem: NewsItem) => {
    console.log(`🔄 NewsManager: Preparing to delete news item with ID: ${newsItem.id}`)
    setCurrentNews(newsItem)
    setDeleteDialogOpen(true)
  }

  const saveEdit = async () => {
    if (!currentNews) return

    try {
      console.log(`🔄 NewsManager: Saving edits for news item with ID: ${currentNews.id}`)
      setEditDialogOpen(false)

      const response = await fetch(`/api/news/${currentNews.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      })

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`)
      }

      // Get the actual updated news from the server
      const serverUpdatedNews = await response.json()
      console.log(`✅ NewsManager: Successfully updated news item with ID: ${serverUpdatedNews.id}`)

      // Refresh the news list
      fetchNewsData()

      setSuccessMessage("Aktualność została zaktualizowana pomyślnie. Zmiany będą widoczne w ciągu kilku minut.")
      toast({
        title: "Sukces",
        description: "Aktualność została zaktualizowana pomyślnie. Zmiany będą widoczne w ciągu kilku minut.",
      })
    } catch (error) {
      console.error("❌ NewsManager: Error updating news:", error)
      setError("Nie udało się zaktualizować aktualności.")
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować aktualności.",
        variant: "destructive",
      })

      // Reopen the dialog on error
      setEditDialogOpen(true)
    }
  }

  const confirmDelete = async () => {
    if (!currentNews) return

    try {
      console.log(`🔄 NewsManager: Deleting news item with ID: ${currentNews.id}`)
      setDeleteDialogOpen(false)

      const response = await fetch(`/api/news/${currentNews.id}`, {
        method: "DELETE",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`)
      }

      console.log(`✅ NewsManager: Successfully deleted news item with ID: ${currentNews.id}`)

      // Refresh the news list
      fetchNewsData()

      setSuccessMessage("Aktualność została usunięta pomyślnie. Zmiany będą widoczne w ciągu kilku minut.")
      toast({
        title: "Sukces",
        description: "Aktualność została usunięta pomyślnie. Zmiany będą widoczne w ciągu kilku minut.",
      })
    } catch (error) {
      console.error("❌ NewsManager: Error deleting news:", error)
      setError("Nie udało się usunąć aktualności.")
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć aktualności.",
        variant: "destructive",
      })
    }
  }

  if (loading && news.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Ładowanie aktualności...</p>
      </div>
    )
  }

  return (
    <div>
      <PropagationNotice />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Lista aktualności</h3>
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
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-4">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {news.length === 0 ? (
        <div className="text-center py-8">
          <p>Brak aktualności do wyświetlenia.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tytuł</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[150px]">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Dialog edycji */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj aktualność</DialogTitle>
            <DialogDescription>Wprowadź zmiany w aktualności i zapisz je.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tytuł</Label>
              <Input id="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Treść</Label>
              <Textarea id="content" rows={5} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={saveEdit}>Zapisz zmiany</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog usuwania */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć tę aktualność?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta operacja jest nieodwracalna. Aktualność zostanie trwale usunięta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Usuń</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
