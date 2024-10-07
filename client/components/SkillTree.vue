<template>
  <div class="z-10 relative cursor-pointer w-screen h-screen" @click="startAnimation">
    <StarsBackground class="-z-10" />
    <button class="dev-tools-button z-100 text-4xl font-mono text-isabelline text-center w-[900px] py-[200px] left-[510px] relative" >Dev Tools</button>
    <div class="skill-tree">
      <div class="center-node text-isabelline font-mono text-5xl flex flex-col-reverse">Here you can check out my tech stack <br><span class="text-lg">(click anywhere)</span></div>
      <div class="branch branch-1">
        <img ref="skill1" src="~/assets/icons/js-official-svgrepo-com.svg" alt="JS" class="skill" >
        <img ref="skill2" src="~/assets/icons/html-5-svgrepo-com.svg" alt="HTML5" class="skill" >
        <img ref="skill3" src="~/assets/icons/css-3-svgrepo-com.svg" alt="CSS3" class="skill" >
        <img ref="skill4" src="~/assets/icons/typescript.svg" alt="TS" class="skill">
      </div>
      <div class="branch branch-2">
        <img ref="skill5" src="~/assets/icons/react-javascript-js-framework-facebook-svgrepo-com.svg" alt="React" class="skill" >
        <img ref="skill6" src="~/assets/icons/vue-svgrepo-com.svg" alt="Vue" class="skill" >
        <img ref="skill7" src="~/assets/icons/next-js-svgrepo-com.svg" alt="Next.js " class="skill" >
        <img ref="skill8" src="~/assets/icons/nuxt-svgrepo-com.svg" alt="Nuxt.js" class="skill" >
        <img ref="skill9" src="~/assets/icons/redux-svgrepo-com.svg" alt="Redux" class="skill" >
        <img ref="skill10" src="~/assets/icons/tailwind-svgrepo-com.svg" alt="Tailwind" class="skill">
        <img ref="skill11" src="~/assets/icons/sass-svgrepo-com.svg" alt="Sass" class="skill" >
      </div>
      <div class="branch branch-3">
        <img ref="skill12" src="~/assets/icons/node-js-svgrepo-com.svg" alt="Node.js" class="skill" >
        <img ref="skill13" src="~/assets/icons/mongo-svgrepo-com.svg" alt="MongoDB" class="skill" >
        <img ref="skill14" src="~/assets/icons/docker-svgrepo-com.svg" alt="Express" class="skill" >
      </div>
      <div class="branch branch-4">
        <img ref="skill15" src="~/assets/icons/git-svgrepo-com.svg" alt="Git" class="skill" >
        <img ref="skill16" src="~/assets/icons/npm-svgrepo-com.svg" alt="Webpack" class="skill" >
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  methods: {
    startAnimation() {
      const skills = [
        this.$refs.skill1,
        this.$refs.skill2,
        this.$refs.skill3,
        this.$refs.skill4,
        this.$refs.skill5,
        this.$refs.skill6,
        this.$refs.skill7,
        this.$refs.skill8,
        this.$refs.skill15,
        this.$refs.skill9,
        this.$refs.skill10,
        this.$refs.skill16,
        this.$refs.skill11,
        this.$refs.skill12,
        this.$refs.skill14,
        this.$refs.skill13,
      ];

      skills.forEach((skill, index) => {
        setTimeout(() => {
          skill.classList.add('bubble-animation');
        }, index * 200);
      });
    }
  }
}
</script>
  
  <style scoped>
  .skill-tree {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    cursor: pointer;
  }
  
  .center-node {
    position: absolute;
    width: max-content;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  
  .branch {
    position: absolute;
    display: flex;
    justify-content: space-between;
  }
  
  .branch-1 {
    left: 40px;
    top: 0px;
    width: 200px;
  }
  
  .branch-2 {
    right: -160px;
    top: -100px;
    height: 200px;
  }
  
  .branch-3 {
    top: -200px;
    left: 120px;
    width: 200px;
    justify-content: flex-end;
  }
  
  .branch-4 {
    left: -160px;
    top: -100px;
    height: 200px;
    justify-content: flex-end;
  }
  
  .skill {
    width: 60px;
    height: 60px;
    margin: 10px;
    opacity: 0;
    transform: scale(0.5);
    transition: transform 1.5s, opacity 1.5s ease-in-out;
  }
  .dev-tools-button {
  cursor: pointer;
  border: none;
  display: block;
}

.skill.bubble-animation {
  opacity: 1;
  transform: scale(1);
}

  </style>
  