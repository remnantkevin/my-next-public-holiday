<script lang="ts">
import { defineComponent } from "vue";
import useNextHoliday from "../lib/composables/useNextHoliday";
import Card from "./Card/Card.vue";

export default defineComponent({
  components: { Card },

  setup() {
    const { nextHoliday, nextHolidayFound } = useNextHoliday();

    return {
      nextHoliday,
      nextHolidayFound,
    };
  },
});
</script>

<template>
  <Card class="centered">
    <transition name="fade" mode="out-in">
      <div v-if="nextHolidayFound">
        <h1>{{ nextHoliday.formattedDate }}</h1>
        <h1>{{ nextHoliday.dayOfWeekName }}</h1>
        <h2>{{ nextHoliday.name }}</h2>
      </div>
      <div v-else>
        <h1>Loading...</h1>
      </div>
    </transition>
  </Card>
</template>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered * {
  text-align: center;
}
</style>
