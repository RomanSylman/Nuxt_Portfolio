<template>
  <div class="cube-container">
    <div class="cube">
      <div class="face front" />
      <div class="face back" />
      <div class="face right" />
      <div class="face left" />
      <div class="face top" />
      <div class="face bottom" />
      <!-- Менший куб -->
      <div class="inner-cube">
        <div class="face front" />
        <div class="face back" />
        <div class="face right" />
        <div class="face left" />
        <div class="face top" />
        <div class="face bottom" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cube-container {
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube {
  width: 400px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate 10s infinite linear;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: 2px solid white;
}

.front { transform: translateZ(200px); }
.back { transform: rotateY(180deg) translateZ(200px); }
.right { transform: rotateY(90deg) translateZ(200px); }
.left { transform: rotateY(-90deg) translateZ(200px); }
.top { transform: rotateX(90deg) translateZ(200px); }
.bottom { transform: rotateX(-90deg) translateZ(200px); }

.inner-cube {
  width: 50%;
  height: 50%;
  position: absolute;
  transform-style: preserve-3d;
  top: 25%;
  left: 25%;
  animation: innerRotate 10s infinite linear;
}

.inner-cube .face {
  width: 100%;
  height: 100%;
}

.inner-cube .front { transform: translateZ(100px); }
.inner-cube .back { transform: rotateY(180deg) translateZ(100px); }
.inner-cube .right { transform: rotateY(90deg) translateZ(100px); }
.inner-cube .left { transform: rotateY(-90deg) translateZ(100px); }
.inner-cube .top { transform: rotateX(90deg) translateZ(100px); }
.inner-cube .bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotate {
  from {
    transform: rotateY(0) rotateX(0);
  }
  to {
    transform: rotateY(360deg) rotateX(360deg);
  }
}

@keyframes innerRotate {
  from {
    transform: rotateY(0) rotateX(0);
  }
  to {
    transform: rotateY(-360deg) rotateX(-360deg);
  }
}

@media (max-width: 768px) {

.front { transform: translateZ(100px); }
.back { transform: rotateY(180deg) translateZ(100px); }
.right { transform: rotateY(90deg) translateZ(100px); }
.left { transform: rotateY(-90deg) translateZ(100px); }
.top { transform: rotateX(90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }

  .cube {
    width: 200px;
    height: 200px;
  }

  .inner-cube {
    width: 100px;
    height: 100px;
  }

.inner-cube .front { transform: translateZ(50px); }
.inner-cube .back { transform: rotateY(180deg) translateZ(50px); }
.inner-cube .right { transform: rotateY(90deg) translateZ(50px); }
.inner-cube .left { transform: rotateY(-90deg) translateZ(50px); }
.inner-cube .top { transform: rotateX(90deg) translateZ(50px); }
.inner-cube .bottom { transform: rotateX(-90deg) translateZ(50px); }
}
</style>
