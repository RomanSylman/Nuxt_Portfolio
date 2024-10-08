<template>
  <canvas ref="canvas" class="stars" />
</template>

<script>
export default {
  data() {
    return {
      starCount: 70,
      isStarsVisible: false,
      stars: [], 
    };
  },
  watch: {
    isStarsVisible(newVal) {
      if (newVal) {
        this.generateStars();
      } else {
        this.clearStars();
      }
    },
  },
  mounted() {
    this.setStarCountBasedOnDevice();
    this.initIntersectionObserver();
    this.initCanvas();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
  },
  methods: {
    setStarCountBasedOnDevice() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.starCount = 10;
      }
    },
    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.resizeCanvas();
      window.addEventListener("resize", this.resizeCanvas);
    },
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      if (this.isStarsVisible) {
        this.generateStars();
      }
    },
    generateStars() {
      this.stars = [];
      for (let i = 0; i < this.starCount; i++) {
        const star = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          z: Math.random() * this.canvas.width, // Глибина зірки
          size: Math.random() * 1 + 0.5, // Розмір зірки
          speed: Math.random() * 100, // Швидкість наближення
        };
        this.stars.push(star);
      }
      this.animateStars();
    },
    animateStars() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.stars.forEach((star) => {
        // Рахуємо координати зірки в залежності від глибини
        const perspective = this.canvas.width / (this.canvas.width + star.z);
        const starX = (star.x - this.canvas.width / 2) * perspective + this.canvas.width / 2;
        const starY = (star.y - this.canvas.height / 2) * perspective + this.canvas.height / 2;
        const starSize = star.size * perspective;

        // Малюємо зірку
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
        this.ctx.fill();

        // Оновлюємо положення зірки
        star.z -= star.speed;

        // Якщо зірка пройшла повз глядача, перезапускаємо її з новою глибиною
        if (star.z < 0) {
          star.z = this.canvas.width;
          star.x = Math.random() * this.canvas.width;
          star.y = Math.random() * this.canvas.height;
        }
      });

      requestAnimationFrame(this.animateStars);
    },
    clearStars() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    initIntersectionObserver() {
      const observerOptions = {
        root: null,
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isStarsVisible = entry.isIntersecting;
        });
      }, observerOptions);

      observer.observe(this.$refs.canvas);
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
</style>
