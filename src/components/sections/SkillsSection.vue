<script setup lang="ts">
import { Code, Palette, Rocket, Server } from '@lucide/vue'
import { skills, type SkillIcon } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'

const icons: Record<SkillIcon, typeof Code> = {
  code: Code,
  palette: Palette,
  server: Server,
  rocket: Rocket,
}
</script>

<template>
  <section id="skills" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="專業技能"
        description="我用來把想法變成產品的工具與能力。"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(skill, i) in skills"
          :key="skill.title"
          v-reveal="i * 100"
          class="glass skill-card flex gap-5 p-7"
        >
          <span class="absolute top-6 right-7 font-mono text-xs text-white/25" aria-hidden="true">{{
            String(i + 1).padStart(2, '0')
          }}</span>
          <div class="icon-tile">
            <component :is="icons[skill.icon]" :size="22" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-medium">{{ skill.title }}</h3>
            <p class="mb-5 text-sm leading-relaxed text-white/55">{{ skill.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in skill.tags" :key="tag" class="tag-chip">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
