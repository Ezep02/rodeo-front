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
import { DashboardContext } from "@/context/DashboardContext";
import { Coupon } from "@/types/Coupon";
import { Check, Ticket } from "lucide-react";
import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";

// Cupones de ejemplo
const availableCoupons: Coupon[] = [
  {
    id: 1,
    code: "PRIMAVERA2024",
    user_id: 101,
    original_amount: 5000,
    remaining_amount: 15000,
    origin_type: "promo",
    origin_reference_id: 1,
    status: "active",
    created_at: new Date("2024-03-01"),
    expire_at: new Date("2024-06-30"),
  },
  {
    id: 2,
    code: "CANCEL2024",
    user_id: 102,
    original_amount: 3000,
    remaining_amount: 1500,
    origin_type: "cancelation",
    origin_reference_id: 845,
    status: "active",
    created_at: new Date("2024-02-15"),
    expire_at: new Date("2024-05-15"),
  },
  {
    id: 3,
    code: "VIP2024",
    user_id: 103,
    original_amount: 10000,
    remaining_amount: 0,
    origin_type: "manual",
    origin_reference_id: 12,
    status: "exhausted",
    created_at: new Date("2024-01-10"),
    expire_at: new Date("2024-12-31"),
  },
  {
    id: 4,
    code: "EXPIRED50",
    user_id: 104,
    original_amount: 2000,
    remaining_amount: 2000,
    origin_type: "promo",
    origin_reference_id: 7,
    status: "expired",
    created_at: new Date("2023-01-01"),
    expire_at: new Date("2023-12-31"),
  },
];

const DiscountCoupons = () => {
  const { setAppliedCoupon, appliedCoupon } = useContext(DashboardContext)!;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        <div className="flex items-center justify-between rounded-2xl border border-green-400 bg-green-50 p-3.5  dark:bg-green-950/20">
          <div className="flex gap-4">
            {/* Check */}
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={true}
                readOnly
                className="
                peer appearance-none w-6 h-6 border-2 border-zinc-500 rounded-full
                checked:bg-zinc-900 checked:border-zinc-900
                transition-colors duration-200
                focus:outline-none
              "
              />
              <Check
                size={16}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                text-white transform opacity-0 scale-50
                transition-all duration-200 ease-out
                peer-checked:opacity-100 peer-checked:scale-100"
              />
            </label>

            <div className="font-medium">{appliedCoupon.code}</div>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleRemoveCoupon}
            className="rounded-full cursor-pointer"
          >
            Remover
          </Button>
        </div>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="w-full rounded-full cursor-pointer"
            >
              <FiPlus size={24} />
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
                            {coupon.code}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        ${coupon.remaining_amount}
                      </Badge>
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
