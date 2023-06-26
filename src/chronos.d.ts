declare class ChronosConstructor {
  constructor(date?: string, format?: string);
  static defaultLocale: string;
  static formatMap: IformatMap;
  static formatTokens: string[];
  static getWeekdayNames: IgetWeekdayNames;
}

declare class Chronos extends ChronosConstructor {
  date: Date;
  isValid: boolean;
  getDate(): Date;
  parseDate: IparseDate;
  parseToObj: IparseToObj;
  constructIsoDateString: IconstructIsoDateString;
  convertTo24HourFormat: IconvertTo24HourFormat;
  format: Iformat;
  createFormatOptions: IcreateFormatOptions;
  add(value: number, unit: TimeUnit): this;
  subtract(value: number, unit: TimeUnit): this;
  diff(other: Chronos, unit: TimeUnit): number;
  getWeeksInMonth(startDay: number, dayFormat: string): string[][];
}

export default Chronos;
