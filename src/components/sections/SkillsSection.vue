<script setup lang="ts">
import { computed, type Component } from 'vue'
import { IconCode, IconPalette, IconRocket, IconServer } from '@tabler/icons-vue'
import { skills, techCategories, techStack, type SkillIcon } from '@/data/profile'
import { localize } from '@/i18n'
import SectionHeading from './SectionHeading.vue'
import SkillWall from './SkillWall.vue'

const icons: Record<SkillIcon, Component> = {
  code: IconCode,
  palette: IconPalette,
  server: IconServer,
  rocket: IconRocket,
}

const categories = computed(() =>
  techCategories.map((c) => ({ id: c.id, label: localize(c.label) })),
)
</script>

<template>
  <section id="skills" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        v-reveal
        section-id="skills"
        eyebrow="Skills"
        :title="$t('skills.title')"
        :description="$t('skills.description')"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(skill, i) in skills"
          :key="skill.icon"
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
            <h3 class="mb-2 text-lg font-medium">{{ localize(skill.title) }}</h3>
            <p class="text-sm leading-relaxed text-white/55">{{ localize(skill.description) }}</p>
          </div>
        </div>
      </div>

      <div v-reveal class="mt-16">
        <h3 class="mb-5 text-xs tracking-[0.25em] text-white/55 uppercase">
          {{ $t('skills.tools') }}
        </h3>
        <SkillWall :items="techStack" :categories="categories" />
      </div>
    </div>
  </section>
</template>
