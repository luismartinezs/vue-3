<template>
  <div>
    <h2>{{event.title}}</h2>
    <p>{{event.description}}</p>
  </div>
</template>

<script>
import { getEvent } from "@/api/event.js";
import { ref } from "vue";

export default {
  async setup() {
    const event = ref(await getEvent());

    return { event };
  },
};
</script>
