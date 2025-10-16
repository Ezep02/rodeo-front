
type CancellationPolicy = {
    couponPercentage: number;
    message: string;
};

export function getCancellationPolicy(paymentPercentage: number, isWithin24Hours: boolean): CancellationPolicy {
 
    if (isWithin24Hours) {
        if (paymentPercentage < 100) {
            return {
                couponPercentage: 0,
                message: 'Estás cancelando dentro de las 24 horas y perderás la reserva abonada.',
            };
        } else {
            return {
                couponPercentage: 50,
                message: 'Estás cancelando dentro de las 24 horas. Recibirás un cupón del 50% del total abonado.',
            };
        }
    } else {
        if (paymentPercentage < 100) {
            return {
                couponPercentage: 25,
                message: 'Al cancelar con anticipación, recibirás un cupón del 25% del valor de tu reserva.',
            };
        } else {
            return {
                couponPercentage: 75,
                message: 'Recibirás un cupón del 75% del total abonado para tu próxima visita.',
            };
        }
    }
}
