<template>
  <div 
    class="crosshair fixed pointer-events-none"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path
        d="M20 5 L20 15 M20 25 L20 35 M5 20 L15 20 M25 20 L35 20"
        stroke="#FF0000"
        stroke-width="2"
        fill="none"
      />
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="#FF0000"
        stroke-width="2"
        fill="none"
        stroke-dasharray="4 4"
      />
    </svg>
  </div>
</template>

<script>
export default {
emits: ['position-update'],
  data() {
    return {
      position: { x: 0, y: 0 }
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.updatePosition)
    window.addEventListener('touchmove', this.handleTouch)
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.updatePosition)
    window.removeEventListener('touchmove', this.handleTouch)
  },
  methods: {
    updatePosition(e) {
      this.position = {
        x: e.clientX - 20,
        y: e.clientY - 20
      }
      this.$emit('position-update', {
        x: e.clientX,
        y: e.clientY
      })
    },
    handleTouch(e) {
      if (e.touches.length > 0) {
        this.position = {
          x: e.touches[0].clientX - 20,
          y: e.touches[0].clientY - 20
        }
        this.$emit('position-update', {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        })
      }
    }
  }
}
</script> 