<script setup lang="ts">
defineProps<{
  index: string
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div v-reveal class="mb-14 max-w-2xl">
    <div
      class="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-white/50 uppercase"
    >
      <span class="text-primary font-semibold">{{ index }}</span>
      <span class="h-px w-10 bg-white/20" />
      {{ eyebrow }}
    </div>
    <h2 class="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">{{ title }}</h2>
    <p v-if="description" class="text-lg text-white/55">{{ description }}</p>
  </div>
</template>
