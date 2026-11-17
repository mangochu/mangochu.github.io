<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import LogoAdobeIllustrator from '~icons/logos/adobe-illustrator'
import LogoAdobePhotoshop from '~icons/logos/adobe-photoshop'
import LogoCSharp from '~icons/logos/c-sharp'
import LogoCodePush from '~icons/logos/codepush'
import LogoDocker from '~icons/logos/docker-icon'
import LogoElement from '~icons/logos/element'
import LogoFastify from '~icons/logos/fastify-icon'
import LogoMobx from '~icons/logos/mobx'
import LogoMysql from '~icons/logos/mysql-icon'
import LogoNodejs from '~icons/logos/nodejs-icon'
import LogoPinia from '~icons/logos/pinia'
import LogoPostgresql from '~icons/logos/postgresql'
import LogoPrisma from '~icons/logos/prisma'
import LogoPython from '~icons/logos/python'
import LogoReact from '~icons/logos/react'
import LogoTailwindcss from '~icons/logos/tailwindcss-icon'
import LogoTypescript from '~icons/logos/typescript-icon'
import LogoUnity from '~icons/logos/unity'
import LogoVue from '~icons/logos/vue'
import type { TechCategory, TechItem } from '@/data/profile'

const props = withDefaults(
  defineProps<{
    items: readonly TechItem[]
    categories: readonly { id: TechCategory; label: string }[]
    maxVisible?: number
  }>(),
  { maxVisible: 8 },
)

const logos: Record<string, Component> = {
  vue: LogoVue,
  react: LogoReact,
  typescript: LogoTypescript,
  pinia: LogoPinia,
  mobx: LogoMobx,
  element: LogoElement,
  photoshop: LogoAdobePhotoshop,
  illustrator: LogoAdobeIllustrator,
  nodejs: LogoNodejs,
  fastify: LogoFastify,
  prisma: LogoPrisma,
  postgresql: LogoPostgresql,
  mysql: LogoMysql,
  'react-native': LogoReact,
  codepush: LogoCodePush,
  docker: LogoDocker,
  unity: LogoUnity,
  csharp: LogoCSharp,
  python: LogoPython,
  tailwindcss: LogoTailwindcss,
}

const monoLogos = new Set(['fastify', 'prisma', 'mysql', 'unity'])

function monogram(name: string) {
  const words = name.split(' ')
  return words.length > 1 ? words.map((w) => w[0]).join('') : name.slice(0, 2)
}

const active = ref<TechCategory | 'all'>('all')

const filters = computed(() => [
  { id: 'all' as const, label: '全部', count: props.items.length },
  ...props.categories.map((c) => ({
    ...c,
    count: props.items.filter((t) => t.category === c.id).length,
  })),
])

const categoryLabels = computed(
  () => new Map(props.categories.map((c) => [c.id, c.label] as const)),
)

// 「全部」照 items 原本的順序（自訂喜好排序）；個別分類才依熟練度排序
const matchedTech = computed(() => {
  if (active.value === 'all') return props.items
  return props.items
    .filter((t) => t.category === active.value)
    .sort((a, b) => (b.level ?? -1) - (a.level ?? -1))
})
const visibleTech = computed(() => matchedTech.value.slice(0, props.maxVisible))
</script>

<template>
  <div>
    <div class="mb-6 flex flex-wrap gap-2" role="group" aria-label="依分類篩選">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        :aria-pressed="active === f.id"
        class="glass px-4 py-1.5 text-sm transition-colors"
        :class="
          active === f.id
            ? 'border-primary bg-primary text-background'
            : 'border-white/10 bg-white/5 text-white/65 hover:border-white/30 hover:text-white'
        "
        @click="active = f.id"
      >
        {{ f.label }}
        <span class="ml-1 font-mono text-xs opacity-60">{{ f.count }}</span>
      </button>
    </div>

    <Transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <ul :key="active" class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li
          v-for="tech in visibleTech"
          :key="tech.name"
          class="glass group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors hover:bg-white/5"
        >
          <span
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-white/70 transition-colors group-hover:text-primary"
            aria-hidden="true"
          >
            <component
              :is="logos[tech.logo]"
              v-if="tech.logo && logos[tech.logo]"
              class="size-5"
              :class="{ 'brightness-0 invert': monoLogos.has(tech.logo) }"
            />
            <span v-else class="font-mono text-xs font-semibold">{{ monogram(tech.name) }}</span>
          </span>
          <span class="min-w-0 flex-1">
            <span class="flex items-baseline justify-between gap-2">
              <span class="truncate text-sm text-white/85">{{ tech.name }}</span>
              <span v-if="tech.level !== null" class="font-mono text-xs text-primary"
                >{{ tech.level }}%</span
              >
            </span>
            <span
              v-if="tech.level !== null"
              class="mt-2 block h-1 overflow-hidden rounded-full bg-white/10"
              role="meter"
              :aria-label="`${tech.name} 熟練度`"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="tech.level"
            >
              <span
                class="block h-full rounded-full bg-primary"
                :style="{ width: `${tech.level}%` }"
              />
            </span>
            <span
              class="block truncate text-xs text-white/55"
              :class="tech.level !== null ? 'mt-1.5' : 'mt-0.5'"
              >{{ categoryLabels.get(tech.category) }}</span
            >
          </span>
        </li>
      </ul>
    </Transition>

    <p class="mt-4 text-sm text-white/55">
      顯示 {{ visibleTech.length }} / {{ matchedTech.length }} 項<template
        v-if="matchedTech.length > visibleTech.length"
        >，選擇分類查看全部</template
      >
    </p>
  </div>
</template>
