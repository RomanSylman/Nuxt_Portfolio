<template>
  <main>
    <StarsBackground />
    <section class="-z-1000 text-3xl font-mono text-isabelline text-center w-[900px]">
      <h1 class="text-4xl pb-10">Greetings stranger!</h1>
      <p class="text-center whitespace-pre-line">{{ displayedText }}</p>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      fullText: [
        "I'm Roman, a front-end developer.",
        "I create the best web applications using",
        "the most advanced development tools.",
        "Welcome to my portfolio."
      ],
      displayedText: '',
      typingSpeed: 50,
      currentLine: 0,
      currentIndex: 0
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.currentLine < this.fullText.length) {
        const currentText = this.fullText[this.currentLine];

        if (this.currentIndex < currentText.length) {
          this.displayedText += currentText.charAt(this.currentIndex);
          this.currentIndex++;
        } else {
          this.displayedText += '\n';
          this.currentLine++;
          this.currentIndex = 0;
        }

        setTimeout(this.typeText, this.typingSpeed);
      }
    }
  }
};
</script>