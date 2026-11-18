<script setup lang="ts">
import { navItems } from '@/data/profile'
import { computed } from 'vue'

const props = defineProps<{
  sectionId: string
  eyebrow: string
  title: string
  description?: string
}>()

const index = computed(() => {
  const i = navItems.findIndex((item) => item.id === props.sectionId)
  return i === -1 ? '' : String(i + 1).padStart(2, '0')
})
</script>

<template>
  <div class="mb-14 max-w-2xl">
    <div
      class="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-white/50 uppercase"
    >
      <span class="text-primary font-semibold">{{ index }}</span>
      <span class="h-px w-10 bg-white/20" />
      {{ eyebrow }}
    </div>
    <!--
      v-scramble 會直接改寫 textContent，Vue 之後就更新不到這段文字
      所以用 title 當 key：切換語言時整個 h2 重建，順便重播一次解碼效果
    -->
    <h2 :key="title" v-scramble class="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
      {{ title }}
    </h2>
    <p v-if="description" class="text-lg text-white/55">{{ description }}</p>
  </div>
</template>
