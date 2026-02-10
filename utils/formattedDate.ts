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
  "Novermber",
  "December",
];

export const formattedDate = (date: Date) => {
  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  };
};
