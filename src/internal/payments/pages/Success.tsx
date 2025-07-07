import React, { startTransition, useActionState, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { GetOrderByToken, PaymentSlot } from '../services/paymentServices';
import { useParams } from 'react-router-dom';
import { GiBullHorns } from 'react-icons/gi';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Success: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [paymentData, setPaymentData] = useState<PaymentSlot | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isErr, recoveringOrderAction, isPending] = useActionState(
    async (_: string | null, token: string) => {
      try {
        const result = await GetOrderByToken(token.slice(6));
        setPaymentData(result);
        return null;
      } catch (error: any) {
        console.error(error);
        return error?.response?.data || 'Error de autenticación';
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

  useEffect(() => {
    if (!paymentData) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(paymentData.date);
      const [hours, minutes] = paymentData.time.split(':').map(Number);
      targetDate.setHours(hours, minutes, 0, 0);

      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [paymentData]);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2">
        <div className="loader mb-2" />
        <span className="text-sm text-muted-foreground">Recuperando datos...</span>
      </div>
    );
  }

  if (isErr || !paymentData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Sesión expirada o datos no disponibles</h2>
        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => (window.location.href = '/')}
        >
          Volver al inicio
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(paymentData.date).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <GiBullHorns size={30} className='text-rose-500'/>
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">¡Cita Confirmada!</CardTitle>
          <p className="text-gray-600 text-sm mt-2">Su cita ha sido reservada con éxito.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Tiempo restante</h3>
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <div className="grid grid-cols-4 gap-4 text-center">
                {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                  <div key={unit}>
                    <div className="text-2xl font-bold">{String(timeLeft[unit]).padStart(2, '0')}</div>
                    <div className="text-xs text-gray-300 capitalize">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fecha de cita</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hora</span>
              <span className="font-medium">{paymentData.time}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Descargar comprobante
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = '/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
