<template>
   <NuxtPage />
</template>

<script setup lang="ts">
useSeoMeta({
  description: '[description]',
  ogTitle: '[og:title]',
  ogDescription: '[Roman Sylman - Front-end developer]',
  ogImage: '/images/prevw.png',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
  twitterImage: '/images/prevw.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
</script>
