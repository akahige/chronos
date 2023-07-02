declare type Iformat = (formatString: string, locale?: string) => string;

declare type IconvertTo24HourFormat = (hh: string, ampm: string) => string;

declare type IconstructIsoDateString = (dateObj: {
  [key: string]: string;
}) => string;

declare type IparseDate = (dateString: string, formatString: string) => Date;

declare type IparseToObj = (
  dateString: string,
  formatString: string
) => {
  [key: string]: string;
};

declare type IcreateFormatOptions = (
  formatString: string
) => Intl.DateTimeFormatOptions;

declare type IformatMap = {
  [key: string]: Intl.DateTimeFormatOptions | undefined;
};

declare type IdateParts = {
  [key: string]: { index: number; length: number };
};

declare type IisBetween = (
  date1: Chronos,
  date2: Chronos,
  unit?: TimeUnit = "milliseconds",
  inclusive?: boolean = false
) => boolean;

declare type TimeUnit =
  | "years"
  | "months"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

declare type WeekdayFormat = "long" | "short" | "narrow" | undefined;
declare interface IgetWeekdayNames {
  (startDay: number, format: WeekdayFormat, locale?: string): string[];
}

declare type Week = string[];
declare type Month = Week[];

declare type IgetWeeksInMonth = (
  date: Chronos,
  startDay: number,
  dayFormat: string
) => Month;

declare type Idiff = (date1: Chronos, date2: Chronos, unit: TimeUnit) => number;
declare type IgetWeeksInMonth = (startDay: number, dayFormat: string) => Month;

declare type Iadd = (value: number, unit: TimeUnit) => this;

declare type Idiff = (other: Chronos, unit: TimeUnit) => number;
declare type Isubtract = (value: number, unit: TimeUnit) => this;

declare type IgetDate = () => Date;
