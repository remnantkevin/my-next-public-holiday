import { z } from "zod";
import { ExternalHoliday, HolidayApiResponse } from "./types.js";

export const StateCodeSchema = z.enum([
  "act",
  "nsw",
  "nt",
  "qld",
  "sa",
  "tas",
  "vic",
  "wa",
]);

export const StateNameSchema = z.enum([
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
]);

export const ExternalHolidaySchema: z.ZodSchema<ExternalHoliday> = z.object({
  Date: z.string(),
  "Holiday Name": z.string(),
  Information: z.string(),
  Jurisdiction: StateCodeSchema,
  "More Information": z.string().url(),
});

export const HolidayApiResponseSchema: z.ZodSchema<HolidayApiResponse> =
  z.object({
    help: z.string(),
    result: z.object({
      records: z.array(ExternalHolidaySchema),
    }),
  });
