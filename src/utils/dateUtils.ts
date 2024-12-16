// dateUtils.ts

// Format a date as DD-MM-YYYY
export const formatFullDate = (year: number, month: number, day: number): string => {
  return `${String(day).padStart(2, "0")}-${String(month + 1).padStart(2, "0")}-${year}`;
};

// Generate the days for a given month in a calendar format
export const generateCalendarDays = (
  year: number,
  month: number
): (number | null)[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday

  const days: (number | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) days.push(null); // Empty slots
  for (let day = 1; day <= daysInMonth; day++) days.push(day);
  return days;
};

// Filter events for a specific month and year
export const getEventsForMonth = (
  events: { date: string }[],
  year: number,
  month: number
) => {
  return events.filter((event) => {
    const [day, eventMonth, eventYear] = event.date.split("-").map(Number);
    return eventMonth - 1 === month && eventYear === year;
  });
};
