"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Strona główna", href: "/" },
  { name: "Zakres usług", href: "/uslugi" },
  { name: "Kontakt", href: "/kontakt" },
  { name: "Nasi Pacjenci", href: "/nasi-pacjenci" },
  { name: "O nas", href: "/o-nas" },
  { name: "Aktualności", href: "/aktualnosci" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Przychodnia Małych Zwierząt Logo"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <span className="font-lora text-lg font-bold leading-tight md:text-xl lg:text-2xl">
              <span className="block">Przychodnia Małych Zwierząt</span>
              <span className="block text-sm md:text-base">Paulina Czuchra-Olek ○ Mariusz Horyza</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Otwórz menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6",
                pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Przychodnia Małych Zwierząt Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-lora text-lg font-bold">
                <span className="block">Przychodnia</span>
                <span className="block">Małych Zwierząt</span>
              </span>
            </Link>
            <Button variant="ghost" className="-m-2.5 rounded-md p-2.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Zamknij menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                      pathname === item.href ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
