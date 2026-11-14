<script setup lang="ts">
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-vue'
import { projects } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="projects" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <SectionHeading
        v-reveal
        section-id="projects"
        eyebrow="Projects"
        title="精選作品"
        description="近期參與與獨立完成的代表性專案。"
      />

      <div class="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          v-reveal="i * 120"
          class="glass glass-hover group flex flex-col p-6"
          :class="{ 'lg:col-span-2 lg:row-span-2': project.featured }"
        >
          <div
            class="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-white/10"
            :class="{ 'lg:aspect-auto lg:min-h-72 lg:flex-1': project.featured }"
          >
            <div class="project-preview absolute inset-0" />
            <span
              class="font-display absolute inset-0 grid place-items-center text-2xl text-white/40"
            >
              {{ project.title }}
            </span>
          </div>

          <div class="mb-3 flex items-start justify-between gap-4">
            <div>
              <span
                v-if="project.featured"
                class="tag-chip mb-2 border-primary/40! text-primary!"
                aria-hidden="true"
                >精選專案</span
              >
              <h3 class="font-display text-xl font-medium sm:text-2xl">{{ project.title }}</h3>
            </div>
            <div class="flex shrink-0 gap-2">
              <a
                :href="project.repo"
                aria-label="原始碼"
                class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
              >
                <IconBrandGithub :size="18" />
              </a>
              <a
                :href="project.demo"
                aria-label="線上展示"
                class="grid h-10 w-10 place-items-center rounded-full bg-primary text-background transition group-hover:rotate-45 hover:bg-secondary"
              >
                <IconArrowUpRight :size="18" />
              </a>
            </div>
          </div>

          <p class="mb-5 leading-relaxed text-white/55">{{ project.description }}</p>
          <div class="mt-auto flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
