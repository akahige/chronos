import add from "./add";
import Chronos from "./chronos";
import subtract from "./subtract";

const getWeeksInMonth: IgetWeeksInMonth = (
  date,
  startDay = 0,
  dayFormat = "YYYY-MM-DD"
) => {
  let weeks: string[][] = [];
  let week: string[] = [];

  let firstDayOfMonth = new Chronos(date.format("YYYY-MM-01"), "YYYY-MM-DD");

  let currentDay = subtract(
    firstDayOfMonth,
    (firstDayOfMonth.getDate().getDay() + 7 - startDay) % 7,
    "days"
  );
  let month = date.format("MM");

  while (true) {
    while (week.length < 7) {
      week.push(currentDay.format(dayFormat));
      currentDay = add(currentDay, 1, "days");
    }
    weeks.push(week);
    week = [];

    if (currentDay.format("MM") !== month) break;
  }

  return weeks;
};

export default getWeeksInMonth;
