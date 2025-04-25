import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" })
const lora = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: "Przychodnia Małych Zwierząt | Paulina Czuchra-Olek Mariusz Horyza",
  description:
    "Przychodnia weterynaryjna w Ostrowie Wielkopolskim. Zajmujemy się leczeniem psów i kotów z pasją i zaangażowaniem.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
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
