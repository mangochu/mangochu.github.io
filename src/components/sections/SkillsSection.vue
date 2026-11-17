<script setup lang="ts">
import type { Component } from 'vue'
import { IconCode, IconPalette, IconRocket, IconServer } from '@tabler/icons-vue'
import { skills, techCategories, techStack, type SkillIcon } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'
import SkillWall from './SkillWall.vue'

const icons: Record<SkillIcon, Component> = {
  code: IconCode,
  palette: IconPalette,
  server: IconServer,
  rocket: IconRocket,
}
</script>

<template>
  <section id="skills" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        v-reveal
        section-id="skills"
        eyebrow="Skills"
        title="專業技能"
        description="我用來把想法變成產品的工具與能力。"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(skill, i) in skills"
          :key="skill.title"
          v-reveal="i * 100"
          class="glass glass-hover group flex gap-5 p-7"
        >
          <span class="absolute top-6 right-7 font-mono text-xs text-white/25" aria-hidden="true">{{
            String(i + 1).padStart(2, '0')
          }}</span>
          <div
            class="icon-tile transition duration-400 group-hover:-rotate-6 group-hover:scale-106"
          >
            <component :is="icons[skill.icon]" :size="22" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-medium">{{ skill.title }}</h3>
            <p class="text-sm leading-relaxed text-white/55">{{ skill.description }}</p>
          </div>
        </div>
      </div>

      <div v-reveal class="mt-16">
        <h3 class="mb-5 text-xs tracking-[0.25em] text-white/55 uppercase">工具與套件</h3>
        <SkillWall :items="techStack" :categories="techCategories" />
      </div>
    </div>
  </section>
</template>
