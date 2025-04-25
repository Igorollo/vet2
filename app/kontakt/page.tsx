import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Kontakt</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Skontaktuj się z nami, aby umówić wizytę lub uzyskać więcej informacji.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Lewa kolumna - Informacje kontaktowe */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Przychodnia Małych Zwierząt</h2>
            <p className="mt-2 text-lg text-indent-none">Paulina Czuchra-Olek Mariusz Horyza Spółka Cywilna</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-indent-none">ul. Śmigielskiego 10 D, 63-400 Ostrów Wielkopolski</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-indent-none">Telefon stacjonarny: 62 592-04-04</p>
                  <p className="text-indent-none">Telefon komórkowy: 507 439 250</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-indent-none">lecznica.pm@o2.pl</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-indent-none">Godziny przyjęć:</p>
                  <p className="text-indent-none">Poniedziałek: 9:00-12:00, 16:00-19:00</p>
                  <p className="text-indent-none">Wtorek: 9:00-12:00, 16:00-19:00</p>
                  <p className="text-indent-none">Środa: 9:00-12:00, 16:00-19:00</p>
                  <p className="text-indent-none">Czwartek: 9:00-12:00, 16:00-19:00</p>
                  <p className="text-indent-none">Piątek: 9:00-12:00, 16:00-19:00</p>
                  <p className="text-indent-none">Sobota: nieczynne</p>
                  <p className="text-indent-none">Niedziela: nieczynne</p>
                  <p className="mt-2 text-sm italic text-indent-none">
                    Umawianie wizyt tylko w godzinach przyjęć. Prosimy o cierpliwość w umawianiu wizyt i w razie
                    trudności prosimy o wiadomość SMS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Dodatkowe informacje */}
          <div className="rounded-lg bg-secondary p-8 h-full">
            <h2 className="text-2xl font-bold mb-4">Jak do nas dotrzeć</h2>
            <p className="text-indent-none">
              Nasza przychodnia znajduje się w dogodnej lokalizacji w Ostrowie Wielkopolskim przy ulicy Śmigielskiego 10
              D.
            </p>
            <p className="mt-4 text-indent-none">
              W pobliżu znajduje się parking, który umożliwia wygodne pozostawienie samochodu na czas wizyty.
            </p>
            <p className="mt-4 text-indent-none">
              Przychodnia jest łatwo dostępna zarówno dla osób poruszających się samochodem, jak i komunikacją miejską.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="mt-4 h-96 w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8885672238366!2d17.8092646!3d51.6498232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ac5f6d5a8e5c7%3A0x9f8f2e5b5c5b5b5b!2s%C5%9Amigielskiego%2010D%2C%2063-400%20Ostr%C3%B3w%20Wielkopolski!5e0!3m2!1spl!2spl!4v1616161616161!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
