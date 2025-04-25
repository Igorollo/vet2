// This file centralizes access to the Blob token

// Get the token from environment variables or use the fallback
export const getBlobToken = (): string => {
  // Try to get from environment variables first
  const envToken = process.env.BLOB_READ_WRITE_TOKEN

  // If available in environment, use it
  if (envToken) {
    console.log("Using environment BLOB_READ_WRITE_TOKEN")
    return envToken
  }

  // Fallback to hardcoded token (for development only)
  console.log("WARNING: Using fallback hardcoded token - this should only happen in development")
  return "vercel_blob_rw_5Hm2gr3AaJUIIMsZ_aAPl0gtoFunKumkPWvP7L2OTlQ40Gk"
}

// Helper to log blob operations for debugging
export const logBlobOperation = (operation: string, path: string, success: boolean, error?: any) => {
  if (success) {
    console.log(`✅ Blob ${operation} succeeded for: ${path}`)
  } else {
    console.error(`❌ Blob ${operation} failed for: ${path}`, error)
  }
}

// Validate that the token is working
export const validateBlobToken = async (): Promise<boolean> => {
  try {
    const token = getBlobToken()
    if (!token) {
      console.error("❌ No Blob token available")
      return false
    }

    // We'll just try to list blobs as a validation
    const { list } = await import("@vercel/blob")
    await list({ prefix: "test-validation/", token })
    console.log("✅ Blob token validated successfully")
    return true
  } catch (error) {
    console.error("❌ Blob token validation failed:", error)
    return false
  }
}
