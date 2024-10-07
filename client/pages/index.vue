<template>
  <main class="content pointer-events-none z-0">
    <div class="viewport pointer-events-none z-0">
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><AboutMe /></div>
      <div class="frame"><SkillTree/></div>
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><SectionGreeting /></div>
    </div>
  </main>
</template>

<script>
import SectionGreeting from "../components/SectionGreeting.vue";
import AboutMe from "../components/AboutMe.vue";
import SkillTree from "../components/SkillTree.vue";

export default {
  components: { SectionGreeting, AboutMe, SkillTree },
  mounted() {
    this.initZAxisScroll();
    setTimeout(() => window.scrollTo(0, 0), 100); // Невелика затримка
  },
  methods: {
    initZAxisScroll() {
      let lastPos = window.scrollY;
      const zSpacing = -2000;
      const perspective = 1000;
      const frames = Array.from(document.querySelectorAll(".frame"));
      const zVals = [];

     
      frames.forEach((frame, i) => {
        zVals[i] = -i * zSpacing;
        frame.style.transform = `translateZ(${zVals[i]}px)`;
      });

      
      const onScroll = () => {
        const top = window.scrollY;
        console.log("ScrollY:", top);
        const delta = top - lastPos;
        lastPos = top;

        frames.forEach((frame, i) => {
          zVals[i] -= delta * 1.5;
          frame.style.transform = `translateZ(${zVals[i]}px)`;
          frame.style.opacity = zVals[i] < -perspective ? 0 : 1;
        });
      };

      window.addEventListener("scroll", onScroll);
    },
  },
};
</script>
<style>
body {
  position: relative;
  z-index: -10;
  pointer-events: auto;
  scroll-behavior: smooth;
  height: 6200px;
  margin: 0;
}

.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.viewport {
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 400ms ease;
  pointer-events: auto;
}
</style>
