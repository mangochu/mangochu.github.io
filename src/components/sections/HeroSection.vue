<script setup lang="ts">
import { profile } from '@/data/profile'
import { ArrowRight } from '@lucide/vue'
</script>

<template>
  <section id="top" class="flex min-h-screen items-center justify-center px-4 pt-28 pb-20">
    <div class="w-full max-w-3xl text-center">
      <div
        v-reveal
        class="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pr-4 pl-3 text-sm text-white/70 backdrop-blur-md"
      >
        <span class="relative flex size-2.5">
          <span
            class="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
          />
          <span class="relative size-2.5 rounded-full bg-emerald-400" />
        </span>
        {{ profile.availability }}
      </div>

      <h1
        v-reveal="100"
        class="mb-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
      >
        Hi, I'm<br />
        <span class="text-primary">{{ profile.name }}</span>
      </h1>

      <p v-reveal="200" class="mb-4 text-xl text-white/85 sm:text-2xl">{{ profile.tagline }}</p>
      <p v-reveal="250" class="mx-auto mb-10 max-w-xl leading-relaxed text-white/55">
        {{ profile.intro }}
      </p>

      <div v-reveal="300" class="flex flex-wrap items-center justify-center gap-4">
        <a href="#projects" class="btn-primary group">
          查看作品
          <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
        </a>
        <a href="#contact" class="btn-secondary">與我聯絡</a>
      </div>
    </div>
  </section>
</template>
