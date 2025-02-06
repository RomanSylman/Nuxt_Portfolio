<template>
  <div
    class="project-card border border-indigoDye rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[170px] w-[100px] md:w-[200px] md:h-[300px]"
    :class="{ blurred: isBlurred }"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <img
      :src="`/images/${image}`"
      :alt="projectName"
      class="px-2 py-2 rounded-xl w-full h-[70%] md:h-[220px] object-cover"
    >
    <div class="text-center">
      <h3 class="text-lg font-semibold font-mono text-isabelline">
        {{ projectName }}
      </h3>
      <div class="flex justify-around">
        <a
          v-if="githubLink"
          :href="githubLink"
          target="_blank"
          class="hover:scale-125 transition-all duration-300"
        >
          <img
            src="~/assets/icons/github-142-svgrepo-com.svg"
            alt="GitHub"
            class="w-3 h-3 inline-block md:w-6 md:h-6"
          >
        </a>
        <a
          v-if="demoLink"
          :href="demoLink"
          target="_blank"
          class="hover:scale-125 transition-all duration-300"
        >
          <img
            src="~/assets/icons/play-svgrepo-com.svg"
            alt="Demo"
            class="w-3 h-3 inline-block md:w-6 md:h-6"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      default: null,
    },
    demoLink: {
      type: String,
      default: null,
    },
    isBlurred: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['mouseenter', 'mouseleave'],
};
</script>

<style scoped>
.project-card {
  max-width: 300px;
  background-image: linear-gradient(to bottom, #0d1821, #344966);
  color: #f8f9fa;
  transition: transform 0.66s, filter 0.66s;
}

.project-card.blurred {
  filter: blur(5px);
  opacity: 0.6;
}

.project-card:hover {
  transform: scale(1.05);
}
</style>
