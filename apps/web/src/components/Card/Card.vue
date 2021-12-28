<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  aspect-ratio: var(--ratio-landscape);
  background: var(--surface-2);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-2);
  inline-size: var(--size-15);
}
</style>
