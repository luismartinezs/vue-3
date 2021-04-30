<template>
  <EventCount />
  <div v-if="error">Oops... {{error}}</div>
  <Suspense v-else>
    <template #default>
      <BaseEvent />
    </template>
    <template #fallback>Loading...</template>
  </Suspense>
</template>
<script>
import EventCount from "@/components/EventCount.vue";
import BaseEvent from "@/components/BaseEvent.vue";
import { ref, onErrorCaptured } from "vue";

export default {
  components: { EventCount, BaseEvent },
  setup() {
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
};
</script>