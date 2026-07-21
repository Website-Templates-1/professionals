const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Formats a "YYYY-MM-DD" string as "Month D, YYYY". Parsed manually so the
// result is identical during SSG (Node) and client hydration, regardless of
// timezone. Returns "" for missing/invalid dates.
export const formatPostDate = (date) => {
  if (!date) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(date));
  if (!match) return String(date);
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return String(date);
  return `${monthName} ${Number(day)}, ${year}`;
};
