import { computed, ref } from "vue";
import { getHolidays, HolidayWithDate } from "../holidays";

export default function useHolidays() {
  const nextHoliday = ref<HolidayWithDate>();
  const otherHolidays = ref<HolidayWithDate[]>();
  const allHolidays = ref<HolidayWithDate[]>();

  const nextHolidayFound = computed(() => Boolean(nextHoliday.value?.name));

  getHolidays().then((x) => {
    nextHoliday.value = x.nextHoliday;
    otherHolidays.value = x.otherHolidays;
    allHolidays.value = x.allHolidays;
  });

  return { nextHoliday, nextHolidayFound, otherHolidays, allHolidays };
}
