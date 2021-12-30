import { z } from "zod";
import { Holiday } from "../types/holiday";

export const HolidaySchema: z.ZodSchema<Holiday> = z.object({
  countryCode: z.string(),
  countryName: z.string(),
  dateNum: z.number(),
  dateStr: z.string(),
  day: z.number().int().min(1).max(31),
  description: z.string().optional(),
  name: z.string(),
  month: z.number().int().min(1).max(12),
  moreInfoUrl: z.string().url(),
  regionCode: z.string().optional(),
  regionName: z.string().optional(),
  year: z.number().int().min(2021),
});
