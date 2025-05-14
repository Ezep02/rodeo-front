import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DiscountCardProps {
  title: string
  code: string
  expiry: string
  isUsed?: boolean
}

export function DiscountCard({ title, code, expiry, isUsed = false }: DiscountCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg border p-4", isUsed && "opacity-60")}>
      {isUsed && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[1px]">
          <div className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium">Utilizado</div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">Válido hasta {expiry}</p>
        </div>
        {!isUsed && (
          <Button variant="outline" size="sm" className="h-8 gap-1" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copiar</span>
              </>
            )}
          </Button>
        )}
      </div>

      {!isUsed && (
        <div className="mt-3 flex items-center">
          <div className="rounded bg-zinc-100 px-2.5 py-1 font-mono text-sm font-medium">{code}</div>
        </div>
      )}
    </div>
  )
}
