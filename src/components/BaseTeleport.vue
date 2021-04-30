<template>
  <teleport to="#end-of-body" :disabled="!showText" v-if="showText">
    <div>I am the teleport content</div>
  </teleport>
  <div>This will be before the other text</div>
  <button @click="showText = !showText">Toggle teleport</button>
</template>

<script>
export default {
  data() {
    return { showText: false };
  },
};
</script>