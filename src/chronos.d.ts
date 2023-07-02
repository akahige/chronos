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
}

export default Chronos;
