import { expect } from "vitest";
import Chronos from "../chronos";

describe("diff date method", () => {
  test("It should correctly calculate difference in years", () => {
    let dateInstance1 = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    let dateInstance2 = new Chronos("2020-02-01 13:15", "YYYY-MM-DD HH:mm");
    expect(dateInstance1.diff(dateInstance2, "years")).toBe(2);
  });

  test("It should correctly calculate difference in months", () => {
    let dateInstance1 = new Chronos("2022-04-01 13:15", "YYYY-MM-DD HH:mm");
    let dateInstance2 = new Chronos("2022-01-14 13:15", "YYYY-MM-DD HH:mm");
    expect(dateInstance1.diff(dateInstance2, "months")).toBe(2.53);
  });

  test("It should correctly calculate difference in days", () => {
    let dateInstance1 = new Chronos("2022-02-10 13:15", "YYYY-MM-DD HH:mm");
    let dateInstance2 = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    expect(dateInstance1.diff(dateInstance2, "days")).toBe(9);
  });

  test("It should correctly calculate difference in hours", () => {
    let dateInstance1 = new Chronos("2022-02-01 20:15", "YYYY-MM-DD HH:mm");
    let dateInstance2 = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    expect(dateInstance1.diff(dateInstance2, "hours")).toBe(7);
  });

  test("It should correctly calculate difference in minutes", () => {
    let dateInstance1 = new Chronos("2022-02-01 13:45", "YYYY-MM-DD HH:mm");
    let dateInstance2 = new Chronos("2022-02-01 13:15", "YYYY-MM-DD HH:mm");
    expect(dateInstance1.diff(dateInstance2, "minutes")).toBe(30);
  });

  test("It should correctly calculate difference in seconds", () => {
    let dateInstance1 = new Chronos(
      "2022-02-01 13:15:45",
      "YYYY-MM-DD HH:mm:ss"
    );
    let dateInstance2 = new Chronos(
      "2022-02-01 13:15:15",
      "YYYY-MM-DD HH:mm:ss"
    );
    expect(dateInstance1.diff(dateInstance2, "seconds")).toBe(30);
  });
});
