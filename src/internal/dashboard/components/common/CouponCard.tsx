import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { Coupon } from '../../models/Coupons'

type CoupongCardProps = {
    Coupon: Coupon
}

const CoupongCard: React.FC<CoupongCardProps> = ({ Coupon }) => {

    const [copied, setCopied] = useState(false)

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card
            className="overflow-hidden"

        >
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 h-2"></div>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-medium text-lg">{Coupon.discount_percent}% de Descuento</h4>
                        <p className="text-sm text-slate-500">Válido hasta{" "}{new Date(Coupon.available_to_date).toLocaleDateString("es-AR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}</p>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => copyToClipboard(Coupon.code)}>
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
                </div>
            </CardContent>
            <CardFooter className="flex  items-center pt-2 border-t">
                <Badge className="bg-zinc-900">#{Coupon.code}</Badge>
            </CardFooter>
        </Card>

    )
}

export default CoupongCard
