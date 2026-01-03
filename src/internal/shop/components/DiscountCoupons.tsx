import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ticket } from "lucide-react";
import React, { useState } from "react";

// Tipos de datos
interface Coupon {
  id: string;
  code: string;
  discount: number;
  description: string;
  active: boolean;
}

// Cupones de ejemplo
const availableCoupons: Coupon[] = [
  {
    id: "1",
    code: "PRIMAVERA2024",
    discount: 15,
    description: "15% de descuento",
    active: true,
  },
  {
    id: "2",
    code: "NUEVO10",
    discount: 10,
    description: "10% para nuevos clientes",
    active: true,
  },
  {
    id: "3",
    code: "VIP20",
    discount: 20,
    description: "20% descuento VIP",
    active: true,
  },
];

const DiscountCoupons = () => {
  
   
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    
  const handleApplyCoupon = (coupon: Coupon) => {
    setAppliedCoupon(coupon);
    setDialogOpen(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="mb-8 space-y-4">
      <h3 className="text-lg font-semibold">Cupón de descuento</h3>

      {appliedCoupon ? (
        <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950/20">
          <div className="flex items-center gap-3">
            <Ticket className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <div className="font-medium">{appliedCoupon.code}</div>
              <div className="text-sm text-muted-foreground">
                {appliedCoupon.description}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="text-red-600 hover:text-red-700"
          >
            Remover
          </Button>
        </div>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Ticket className="mr-2 h-4 w-4" />
              Aplicar cupón de descuento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Cupones activos disponibles</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {availableCoupons.map((coupon) => (
                <Card
                  key={coupon.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleApplyCoupon(coupon)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Ticket className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{coupon.code}</div>
                          <div className="text-sm text-muted-foreground">
                            {coupon.description}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{coupon.discount}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DiscountCoupons;
