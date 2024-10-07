<template>
  <div ref="starsContainer" class="stars">
    <div
      v-for="(style, index) in starStyles"
      :key="index"
      class="star"
      :style="style"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      starCount: 100, // Базова кількість зірок
      starStyles: [],
      isStarsVisible: false,
    };
  },
  watch: {
    isStarsVisible(newVal) {
      if (newVal) {
        // Коли зірки стають видимими, запускаємо анімацію
        this.generateStarStyles();
      } else {
        // Зупиняємо анімацію, коли зірки не в полі зору
        this.starStyles = [];
      }
    },
  },
  mounted() {
    this.setStarCountBasedOnDevice();
    this.generateStarStyles();
    this.initIntersectionObserver();
  },
  methods: {
    setStarCountBasedOnDevice() {
      // Зменшуємо кількість зірок для мобільних пристроїв
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.starCount = 50; // Наприклад, менше зірок для мобільних пристроїв
      }
    },
    generateStarStyles() {
      for (let i = 0; i < this.starCount; i++) {
        const duration = Math.random() * (15 - 5) + 5;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 200 - 100;

        this.starStyles.push({
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          left: `${left}%`,
          top: `${top}vh`,
        });
      }
    },
    initIntersectionObserver() {
      const observerOptions = {
        root: null, // Спостерігаємо в межах вікна перегляду
        threshold: 0.1, // Запускаємо, коли 10% блоку видно
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isStarsVisible = true;
          } else {
            this.isStarsVisible = false;
          }
        });
      }, observerOptions);

      // Спостерігаємо за контейнером зірок
      observer.observe(this.$refs.starsContainer);
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
