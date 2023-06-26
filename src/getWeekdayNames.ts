const getWeekdayNames: IgetWeekdayNames = (
  startDay = 0,
  format = "long",
  locale = "en-US"
) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date("1970-01-04"); // This was a Sunday
    date.setDate(date.getDate() + i + startDay);
    const weekdayName = date.toLocaleString(locale, { weekday: format });
    days.push(weekdayName);
  }
  return days;
};

export default getWeekdayNames;
