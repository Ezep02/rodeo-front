export function generateUniqueId(): number {
    const timestamp = Date.now(); // Marca de tiempo en milisegundos
    const random = Math.floor(Math.random() * 1000000); // Número aleatorio
    return parseInt(`${timestamp}${random}`, 10); // Combina ambos para mayor unicidad
}

