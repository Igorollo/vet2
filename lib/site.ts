export const siteConfig = {
  name: "Przychodnia Małych Zwierząt",
  owners: "Paulina Czuchra-Olek Mariusz Horyza",
  legalName: "Przychodnia Małych Zwierząt Paulina Czuchra-Olek Mariusz Horyza Spółka Cywilna",
  description:
    "Przychodnia weterynaryjna w Ostrowie Wielkopolskim oferująca opiekę dla psów, kotów i małych gryzoni.",
  address: {
    streetAddress: "Śmigielskiego 10 D",
    displayStreetAddress: "ul. Śmigielskiego 10 D",
    postalCode: "63-400",
    addressLocality: "Ostrów Wielkopolski",
    addressRegion: "wielkopolskie",
    addressCountry: "PL",
    display: "ul. Śmigielskiego 10 D, 63-400 Ostrów Wielkopolski",
  },
  contact: {
    phone: "507 439 250",
    phoneE164: "+48507439250",
    email: "lecznica.pm@o2.pl",
  },
  openingHours: [
    { day: "Poniedziałek", schemaDay: "Monday", hours: "9:00-15:00", opens: "09:00", closes: "15:00" },
    { day: "Wtorek", schemaDay: "Tuesday", hours: "9:00-15:00", opens: "09:00", closes: "15:00" },
    { day: "Środa", schemaDay: "Wednesday", hours: "9:00-15:00", opens: "09:00", closes: "15:00" },
    { day: "Czwartek", schemaDay: "Thursday", hours: "9:00-15:00", opens: "09:00", closes: "15:00" },
    { day: "Piątek", schemaDay: "Friday", hours: "9:00-15:00", opens: "09:00", closes: "15:00" },
  ],
  closedDays: [
    { day: "Sobota", hours: "nieczynne" },
    { day: "Niedziela", hours: "nieczynne" },
  ],
  keywords: [
    "weterynarz Ostrów Wielkopolski",
    "przychodnia weterynaryjna Ostrów Wielkopolski",
    "lecznica dla zwierząt Ostrów Wielkopolski",
    "weterynarz dla psa",
    "weterynarz dla kota",
    "opieka weterynaryjna",
    "chirurgia weterynaryjna",
    "diagnostyka weterynaryjna",
  ],
  ogImage: {
    path: "/images/logo.png",
    width: 1200,
    height: 630,
    alt: "Logo Przychodni Małych Zwierząt w Ostrowie Wielkopolskim",
  },
  publicRoutes: [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/uslugi", changeFrequency: "monthly", priority: 0.9 },
    { path: "/kontakt", changeFrequency: "monthly", priority: 0.9 },
    { path: "/o-nas", changeFrequency: "monthly", priority: 0.7 },
    { path: "/nasi-pacjenci", changeFrequency: "weekly", priority: 0.6 },
    { path: "/aktualnosci", changeFrequency: "weekly", priority: 0.6 },
  ],
} as const

const fallbackSiteUrl = "http://localhost:3000"

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const rawUrl = configuredUrl || fallbackSiteUrl
  const normalizedUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`

  try {
    const parsedUrl = new URL(normalizedUrl)
    return new URL(parsedUrl.origin)
  } catch {
    return new URL(fallbackSiteUrl)
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString()
}

export function getClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${absoluteUrl("/")}#veterinary-care`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    image: absoluteUrl(siteConfig.ogImage.path),
    logo: absoluteUrl(siteConfig.ogImage.path),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: siteConfig.address.addressLocality,
    openingHours: "Mo-Fr 09:00-15:00",
    openingHoursSpecification: siteConfig.openingHours.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${item.schemaDay}`,
      opens: item.opens,
      closes: item.closes,
    })),
  }
}
