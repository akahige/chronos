import { expect } from "vitest";

import Chronos from "../chronos";
import add from "../add";

describe("add method", () => {
  test("It should correctly add 5 years", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 5, "years");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2027-02-01 13:15");
  });

  test("It should correctly add 2 months", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 2, "months");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-04-01 13:15");
  });

  test("It should correctly add 10 days", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 10, "days");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-11 13:15");
  });

  test("It should correctly add 6 hours", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 6, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 19:15");
  });

  test("It should correctly add 45 minutes", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 45, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 14:00");
  });

  test("It should correctly add 30 seconds", () => {
    let dateInstance = new Chronos(
      "2022-02-01 13:15:30",
      "YYYY-MM-DD HH:mm:ss"
    );
    add(dateInstance, 30, "seconds");
    expect(dateInstance.format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2022-02-01 13:16:00"
    );
  });

  test("It should correctly add 60 minutes affecting hours", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 60, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 14:15");
  });

  test("It should correctly add 24 hours affecting days", () => {
    let dateInstance = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 24, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-02 13:15");
  });

  test("It should correctly add 1 month affecting years", () => {
    let dateInstance = new Chronos("2022-12-01 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 1, "months");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2023-01-01 13:15");
  });

  test("It should correctly add 1 day to end of month affecting months", () => {
    let dateInstance = new Chronos("2022-02-28 13:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 1, "days");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-03-01 13:15");
  });

  test("It should correctly add 1 hour to end of day affecting days", () => {
    let dateInstance = new Chronos("2022-02-01 23:15", "YYYY-MM-DD HH:mm");
    add(dateInstance, 1, "hours");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-02 00:15");
  });

  test("It should correctly add 1 minute to end of hour affecting hours", () => {
    let dateInstance = new Chronos("2022-02-01 13:59", "YYYY-MM-DD HH:mm");
    add(dateInstance, 1, "minutes");
    expect(dateInstance.format("YYYY-MM-DD HH:mm")).toBe("2022-02-01 14:00");
  });

  test("It should correctly add 1 second to end of minute affecting minutes", () => {
    Chronos.formatMap["ss"] = { second: "2-digit" };
    let dateInstance = new Chronos(
      "2022-02-01 13:15:59",
      "YYYY-MM-DD HH:mm:ss"
    );
    add(dateInstance, 1, "seconds");
    expect(dateInstance.format("YYYY-MM-DD HH:mm:ss")).toBe(
      "2022-02-01 13:16:00"
    );
  });
});
