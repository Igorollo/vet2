"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewsManager } from "@/components/admin/news-manager"
import { AddNewsForm } from "@/components/admin/add-news-form"
import { PatientImageManager } from "@/components/admin/patient-image-manager"
import type { NewsItem } from "@/lib/news"

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.push("/admin/login")
    }
  }, [router])

  // Handler for when a new news item is added
  const handleNewsAdded = (newsItem: NewsItem) => {
    console.log("🔄 AdminDashboard: News item added, updating state")

    // Update the news items state
    setNewsItems((prev) => {
      // If the item already exists (by ID), replace it
      // Otherwise, add it to the beginning of the array
      const exists = prev.some((item) => item.id === newsItem.id)
      if (exists) {
        return prev.map((item) => (item.id === newsItem.id ? newsItem : item))
      } else {
        return [newsItem, ...prev]
      }
    })

    // Switch to the list tab to show the newly added item
    const newsListTab = document.querySelector('[data-value="list"]') as HTMLElement
    if (newsListTab) {
      newsListTab.click()
    }
  }

  if (!isClient || !isLoggedIn) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p>Ładowanie...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel administracyjny</h1>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("isLoggedIn")
            router.push("/admin/login")
          }}
        >
          Wyloguj się
        </Button>
      </div>

      <Tabs defaultValue="news">
        <TabsList className="mb-6">
          <TabsTrigger value="news">Aktualności</TabsTrigger>
          <TabsTrigger value="patients">Zdjęcia pacjentów</TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie aktualnościami</CardTitle>
              <CardDescription>
                Dodawaj, edytuj i usuwaj aktualności, które będą wyświetlane na stronie głównej
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list">
                <TabsList className="mb-4">
                  <TabsTrigger value="list" data-value="list">
                    Lista aktualności
                  </TabsTrigger>
                  <TabsTrigger value="add" data-value="add">
                    Dodaj nową
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <NewsManager />
                </TabsContent>
                <TabsContent value="add">
                  <AddNewsForm onNewsAdded={handleNewsAdded} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">Panel administracyjny przychodni weterynaryjnej</p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie zdjęciami pacjentów</CardTitle>
              <CardDescription>Dodawaj i usuwaj zdjęcia pacjentów, które będą wyświetlane w galerii</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientImageManager />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">Panel administracyjny przychodni weterynaryjnej</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
