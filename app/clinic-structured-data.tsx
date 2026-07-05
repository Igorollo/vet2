import { getClinicJsonLd } from "@/lib/site"

export default function ClinicStructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getClinicJsonLd()).replace(/</g, "\\u003c"),
      }}
    />
  )
}
