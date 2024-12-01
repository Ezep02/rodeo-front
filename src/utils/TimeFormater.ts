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

export function tiempoTranscurrido(fechaPublicacion: string) {
  const ahora = new Date();
  const publicacion = new Date(fechaPublicacion); // Convertir a un objeto Date
  const diferenciaMs = ahora - publicacion;

  const segundos = Math.floor(diferenciaMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (segundos < 60) {
    return `hace ${segundos} segundos`;
  } else if (minutos < 60) {
    return `hace ${minutos} minutos`;
  } else if (horas < 24) {
    return `hace ${horas} horas`;
  } else {
    return `hace ${dias} días`;
  }
}


