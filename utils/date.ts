export function formatDate(isoDateString: string | undefined): string {
  if (!isoDateString) return "--";
  const originalDate = new Date(isoDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}
