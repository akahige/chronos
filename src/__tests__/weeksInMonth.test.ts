import { expect } from "vitest";
import Chronos from "../chronos";
import getWeeksInMonth from "../getWeeksInMonth";

describe("getWeeksInMonth", () => {
  it("should return weeks for January 2023 starting the week on Monday", () => {
    const dateInstance = new Chronos("2023-01", "YYYY-MM");
    const monthWeeks = getWeeksInMonth(dateInstance, 1, "DD");
    assert.deepEqual(monthWeeks, [
      ["26", "27", "28", "29", "30", "31", "01"],
      ["02", "03", "04", "05", "06", "07", "08"],
      ["09", "10", "11", "12", "13", "14", "15"],
      ["16", "17", "18", "19", "20", "21", "22"],
      ["23", "24", "25", "26", "27", "28", "29"],
      ["30", "31", "01", "02", "03", "04", "05"],
    ]);
  });

  it("should return weeks for February 2024 (leap year) starting the week on Sunday", () => {
    const dateInstance = new Chronos("2024-02", "YYYY-MM");

    const monthWeeks = getWeeksInMonth(dateInstance, 0, "DD");

    assert.deepEqual(monthWeeks, [
      ["28", "29", "30", "31", "01", "02", "03"],
      ["04", "05", "06", "07", "08", "09", "10"],
      ["11", "12", "13", "14", "15", "16", "17"],
      ["18", "19", "20", "21", "22", "23", "24"],
      ["25", "26", "27", "28", "29", "01", "02"],
    ]);
  });

  it("should generate correct number of weeks and days in each week", function () {
    const testCases = [
      {
        month: "2023-01",
        startDay: 0,
        format: "DD",
        weeks: 5,
        first: "01",
        last: "04",
      },
      {
        month: "2023-05",
        startDay: 3,
        format: "ddd",
        weeks: 6,
        first: "Wed",
        last: "Tue",
      },
      {
        month: "2023-08",
        startDay: 5,
        format: "MMM, DD",
        weeks: 5,
        first: "Jul, 28",
        last: "Aug, 31",
      },
      // Add more test cases as needed
    ];

    testCases.forEach(({ month, startDay, format, weeks, first, last }) => {
      const dateInstance = new Chronos(month, "YYYY-MM");
      const monthWeeks = getWeeksInMonth(dateInstance, startDay, format);

      // Check that each week has 7 days
      monthWeeks.forEach((week) => {
        expect(week.length).to.equal(7);
      });

      // For example, if you want to check that there are 5 weeks in a month
      expect(monthWeeks.length).to.equal(weeks);
      expect(monthWeeks[0][0]).to.equal(first);
      expect(monthWeeks[weeks - 1][6]).to.equal(last);
    });
  });

  // it("should handle months of different lengths", function () {
  //   const testCases = [
  //     { month: "2023-02", length: 28 }, // February 2023 has 28 days
  //     { month: "2024-02", length: 29 }, // February 2024 has 29 days (leap year)
  //     { month: "2023-04", length: 30 }, // April 2023 has 30 days
  //     { month: "2023-05", length: 31 }, // May 2023 has 31 days
  //   ];

  //   testCases.forEach(({ month, length }) => {
  //     const dateInstance = new Chronos(month, "YYYY-MM");
  //     const monthWeeks = dateInstance.getWeeksInMonth();
  //     expect(
  //       monthWeeks.flat().filter((date) => date.includes(month)).length
  //     ).to.equal(length);
  //   });
  // });

  // it("should handle different week starts", function () {
  //   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //   weekDays.forEach((day, index) => {
  //     const dateInstance = new Chronos("2023-01", "YYYY-MM"); // January 2023 starts on a Sunday
  //     const monthWeeks = dateInstance.getWeeksInMonth(index);
  //     expect(monthWeeks[0][0]).to.match(new RegExp(`^${day}`));
  //   });
  // });
});
