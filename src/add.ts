const add: Iadd = (date, value, unit) => {
  switch (unit) {
    case "years":
      date.getDate().setFullYear(date.getDate().getFullYear() + value);
      break;
    case "months":
      date.getDate().setMonth(date.getDate().getMonth() + value);
      break;
    case "days":
      date.getDate().setDate(date.getDate().getDate() + value);
      break;
    case "hours":
      date.getDate().setHours(date.getDate().getHours() + value);
      break;
    case "minutes":
      date.getDate().setMinutes(date.getDate().getMinutes() + value);
      break;
    case "seconds":
      date.getDate().setSeconds(date.getDate().getSeconds() + value);
      break;
  }

  return date;
};

export default add;
