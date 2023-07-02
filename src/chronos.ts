/// <reference types="./chronos.d.ts" />

class Chronos {
  static defaultLocale: string = "en-US";

  static formatMap: IformatMap = {
    YYYY: { year: "numeric" },
    MM: { month: "2-digit" },
    DD: { day: "2-digit" },
    hh: { hour: "2-digit", hour12: true },
    HH: { hour: "2-digit", hour12: false },
    mm: { minute: "2-digit" },
    ss: { second: "2-digit" },
    YY: { year: "2-digit" },
    MMMM: { month: "long" },
    MMM: { month: "short" },
    dddd: { weekday: "long" },
    ddd: { weekday: "short" },
    dd: { weekday: "narrow" },
    A: { hour: "2-digit", hour12: true },
  };

  constructor(date?: string | Date | Chronos, format?: string) {
    if (!date) {
      this.date = new Date();
    } else if (typeof date === "string" && format) {
      this.date = this.parseDate(date, format);
    } else if (date instanceof Date) {
      this.date = new Date(date.getTime()); // create a new instance to avoid reference issues
    } else if (date instanceof Chronos) {
      this.date = new Date(date.date.getTime()); // create a new instance to avoid reference issues
    } else {
      throw new Error("Invalid arguments passed to Chronos constructor");
    }

    this.isValid = !isNaN(this.date.getTime());
  }

  date = new Date();
  isValid: boolean;

  getDate(): Date {
    return this.date;
  }

  parseDate: IparseDate = (dateString: string, formatString: string) => {
    let dateObj = this.parseToObj(dateString, formatString);
    let isoDateString = this.constructIsoDateString(dateObj);

    return new Date(isoDateString);
  };

  parseToObj: IparseToObj = (dateString, formatString) => {
    let formatRegex = /(YYYY|YY|MMMM|MMM|MM|DD|hh|HH|mm|ss|sss|a|A|Z)/g;
    let valueComponents = dateString.split(/\D+/);
    let formatComponents = formatString.match(formatRegex);

    let dateObject =
      formatComponents?.reduce(
        (acc: { [key: string]: string }, key: string, index: number) => {
          acc[key] = valueComponents ? valueComponents[index] : "";
          return acc;
        },
        {}
      ) || {};

    return dateObject;
  };

  constructIsoDateString: IconstructIsoDateString = (dateObj) => {
    const currentYear = this.date.getFullYear();

    const offsetMinutes = new Date().getTimezoneOffset();
    const sign = offsetMinutes > 0 ? "-" : "+";
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetRestMinutes = Math.abs(offsetMinutes % 60);
    const clientTimezoneStr = `${sign}${
      offsetHours < 10 ? "0" : ""
    }${offsetHours}${offsetRestMinutes < 10 ? "0" : ""}${offsetRestMinutes}`;

    const {
      YYYY = String(currentYear),
      YY,
      MM = "01",
      DD = "01",
      hh = "00",
      HH,
      mm = "00",
      ss = "00",
      sss = "000",
      zone = clientTimezoneStr,
      ampm,
    } = dateObj;

    let yearStr = YY ? "20" + YY : YYYY;
    let hourStr = HH || this.convertTo24HourFormat(hh, ampm);

    let isoDateString = `${yearStr}-${MM}-${DD}T${hourStr}:${mm}:${ss}.${sss}${zone}`;

    return isoDateString;
  };

  convertTo24HourFormat: IconvertTo24HourFormat = (hh, ampm) => {
    if (hh === undefined) return "00";

    const isPM = ampm === "PM";
    const hour12 = parseInt(hh, 10);
    let hour24;

    if (isPM) {
      hour24 = hour12 < 12 ? hour12 + 12 : hour12;
    } else {
      hour24 = hour12 === 12 ? 0 : hour12;
    }

    // Ensure the returned string is always 2 digits
    return hour24 < 10 ? `0${hour24}` : `${hour24}`;
  };

  static formatTokens = Object.keys(Chronos.formatMap).sort(
    (a, b) => b.length - a.length
  );

  format: Iformat = (formatString, locale = Chronos.defaultLocale) => {
    let formattedString = formatString;

    for (let formatToken of Chronos.formatTokens) {
      let includesFormatToken = formattedString.includes(formatToken);
      if (includesFormatToken) {
        let formatOptions = Chronos.formatMap[formatToken];

        let formatter = new Intl.DateTimeFormat(locale, formatOptions);
        let replacement = formatter.format(this.date);

        if (formatToken === "A") {
          replacement = replacement.replace(/\d{1,2}\s?/, ""); // Remove the hour part
        }

        // Strip out AM/PM if format string doesn't include 'a' or 'A'
        if (
          formatToken === "hh" &&
          !(formatString.includes("a") || formatString.includes("A"))
        ) {
          replacement = replacement.replace(/\s?(AM|PM)$/i, "");
        }

        // Strip out any non-numeric characters for these tokens
        if (["MM", "DD", "YY", "hh", "mm", "ss"].includes(formatToken)) {
          replacement = replacement.replace(/\D/g, "");
        }

        if (formatToken === "ss" && replacement.length < 2) {
          replacement = "0" + replacement;
        }

        if (formatToken === "HH" && replacement === "24") {
          replacement = "00";
        }

        if (formatToken === "mm" && replacement.length < 2) {
          replacement = "00";
        }

        let regex = new RegExp("\\b" + formatToken + "\\b", "g");
        formattedString = formattedString.replace(regex, replacement);
      }
    }

    return formattedString;
  };

  createFormatOptions: IcreateFormatOptions = (formatString) => {
    let options = {};
    let pieces = formatString.split(/\W+/);

    pieces.forEach((piece) => {
      for (let formatToken in Chronos.formatMap) {
        if (piece === formatToken) {
          Object.assign(options, Chronos.formatMap[formatToken]);
        }
      }
    });

    return options;
  };

  add: Iadd = (value, unit) => {
    switch (unit) {
      case "years":
        this.date.setFullYear(this.date.getFullYear() + value);
        break;
      case "months":
        this.date.setMonth(this.date.getMonth() + value);
        break;
      case "days":
        this.date.setDate(this.date.getDate() + value);
        break;
      case "hours":
        this.date.setHours(this.date.getHours() + value);
        break;
      case "minutes":
        this.date.setMinutes(this.date.getMinutes() + value);
        break;
      case "seconds":
        this.date.setSeconds(this.date.getSeconds() + value);
        break;
    }

    return this;
  };

  subtract: Isubtract = (value, unit) => {
    return this.add(-value, unit);
  };

  diff: Idiff = (other, unit = "milliseconds") => {
    const diffInMs = this.date.getTime() - other.date.getTime();
    let result: number;

    switch (unit) {
      case "years":
        result = diffInMs / (1000 * 60 * 60 * 24 * 365.25); // approximate
        break;
      case "months":
        result = diffInMs / (1000 * 60 * 60 * 24 * 30.4375); // approximate
        break;
      case "days":
        result = diffInMs / (1000 * 60 * 60 * 24);
        break;
      case "hours":
        result = diffInMs / (1000 * 60 * 60);
        break;
      case "minutes":
        result = diffInMs / (1000 * 60);
        break;
      case "seconds":
        result = diffInMs / 1000;
        break;
      case "milliseconds":
      default:
        result = diffInMs;
    }

    if (Math.round(result) != result) {
      result = Math.round((result + Number.EPSILON) * 100) / 100;
    }

    return result;
  };

  isBetween: IisBetween = (
    date1,
    date2,
    unit = "milliseconds",
    inclusive = false
  ) => {
    const diff1 = Math.floor(this.diff(date1, unit));
    const diff2 = Math.floor(this.diff(date2, unit));

    if (inclusive) {
      return diff1 >= 0 && diff2 <= 0;
    } else {
      return diff1 > 0 && diff2 < 0;
    }
  };

  static getWeekdayNames: IgetWeekdayNames = (
    startDay = 0,
    format = "long",
    locale = Chronos.defaultLocale
  ) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date("1970-01-04"); // This was a Sunday
      date.setDate(date.getDate() + i + startDay);
      const weekdayName = date.toLocaleString(locale, { weekday: format });
      days.push(weekdayName);
    }
    return days;
  };

  getWeeksInMonth: IgetWeeksInMonth = (
    startDay = 0,
    dayFormat = "YYYY-MM-DD"
  ) => {
    let weeks: string[][] = [];
    let week: string[] = [];

    let firstDayOfMonth = new Chronos(this.format("YYYY-MM-01"), "YYYY-MM-DD");
    firstDayOfMonth.subtract(
      (firstDayOfMonth.getDate().getDay() + 7 - startDay) % 7,
      "days"
    );

    let currentDay = firstDayOfMonth;
    let month = this.format("MM");

    while (true) {
      while (week.length < 7) {
        week.push(currentDay.format(dayFormat));
        currentDay.add(1, "days");
      }
      weeks.push(week);
      week = [];

      if (currentDay.format("MM") !== month) break;
    }

    return weeks;
  };
}

export default Chronos;
