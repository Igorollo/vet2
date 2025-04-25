import { Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">O nas</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">Poznaj naszą przychodnię i zespół.</p>
        </div>

        <div className="mt-16">
          <div className="rounded-lg bg-secondary p-8">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">O naszej przychodni</h2>
            </div>
            <p className="text-lg leading-relaxed text-indent-none">
              Jesteśmy przychodnią pełną serca, w której każde zwierzę traktujemy jak członka rodziny. Z pasją i troską
              opiekujemy się psami, kotami i małymi gryzoniami, dbając o ich zdrowie, bezpieczeństwo i dobre
              samopoczucie.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-indent-none">
              Mamy do dyspozycji dwa gabinety przyjęć, poczekalnię, recepcję, salę operacyjną i pozabiegową ze
              szpitalikiem. Nasza infrastruktura pozwala nam na świadczenie kompleksowych usług weterynaryjnych na
              najwyższym poziomie.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-indent-none">
              Praca to nasza pasja. Zdrowie i komfort naszych pacjentów są dla nas najważniejsze. Dlatego pracujemy
              profesjonalnie, z zachowaniem zasad etyki, dobrostanu i praw zwierząt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
