export type RelationshipDuration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
};

/**
 * Computes the elapsed relationship duration from startDate until now.
 * Years/months are calendar-based; days/hours/minutes are the running total
 * remainder (useful for a live counter).
 */
export function getRelationshipDuration(
  startDate: string,
  now: Date = new Date()
): RelationshipDuration {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, totalDays: 0 };
  }

  let diffMs = now.getTime() - start.getTime();
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;
  const days = totalDays % 30;

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  const startDay = start.getDate();

  if (months < 0 || (months === 0 && now.getDate() < startDay)) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, hours, minutes, totalDays };
}
