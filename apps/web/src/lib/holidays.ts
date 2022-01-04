import {
  AU,
  GB,
  Holiday,
  IE,
  ZA,
} from "@my-next-public-holiday/public-holiday-data";
import { DaysOfTheWeek } from "./constants";
import { getIpInfo } from "./ipInfo";
import { format, getDay, getYear, sortBy } from "./utils";

interface GetHolidaysOptions {
  countryCode: string;
  regionName?: string;
  currentDate: Date;
}

export type HolidayWithDate = Holiday & { date: Date };

export async function getHolidays(): Promise<{
  nextHoliday: HolidayWithDate;
  otherHolidays: HolidayWithDate[];
  allHolidays: HolidayWithDate[];
}> {
  const ipInfo = await getIpInfo();

  const holidays: HolidayWithDate[] = getHolidaysOnOrAfter({
    countryCode: ipInfo.country,
    regionName: ipInfo.region,
    currentDate: new Date(),
  }).map((x) => ({ ...x, date: getDateFromHoliday(x) }));

  return {
    nextHoliday: holidays[0],
    otherHolidays: holidays.slice(1),
    allHolidays: holidays,
  };
}

function getHolidaysOnOrAfter(options: GetHolidaysOptions): Holiday[] {
  const currentDateStr = format(options.currentDate, "yyyyMMdd");
  const currentDateNum = Number.parseInt(currentDateStr);

  const holidays = getHolidaysSorted(options);
  const onOrAfter = holidays.filter((x) => x.dateNum >= currentDateNum);

  return onOrAfter;
}

function getHolidaysSorted(options: GetHolidaysOptions): Holiday[] {
  const holidays = getFutureHolidays(options);
  const sortedByDate = sortBy(holidays, (x) => x.dateNum);

  return sortedByDate;
}

function getFutureHolidays(options: GetHolidaysOptions): Holiday[] {
  const { countryCode, regionName, currentDate } = options;
  const currentYear = getYear(currentDate);

  if (countryCode.trim().toUpperCase() === "AU") {
    return AU.filter(
      (x) => x.year >= currentYear && x.regionName === regionName
    );
  } else if (countryCode.trim().toUpperCase() === "GB") {
    return GB.filter(
      (x) => x.year >= currentYear && x.regionName === regionName
    );
  } else if (countryCode.trim().toUpperCase() === "IE") {
    return IE.filter((x) => x.year >= currentYear);
  } else if (countryCode.trim().toUpperCase() === "ZA") {
    return ZA.filter((x) => x.year >= currentYear);
  } else {
    return [];
  }
}

function getDateFromHoliday(holiday: Holiday): Date {
  return new Date(holiday.year, holiday.month - 1, holiday.day);
}

export function getFormattedDate(date: Date | undefined): string {
  if (!date) return "";
  return format(date, "d MMMM yyyy");
}

export function getDayOfWeekName(date: Date | undefined): string {
  if (!date) return "";
  return DaysOfTheWeek[getDay(date)];
}
