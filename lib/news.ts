import { put, list } from "@vercel/blob"
import { getBlobToken } from "./blob-config"

export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
}

// Prefix for our news data file in Blob storage
const NEWS_PREFIX = "data/"
const NEWS_FILENAME = "news.json"
const FULL_PATH = `${NEWS_PREFIX}${NEWS_FILENAME}`

// Debug function to log the current state
async function debugBlobState(token: string, operation: string) {
  try {
    console.log(`🔍 Debugging Blob state after ${operation}...`)
    const { blobs } = await list({ prefix: NEWS_PREFIX, token })
    console.log(`Found ${blobs.length} blobs with prefix ${NEWS_PREFIX}:`)
    blobs.forEach((blob) => {
      console.log(`- ${blob.pathname} (${new Date(blob.uploadedAt).toLocaleString()})`)
    })
  } catch (error) {
    console.error("Error debugging blob state:", error)
  }
}

// Get all news items sorted by date (newest first)
export async function getAllNews(): Promise<NewsItem[]> {
  console.log("🔄 Fetching all news items...")

  try {
    // Get the token
    const token = getBlobToken()
    if (!token) {
      console.error("❌ Missing Blob token in getAllNews")
      return []
    }

    // List all blobs with our prefix to find our file
    const { blobs } = await list({ prefix: NEWS_PREFIX, token })
    console.log(`📋 Found ${blobs.length} blobs with prefix ${NEWS_PREFIX}`)

    const newsBlob = blobs.find((blob) => blob.pathname === FULL_PATH)

    if (newsBlob) {
      console.log(
        `📄 Found news file: ${newsBlob.pathname}, uploaded at ${new Date(newsBlob.uploadedAt).toLocaleString()}`,
      )

      // Fetch with no-cache to ensure we get the latest data
      const timestamp = new Date().getTime()
      const response = await fetch(`${newsBlob.url}?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Successfully loaded news data with ${Array.isArray(data) ? data.length : 0} items`)

        if (Array.isArray(data)) {
          return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }
      } else {
        console.error(`❌ Failed to fetch news data: ${response.status} ${response.statusText}`)
      }
    } else {
      console.log("📄 News file not found, will create initial data")
    }

    // If we couldn't get the news data or it doesn't exist yet, create initial data
    const initialData: NewsItem[] = [
      {
        id: "1",
        title: "Zmiana godzin przyjęć w okresie świątecznym",
        content:
          "Informujemy, że w dniach 24-26 grudnia przychodnia będzie nieczynna. W dniach 27-31 grudnia przyjmujemy w godzinach 10-14.",
        date: "2024-12-01T12:00:00Z",
      },
      {
        id: "2",
        title: "Nowa usługa - badania USG",
        content:
          "Z przyjemnością informujemy, że od stycznia 2025 roku rozszerzamy naszą ofertę o szczegółowe badania USG. Zapraszamy do zapisów.",
        date: "2024-11-15T10:30:00Z",
      },
    ]

    // Save the initial data
    const saved = await saveNewsData(initialData)
    if (saved) {
      console.log("✅ Successfully saved initial news data")
      return initialData
    } else {
      console.error("❌ Failed to save initial news data")
      return []
    }
  } catch (error) {
    console.error("❌ Error in getAllNews:", error)
    return []
  }
}

// Save the news data to Blob storage
async function saveNewsData(news: NewsItem[]): Promise<boolean> {
  console.log(`🔄 Saving news data with ${news.length} items...`)

  try {
    const token = getBlobToken()
    if (!token) {
      console.error("❌ Missing Blob token in saveNewsData")
      return false
    }

    const content = JSON.stringify(news, null, 2)
    console.log(`📝 Prepared JSON content (${content.length} bytes)`)

    // Add retry logic for saving news data
    let retries = 3
    let success = false
    let lastError = null

    while (retries > 0 && !success) {
      try {
        console.log(`🔄 Attempting to save news data (retries left: ${retries})...`)

        const blob = await put(FULL_PATH, content, {
          access: "public",
          token,
          contentType: "application/json",
          allowOverwrite: true,
          addRandomSuffix: false,
        })

        console.log(`✅ Successfully saved news data to ${blob.url}`)
        success = true

        // Debug the current state
        await debugBlobState(token, "save")
      } catch (error) {
        lastError = error
        console.error(`❌ Error saving news data (retries left: ${retries - 1}):`, error)
        retries--

        if (retries > 0) {
          const delay = 1000 * (4 - retries) // Exponential backoff
          console.log(`⏱️ Waiting ${delay}ms before retrying...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    if (!success && lastError) {
      console.error("❌ All retries failed when saving news data:", lastError)
    }

    return success
  } catch (error) {
    console.error("❌ Error in saveNewsData:", error)
    return false
  }
}

// Get a specific number of latest news items
export async function getLatestNews(count: number): Promise<NewsItem[]> {
  console.log(`🔄 Fetching latest ${count} news items...`)
  const allNews = await getAllNews()
  return allNews.slice(0, count)
}

// Get a specific news item by ID
export async function getNewsById(id: string): Promise<NewsItem | null> {
  console.log(`🔄 Fetching news item with ID: ${id}...`)
  const allNews = await getAllNews()
  return allNews.find((item) => item.id === id) || null
}

// Create a new news item
export async function createNews(newsItem: Omit<NewsItem, "id">): Promise<NewsItem> {
  console.log(`🔄 Creating new news item: "${newsItem.title}"...`)

  const allNews = await getAllNews()
  console.log(`📋 Current news count: ${allNews.length}`)

  const newItem: NewsItem = {
    ...newsItem,
    id: Date.now().toString(),
  }

  allNews.push(newItem)
  const saved = await saveNewsData(allNews)

  if (saved) {
    console.log(`✅ Successfully created news item with ID: ${newItem.id}`)
  } else {
    console.error(`❌ Failed to save news data after adding item with title: "${newItem.title}"`)
  }

  return newItem
}

// Update an existing news item
export async function updateNews(id: string, updates: Partial<Omit<NewsItem, "id">>): Promise<NewsItem | null> {
  console.log(`🔄 Updating news item with ID: ${id}...`)

  const allNews = await getAllNews()
  const index = allNews.findIndex((item) => item.id === id)

  if (index === -1) {
    console.error(`❌ News item with ID: ${id} not found`)
    return null
  }

  allNews[index] = {
    ...allNews[index],
    ...updates,
  }

  const saved = await saveNewsData(allNews)

  if (saved) {
    console.log(`✅ Successfully updated news item with ID: ${id}`)
  } else {
    console.error(`❌ Failed to save news data after updating item with ID: ${id}`)
  }

  return allNews[index]
}

// Delete a news item
export async function deleteNews(id: string): Promise<boolean> {
  console.log(`🔄 Deleting news item with ID: ${id}...`)

  const allNews = await getAllNews()
  const filteredNews = allNews.filter((item) => item.id !== id)

  if (filteredNews.length === allNews.length) {
    console.error(`❌ News item with ID: ${id} not found`)
    return false
  }

  const saved = await saveNewsData(filteredNews)

  if (saved) {
    console.log(`✅ Successfully deleted news item with ID: ${id}`)
  } else {
    console.error(`❌ Failed to save news data after deleting item with ID: ${id}`)
  }

  return saved
}
