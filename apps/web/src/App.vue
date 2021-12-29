<script lang="ts">
import { defineComponent } from "vue";
import NextPublicHoliday from "./components/NextPublicHoliday.vue";

export default defineComponent({
  components: { NextPublicHoliday },
});
</script>

<template>
  <NextPublicHoliday />
</template>

<style>
@import "./assets/styles/openPropsOverrides.css";

body,
html {
  height: 100%;
}

#app {
  font-family: var(--sans);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-6);
  max-inline-size: var(--size-header-2);
}

h2 {
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-4);
  max-inline-size: var(--size-header-2);
}

h3 {
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-3);
  max-inline-size: var(--size-header-2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
