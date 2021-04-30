<template>
  <div>
    Search for
    <input v-model="searchInput" />
    <div>
      <p>Loading: {{ loading }}</p>
      <p>Error: {{ error }}</p>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import eventApi from "@/api/event.js";
import usePromise from "@/composables/usePromise.js";

export default {
  async setup() {
    const searchInput = ref("");
    const { results, loading, error, createPromise } = usePromise((search) =>
      eventApi.getEventCount(search.value)
    );

    watch(searchInput, () => {
      if (searchInput.value !== "") {
        createPromise(searchInput);
      } else {
        results.value = null;
      }
    });
    return { searchInput, results, loading, error };
  },
};
</script>