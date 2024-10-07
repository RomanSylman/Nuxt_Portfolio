<template>
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
  </template>
  
  <style scoped>
  .cube {
    width: 400px;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate 5s infinite linear;
  }
  
  .face {
    position: absolute;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border: 2px dotted white; 
  }
  
  .front {
    transform: translateZ(200px);
  }
  .back {
    transform: rotateY(180deg) translateZ(200px);
  }
  .right {
    transform: rotateY(90deg) translateZ(200px);
  }
  .left {
    transform: rotateY(-90deg) translateZ(200px);
  }
  .top {
    transform: rotateX(90deg) translateZ(200px);
  }
  .bottom {
    transform: rotateX(-90deg) translateZ(200px);
  }
  
  .inner-cube {
    width: 200px;
    height: 200px;
    position: absolute;
    transform-style: preserve-3d;
    top: 25%;
    left: 25%;
    transform: translate( -25%, -25%);
    animation: innerRotate 5s infinite linear;
  }
  
  .inner-cube .face {
    width: 200px;
    height: 200px;
  }
  
  .inner-cube .front {
    transform: translateZ(100px);
  }
  .inner-cube .back {
    transform: rotateY(180deg) translateZ(100px);
  }
  .inner-cube .right {
    transform: rotateY(90deg) translateZ(100px);
  }
  .inner-cube .left {
    transform: rotateY(-90deg) translateZ(100px);
  }
  .inner-cube .top {
    transform: rotateX(90deg) translateZ(100px);
  }
  .inner-cube .bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }
  
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
  </style>
  