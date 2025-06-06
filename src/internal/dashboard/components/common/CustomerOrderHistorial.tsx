import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import React from 'react'
import { CustomerPreviousOrder } from '../../models/OrderModels'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AddReviewDialog from './AddReviewDialog'

type CustomerOrderHistorialProps = {
  PreviusOrders: CustomerPreviousOrder[] | []
}

const CustomerOrderHistorial: React.FC<CustomerOrderHistorialProps> = ({ PreviusOrders }) => {

  return (
    <>
      {/* Reviews List */}
      <div className="divide-y divide-slate-200">
        {PreviusOrders.map((review, index) => (
          <div key={index} className="p-6">
            <div className="flex gap-4">
              {/* Avatar */}
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarFallback className="bg-slate-100 text-slate-600 font-semibold uppercase">
                  {review.payer_name[0]}{review.payer_surname[0]}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {review.payer_name}{" "}{review.payer_surname}{" - "}
                      <span className="text-sm text-slate-500">{new Date(review.schedule_day_date).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric"
                      })}</span>
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Service Info */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                        {review.title}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {
                  review.comment ? (
                    <p className="text-slate-700 mb-4 leading-relaxed">{review.comment}</p>
                  ) : (
                    <>
                      <p className='mb-4 text-sm text-slate-700'>
                        ¿Que te parecio el servicio{" "}<span className='text-rose-500'>{review.title}</span> ?
                      </p>
                      {/* abre el dialogo para agregar una reseña */}

                      <AddReviewDialog
                        previousOrder={review}
                      />
                    </>
                  )
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {/* <div className="p-6 text-center border-t border-slate-200">
        <Button variant="outline" className="gap-2">
          Ver más servicios anteriores
        </Button>
      </div> */}
    </>
  )
}

export default CustomerOrderHistorial

