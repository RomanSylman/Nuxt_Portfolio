<template>
    <div>
      <StarsBackground />
      <h2 class="text-3xl font-mono text-isabelline text-center flex justify-center mb-20">
        Contact me
      </h2>
      <div class="flex flex-row gap-10 md:gap-20">
        <div v-for="(link, index) in socialLinks" :key="index">
          <a :href="link.url" target="_blank" :aria-label="link.name">
            <component :is="link.icon"  class="svg" width="50" height="50"  />
          </a>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center mt-20 gap-5">
        <h3 class="text-2xl font-mono text-isabelline block">Download my CV</h3>
        <a href="/CV.Frontend_Developer_Roman_Sylman.pdf" download><DownloadIcon /></a>
      </div>
    </div>
  </template>
  
  <script>
  import GitHubIcon from '@/components/icons/GitHubIcon.vue';
  import InstagramIcon from '@/components/icons/InstagramIcon.vue';
  import LinkedInIcon from '@/components/icons/LinkedInIcon.vue';
  import DownloadIcon from './icons/DownloadIcon.vue';
  
  export default {
    components: {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    DownloadIcon,
    DownloadIcon
},
    data() {
      return {
        socialLinks: [
          {
            name: 'GitHub',
            url: 'https://github.com/RomanSylman',
            icon: GitHubIcon,
          },
          {
            name: 'Instagram',
            url: 'https://www.instagram.com/_.pomah._/',
            icon: InstagramIcon,
          },
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/roman-sylman/',
            icon: LinkedInIcon,
          },
        ],
      };
    },
  };
  </script>
  