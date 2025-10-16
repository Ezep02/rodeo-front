export const parseDate = (dateStr?: string): Date | undefined => {
    if (!dateStr) return undefined;
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
};

export const formatDateToISO = (dateStr?: string): string | undefined => {
  if (!dateStr) return undefined;
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString(); // 2025-10-04T00:00:00.000Z
};


export const formatDateForInput = (isoDate?: string): string => {
  if (!isoDate) return "";

  const d = new Date(isoDate);

  // obtener componentes en zona local
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
