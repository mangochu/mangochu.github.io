<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { experiences } from '@/data/profile'
import { localize } from '@/i18n'
import SectionHeading from './SectionHeading.vue'

const track = useTemplateRef<HTMLElement>('track')
const nodes = useTemplateRef<HTMLElement[]>('nodes')

const LINE_RATIO = 0.2

const fillStart = ref(0)
const passedCount = ref(0)

const passed = new Set<number>()

function updateFill() {
  const el = track.value
  if (!el || !el.offsetHeight) return

  const centers = (nodes.value ?? [])
    .map((node) => node.offsetTop + node.offsetHeight / 2)
    .sort((a, b) => a - b)

  const count = passed.size
  const start = count === 0 ? 0 : (centers[count] ?? el.offsetHeight)
  fillStart.value = start / el.offsetHeight
}

let intersectionObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = Number((entry.target as HTMLElement).dataset.index)
        const r = entry.boundingClientRect
        const line = entry.rootBounds?.bottom ?? window.innerHeight * LINE_RATIO

        if (r.top + r.height / 2 <= line) passed.add(index)
        else passed.delete(index)
      }
      passedCount.value = passed.size
      updateFill()
    },
    {
      rootMargin: `100000px 0px -${(1 - LINE_RATIO) * 100}% 0px`,
      threshold: 0.5,
    },
  )
  nodes.value?.forEach((node) => intersectionObserver?.observe(node))

  resizeObserver = new ResizeObserver(updateFill)
  if (track.value) resizeObserver.observe(track.value)
})

onUnmounted(() => {
  intersectionObserver?.disconnect()
  resizeObserver?.disconnect()
})
</script>

<template>
  <section id="experience" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        v-reveal
        section-id="experience"
        eyebrow="Experience"
        :title="$t('experience.title')"
        :description="$t('experience.description')"
      />

      <div ref="track" class="relative">
        <div
          class="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-white/10 md:left-1/2"
          aria-hidden="true"
        >
          <div
            class="timeline-fill absolute inset-x-0 bottom-0 transition-[height] duration-500 ease-out"
            :style="{ height: `${(1 - fillStart) * 100}%` }"
          />
        </div>

        <ol class="space-y-10 md:space-y-16">
          <li
            v-for="(exp, i) in experiences"
            :key="exp.period"
            class="grid grid-cols-[2.5rem_1fr] gap-x-5 md:grid-cols-[1fr_3rem_1fr] md:gap-x-10"
          >
            <div
              ref="nodes"
              :data-index="i"
              class="timeline-node col-start-1 row-start-1 mt-6 md:col-start-2"
              :class="{ 'is-active': i >= passedCount }"
            >
              <span />
            </div>

            <div
              v-reveal
              class="glass glass-hover col-start-2 row-start-1 p-6 sm:p-7"
              :class="i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'"
            >
              <div class="mb-2 font-mono text-xs tracking-wider text-primary md:hidden">
                {{ exp.period }}
              </div>
              <h3 class="font-display text-xl font-medium">{{ localize(exp.role) }}</h3>
              <div class="mb-4 text-sm text-white/50">{{ localize(exp.company) }}</div>
              <p class="leading-relaxed text-white/70">{{ localize(exp.description) }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span v-for="tag in localize(exp.tags)" :key="tag" class="tag-chip">{{ tag }}</span>
              </div>
            </div>
            <div
              class="row-start-1 mt-7 hidden md:block"
              :class="i % 2 === 0 ? 'md:col-start-3' : 'md:col-start-1 md:text-right'"
            >
              <span
                class="font-display text-2xl font-medium transition-colors duration-500"
                :class="i >= passedCount ? 'text-primary' : 'text-white/30'"
              >
                {{ exp.period }}
              </span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
