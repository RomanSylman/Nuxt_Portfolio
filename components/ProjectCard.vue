<template>
  <div
    class="project-card border border-indigoDye rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    :class="{ blurred: isBlurred }"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <img
      :src="`/images/${image}`"
      :alt="projectName"
      class="px-2 py-2 rounded-xl w-full h-48 object-cover"
    >
    <div class="p-4">
      <h3 class="text-2xl font-semibold font-mono text-isabelline mb-2">
        {{ projectName }}
      </h3>
      <div class="flex justify-around">
        <a
          :href="githubLink"
          target="_blank"
          class="hover:scale-125 transition-all duration-300"
        >
          <img
            src="~/assets/icons/github-142-svgrepo-com.svg"
            alt="GitHub"
            class="w-6 h-6 inline-block"
          >
        </a>
        <a
          v-if="projectName !== 'My Portfolio'"
          :href="demoLink"
          target="_blank"
          class="hover:scale-125 transition-all duration-300"
        >
          <img
            src="~/assets/icons/play-svgrepo-com.svg"
            alt="Demo"
            class="w-6 h-6 inline-block"
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
      required: true,
    },
    demoLink: {
      type: String,
      required: true,
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
