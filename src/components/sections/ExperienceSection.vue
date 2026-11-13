<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { experiences } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'

const track = useTemplateRef<HTMLElement>('track')
const nodes = useTemplateRef<HTMLElement[]>('nodes')

const progress = ref(0)
const passedCount = ref(0)

function update() {
  const el = track.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const filled = Math.min(Math.max(window.innerHeight * 0.6 - rect.top, 0), rect.height)
  progress.value = rect.height ? filled / rect.height : 0
  passedCount.value = (nodes.value ?? []).filter((node) => {
    const r = node.getBoundingClientRect()
    return r.top + r.height / 2 - rect.top <= filled
  }).length
}

let frame = 0
function onScroll() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section id="experience" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="工作經歷"
        description="由近到遠，一路走來的軌跡。"
      />

      <div ref="track" class="relative">
        <div
          class="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-white/10 md:left-1/2"
          aria-hidden="true"
        >
          <div
            class="timeline-fill absolute inset-x-0 bottom-0"
            :style="{ height: `${(1 - progress) * 100}%` }"
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
              <h3 class="font-display text-xl font-medium">{{ exp.role }}</h3>
              <div class="mb-4 text-sm text-white/50">{{ exp.company }}</div>
              <p class="leading-relaxed text-white/70">{{ exp.description }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span v-for="tag in exp.tags" :key="tag" class="tag-chip">{{ tag }}</span>
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
