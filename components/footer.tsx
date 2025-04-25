import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 md:flex md:items-center md:justify-between lg:px-8">
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm">
            <strong>Przychodnia Małych Zwierząt</strong>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            ul. Śmigielskiego 10 D, 63-400 Ostrów Wielkopolski
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            62 592-04-04 | 507 439 250
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            lecznica.pm@o2.pl
          </p>
          <div className="flex items-start gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-medium">Godziny przyjęć:</p>
              <p>Poniedziałek: 9:00-12:00, 16:00-19:00</p>
              <p>Wtorek: 9:00-12:00, 16:00-19:00</p>
              <p>Środa: 9:00-12:00, 16:00-19:00</p>
              <p>Czwartek: 9:00-12:00, 16:00-19:00</p>
              <p>Piątek: 9:00-12:00, 16:00-19:00</p>
              <p>Sobota: nieczynne</p>
              <p>Niedziela: nieczynne</p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Przychodnia Małych Zwierząt Paulina Czuchra-Olek Mariusz Horyza
          </p>
        </div>
      </div>
    </footer>
  )
}
