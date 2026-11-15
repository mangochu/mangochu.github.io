<script setup lang="ts">
import { IconMapPin } from '@tabler/icons-vue'
import { about, profile, stats } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="about" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <SectionHeading v-reveal section-id="about" eyebrow="About" title="關於我" />

      <div class="grid gap-6 lg:grid-cols-[minmax(0,21rem)_1fr]">
        <aside v-reveal class="glass flex flex-col items-center p-8 text-center sm:p-10">
          <div class="avatar-ring mb-6 size-28 overflow-hidden">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              :alt="profile.name"
              class="size-full object-cover"
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
            />
            <span v-else>
              <span class="text-primary text-4xl font-semibold">{{ profile.name.charAt(0) }}</span>
            </span>
          </div>
          <div class="text-2xl font-medium">{{ profile.name }}</div>
          <div class="mt-1 text-white/60">{{ profile.title }}</div>
          <div class="mt-2 mb-8 flex items-center gap-1.5 text-sm text-white/45">
            <IconMapPin :size="14" />
            {{ profile.location }}
          </div>

          <div
            class="mt-auto grid w-full divide-x divide-white/10 border-t border-white/10 pt-6"
            :style="{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }"
          >
            <div v-for="stat in stats" :key="stat.label">
              <div class="text-primary text-2xl font-semibold">{{ stat.value }}</div>
              <div class="mt-1 text-xs text-white/50">{{ stat.label }}</div>
            </div>
          </div>
        </aside>

        <div v-reveal="120" class="glass p-8 sm:p-10">
          <p
            v-for="p in about.paragraphs"
            :key="p"
            class="mb-5 text-lg leading-relaxed text-white/75 last:mb-0"
          >
            {{ p }}
          </p>

          <div class="my-8 h-px bg-white/10" />

          <h3 class="mb-5 text-xs tracking-[0.25em] text-white/45 uppercase">我在乎的事</h3>
          <ul class="space-y-4">
            <li
              v-for="item in about.highlights"
              :key="item"
              class="flex items-start gap-3 text-white/70"
            >
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
