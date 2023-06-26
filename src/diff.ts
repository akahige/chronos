const diff: Idiff = (date1, date2, unit = "milliseconds") => {
  const diffInMs = date1.getDate().getTime() - date2.getDate().getTime();
  let result: number;

  switch (unit) {
    case "years":
      result = diffInMs / (1000 * 60 * 60 * 24 * 365.25); // approximate
      break;
    case "months":
      result = diffInMs / (1000 * 60 * 60 * 24 * 30.4375); // approximate
      break;
    case "days":
      result = diffInMs / (1000 * 60 * 60 * 24);
      break;
    case "hours":
      result = diffInMs / (1000 * 60 * 60);
      break;
    case "minutes":
      result = diffInMs / (1000 * 60);
      break;
    case "seconds":
      result = diffInMs / 1000;
      break;
    case "milliseconds":
    default:
      result = diffInMs;
  }

  if (Math.round(result) != result) {
    result = Math.round((result + Number.EPSILON) * 100) / 100;
  }

  return result;
};

export default diff;
