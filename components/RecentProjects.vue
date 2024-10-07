<template>
  <div>
    <StarsBackground class="z-1" />
    <div
      class="recent-projects grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :project-name="project.name"
        :image="project.image"
        :github-link="project.github"
        :demo-link="project.demo"
        :is-blurred="hoveredIndex !== null && hoveredIndex !== index"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";
import StarsBackground from "./StarsBackground.vue";

export default {
  components: {
    ProjectCard,
    StarsBackground,
  },
  data() {
    return {
      hoveredIndex: null,
      projects: [
        {
          name: "My Portfolio",
          image: "portfolio.png",
          github: "https://github.com/RomanSylman/Nuxt_Portfolio",
        },
        {
          name: "Currency Converter",
          image: "currency-converter.png",
          github: "https://github.com/RomanSylman/currency-converser",
          demo: "https://currency-converser.vercel.app/",
        },
        {
          name: "Phone Shop",
          image: "phone-shop.png",
          github: "https://github.com/RomanSylman/react_phone-catalog",
          demo: "https://romansylman.github.io/react_phone-catalog/",
        },
        {
          name: "Chat App",
          image: "chat.png",
          github: "https://github.com/RomanSylman/Fullstack_React_mongo_node",
          demo: "https://fullstack-react-mongo-node.vercel.app/",
        },
        {
          name: "Reviewed App",
          image: "reviewed.png",
          github: "https://github.com/RomanSylman/reviewED_fe",
          demo: "https://review-ed.onrender.com/",
        },
        {
          name: "Landing Page",
          image: "landing.png",
          github: "https://github.com/RomanSylman/Kickstarter",
          demo: "https://romansylman.github.io/Kickstarter/",
        },
      ],
    };
  },
};
</script>

<style scoped>
.project-card {
  transition: filter 0.666s ease;
}

.project-card.blurred {
  filter: blur(5px);
  opacity: 0.6;
}
</style>
