<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
</script>

<template>
  <div class="min-h-screen text-white">
    <NavBar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
  </div>
</template>

<style scoped></style>
