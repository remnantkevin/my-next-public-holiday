/**
 * Holiday object returned by Australian public holiday API.
 *
 * @example
 * {
 *    Date: "20210101",
 *    "Holiday Name": "New Year's Day",
 *    Information: "New Year's Day is the first day of the calendar year and is celebrated each January 1st",
 *    Jurisdiction: "act",
 *    "More Information": "https://www.cmtedd.act.gov.au/communication/holidays"
 * }
 */
export interface ExternalHoliday {
  /** Full date in "YYYYMMDD" format. */
  Date: string;
  "Holiday Name": string;
  /** Full description of holiday. */
  Information: string;
  /** State's short code. */
  Jurisdiction: StateCode;
  /** URL for more information. */
  "More Information": string;
}

export interface HolidayApiResponse {
  help: string;
  result: {
    records: ExternalHoliday[];
  };
}

export type StateCode =
  | "act"
  | "nsw"
  | "nt"
  | "qld"
  | "sa"
  | "tas"
  | "vic"
  | "wa";

export type StateName =
  | "Australian Capital Territory"
  | "New South Wales"
  | "Northern Territory"
  | "Queensland"
  | "South Australia"
  | "Tasmania"
  | "Victoria"
  | "Western Australia";
