<template>
  <div class="stars">
    <div
      v-for="index in starCount"
      :key="index"
      class="star"
      :style="getStarStyle()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      starCount: 200,
    };
  },
  methods: {
    getStarStyle() {
      const duration = Math.random() * (15 - 5) + 5;
      const delay = Math.random() * 5;
      const left = Math.random() * 100;
      const top = Math.random() * 200 - 100;

      return {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        left: `${left}%`,
        top: `${top}vh`,
      };
    },
  },
};
</script>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #0d1811 0%, #0d1821 100%);
  overflow-x: hidden;
  margin: 0;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: fall linear infinite;
  opacity: 1;
}

@keyframes fall {
  from {
    transform: translate(-100vw, -100vh) rotate(45deg); /* Починаються поза верхньою і лівою межами */
    opacity: 1;
  }
  to {
    transform: translate(100vw, 200vh) rotate(45deg); /* Пролітають через екран по діагоналі */
    opacity: 1;
  }
}
</style>
