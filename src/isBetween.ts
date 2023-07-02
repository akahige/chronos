import diff from "./diff";

const isBetween: IisBetween = (
  date,
  start,
  end,
  unit = "milliseconds",
  inclusive = false
) => {
  const diff1 = Math.floor(diff(date, start, unit));
  const diff2 = Math.floor(diff(date, end, unit));

  if (inclusive) {
    return diff1 >= 0 && diff2 <= 0;
  } else {
    return diff1 > 0 && diff2 < 0;
  }
};

export default isBetween;
