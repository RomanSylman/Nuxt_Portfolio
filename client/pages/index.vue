.
<template>
  <body class="h-screen">
    <StarsBackground class="-z-1000" />
    <main
      class="h-screen z-10 text-isabelline w-screen flex justify-center items-center"
    >
      <SectionGreeting />
    </main>
  </body>
</template>

<script>
import StarsBackground from "../components/StarsBackground.vue";
import SectionGreeting from "../components/SectionGreeting.vue";
export default {
  components: { StarsBackground, SectionGreeting },
};
</script>

<style>
</style>
