/**
 * A public holiday. This is the structure of the holiday data that is exported by this package.
 *
 * @example
 * {
 *    countryCode: "AU",
 *    countryName: "Australia",
 *    dateNum: 20210101,
 *    dateStr: "20210101",
 *    day: 1,
 *    description: "New Year's Day is the first day of the calendar year and is celebrated each January 1st",
 *    name: "New Year's Day",
 *    month: 1,
 *    moreInfoUrl: "https://www.cmtedd.act.gov.au/communication/holidays",
 *    regionCode: "nsw",
 *    regionName: "New South Wales",
 *    year: 2021
 * }
 */
export interface Holiday {
  /** ISO-2 country code. */
  countryCode: string;
  /** English name of country. */
  countryName: string;
  /** Date in YYYYMMDD format. */
  dateNum: number;
  /** Date in "YYYYMMDD" format. */
  dateStr: string;
  /** Day of the month, starting at 1. */
  day: number;
  /** Full description of holiday. */
  description?: string;
  name: string;
  /** Month of the year, starting at 1. */
  month: number;
  moreInfoUrl: string;
  /** Short code for region (state/province). */
  regionCode?: string;
  /** Full English name for region (state/province). */
  regionName?: string;
  year: number;
}

// /**
//  * Represents a public holiday.
//  *
//  * @example
//  * {
//  *    dateIso: 20210101,
//  *    day: 1,
//  *    description: "New Year's Day is the first day of the calendar year and is celebrated each January 1st",
//  *    name: "New Year's Day",
//  *    month: 1,
//  *    moreInfoUrl: "https://www.cmtedd.act.gov.au/communication/holidays",
//  *    year: 2021
//  * }
//  *
//  * @property {string} countryCode
//  * @property {string} countryName
//  * @property {number} dateNum - Date in YYYYMMDD format.
//  * @property {string} dateStr - Date in "YYYYMMDD" format.
//  * @property {number} day - Day of the month, starting at 1.
//  * @property {string} [description] - Full description of holiday.
//  * @property {string} name
//  * @property {number} month - Month of the year, starting at 1.
//  * @property {string} moreInfoUrl
//  * @property {string} [regionCode]
//  * @property {string} [regionName]
//  * @property {number} year
//  */
// export type Holiday = z.infer<typeof HolidaySchema>;
