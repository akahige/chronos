import add from "./add";

const subtract: Isubtract = (date, value, unit) => {
  return add(date, -value, unit);
};

export default subtract;
