export function formatDate(dateTimeString: string) {
  // Verificamos si dateTimeString está definido y es una cadena
  if (!dateTimeString || typeof dateTimeString !== "string") {
    return "Fecha no disponible"; // Retorna un mensaje por defecto si el valor no es válido
  }

  // Dividimos la cadena de fecha en dos partes usando "T" como delimitador
  const parts = dateTimeString.split("T");

  // La primera parte (parts[0]) contiene la fecha sin la hora
  return parts[0];
}



