# Chronos

Chronos is your new favorite date and time management library for JavaScript and TypeScript. Compact yet powerful, it is specifically crafted to offer the essential date and time operations you need. Its size? Less than 2kB when gzipped!

Despite its small footprint, it doesn't compromise on functionalities, providing an easy and intuitive way to parse, format, and manipulate dates. So, why not give Chronos a try on your next project?

## Installation

You can install Chronos via npm:

```
    npm install chronos
```

Or, if you prefer yarn:

```
yarn add chronos
```

Make sure you have Node.js (>= 10.x.x) installed.

## Usage

Using Chronos is straightforward. Here's how you can format a date:

```javascript
import Chronos from "chronos";

let date = new Chronos("2023-08-22", "YYYY-MM-DD");
console.log(date.format("dddd, MMMM DD, YYYY")); // Output: "Tuesday, August 22, 2023"
```

And here's how you can add time:

```javascript
import Chronos from "chronos";

let date = new Chronos("2023-08-22", "YYYY-MM-DD");
date.add(3, "days");
console.log(date.format("YYYY-MM-DD")); // Output: "2023-08-25"
```

## API Documentation

The Chronos library exposes a single class `Chronos` with several methods:

### `constructor(date: string, format: string)`

The constructor takes a string date and a format string to parse the date. The date should be in the format that the format string describes. The format string supports the following tokens:

- YYYY: 4-digit year
- YY: 2-digit year
- MMMM: full month name
- MMM: short month name
- MM: 2-digit month
- DD: 2-digit day
- hh: 2-digit hour (12-hour format)
- HH: 2-digit hour (24-hour format)
- mm: 2-digit minute
- ss: 2-digit second
- A: AM/PM indicator

Example:

```javascript
let date = new Chronos("2023-08-22", "YYYY-MM-DD");
```

### `format(formatString: string, locale?: string): string`

This method returns a string formatted according to the provided format string. The format string supports the same tokens as the constructor.

Example:

```javascript
let date = new Chronos("2023-08-22", "YYYY-MM-DD");
console.log(date.format("dddd, MMMM DD, YYYY")); // Output: "Tuesday, August 22, 2023"
```

### `add(value: number, unit: TimeUnit): this`

Adds the specified amount of time to the current instance. unit can be 'years', 'months', 'days', 'hours', 'minutes', or 'seconds'. Returns the Chronos instance for chaining.

Example:

```javascript
let date = new Chronos("2023-08-22", "YYYY-MM-DD");
date.add(3, "days");
console.log(date.format("YYYY-MM-DD")); // Output: "2023-08-25"
```

### `subtract(value: number, unit: TimeUnit): this`

Subtracts the specified amount of time from the current instance. unit can be 'years', 'months', 'days', 'hours', 'minutes', or 'seconds'. Returns the Chronos instance for chaining.

Example:

```javascript
let date = new Chronos("2023-08-22", "YYYY-MM-DD");
date.subtract(3, "days");
console.log(date.format("YYYY-MM-DD")); // Output: "2023-08-19"
```

### `diff(other: Chronos, unit: TimeUnit = "milliseconds"): number`

Computes the difference between the current instance and another date. The unit parameter is optional and defaults to 'milliseconds'. unit can be 'years', 'months', 'days', 'hours', 'minutes', 'seconds', or 'milliseconds'.

Example:

```javascript
let date1 = new Chronos("2023-08-22", "YYYY-MM-DD");
let date2 = new Chronos("2023-08-25", "YYYY-MM-DD");
console.log(date1.diff(date2, "days")); // Output: -3
```

### `getWeeksInMonth(startDay?: number, dayFormat?: string): string[][]`

Returns a 2D array representing weeks and days in the current month. Each inner array represents a week and contains formatted date strings. You can customize the start day of the week and the format of the date string.

Example:

```javascript
let date = new Chronos("2023-08-22", "YYYY-MM-DD");
console.log(date.getWeeksInMonth(0, "DD"));
// Output:
// [
//   ['30', '31', '01', '02', '03', '04', '05'],
//   ['06', '07', '08', '09', '10', '11', '12'],
//   ['13', '14', '15', '16', '17', '18', '19'],
//   ['20', '21', '22', '23', '24', '25', '26'],
//   ['27', '28', '29', '30', '31', '01', '02'],
// ]
```

### `static getWeekdayNames(startDay?: number, format?: string, locale?: string): string[]`

This is a static method that returns an array containing the names of the days of the week. The order of the days starts from the startDay parameter (0 for Sunday, 1 for Monday, etc.), which is optional and defaults to 0.

The format parameter is also optional and determines the format of the returned day names. It can be 'long', 'short', or 'narrow', and defaults to 'long'.

The locale parameter is optional as well and defaults to the default locale of the Chronos class. It determines the language in which the day names are returned.

```javascript
console.log(Chronos.getWeekdayNames(1, "long", "en-US"));
// Output: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
```
