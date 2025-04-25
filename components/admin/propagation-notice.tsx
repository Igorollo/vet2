import { AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PropagationNotice() {
  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        <Clock className="h-4 w-4" /> Uwaga dotycząca widoczności zmian
      </AlertTitle>
      <AlertDescription>
        Ze względu na sposób działania systemu przechowywania danych, zmiany (dodawanie, edycja, usuwanie) mogą być
        widoczne z opóźnieniem do kilku minut. Prosimy o cierpliwość po wykonaniu operacji.
      </AlertDescription>
    </Alert>
  )
}
