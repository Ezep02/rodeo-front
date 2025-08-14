
export const getCurrentStatus = (status: string) => {
    if (status === 'active') {
        return {
            label: 'Activo',
            className: 'bg-violet-200 text-violet-900',
        }
    }
    if (status === 'cancelled') {
        return {
            label: 'Cancelado',
            className: 'bg-rose-200 text-rose-800',
        }
    }
    if (status === 'updated') {
        return {
            label: 'Reprogramado',
            className: 'bg-yellow-100 text-yellow-800',
        }
    }
    return {
        label: 'Sin estado',
        className: 'bg-zinc-300 text-zinc-700',
    }
}


export const getPaymentStatus = (payment_percentage: number) => {
    if (payment_percentage === 100) {
        return {
            label: 'Pagado',
            className: 'bg-emerald-100 text-emerald-700',
        }
    }
    if (payment_percentage > 0) {
        return {
            label: 'Pago parcial',
            className: 'bg-yellow-100 text-yellow-800',
        }
    }
    return {
        label: 'No pagado',
        className: 'bg-rose-200 text-rose-800',
    }
}