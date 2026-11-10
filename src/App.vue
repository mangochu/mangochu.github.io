<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import { navItems } from './data/profile.ts'
</script>

<template>
  <div class="min-h-screen text-white">
    <NavBar />
    <section
      v-for="(item, index) in navItems"
      :key="item.id"
      :id="item.id"
      class="h-screen"
      :class="[
        ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'][index % 5],
      ]"
    >
      <h2 class="text-2xl font-bold">{{ item.label }}</h2>
    </section>
  </div>
</template>

<style scoped></style>
