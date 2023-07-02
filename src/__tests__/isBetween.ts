import { expect } from "vitest";
import isBetween from "../isBetween";
import Chronos from "../chronos";

describe("Chronos", () => {
  it("should correctly check if date is between two other dates (same day)", () => {
    const date = new Chronos("2023-06-15", "YYYY-MM-DD");
    const start = new Chronos("2023-06-10", "YYYY-MM-DD");
    const end = new Chronos("2023-06-20", "YYYY-MM-DD");

    expect(isBetween(date, start, end, "days")).toBe(true);
  });

  it("should correctly check if date is not between two other dates (same day)", () => {
    const date = new Chronos("2023-06-25", "YYYY-MM-DD");
    const start = new Chronos("2023-06-10", "YYYY-MM-DD");
    const end = new Chronos("2023-06-20", "YYYY-MM-DD");

    expect(isBetween(date, start, end, "days")).toBe(false);
  });

  it("should handle inclusive bounds correctly", () => {
    const date = new Chronos("2023-06-10", "YYYY-MM-DD");
    const start = new Chronos("2023-06-10", "YYYY-MM-DD");
    const end = new Chronos("2023-06-20", "YYYY-MM-DD");

    expect(isBetween(date, start, end, "days", true)).toBe(true);
  });

  it("should handle exclusive bounds correctly", () => {
    const date = new Chronos("2023-06-10", "YYYY-MM-DD");
    const start = new Chronos("2023-06-10", "YYYY-MM-DD");
    const end = new Chronos("2023-06-20", "YYYY-MM-DD");

    expect(isBetween(date, start, end, "days", false)).toBe(false);
  });
});
