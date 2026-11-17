<script setup lang="ts">
import { reactive } from 'vue'
import { IconMail, IconMapPin, IconSend } from '@tabler/icons-vue'
import { profile } from '@/data/profile'
import SectionHeading from './SectionHeading.vue'

const form = reactive({ name: '', email: '', message: '' })

function submit() {
  const subject = encodeURIComponent(`來自 ${form.name} 的訊息`)
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/15'
</script>

<template>
  <section id="contact" class="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div v-reveal class="glass overflow-hidden p-8 sm:p-12 lg:p-14">
        <div class="relative grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              section-id="contact"
              eyebrow="Contact"
              title="有個想法？一起聊聊。"
              description="有任何專案想法或合作機會，歡迎與我聯絡。"
            />
            <div class="space-y-5">
              <a :href="`mailto:${profile.email}`" class="group flex items-center gap-4">
                <span class="icon-tile"><IconMail :size="20" /></span>
                <span>
                  <span class="block text-xs tracking-wider text-white/55 uppercase">Email</span>
                  <span class="text-white/80 transition-colors group-hover:text-white">{{
                    profile.email
                  }}</span>
                </span>
              </a>
              <div class="flex items-center gap-4">
                <span class="icon-tile"><IconMapPin :size="20" /></span>
                <span>
                  <span class="block text-xs tracking-wider text-white/55 uppercase">Location</span>
                  <span class="text-white/80">{{ profile.location }}</span>
                </span>
              </div>
            </div>
          </div>

          <form class="space-y-5" @submit.prevent="submit">
            <label class="block">
              <span class="mb-2 block text-sm text-white/60">姓名</span>
              <input v-model="form.name" :class="inputClass" placeholder="你的名字" required />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm text-white/60">Email</span>
              <input
                v-model="form.email"
                type="email"
                :class="inputClass"
                placeholder="you@example.com"
                required
              />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm text-white/60">訊息</span>
              <textarea
                v-model="form.message"
                rows="5"
                :class="inputClass"
                placeholder="想聊些什麼？"
                required
              />
            </label>
            <button type="submit" class="btn-primary group w-full">
              送出訊息
              <IconSend :size="18" class="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
