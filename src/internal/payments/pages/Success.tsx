
import React, { startTransition, useActionState, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { GetOrderByToken } from '../services/paymentServices';
import { useParams } from 'react-router-dom';
import { PaymentResponse } from '../models/paymentModels';


const Success: React.FC = () => {

  const [successfullOrder, setSuccessfullOrder] = useState<PaymentResponse | undefined>();

  const { token } = useParams<{ token: string }>();

  const [recoveringOrderErr, recoveringOrderAction, isRecoveringOrderPending] = useActionState(
    async (_: string | null, token: string) => {
      try {

        const result: PaymentResponse = await GetOrderByToken(token.slice(6));
        setSuccessfullOrder(result);

        return null;
      } catch (error: any) {
        return error?.response?.data || "Error de autenticación";
      }
    },
    null
  );

  useEffect(() => {
    if (token) {
      startTransition(() => {
        recoveringOrderAction(token);
      });
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {
        isRecoveringOrderPending ? (
          <div className="h-screen w-full flex justify-center items-center flex-col gap-1">
            <p className="loader"></p>
            <span>Recuperando datos</span>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {
              recoveringOrderErr ? (
                <div className='text-center flex flex-col gap-4'>
                  <h3>Sesion exipirada</h3>
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    onClick={() => window.window.location.href = '/'}
                  >
                    Voler al inicio
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Cita Confirmada!</h1>
                    <p className="text-gray-600 mt-2">
                      Su cita ha sido reservada con éxito.
                    </p>
                  </div>
                  <Card className="mb-6">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h2>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="font-medium">{successfullOrder?.ID}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Fecha de Aprobacion</span>
                          <span className="font-medium">
                            {new Date(successfullOrder?.Created_at ? successfullOrder?.Created_at : "").toLocaleDateString("es-AR", {
                              day: "2-digit", month: "long", year: "numeric"
                            })}
                          </span>
                        </div>
                        {/* new Date(successfullOrder?.schedule_day_date).toLocaleDateString() */}
                        <Separator className="my-2" />

                        <div className="flex justify-between">
                          <span className="text-gray-600">Servicio</span>
                          <span className="font-medium">{successfullOrder?.title}</span>
                        </div>



                        <Separator className="my-2" />

                        <div className="flex justify-between">
                          <span className="text-gray-600">Cita</span>
                          <span className="font-medium"> {new Date(successfullOrder?.schedule_day_date ? successfullOrder?.schedule_day_date : "").toLocaleDateString("es-AR", {
                            day: "2-digit", month: "long", year: "numeric"
                          })}, {successfullOrder?.schedule_start_time}</span>
                        </div>

                        <Separator className="my-2 border-b" />

                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span className='text-green-400'>${successfullOrder?.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-amber-800 mb-2">Importante</h3>
                    <p className="text-amber-700 text-sm">
                      Si necesita reprogramar el horario, hágalo con al menos 24 horas de anticipación.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => window.print()}
                    >
                      Descargar comprobante
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.window.location.href = '/'}
                    >
                      Voler al inicio
                    </Button>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                      Gracias por elegir nuestra barberia!
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Tenes una consulta? Comunicate con nostros en <span className="font-medium">support@classiccuts.com</span>
                    </p>
                  </div>
                </>
              )
            }
          </div>
        )
      }
    </div>

  )
};

export default Success;
