
// Extrae la tasa de ocupacion del mes
export type OcupationRate = {
    month: string
    ocuppancy_percentage: number
}

// Extraer Informacion sobre la barberia
export type Stats = {
    member: number
    promedy: number,
    total_appointment: number
}

// Extrae la tasa de usuarios registrados por mes
export type ClientRate = {
    month: string
    new_clients: number
}

// Extrae la cantidad de posts registrados en la plataforma
export type TotalPost = {
    total_post: number
}