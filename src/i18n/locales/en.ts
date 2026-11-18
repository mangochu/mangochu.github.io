// 介面文字（英文）；結構和 zh-TW.ts 一樣，少了或多了 key 時型別檢查會報錯
import type zhTW from './zh-TW'

const en: typeof zhTW = {
  meta: {
    // 不能用半形 |，vue-i18n 會當成複數形式的分隔符號，只顯示前半段
    title: 'Mango Chu — Frontend Engineer Portfolio',
    description:
      'Portfolio of Mango Chu, a frontend engineer with a physics M.S. and nearly 3 years of frontend and app experience in Vue, React, and TypeScript, turning complex rules into correct, reliable systems.',
  },
  nav: {
    resume: 'Resume',
    viewResume: 'View Resume',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  footer: {
    source: 'Site source',
    backToTop: 'Back to top',
  },
  resume: {
    title: 'Resume',
    download: 'Download',
    openInNewTab: 'Open PDF in a new tab',
    close: 'Close resume',
    loadFailed: 'Failed to load the resume',
    openDirectly: 'Open the PDF directly',
    page: 'Resume page {n} of {total}',
  },
  hero: {
    contact: 'Get in touch',
    viewProjects: 'View projects',
  },
  about: {
    title: 'About me',
    highlights: 'What I care about',
  },
  experience: {
    title: 'Experience',
    description: 'Where I’ve been, most recent first.',
  },
  skills: {
    title: 'Skills',
    description: 'The tools and abilities I use to turn ideas into products.',
    tools: 'Tools & libraries',
    all: 'All',
    filter: 'Filter by category',
    proficiency: '{name} proficiency',
    showing: 'Showing {shown} of {total}',
    showAll: ' — pick a category to see them all',
  },
  projects: {
    title: 'Selected work',
    description: 'Recent projects I’ve built on my own or contributed to.',
    featured: 'Featured',
    source: 'Source code (opens in a new tab)',
    demo: 'Live demo (opens in a new tab)',
    screenshots: '{title} screenshots',
    previous: 'Previous slide',
    next: 'Next slide',
    slide: 'Slide {n}',
    openLive: 'Turn on live site preview',
    closeLive: 'Turn off live site preview',
  },
  contact: {
    title: 'Have an idea? Let’s talk.',
    description: 'Whether it’s a project idea or a job opportunity, I’d love to hear from you.',
    name: 'Name',
    namePlaceholder: 'Your name',
    message: 'Message',
    messagePlaceholder: 'What would you like to talk about?',
    submit: 'Send message',
    mailSubject: 'Message from {name}',
  },
}

export default en
