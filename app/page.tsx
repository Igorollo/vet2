import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LatestNewsSection from "@/components/latest-news-section"

// Główny komponent strony
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/50 to-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Przychodnia Małych Zwierząt</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Zapraszamy do naszej przychodni, w której dbamy o zdrowie Twojego pupila z pasją i zaangażowaniem. To u
                nas jest miejsce, w którym Twój pupil poczuje się bezpiecznie i zaopiekowany.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <Button asChild size="lg">
                  <Link href="/uslugi">Zakres usług</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/kontakt">Kontakt</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/nasi-pacjenci">Nasi Pacjenci</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md md:ml-auto md:mr-0 md:max-w-none lg:pl-8">
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2447.png-IxhbGpN49eeipOSEmW5NhNs8sAti6k.jpeg"
                  alt="Pies odpoczywający"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O nas - krótko */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1630.png-fLZP5ghMYVvKlic9dP6EnzRQMddaYq.jpeg"
                  alt="Psy na spacerze w parku"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 flex flex-col justify-center text-center md:order-2 md:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Troszczymy się o zdrowie Twojego pupila</h2>
              <p className="mt-4 text-lg">
                W naszej przychodni najważniejsze jest to, żeby zwierzę i opiekun czuli się dobrze. Leczymy, doradzamy i
                jesteśmy na miejscu, gdy nas potrzebujesz.
              </p>
              <div className="mt-8 flex justify-center md:justify-start space-x-4">
                <Button asChild className="px-6">
                  <Link href="/o-nas">Poznaj nas</Link>
                </Button>
                <Button asChild variant="outline" className="px-6">
                  <Link href="/aktualnosci">Nasze aktualności</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aktualności - skrót */}
      <LatestNewsSection />
    </div>
  )
}
