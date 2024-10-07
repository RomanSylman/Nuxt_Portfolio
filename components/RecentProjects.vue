<template>
  <div>
    <StarsBackground class="z-1" />
    <div
      class="recent-projects grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ProjectCard
        project-name="My Portfolio"
        image="portfolio.png"
        github-link="https://github.com/RomanSylman/Nuxt_Portfolio"
      />
      <ProjectCard
        project-name="Currency Converter"
        image="currency-converter.png"
        github-link="https://github.com/RomanSylman/currency-converser"
        demo-link="https://currency-converser.vercel.app/"
      />
      <ProjectCard
        project-name="Phone Shop"
        image="phone-shop.png"
        github-link="https://github.com/RomanSylman/react_phone-catalog"
        demo-link="https://romansylman.github.io/react_phone-catalog/"
      />
      <ProjectCard
        project-name="Chat App"
        image="chat.png"
        github-link="https://github.com/RomanSylman/Fullstack_React_mongo_node"
        demo-link="https://fullstack-react-mongo-node.vercel.app/"
      />
      <ProjectCard
        project-name="Reviewed App"
        image="reviewed.png"
        github-link="https://github.com/RomanSylman/reviewED_fe"
        demo-link="https://review-ed.onrender.com/"
      />
      <ProjectCard
        project-name="Landing Page"
        image="landing.png"
        github-link="https://github.com/RomanSylman/Kickstarter"
        demo-link="https://romansylman.github.io/Kickstarter/"
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
    StarsBackground
},
};
</script>
