<template>
  <div class="z-10 relative cursor-pointer w-full h-full flex gap-5 flex-col mt-[260px] md:mt-[400px]" @click="startAnimation">
    <StarsBackground class="-z-10" />
    <button class="dev-tools-button z-100 text-xl font-mono text-isabelline md:text-3xl">Dev Tools</button>
    <div class="skill-tree flex flex-col justify-center items-center">
      <div class="skill-container grid grid-cols-3 gap-5 md:grid-cols-5 md:gap-10">
        <img ref="skill8" src="~/assets/icons/nuxt-svgrepo-com.svg" alt="Nuxt.js" class="skill">
        <img ref="skill3" src="~/assets/icons/css-3-svgrepo-com.svg" alt="CSS3" class="skill">
        <img ref="skill4" src="~/assets/icons/typescript.svg" alt="TS" class="skill">
        <img ref="skill2" src="~/assets/icons/html-5-svgrepo-com.svg" alt="HTML5" class="skill">
        <img ref="skill11" src="~/assets/icons/sass-svgrepo-com.svg" alt="Sass" class="skill">
        <img ref="skill5" src="~/assets/icons/react-javascript-js-framework-facebook-svgrepo-com.svg" alt="React" class="skill">
        <img ref="skill6" src="~/assets/icons/vue-svgrepo-com.svg" alt="Vue" class="skill">
        <img ref="skill1" src="~/assets/icons/js-official-svgrepo-com.svg" alt="JS" class="skill">
        <img ref="skill12" src="~/assets/icons/node-js-svgrepo-com.svg" alt="Node.js" class="skill">
        <img ref="skill10" src="~/assets/icons/tailwind-svgrepo-com.svg" alt="Tailwind" class="skill">
        <img ref="skill13" src="~/assets/icons/mongo-svgrepo-com.svg" alt="MongoDB" class="skill">
        <img ref="skill7" src="~/assets/icons/next-js-svgrepo-com.svg" alt="Next.js" class="skill">
        <img ref="skill9" src="~/assets/icons/redux-svgrepo-com.svg" alt="Redux" class="skill">
          <img ref="skill14" src="~/assets/icons/docker-svgrepo-com.svg" alt="Docker" class="skill">
          <img ref="skill15" src="~/assets/icons/git-svgrepo-com.svg" alt="Git" class="skill">
      </div>
      <div class="center-node text-isabelline font-mono text-xl flex flex-col-reverse text-center w-[150px] mt-[50px] md:text-3xl md:w-auto">
        Here you can check out my tech stack<br>
        <span class="text-base mb-4 text-center">(tap anywhere)</span>
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
        this.$refs.skill9,
        this.$refs.skill10,
        this.$refs.skill11,
        this.$refs.skill12,
        this.$refs.skill13,
        this.$refs.skill14,
        this.$refs.skill15,
        this.$refs.skill16,
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
.skill {
  width: 40px;
  height: 40px;
  opacity: 0;
  transform: scale(0.5);
  transition: transform 1.5s, opacity 1.5s ease-in-out;
}

@media screen and (min-width: 768px) {
  .skill {
    width: 60px;
    height: 60px;
  }
  
}

.skill.bubble-animation {
  opacity: 1;
  transform: scale(1);
}

.dev-tools-button {
  cursor: pointer;
  border: none;
  display: block;
}
</style>
