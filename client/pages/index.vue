<template>
  <main class="content">
    <div class="viewport">
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><SectionGreeting /></div>
      <div class="frame"><SectionGreeting /></div>
    </div>
  </main>
</template>

<script>
import SectionGreeting from "../components/SectionGreeting.vue";

export default {
  components: { SectionGreeting },
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

      // Ініціалізація початкових позицій
      frames.forEach((frame, i) => {
        zVals[i] = -i * zSpacing; // Зміщуємо по Z від 0
        frame.style.transform = `translateZ(${zVals[i]}px)`;
      });

      // Функція для плавного скролу
      const onScroll = () => {
        const top = window.scrollY;
        console.log("ScrollY:", top); // Перевірка значення скролу
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
}

.viewport {
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
}

.frame {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 400ms ease;
}
</style>
