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

describe("parse AM/PM", () => {
  const format = "MM/DD/YYYY hh:mm A";

  it("should correctly parse AM dates", () => {
    const chronos = new Chronos("07/28/2023 01:00 AM", format);
    expect(chronos.format(format)).toBe("07/28/2023 01:00 AM");
  });

  it("should correctly parse PM dates", () => {
    const chronos = new Chronos("07/28/2023 01:00 PM", format);
    expect(chronos.format(format)).toBe("07/28/2023 01:00 PM");
  });

  it("should correctly handle dates near midnight", () => {
    const chronos = new Chronos("07/28/2023 12:00 AM", format);
    expect(chronos.format(format)).toBe("07/28/2023 12:00 AM");
  });

  it("should correctly handle dates near noon", () => {
    const chronos = new Chronos("07/28/2023 12:00 PM", format);
    expect(chronos.format(format)).toBe("07/28/2023 12:00 PM");
  });
});

describe("Parsing dates", () => {
  const format = "MM/DD/YYYY hh:mm A";

  it("should correctly parse AM dates", () => {
    const chronos = new Chronos("07/28/2023 01:00 AM", format);
    expect(chronos.format("MM/DD/YYYY HH:mm")).toBe("07/28/2023 01:00");
  });

  it("should correctly parse PM dates", () => {
    const chronos = new Chronos("07/28/2023 01:00 PM", format);
    expect(chronos.format("MM/DD/YYYY HH:mm")).toBe("07/28/2023 13:00");
  });

  it("should correctly handle dates near midnight", () => {
    const chronos = new Chronos("07/28/2023 12:00 AM", format);
    expect(chronos.format("MM/DD/YYYY HH:mm")).toBe("07/28/2023 00:00");
  });

  it("should correctly handle dates near noon", () => {
    const chronos = new Chronos("07/28/2023 12:00 PM", format);
    expect(chronos.format("MM/DD/YYYY HH:mm")).toBe("07/28/2023 12:00");
  });
});
