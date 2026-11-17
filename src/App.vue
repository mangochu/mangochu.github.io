<script setup lang="ts">
import CyberBackground from './components/effects/CyberBackground.vue'
import AppFooter from './components/layout/AppFooter.vue'
import NavBar from './components/layout/NavBar.vue'
import ResumeViewer from './components/layout/ResumeViewer.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
</script>

<template>
  <div class="min-h-screen text-white">
    <CyberBackground />
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
    <ResumeViewer />
  </div>
</template>

<style scoped></style>
