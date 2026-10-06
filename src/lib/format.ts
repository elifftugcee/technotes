const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-03-12" → "12 Mar 2024" (fixed locale + UTC so server and client always agree) */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} dk okuma`;
}
