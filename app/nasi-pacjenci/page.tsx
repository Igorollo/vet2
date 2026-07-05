import type { Metadata } from "next"
import PatientGallery from "@/components/patient-gallery"
import { createPageMetadata } from "@/lib/metadata"

export const metadata: Metadata = createPageMetadata({
  title: "Nasi pacjenci",
  description:
    "Galeria pacjentów Przychodni Małych Zwierząt w Ostrowie Wielkopolskim: psy, koty i małe gryzonie objęte opieką weterynaryjną.",
  path: "/nasi-pacjenci",
  keywords: ["galeria pacjentów weterynarz", "psy i koty weterynarz Ostrów Wielkopolski"],
})

export default function PatientsPage() {
  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nasi Pacjenci</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Galeria zdjęć naszych pacjentów
          </p>
        </div>

        <PatientGallery />
      </div>
    </div>
  )
}
