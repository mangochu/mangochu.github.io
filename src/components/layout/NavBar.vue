<script setup lang="ts">
import { navItems, profile } from '@/data/profile'
import { IconMenu2, IconX } from '@tabler/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'

const profileName = profile.name.split(' ')[0]
const isMenuOpen = ref(false)
const activeId = ref('')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  const visible = new Set<string>()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      })
      const current = navItems.find((item) => visible.has(item.id))
      activeId.value = current?.id ?? ''
    },
    { rootMargin: '-40% 0px -50% 0px' },
  )

  navItems.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer?.observe(section)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <header class="fixed inset-x-0 top-4 z-50 px-4">
    <nav
      class="glass mx-auto relative flex h-14 max-w-4xl items-center justify-end md:justify-between pr-2 pl-6"
    >
      <a href="#top" class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        ><span class="text-2xl">{{ profileName }}<span class="text-primary">.</span></span>
      </a>
      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="rounded-full px-4 py-2 text-sm transition-colors"
            :class="activeId === item.id ? 'bg-white/10' : 'text-white/60 hover:text-white'"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
      <a
        :href="profile.resumeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary hidden px-5! py-2! text-sm md:inline-flex"
      >
        履歷
      </a>
      <button
        class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
        :aria-label="isMenuOpen ? '關閉選單' : '開啟選單'"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <IconX v-if="isMenuOpen" :size="20" />
        <IconMenu2 v-else :size="20" />
      </button>
    </nav>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="glass mx-auto mt-2 max-w-4xl p-3 md:hidden">
        <a
          v-for="item in navItems"
          :href="`#${item.id}`"
          :key="item.id"
          class="block w-full rounded-2xl px-4 py-3 text-left transition-colors hover:bg-white/5"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
        <a
          :href="profile.resumeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary mt-2 w-full"
          >下載履歷</a
        >
      </div>
    </Transition>
  </header>
</template>

<style scoped></style>
