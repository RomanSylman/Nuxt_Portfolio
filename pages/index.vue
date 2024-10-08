<template>
  <main class="content pointer-events-none z-0">
    <div class="viewport pointer-events-none z-0">
      <StarsBackground />
      <OrbitalLoader
        v-if="isLoading"
        :loading="true"
        class="flex justify-center items-center h-full w-full transition-transform duration-1000 opacity-100"
        :class="{ 'moving-to-camera': isMovingToCamera }"
      />
      <div v-show="!isLoading" class="frame">
        <LazySectionGreeting />
      </div>
      <div v-show="!isLoading" class="frame">
        <LazyAboutMe />
      </div>
      <div v-show="!isLoading" class="frame">
        <LazySkillTree />
      </div>
      <div v-show="!isLoading" class="frame">
        <LazyRecentProjects />
      </div>
      <div v-show="!isLoading" class="frame">
        <LazyContactMe />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {
    OrbitalLoader: () => import("../components/OrbitalLoader.vue"),
    LazySectionGreeting: () =>
      import(
         "../components/SectionGreeting.vue"
      ),
    LazyAboutMe: () =>
      import( "../components/AboutMe.vue"),
    LazySkillTree: () =>
      import(
         "../components/SkillTree.vue"
      ),
    LazyRecentProjects: () =>
      import(
         "../components/RecentProjects.vue"
      ),
    LazyContactMe: () =>
      import(
        "../components/ContactMe.vue"
      ),
  },
  data() {
    return {
      isLoading: true,
      isMovingToCamera: false,
    };
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0, 0);
    });

    window.scrollTo(0, 0);

    this.initZAxisScroll();

    setTimeout(() => {
      this.isMovingToCamera = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }, 1000);
  },
  methods: {
    initZAxisScroll() {
      let lastPos = window.scrollY;
      const zSpacing = -1200;
      const perspective = 300;
      const frames = Array.from(document.querySelectorAll(".frame"));
      const zVals = [];

      frames.forEach((frame, i) => {
        zVals[i] = -i * zSpacing;
        frame.style.transform = `translateZ(${zVals[i]}px)`;
      });

      const onScroll = () => {
        const top = window.scrollY;
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
  height: 4100px;
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
  perspective: 900px;
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

.moving-to-camera {
  transform: translateZ(1000px);
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.transition-opacity {
  transition: opacity 1s ease;
}
</style>
