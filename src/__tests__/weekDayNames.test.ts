import { expect } from "vitest";
import getWeekdayNames from "../getWeekdayNames";

describe("getWeekdayNames method", () => {
  test("It should return weekday names starting from Sunday in long format", () => {
    const result = getWeekdayNames(0, "long");
    expect(result).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]);
  });

  test("It should return weekday names starting from Monday in short format", () => {
    const result = getWeekdayNames(1, "short");
    expect(result).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  });

  test("It should return weekday names starting from Saturday in narrow format", () => {
    const result = getWeekdayNames(6, "narrow");
    expect(result).toEqual(["S", "S", "M", "T", "W", "T", "F"]);
  });

  test("It should return weekday names in different locale (French)", () => {
    const result = getWeekdayNames(1, "long", "fr-FR");
    expect(result).toEqual([
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
      "dimanche",
    ]);
  });

  test("It should return weekday names in Spanish locale (long format, start from Monday)", () => {
    const result = getWeekdayNames(1, "long", "es-ES");
    expect(result).toEqual([
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
      "domingo",
    ]);
  });

  test("It should return weekday names in German locale (short format, start from Monday)", () => {
    const result = getWeekdayNames(1, "short", "de-DE");
    expect(result).toEqual(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
  });

  test("It should return weekday names in Spanish locale (narrow format, start from Sunday)", () => {
    const result = getWeekdayNames(0, "narrow", "es-ES");
    expect(result).toEqual(["D", "L", "M", "X", "J", "V", "S"]);
  });

  test("It should return weekday names in German locale (narrow format, start from Sunday)", () => {
    const result = getWeekdayNames(0, "narrow", "de-DE");
    expect(result).toEqual(["S", "M", "D", "M", "D", "F", "S"]);
  });
});
