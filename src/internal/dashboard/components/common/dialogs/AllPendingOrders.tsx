import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'
import { CustomerPendingOrder } from '../../../models/OrderModels';
import { differenceInMilliseconds } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { IoIosArrowForward } from "react-icons/io";


type AllPendingOrdersProps = {
  customerPendingOrders: CustomerPendingOrder[]
}

const AllPendingOrders:React.FC<AllPendingOrdersProps> = ({customerPendingOrders}) => {
  return (
    <Dialog>
      <DialogTrigger className="hover:text-zinc-300 gap-1 py-4 text-sm text-zinc-50 hover:underline flex items-center">
        Ver historial completo{" "}<IoIosArrowForward />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ordenes pendientes</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save whe
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-4 max-h-[520px] overflow-y-auto pr-1 scroll-abrir-editar-tarjeta">
          {customerPendingOrders.map((a, i) => {
            // ────────── Calculo del progreso ──────────
            const scheduledAt = new Date(a.schedule_day_date);
            const createdAt = a.CreatedAt
              ? new Date(a.CreatedAt)
              : new Date(scheduledAt.getTime() - 7 * 24 * 60 * 60 * 1000); // fallback 7 días antes
            const totalDuration = Math.max(
              differenceInMilliseconds(scheduledAt, createdAt),
              1
            );
            const remaining = Math.max(
              differenceInMilliseconds(scheduledAt, new Date()),
              0
            );
            const progress = Math.min(
              100,
              Math.round(((totalDuration - remaining) / totalDuration) * 100)
            );

            return (
              <li
                key={i}
                className={`relative rounded-lg border p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${i === 0 ? "border-emerald-400 border-2" : "border-slate-200"}`}
              >
                {/* ─ Info principal ─ */}
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                    {a.title}
                    {i === 0 && (
                      <Badge className="bg-emerald-500 text-white">Próxima</Badge>
                    )}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {new Date(a.schedule_day_date).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    - {a.schedule_start_time} hs
                  </p>
                </div>

                {/* ─ Progreso ─ */}
                <div className="w-full sm:w-48 flex flex-col gap-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 text-right">
                    {progress}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default AllPendingOrders
