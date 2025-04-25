import { list, put, del } from "@vercel/blob"
import { getBlobToken } from "./blob-config"

export interface PatientImage {
  id: string
  url: string
  createdAt: string
}

// Prefix for our metadata file
const METADATA_PREFIX = "data/"
const METADATA_FILENAME = "patients-metadata.json"
const FULL_PATH = `${METADATA_PREFIX}${METADATA_FILENAME}`

// Debug function to log the current state
async function debugBlobState(token: string, operation: string) {
  try {
    console.log(`🔍 Debugging Blob state after ${operation}...`)
    const { blobs } = await list({ prefix: METADATA_PREFIX, token })
    console.log(`Found ${blobs.length} blobs with prefix ${METADATA_PREFIX}:`)
    blobs.forEach((blob) => {
      console.log(`- ${blob.pathname} (${new Date(blob.uploadedAt).toLocaleString()})`)
    })
  } catch (error) {
    console.error("Error debugging blob state:", error)
  }
}

// Get all patient images sorted by date (newest first)
export async function getAllPatientImages(): Promise<PatientImage[]> {
  console.log("🔄 Fetching all patient images...")

  try {
    // Get the token
    const token = getBlobToken()
    if (!token) {
      console.error("❌ Missing Blob token in getAllPatientImages")
      return []
    }

    // List all blobs with our prefix to find our file
    const { blobs } = await list({ prefix: METADATA_PREFIX, token })
    console.log(`📋 Found ${blobs.length} blobs with prefix ${METADATA_PREFIX}`)

    const metadataBlob = blobs.find((blob) => blob.pathname === FULL_PATH)

    if (metadataBlob) {
      console.log(
        `📄 Found metadata file: ${metadataBlob.pathname}, uploaded at ${new Date(metadataBlob.uploadedAt).toLocaleString()}`,
      )

      // Fetch with no-cache to ensure we get the latest data
      const timestamp = new Date().getTime()
      const response = await fetch(`${metadataBlob.url}?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Successfully loaded patient metadata with ${Array.isArray(data) ? data.length : 0} items`)

        if (Array.isArray(data)) {
          return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }
      } else {
        console.error(`❌ Failed to fetch patient metadata: ${response.status} ${response.statusText}`)
      }
    } else {
      console.log("📄 Metadata file not found, will return empty array")
    }

    // If we couldn't get the metadata or it doesn't exist yet, return empty array
    return []
  } catch (error) {
    console.error("❌ Error in getAllPatientImages:", error)
    return []
  }
}

// Save the metadata to Blob storage
async function saveMetadata(images: PatientImage[]): Promise<boolean> {
  console.log(`🔄 Saving patient metadata with ${images.length} items...`)

  try {
    const token = getBlobToken()
    if (!token) {
      console.error("❌ Missing Blob token in saveMetadata")
      return false
    }

    const content = JSON.stringify(images, null, 2)
    console.log(`📝 Prepared JSON content (${content.length} bytes)`)

    // Add retry logic for saving metadata
    let retries = 3
    let success = false
    let lastError = null

    while (retries > 0 && !success) {
      try {
        console.log(`🔄 Attempting to save patient metadata (retries left: ${retries})...`)

        const blob = await put(FULL_PATH, content, {
          access: "public",
          token,
          contentType: "application/json",
          allowOverwrite: true,
          addRandomSuffix: false,
        })

        console.log(`✅ Successfully saved patient metadata to ${blob.url}`)
        success = true

        // Debug the current state
        await debugBlobState(token, "save")
      } catch (error) {
        lastError = error
        console.error(`❌ Error saving patient metadata (retries left: ${retries - 1}):`, error)
        retries--

        if (retries > 0) {
          const delay = 1000 * (4 - retries) // Exponential backoff
          console.log(`⏱️ Waiting ${delay}ms before retrying...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    if (!success && lastError) {
      console.error("❌ All retries failed when saving patient metadata:", lastError)
    }

    return success
  } catch (error) {
    console.error("❌ Error in saveMetadata:", error)
    return false
  }
}

// Add a new patient image
export async function addPatientImage(url: string): Promise<PatientImage> {
  console.log(`🔄 Adding new patient image: ${url}...`)

  const allImages = await getAllPatientImages()
  console.log(`📋 Current patient images count: ${allImages.length}`)

  const newImage: PatientImage = {
    id: Date.now().toString(),
    url,
    createdAt: new Date().toISOString(),
  }

  allImages.unshift(newImage) // Add to beginning of array
  const saved = await saveMetadata(allImages)

  if (saved) {
    console.log(`✅ Successfully added patient image with ID: ${newImage.id}`)
  } else {
    console.error(`❌ Failed to save metadata after adding image with ID: ${newImage.id}`)
  }

  return newImage
}

// Delete a patient image
export async function deletePatientImage(id: string): Promise<boolean> {
  console.log(`🔄 Deleting patient image with ID: ${id}...`)

  try {
    const allImages = await getAllPatientImages()
    const imageToDelete = allImages.find((image) => image.id === id)

    if (!imageToDelete) {
      console.error(`❌ Patient image with ID: ${id} not found`)
      return false
    }

    const filteredImages = allImages.filter((image) => image.id !== id)
    console.log(`📋 Filtered out image with ID: ${id}, new count: ${filteredImages.length}`)

    // Save the updated metadata
    const metadataSaved = await saveMetadata(filteredImages)

    if (!metadataSaved) {
      console.error(`❌ Failed to save metadata after deleting image with ID: ${id}`)
      return false
    }

    // Try to delete the actual image file from Blob storage if URL contains the blob domain
    try {
      if (imageToDelete.url.includes("blob.vercel-storage.com")) {
        console.log(`🔄 Attempting to delete image file: ${imageToDelete.url}...`)

        // Extract the pathname from the URL
        const url = new URL(imageToDelete.url)
        const pathname = url.pathname.startsWith("/") ? url.pathname.substring(1) : url.pathname

        // Delete the blob
        const token = getBlobToken()
        if (token) {
          await del(pathname, { token })
          console.log(`✅ Successfully deleted image file: ${pathname}`)
        } else {
          console.error("❌ Missing Blob token when trying to delete image file")
        }
      }
    } catch (deleteError) {
      console.error(`❌ Error deleting image file:`, deleteError)
      // Continue even if file deletion fails - metadata is updated
    }

    console.log(`✅ Successfully deleted patient image with ID: ${id}`)
    return true
  } catch (error) {
    console.error(`❌ Error in deletePatientImage:`, error)
    return false
  }
}
