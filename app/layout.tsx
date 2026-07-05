import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ClinicStructuredData from "@/app/clinic-structured-data"
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/site"

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" })
const lora = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-lora" })

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteConfig.name} | Weterynarz Ostrów Wielkopolski`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owners }],
  creator: siteConfig.legalName,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${siteConfig.name} | Weterynarz Ostrów Wielkopolski`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage.path),
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Weterynarz Ostrów Wielkopolski`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage.path)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <ClinicStructuredData />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
