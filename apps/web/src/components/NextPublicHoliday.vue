<script lang="ts">
import { Calendar } from "v-calendar";
import { computed, defineComponent, ref, watch } from "vue";
import useHolidays from "../lib/composables/useHolidays";
import {
  getDayOfWeekName,
  getFormattedDate,
  HolidayWithDate,
} from "../lib/holidays";
import Card from "./Card/Card.vue";
import Loader from "./Loader/Loader.vue";

export default defineComponent({
  components: { Card, Calendar, Loader },

  setup() {
    const calendar = ref();

    const { nextHoliday, nextHolidayFound, otherHolidays } = useHolidays();

    const nextHolidayFormatted = computed(() => ({
      ...nextHoliday.value,
      dayOfWeekName: getDayOfWeekName(nextHoliday.value?.date),
      formattedDate: getFormattedDate(nextHoliday.value?.date),
    }));

    function getCalendarDataForHoliday(holiday: HolidayWithDate | undefined) {
      if (!holiday) return;

      return {
        dates: holiday.date,
        dot: "blue",
        popover: {
          label: holiday.name,
        },
      };
    }

    function getCalendarDataForNextHoliday(
      holiday: HolidayWithDate | undefined
    ) {
      if (!holiday) return;

      return {
        ...getCalendarDataForHoliday(holiday),
        dot: "green",
      };
    }

    function getCalendarDataForToday() {
      return {
        dates: new Date(),
        highlight: {
          color: "blue",
          fillMode: "light",
        },
        popover: {
          label: "Today",
        },
      };
    }

    const holidayCalendarData = computed(() => {
      return [
        getCalendarDataForToday(),
        getCalendarDataForNextHoliday(nextHoliday.value),
        ...(otherHolidays.value?.map(getCalendarDataForHoliday) ?? []),
      ];
    });

    watch(
      calendar,
      async () => {
        await calendar.value.move(nextHoliday.value?.date);
        await calendar.value.focusDate(nextHoliday.value?.date);
      },
      {
        flush: "post",
      }
    );

    return {
      calendar,
      holidayCalendarData,
      nextHolidayFormatted,
      nextHolidayFound,
    };
  },
});
</script>

<template>
  <Card>
    <transition name="fade" mode="out-in">
      <div v-if="nextHolidayFound && nextHolidayFormatted" class="flexbox-grid">
        <div class="centered text-centered">
          <h1>{{ nextHolidayFormatted.formattedDate }}</h1>
          <h2>{{ nextHolidayFormatted.dayOfWeekName }}</h2>
          <h3>{{ nextHolidayFormatted.name }}</h3>
          <h3 v-if="nextHolidayFormatted.regionName">
            {{ nextHolidayFormatted.regionName }}
          </h3>
          <h3 v-if="nextHolidayFormatted.countryName">
            {{ nextHolidayFormatted.countryName }}
          </h3>
        </div>
        <div class="centered">
          <Calendar
            ref="calendar"
            is-dark
            nav-visibility="hidden"
            :attributes="holidayCalendarData"
          />
        </div>
      </div>
      <div v-else class="centered">
        <Loader />
      </div>
    </transition>
  </Card>
</template>

<style scoped>
/* Override V-Calendar's default dark styles. */
.vc-container.vc-is-dark {
  color: currentColor;
  background-color: var(--surface-2);
  border-color: var(--surface-2);
}
.vc-is-dark :deep(.vc-day-popover-container) {
  color: var(--text-1);
  background-color: var(--surface-3);
  border-color: var(--surface-3);
}
.vc-is-dark :deep(.vc-day-popover-header) {
  color: var(--text-1);
}

.text-centered {
  text-align: center;
}

.centered {
  block-size: 100%;
  display: grid;
  place-content: center;
}
.flexbox-grid {
  --min: 10ch;
  --gap: 1rem;

  block-size: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}

.flexbox-grid > * {
  flex: 1 1 var(--min);
}
</style>
