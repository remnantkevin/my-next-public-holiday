<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  aspect-ratio: 0.6;
  background: var(--surface-2);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-2);
  inline-size: var(--size-14);
  padding: var(--size-4);
}

@media (min-width: 768px) {
  .card {
    aspect-ratio: var(--ratio-widescreen);
    block-size: var(--size-14);
    inline-size: unset;
  }
}
</style>
