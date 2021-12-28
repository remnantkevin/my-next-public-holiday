import { computed, ref } from "vue";
import { getNextHoliday } from "../holidays";

export default function useNextHoliday() {
  const nextHoliday = ref({ name: "", dayOfWeekName: "", formattedDate: "" });
  const nextHolidayFound = computed(() => Boolean(nextHoliday.value.name));

  getNextHoliday().then((x) => (nextHoliday.value = x.nextHoliday));

  return {
    nextHoliday,
    nextHolidayFound,
  };
}
