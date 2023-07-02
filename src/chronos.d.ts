declare class Chronos {
  constructor(date?: string | Date | Chronos, format?: string);
  static defaultLocale: string;
  static formatMap: IformatMap;
  static formatTokens: string[];
  date: Date;
  isValid: boolean;
  getDate: IgetDate;
  parseDate: IparseDate;
  parseToObj: IparseToObj;
  constructIsoDateString: IconstructIsoDateString;
  convertTo24HourFormat: IconvertTo24HourFormat;
  format: Iformat;
  createFormatOptions: IcreateFormatOptions;
  add: Iadd;
  subtract: Isubtract;
  isBetween: IisBetween;
  diff: Idiff;
  static getWeekdayNames: IgetWeekdayNames;
  getWeeksInMonth: IgetWeeksInMonth;
}

export default Chronos;
