<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import { navItems } from './data/profile.ts'

const blobs = ['bg-amber-500', 'bg-sky-500', 'bg-fuchsia-500', 'bg-emerald-500', 'bg-rose-500']
</script>

<template>
  <div class="min-h-screen text-white">
    <NavBar />
    <HeroSection />
    <section
      v-for="(item, index) in navItems"
      :id="item.id"
      :key="item.id"
      class="relative h-screen scroll-mt-24 overflow-hidden border-b border-white/5 px-6 pt-28"
    >
      <!-- 光斑：用來測試毛玻璃效果 -->
      <div
        class="absolute top-10 size-72 rounded-full opacity-40 blur-3xl"
        :class="[blobs[index % blobs.length], index % 2 ? 'right-10' : 'left-10']"
      />
      <div class="relative mx-auto max-w-4xl">
        <h2 class="text-3xl font-bold">{{ item.label }}</h2>
        <p v-for="n in 6" :key="n" class="mt-4 text-foreground-soft">
          這是測試用的段落文字，捲動時可以觀察 NavBar 背後的文字是否有被模糊。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
