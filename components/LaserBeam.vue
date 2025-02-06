<template>
  <div 
    v-if="isVisible"
    class="laser-beam fixed"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: `rotate(${angle}deg)`,
      transformOrigin: 'center'
    }"
  />
</template>

<script>
export default {
  props: {
    start: {
      type: Object,
      required: true
    },
    end: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    target: {
      type: Object,
      required: true
    }
  },
  emits: ['laser-hit', 'laser-out'],
  data() {
    return {
      position: { x: 0, y: 0 },
      angle: 0,
      animationFrame: null,
      previousPosition: null
    }
  },
  mounted() {
    this.position = { ...this.start }
    this.previousPosition = { ...this.start }
    this.angle = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    ) * 180 / Math.PI
    this.animate()
  },
  beforeUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  },
  methods: {
    checkCollision() {
      const targetRect = this.target.getBoundingClientRect()
      
      // Перевіряємо поточну позицію і попередню позицію лазера
      const currentX = this.position.x
      const currentY = this.position.y
      const prevX = this.previousPosition.x
      const prevY = this.previousPosition.y
      
      // Розраховуємо кілька точок між попередньою і поточною позицією
      const steps = 5
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const checkX = prevX + (currentX - prevX) * t
        const checkY = prevY + (currentY - prevY) * t
        
        // Перевіряємо чи точка знаходиться в межах таргета
        if (
          checkX >= targetRect.left &&
          checkX <= targetRect.right &&
          checkY >= targetRect.top &&
          checkY <= targetRect.bottom
        ) {
          return true
        }
      }
      
      return false
    },
    animate() {
      const speed = 15
      
      // Зберігаємо попередню позицію
      this.previousPosition = { ...this.position }
      
      // Розраховуємо нову позицію
      const dx = Math.cos(this.angle * Math.PI / 180) * speed
      const dy = Math.sin(this.angle * Math.PI / 180) * speed
      
      this.position.x += dx
      this.position.y += dy

      // Перевірка колізії з ціллю
      if (this.checkCollision()) {
        this.$emit('laser-hit')
        return
      }

      // Перевірка виходу за межі екрану
      if (
        this.position.x < 0 ||
        this.position.x > window.innerWidth ||
        this.position.y < 0 ||
        this.position.y > window.innerHeight
      ) {
        this.$emit('laser-out')
        return
      }

      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.laser-beam {
  position: fixed;
  width: 20px;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(255, 51, 51, 0.8) 0%,
    rgba(255, 51, 51, 1) 50%,
    rgba(255, 51, 51, 0.8) 100%
  );
  box-shadow: 0 0 4px #ff3333, 0 0 8px #ff3333, 0 0 12px #ff0000;
  pointer-events: none;
  border-radius: 4px;
}
</style> 