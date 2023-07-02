declare class Chronos {
  constructor(date?: string | Date | Chronos, format?: string);
  static defaultLocale: string;
  static formatMap: IformatMap;
  static formatTokens: string[];
  static getWeekdayNames: IgetWeekdayNames;
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
  diff: Idiff;
  isBetween: IisBetween;
  getWeeksInMonth: IgetWeeksInMonth;
}

export default Chronos;
