import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:justify-between md:text-left">
          <address className="space-y-3 not-italic">
            <p className="text-sm">
              <strong>{siteConfig.name}</strong>
            </p>
            <p className="mx-auto grid w-fit max-w-xs grid-cols-[1rem_minmax(0,1fr)] items-start gap-2 text-sm md:mx-0 md:flex md:w-auto md:max-w-none md:items-center md:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 text-primary md:mt-0" />
              <span>{siteConfig.address.display}</span>
            </p>
            <p className="mx-auto grid w-fit grid-cols-[1rem_auto] items-center gap-2 text-sm md:mx-0 md:flex md:w-auto md:justify-start">
              <Phone className="h-4 w-4 text-primary" />
              {siteConfig.contact.phone}
            </p>
            <p className="mx-auto grid w-fit grid-cols-[1rem_auto] items-center gap-2 text-sm md:mx-0 md:flex md:w-auto md:justify-start">
              <Mail className="h-4 w-4 text-primary" />
              {siteConfig.contact.email}
            </p>
          </address>
          <div className="mx-auto grid w-fit grid-cols-[1rem_auto] items-start gap-2 text-sm md:mx-0 md:flex md:w-auto md:justify-self-end">
            <Clock className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-medium">Godziny przyjęć:</p>
              {siteConfig.openingHours.map((item) => (
                <p key={item.day}>
                  {item.day}: {item.hours}
                </p>
              ))}
              {siteConfig.closedDays.map((item) => (
                <p key={item.day}>
                  {item.day}: {item.hours}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name} {siteConfig.owners}
          </p>
        </div>
      </div>
    </footer>
  )
}
