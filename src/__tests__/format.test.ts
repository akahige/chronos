import { beforeEach, expect } from "vitest";
import Chronos from "../chronos";

describe("Chronos class format method", () => {
  let dateInstance: Chronos;
  beforeEach(() => {
    dateInstance = new Chronos("2022-02-01 13:15:30", "YYYY-MM-DD HH:mm:ss");
  });

  const testCases = [
    { format: "YYYY-MM-DD", expected: "2022-02-01" },
    { format: "YY/MM/DD", expected: "22/02/01" },
    { format: "DD-MMM-YYYY", expected: "01-Feb-2022" },
    { format: "DD-MMMM-YYYY", expected: "01-February-2022" },
    { format: "DD-MMM-YY hh:mm", expected: "01-Feb-22 01:15" },
    { format: "DD-MMM-YY HH:mm", expected: "01-Feb-22 13:15" },
    { format: "hh:mm DD-MMM-YY", expected: "01:15 01-Feb-22" },
    { format: "HH:mm DD-MMM-YY", expected: "13:15 01-Feb-22" },
    { format: "DD/MM/YY", expected: "01/02/22" },
    { format: "MMM-DD-YY", expected: "Feb-01-22" },
    { format: "MMM DD, YY", expected: "Feb 01, 22" },
    { format: "MMM DD", expected: "Feb 01" },
    { format: "dddd, MMM DD, YY", expected: "Tuesday, Feb 01, 22" },
    { format: "ddd, MMM DD, YY", expected: "Tue, Feb 01, 22" },
    { format: "dd, MMM DD, YY", expected: "T, Feb 01, 22" },
    { format: "MMMM dd, YY", expected: "February T, 22" },
    { format: "YY-MMM-dddd", expected: "22-Feb-Tuesday" },
    { format: "YYYY", expected: "2022" },
    { format: "MMM", expected: "Feb" },
    { format: "DD", expected: "01" },
    { format: "HH", expected: "13" },
    { format: "hh", expected: "01" },
    { format: "mm", expected: "15" },
    { format: "ss", expected: "30" },
    { format: "A", expected: "PM" },
    { format: "YYYY-MM-DD hh:mm", expected: "2022-02-01 01:15" },
    { format: "YYYY-MM-DD HH:mm", expected: "2022-02-01 13:15" },
  ];

  testCases.forEach(({ format, expected }) => {
    test(`It should correctly format the date with '${format}'`, () => {
      expect(dateInstance.format(format)).toBe(expected);
    });
  });
});

describe("Chronos class format method", () => {
  const dateInstance = new Chronos("2023-08", "YYYY-MM");

  const format = "MMM, DD";

  test(`It should correctly format the date with '${format}'`, () => {
    expect(dateInstance.format(format)).toBe("Aug, 01");
  });
});

describe("Formatting dates", () => {
  const format = "MM/DD/YYYY HH:mm";

  it("should correctly format early morning dates", () => {
    const chronos = new Chronos("07/28/2023 01:00", format);
    expect(chronos.format("MM/DD/YYYY hh:mm A")).toBe("07/28/2023 01:00 AM");
  });

  it("should correctly format afternoon dates", () => {
    const chronos = new Chronos("07/28/2023 13:00", format);
    expect(chronos.format("MM/DD/YYYY hh:mm A")).toBe("07/28/2023 01:00 PM");
  });

  it("should correctly handle dates near midnight", () => {
    const chronos = new Chronos("07/28/2023 00:00", format);
    expect(chronos.format("MM/DD/YYYY hh:mm A")).toBe("07/28/2023 12:00 AM");
  });

  it("should correctly handle dates near noon", () => {
    const chronos = new Chronos("07/28/2023 12:00", format);
    expect(chronos.format("MM/DD/YYYY hh:mm A")).toBe("07/28/2023 12:00 PM");
  });
});
