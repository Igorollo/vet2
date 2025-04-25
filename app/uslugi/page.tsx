import {
  PawPrint,
  Stethoscope,
  Microscope,
  Scan,
  Activity,
  Scissors,
  SmileIcon as Tooth,
  Baby,
  Thermometer,
  QrCode,
  Mouse,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Zakres usług</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Oferujemy kompleksową opiekę weterynaryjną dla Twojego pupila
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Lewa kolumna - Psy i koty */}
          <div>
            <div className="rounded-lg bg-secondary p-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <PawPrint className="h-6 w-6 text-primary" />
                Psy i koty
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Pełna profilaktyka weterynaryjna</h3>
                    <p className="mt-1 text-muted-foreground">
                      Szczepienia ochronne, przeciw wściekliźnie, odrobaczania, ochrona przeciw pasożytom zewnętrznym
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Microscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Diagnostyka laboratoryjna</h3>
                    <p className="mt-1 text-muted-foreground">
                      Posiadamy własne analizatory krwi (biochemia, morfologia, testy chorób odkleszczowych,
                      progesteron, FeLV/FIV)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Współpraca z najlepszymi laboratoriami</h3>
                    <p className="mt-1 text-muted-foreground">
                      Badania genetyczne, pełen pakiet alergiczny i wiele innych
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Scan className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Diagnostyka obrazowa</h3>
                    <p className="mt-1 text-muted-foreground">
                      Posiadamy USG i RTG (badania RTG wykonujemy w premedykacji po wcześniejszym umówieniu wizyty)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Pełna diagnostyka chorób</h3>
                    <p className="mt-1 text-muted-foreground">Diagnostyka chorób wewnętrznych i zakaźnych</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chirurgia miękka</h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Tooth className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Stomatologia</h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Baby className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Rozród i położnictwo</h3>
                    <p className="mt-1 text-muted-foreground">Diagnostyka i prowadzenie ciąży</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dermatologia</h3>
                    <p className="mt-1 text-muted-foreground">Otoskop – kamerka diagnostyczna</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <QrCode className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chipowanie i paszporty</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Dlaczego warto nas wybrać + Małe gryzonie */}
          <div className="space-y-8">
            <div className="rounded-lg bg-primary/10 p-6">
              <h3 className="text-xl font-bold">Dlaczego warto nas wybrać?</h3>
              <p className="mt-2">
                Praca to nasza pasja, a nasi pacjenci, ich zdrowie i komfort podczas wizyty są dla nas najważniejsze.
                Pracujemy profesjonalnie z zachowaniem zasad etyki, dobrostanu i praw zwierząt.
              </p>
            </div>

            {/* Przeniesiona sekcja Małe gryzonie */}
            <div className="rounded-lg bg-secondary p-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Mouse className="h-6 w-6 text-primary" />
                Małe gryzonie
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profilaktyka</h3>
                    <p className="mt-1 text-muted-foreground">Szczepienia i odrobaczenia</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Scissors className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Korekcja zębów i pazurków</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
