import { expect } from "vitest";
import Chronos from "../chronos";
describe("Chronos manipulation methods", () => {
  //   Testing the `subtract` method
  test("It should correctly subtract 5 years", () => {
    let dateInstance = new Chronos("2027-02-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(5, "years");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 2 months", () => {
    let dateInstance = new Chronos("2022-04-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(2, "months");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 12:15");
  });

  test("It should correctly subtract 10 days", () => {
    let dateInstance = new Chronos("2022-02-11 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(10, "days");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 6 hours", () => {
    let dateInstance = new Chronos("2022-02-01 19:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(6, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 45 minutes", () => {
    let dateInstance = new Chronos("2022-02-01 14:00", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(45, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 30 seconds", () => {
    let dateInstance = new Chronos(
      "2022-02-01 13:15:30",
      "YYYY-MM-DD HH:mm:ss"
    );
    dateInstance.subtract(30, "seconds");
    expect(dateInstance.format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2022-02-01 13:15:00"
    );
  });

  test("It should correctly subtract 1 hour affecting minutes", () => {
    let dateInstance = new Chronos("2022-02-01 01:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 00:15");
  });

  test("It should correctly subtract 1 day affecting hours", () => {
    let dateInstance = new Chronos("2022-02-02 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "days");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 1 month affecting days", () => {
    let dateInstance = new Chronos("2022-03-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "months");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 1 year affecting months", () => {
    let dateInstance = new Chronos("2023-02-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "years");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 60 minutes affecting hours", () => {
    let dateInstance = new Chronos("2022-02-01 14:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(60, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });

  test("It should correctly subtract 24 hours affecting days", () => {
    let dateInstance = new Chronos("2022-02-02 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(24, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 13:15");
  });
});

describe("Chronos subtraction boundary tests", () => {
  test("It should correctly subtract 1 day affecting months", () => {
    let dateInstance = new Chronos("2022-03-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "days");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-28 13:15");
  });

  test("It should correctly subtract 1 hour affecting days", () => {
    let dateInstance = new Chronos("2022-03-01 00:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-28 23:15");
  });

  test("It should correctly subtract 1 minute affecting hours", () => {
    let dateInstance = new Chronos("2022-03-01 01:00", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-03-01 00:59");
  });

  test("It should correctly subtract 1 second affecting minutes", () => {
    Chronos.formatMap["ss"] = { second: "2-digit" };
    let dateInstance = new Chronos(
      "2022-03-01 01:01:00",
      "YYYY-MM-DD HH:mm:ss"
    );
    dateInstance.subtract(1, "seconds");
    expect(dateInstance.format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2022-03-01 01:00:59"
    );
  });

  test("It should correctly subtract 1 month affecting years", () => {
    let dateInstance = new Chronos("2022-01-01 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "months");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2021-12-01 13:15");
  });

  test("It should correctly subtract 1 year from a leap year affecting days", () => {
    let dateInstance = new Chronos("2022-02-28 13:15", "YYYY-MM-DD HH:mm");
    dateInstance.subtract(1, "years");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2021-02-28 13:15");
  });
});
