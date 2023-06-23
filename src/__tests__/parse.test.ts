import { expect } from "vitest";
import Chronos from "../chronos";

describe("Parse date function", () => {
  const testCases = [
    {
      dateStr: "2022-09-21 08:05:30",
      formatStr: "YYYY-MM-DD hh:mm:ss",
      expected: "2022-09-21T08:05:30.000+0100",
    },
    {
      dateStr: "21-09-2022 08:05",
      formatStr: "DD-MM-YYYY hh:mm",
      expected: "2022-09-21T08:05:00.000+0100",
    },
    {
      dateStr: "21-09-22 08:05",
      formatStr: "DD-MM-YY hh:mm",
      expected: "2022-09-21T08:05:00.000+0100",
    },
    {
      dateStr: "21-09-2022",
      formatStr: "DD-MM-YYYY",
      expected: "2022-09-21T00:00:00.000+0100",
    },
    {
      dateStr: "21-09-22",
      formatStr: "DD-MM-YY",
      expected: "2022-09-21T00:00:00.000+0100",
    },
  ];

  testCases.forEach(({ dateStr, formatStr, expected }) => {
    test(`It should correctly parse '${dateStr}' with format '${formatStr}'`, () => {
      const instance = new Chronos(dateStr, formatStr);
      let dateObj = instance.parseToObj(dateStr, formatStr);
      let isoDateString = instance.constructIsoDateString(dateObj);
      expect(isoDateString).toBe(expected);
    });
  });
});
