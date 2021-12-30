import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import { Holiday } from "../../../types/holiday.js";
import { holidayApiResourceIds, stateCodeToName } from "../lib.js";
import { HolidayApiResponseSchema } from "../schemas.js";
import { ExternalHoliday } from "../types.js";

const externalHolidayData = await Promise.all(
  Object.values(holidayApiResourceIds).map((x) => getHolidayDataFromApi(x))
);

const externalHolidays = externalHolidayData
  .flat()
  .filter((x): x is ExternalHoliday => x != null);

const holidays = parseExternalHolidays(externalHolidays);

await writeFile("./src/countries/au/data/au.json", JSON.stringify(holidays));

async function getHolidayDataFromApi(resourceId: string) {
  const externalHolidaysResponse = await fetch(
    `https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT * from "${resourceId}"`
  ).then((x) => x.json());

  const externalHolidaysData = HolidayApiResponseSchema.safeParse(
    externalHolidaysResponse
  );

  if (externalHolidaysData.success) {
    return externalHolidaysData.data.result.records;
  }
}

function parseExternalDate(
  externalDate: string
): [year: string, month: string, day: string] {
  const year = externalDate.substring(0, 4);
  const month = externalDate.substring(4, 6);
  const day = externalDate.substring(6, 8);

  return [year, month, day];
}

function parseExternalHolidays(externalHolidays: ExternalHoliday[]): Holiday[] {
  return externalHolidays.map((externalHoliday) => {
    const externalDateStr = externalHoliday.Date;
    const externalDateNum = Number.parseInt(externalDateStr);
    const yearMonthDay = parseExternalDate(externalDateStr);
    const [yearNum, monthNum, dayNum] = yearMonthDay.map((x) =>
      Number.parseInt(x)
    );

    return {
      countryCode: "AU",
      countryName: "Australia",
      description: externalHoliday.Information,
      moreInfoUrl: externalHoliday["More Information"],
      name: externalHoliday["Holiday Name"],
      day: dayNum,
      month: monthNum,
      year: yearNum,
      dateNum: externalDateNum,
      dateStr: externalDateStr,
      regionCode: externalHoliday.Jurisdiction,
      regionName: stateCodeToName.get(externalHoliday.Jurisdiction) ?? "",
    };
  });
}
