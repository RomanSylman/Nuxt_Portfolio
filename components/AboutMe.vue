<template>
  <main>
    <StarsBackground loading="lazy" />
    <div class="md:flex md:flex-row md:justify-between md:gap-[300px] flex flex-col justify-center items-center">
      <CubeAnimated class="my-[100px]" loading="lazy" />
      <section
        class="-z-900 text-l font-main text-isabelline p-8 text-justify flex flex-col gap-5 md:w-[900px] w-[350px] md:text-3xl"
      >
        <p>
          Let me tell you about my journey.
          <br>
          <br>
          In 2022, I was really excited to get started with web development and
          explore the wonderful world of coding. Since then, I've thrown myself
          into front-end development, getting better and better at it and
          learning lots of different tools to build web applications of all
          shapes and sizes.
          <br>
          <br>
          My journey has been such a blessing! I've had the incredible
          opportunity to work with some amazingly talented developers at various
          startups. I've also had the chance to take part in code reviews, break
          tasks down into manageable parts, and estimate project deadlines. It's
          been so rewarding to turn ideas into usable interfaces that enhance
          the overall user experience. When I'm not coding, I love reading and
          playing guitar. I also have a passion for gaming and competitive
          activities.
        </p>
      </section>
    </div>
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    StarsBackground: defineAsyncComponent(() => import('./StarsBackground.vue')),
    CubeAnimated: defineAsyncComponent(() => import('./CubeAnimated.vue')),
  },
};
</script>