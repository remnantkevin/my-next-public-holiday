<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  aspect-ratio: var(--ratio-widescreen);
  background: var(--surface-2);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-2);
  block-size: var(--size-14);
}
</style>
