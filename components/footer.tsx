import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:justify-between">
          <address className="space-y-3 not-italic">
            <p className="flex items-center gap-2 text-sm">
              <strong>{siteConfig.name}</strong>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              {siteConfig.address.display}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              {siteConfig.contact.phone}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              {siteConfig.contact.email}
            </p>
          </address>
          <div className="flex items-start gap-2 text-sm md:justify-self-end">
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
