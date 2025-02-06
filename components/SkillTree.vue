<template>
  <div class="relative w-full h-[100vh] overflow-hidden cursor-none">
    <StarsBackground class="-z-10" />
    
    <div class="fixed top-5 right-5 text-center z-50">
      <div v-if="gameCompleted" class="text-green-500 font-mono text-5xl mb-2">
        Good Job!
      </div>
      <div class="text-red-500 font-mono text-5xl">
        {{ formatTime(timer) }}
      </div>
    </div>
    <div v-if="!gameCompleted" class="absolute w-full h-full">
      <img 
        ref="target"
        src="~/assets/icons/geeked_alien.webp" 
        alt="Target" 
        class="target w-[50px] h-[50px] absolute cursor-none transition-opacity duration-300"
        :class="{ 'opacity-0': isExploding }"
        :style="targetStyle"
      >
      <div 
        v-if="isExploding" 
        class="explosion-effect"
        :style="{
          left: `${targetPosition.x}px`,
          top: `${targetPosition.y}px`
        }"
      />
    </div>

    <div 
      v-if="!gameCompleted"
      ref="starship"
      class="starship fixed bottom-0 left-1/2 -translate-x-1/2 z-40"
      :style="starshipStyle"
    >
      <img 
        src="~/assets/icons/starship.png" 
        alt="Starship" 
        class="w-[60px] h-[60px] object-contain transform"
      >
    </div>

    <template v-for="laser in activeLasers" :key="laser.id">
      <LaserBeam
        :start="laser.start"
        :end="laser.end"
        :is-visible="true"
        :target="$refs.target"
        @laser-out="() => onLaserOut(laser)"
        @laser-hit="() => onLaserHit(laser)"
      />
    </template>

    <Crosshair v-if="!gameCompleted" @position-update="updateStarshipRotation" />

    <h2 
      v-if="gameCompleted" 
      class="text-center font-mono text-5xl text-white mb-8 mt-4"
    >
      My Tech Stack & Development Tools
    </h2>

    <div v-if="gameCompleted" class="skill-container mx-auto grid grid-cols-5 gap-[100px] justify-items-center p-4 mt-20">
      <div 
        v-for="(skill, index) in skills" 
        :key="index" 
        class="skill-wrapper"
        :style="{ animationDelay: `${index * 150}ms` }"
      >
        <img 
          :ref="`skill${index + 1}`"
          :src="skill.icon" 
          :alt="skill.name" 
          class="skill hover-effect"
          @load="onImageLoad($event, index)"
        >
        <span class="skill-tooltip">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Crosshair from './CrosshairComponent.vue'
import LaserBeam from './LaserBeam.vue'

export default {
  components: {
    Crosshair,
    LaserBeam
  },
  data() {
    return {
      timer: 0,
      timerInterval: null,
      targetPosition: { x: 0, y: 0 },
      targetVelocity: { x: 1.4, y: 1.4 },
      gameCompleted: false,
      laserStart: { x: 0, y: 0 },
      laserEnd: { x: 0, y: 0 },
      isLaserVisible: false,
      isExploding: false,

      baseSpeed: 5,
      directionChangeInterval: null,
      starshipRotation: 0,
      mousePosition: { x: 0, y: 0 },
      activeLasers: [],
      laserSpeed: 800, // пікселів за секунду
      canShoot: true,
      shootCooldown: 250, // мілісекунд між пострілами
      lastShootTime: 0,
      skills: [
        { name: 'HTML', icon: '/icons/html-5-svgrepo-com.svg' },
        { name: 'CSS', icon: '/icons/css-3-svgrepo-com.svg' },
        { name: 'JavaScript', icon: '/icons/js-official-svgrepo-com.svg' },
        { name: 'TypeScript', icon: '/icons/typescript.svg' },
        { name: 'React', icon: '/icons/react-javascript-js-framework-facebook-svgrepo-com.svg' },
        { name: 'Vue', icon: '/icons/vue-svgrepo-com.svg' },
        { name: 'Next.js', icon: '/icons/next-js-svgrepo-com.svg' },
        { name: 'Nuxt', icon: '/icons/nuxt-svgrepo-com.svg' },
        { name: 'Node.js', icon: '/icons/node-js-svgrepo-com.svg' },
        { name: 'MongoDB', icon: '/icons/mongo-svgrepo-com.svg' },
        { name: 'Git', icon: '/icons/git-svgrepo-com.svg' },
        { name: 'Docker', icon: '/icons/docker-svgrepo-com.svg' },
        { name: 'Sass', icon: '/icons/sass-svgrepo-com.svg' },
        { name: 'Tailwind', icon: '/icons/tailwind-svgrepo-com.svg' },
        { name: 'Redux', icon: '/icons/redux-svgrepo-com.svg' }
      ]
    }
  },
  computed: {
    targetStyle() {
      return {
        transform: `translate(${this.targetPosition.x}px, ${this.targetPosition.y}px)`
      }
    },
    starshipStyle() {
      return {
        transform: `translateX(-50%) rotate(${this.starshipRotation}deg)`
      }
    }
  },
  mounted() {
    this.startGame()
    this.startRandomDirectionChanges()
    this.updateTargetPosition()
    window.addEventListener('click', this.handleShot)
    window.addEventListener('touchstart', this.handleShot)
  },
  beforeUnmount() {
    this.stopGame()
    window.removeEventListener('click', this.handleShot)
    window.removeEventListener('touchstart', this.handleShot)
  },
  methods: {
    startGame() {
      this.targetPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
      this.updateTargetVelocity()
      this.startTimer()
      this.animateTarget()
    },
    updateTargetVelocity() {
      const angle = Math.random() * Math.PI * 2
      this.targetVelocity = {
        x: Math.cos(angle) * this.baseSpeed,
        y: Math.sin(angle) * this.baseSpeed
      }
    },
    startRandomDirectionChanges() {
      this.directionChangeInterval = setInterval(() => {
        if (!this.gameCompleted) {
          this.updateTargetVelocity()
          this.baseSpeed = Math.min(this.baseSpeed + 0.5, 12) // Поступово збільшуємо швидкість
        }
      }, 1000)
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer += 10
      }, 10)
    },
    formatTime(ms) {
      const seconds = Math.floor(ms / 1000)
      const milliseconds = Math.floor((ms % 1000) / 10)
      return `${seconds}.${milliseconds.toString().padStart(2, '0')}`
    },
    animateTarget() {
      this.targetPosition.x += this.targetVelocity.x
      this.targetPosition.y += this.targetVelocity.y

      const margin = 100
      const maxWidth = window.innerWidth - margin
      const maxHeight = window.innerHeight - margin
      const minX = margin
      const minY = margin

      if (this.targetPosition.x <= minX || this.targetPosition.x >= maxWidth) {
        this.targetVelocity.x *= -1
        this.targetPosition.x = this.targetPosition.x <= minX ? minX : maxWidth
      }
      if (this.targetPosition.y <= minY || this.targetPosition.y >= maxHeight) {
        this.targetVelocity.y *= -1
        this.targetPosition.y = this.targetPosition.y <= minY ? minY : maxHeight
      }

      if (Math.random() < 0.01) {
        this.targetVelocity.x = (Math.random() - 0.5) * 3
        this.targetVelocity.y = (Math.random() - 0.5) * 3
      }

      if (!this.gameCompleted) {
        this.animationFrame = requestAnimationFrame(this.animateTarget)
      }
    },
    handleShot(e) {
      if (this.gameCompleted) return
      
      const clickX = e.clientX || (e.touches && e.touches[0].clientX)
      const clickY = e.clientY || (e.touches && e.touches[0].clientY)
      
      this.shootLaser(clickX, clickY)
    },
    shootLaser(x, y) {
      const now = Date.now()
      if (!this.canShoot || now - this.lastShootTime < this.shootCooldown) return

      const starship = this.$refs.starship
      if (!starship) return

      this.lastShootTime = now
      this.canShoot = false

      const starshipRect = starship.getBoundingClientRect()
      const starshipCenterX = starshipRect.left + starshipRect.width / 2
      const starshipCenterY = starshipRect.top + starshipRect.height / 2

      const laser = {
        id: Date.now(),
        start: {
          x: starshipCenterX,
          y: starshipCenterY
        },
        end: { x, y }
      }

      this.activeLasers.push(laser)
      
      setTimeout(() => {
        this.canShoot = true
      }, this.shootCooldown)
    },
    removeLaser(laser) {
      const index = this.activeLasers.indexOf(laser)
      if (index > -1) {
        this.activeLasers.splice(index, 1)
      }
    },
    onLaserOut(laser) {
      this.removeLaser(laser)
    },
    onLaserHit(laser) {
      if (this.isExploding) return
      
      this.removeLaser(laser)
      this.hitTarget()
    },
    hitTarget() {
      if (this.isExploding) return
      
      this.isExploding = true
      this.targetVelocity = { x: 0, y: 0 }
      clearInterval(this.timerInterval)
      
      setTimeout(() => {
        this.isExploding = false
        this.gameCompleted = true
        this.showSkills()
      }, 800)
    },
    onImageLoad(event, index) {
      console.log(`Image ${index} loaded successfully:`, event.target.src);
      setTimeout(() => {
        event.target.classList.add('bubble-animation');
      }, index * 200);
    },
    onImageError(event, index) {
      console.error(`Failed to load image ${index}:`, event.target.src);
    },
    showSkills() {
      console.log('Showing skills...');
      this.gameCompleted = true;
      this.$nextTick(() => {
        const skills = document.querySelectorAll('.skill img');
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.classList.add('bubble-animation');
          }, index * 200);
        });
      });
    },
    stopGame() {
      clearInterval(this.timerInterval)
      clearInterval(this.directionChangeInterval)
      cancelAnimationFrame(this.animationFrame)
      this.activeLasers = []
    },
    updateStarshipRotation({ x, y }) {
      const starship = this.$refs.starship
      if (!starship) return

      const starshipRect = starship.getBoundingClientRect()
      const starshipCenterX = starshipRect.left + starshipRect.width / 2
      const starshipCenterY = starshipRect.top + starshipRect.height / 2

      // Розрахунок кута між зорельотом і прицілом
      const angle = Math.atan2(
        y - starshipCenterY,
        x - starshipCenterX
      ) * 180 / Math.PI

      this.starshipRotation = angle - 90 // -90 для корекції початкового повороту зорельота
    },
    updateTargetPosition() {
      const target = this.$refs.target
      if (target) {
        const rect = target.getBoundingClientRect()
        this.targetPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      }
    },
    moveTarget() {
      this.updateTargetPosition()
    }
  }
}
</script>

<style scoped>
.target {
  pointer-events: auto;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.skill-container {
  max-width: 1200px;
  z-index: 100;
}

.skill-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
}

.skill {
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill.bubble-animation {
  opacity: 1;
  transform: scale(1);
  animation: appear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-effect {
  transition: all 0.3s ease;
}

.skill-wrapper:hover .skill {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
}

.skill-tooltip {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
}

.skill-wrapper:hover .skill-tooltip {
  opacity: 1;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-5px) rotate(2deg);
  }
}

/* Різні затримки для створення ефекту хвилі */
.skill-wrapper:nth-child(3n) {
  animation-delay: 0.1s;
}

.skill-wrapper:nth-child(3n + 1) {
  animation-delay: 0.2s;
}

.skill-wrapper:nth-child(3n + 2) {
  animation-delay: 0.3s;
}

@media screen and (min-width: 768px) {
  .skill-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .skill-tooltip {
    font-size: 14px;
    bottom: -30px;
  }
}

.dev-tools-button {
  cursor: pointer;
  border: none;
  display: block;
  transition: transform 0.3s ease;
}

.dev-tools-button:hover {
  transform: scale(1.1);
}

.ufo-container {
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.ufo {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
  transition: filter 0.3s ease;
  pointer-events: auto;
}

.ufo:hover {
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.8));
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
  }
}

.starship {
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.starship img {
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7));
}

.relative {
  isolation: isolate; /* Створюємо новий stacking context */
}

/* Анімація появи "Good Job!" */
@keyframes goodJobAppear {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.text-green-500 {
  animation: goodJobAppear 0.5s ease-out forwards;
}

.skill-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.skill-name {
  font-size: 14px;
  color: #fff;
}

.skill-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin: 4px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.hover-effect:hover {
  transform: scale(1.15);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
}

@media screen and (min-width: 768px) {
  .explosion-animation {
    width: 150px;
    height: 150px;
    background-size: 750px 750px; /* Scale up for larger screens */
  }
  
  @keyframes explode {
    0% {
      background-position: 0 0;
    }
    20% {
      background-position: -600px 0;
    }
    40% {
      background-position: -600px -150px;
    }
    60% {
      background-position: -600px -300px;
    }
    80% {
      background-position: -600px -450px;
    }
    100% {
      background-position: -600px -600px;
    }
  }
}

.explosion-effect {
  position: absolute;
  width: 100px;
  height: 100px;
  background-image: url('/icons/explosion.png');
  background-size: 100% 100%;
  transform: translate(-50%, -50%);
  animation: explode 0.8s steps(1) forwards;
}

@keyframes explode {
  0% {
    opacity: 1;
    transform: translate(-25%, -25%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-25%, -25%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-25%, -25%) scale(1.5);
  }
}
</style>
