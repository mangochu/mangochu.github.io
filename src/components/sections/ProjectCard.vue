<script setup lang="ts">
import { computed } from 'vue'
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-vue'
import type { Project } from '@/data/profile'
import { localize } from '@/i18n'
import ProjectMedia from './ProjectMedia.vue'

const props = defineProps<{
  project: Project
  index: number
  /** 橫向捲軸用：視窗較矮時介紹只顯示 3 行，讓整張卡片放得進一個畫面 */
  compact?: boolean
}>()

const number = computed(() => String(props.index + 1).padStart(2, '0'))
const title = computed(() => localize(props.project.title))
</script>

<template>
  <article class="project-card glass glass-hover group flex h-full flex-col p-6">
    <div class="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-white/10">
      <ProjectMedia v-if="project.media" :media="project.media" :title="title" />
      <template v-else>
        <div class="project-preview absolute inset-0" />
        <span class="font-display absolute inset-0 grid place-items-center text-2xl text-white/40">
          {{ title }}
        </span>
      </template>
    </div>

    <div class="mb-3 flex items-start justify-between gap-4">
      <div>
        <div class="mb-2 flex items-center gap-3 font-mono text-xs tracking-[0.2em]">
          <span class="font-semibold text-primary">{{ number }}</span>
          <span v-if="project.featured" class="text-primary/80 uppercase">{{
            $t('projects.featured')
          }}</span>
        </div>
        <h3 class="font-display text-xl font-medium sm:text-2xl">{{ title }}</h3>
      </div>
      <div class="flex shrink-0 gap-2">
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('projects.source')"
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
        >
          <IconBrandGithub :size="18" />
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('projects.demo')"
          class="grid h-10 w-10 place-items-center rounded-full bg-primary text-background transition group-hover:rotate-45 hover:bg-secondary"
        >
          <IconArrowUpRight :size="18" />
        </a>
      </div>
    </div>

    <p
      class="mb-5 leading-relaxed text-white/55"
      :class="{ '[@media(max-height:860px)]:line-clamp-3': compact }"
    >
      {{ localize(project.description) }}
    </p>
    <div class="mt-auto flex flex-wrap gap-2">
      <span v-for="tag in project.tags" :key="tag" class="tag-chip">{{ tag }}</span>
    </div>
  </article>
</template>
