

export const ValidateAppointmentTime = (date: Date | string, time: string): boolean => {
    const d = typeof date === 'string' ? new Date(date) : date
    const isoDate = d.toISOString().split('T')[0]

    const slotDateTimeString = `${isoDate}T${time}:00`
    const slotDateTime = new Date(slotDateTimeString)

    return slotDateTime >= new Date()
}




