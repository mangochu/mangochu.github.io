<script setup lang="ts">
import { IconArrowNarrowUpDashed } from '@tabler/icons-vue'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-4 pb-10 sm:px-6 lg:px-8">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row"
    >
      <p class="text-sm text-white/40">© {{ year }} {{ profile.name }} · Crafted with Vue</p>
      <a
        href="#top"
        class="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
      >
        回到頂端
        <IconArrowNarrowUpDashed :size="16" />
      </a>
    </div>
  </footer>
</template>
