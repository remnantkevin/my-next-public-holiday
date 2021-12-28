import { au, Holiday, za } from "@my-next-public-holiday/public-holidays";
import { DaysOfTheWeek } from "./constants";
import { getIpInfo } from "./ipInfo";
import { format, getDay, getYear, sortBy } from "./utils";

interface GetHolidaysOptions {
  countryCode: string;
  regionName?: string;
  currentDate: Date;
}

export async function getNextHoliday(): Promise<{
  nextHoliday: { name: string; dayOfWeekName: string; formattedDate: string };
  allFutureHolidays: Holiday[];
}> {
  const ipInfo = await getIpInfo();

  const holidays = getHolidaysOnOrAfter({
    countryCode: ipInfo.country,
    regionName: ipInfo.region,
    currentDate: new Date(),
  });

  const nextHoliday = {
    name: holidays[0].name,
    dayOfWeekName: DaysOfTheWeek[getDay(getDateFromHoliday(holidays[0]))],
    formattedDate: getFormattedDate(getDateFromHoliday(holidays[0])),
  };

  return {
    nextHoliday,
    allFutureHolidays: holidays,
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
  const holidays = getHolidays(options);
  const sortedByDate = sortBy(holidays, (x) => x.dateNum);

  return sortedByDate;
}

function getHolidays(options: GetHolidaysOptions): Holiday[] {
  const { countryCode, regionName, currentDate } = options;
  const currentYear = getYear(currentDate);

  if (countryCode.trim().toUpperCase() === "AU") {
    return au.filter(
      (x) => x.year >= currentYear && x.regionName === regionName
    );
  } else if (countryCode.trim().toUpperCase() === "ZA") {
    return za.filter((x) => x.year >= currentYear);
  } else {
    return [];
  }
}

function getDateFromHoliday(holiday: Holiday): Date {
  return new Date(holiday.year, holiday.month - 1, holiday.day);
}

function getFormattedDate(date: Date): string {
  // return format(date, "EEEE, d MMMM yyyy");
  return format(date, "d MMMM yyyy");
}
