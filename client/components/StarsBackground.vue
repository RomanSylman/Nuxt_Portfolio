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
      starCount: 100,
    };
  },
  methods: {
    getStarStyle() {
      const duration = Math.random() * (10 - 3) + 3;
      const delay = Math.random() * 5;
      const left = Math.random() * 100;

      return {
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        left: `${left}%`,
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
  overflow: hidden;
}

.stars {
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 400vw;
  height: 400vh;
  transform: rotate(-45deg);
}

.star {
  position: absolute;
  bottom: 100%;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(200vh) rotate(30deg);
    opacity: 1;
  }
}
</style>
