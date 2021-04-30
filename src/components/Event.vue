<template>
  <!-- Example of best practices composition API -->
  <div>{{capacity}}</div>
  <button @click="increaseCapacity">+ capacity</button>
  <!-- etc -->
</template>

<script>
import useEventSpace from "@/use/eventSpace";
import useMapping from "@/use/mapping";

export default {
  setup() {
    const {
      capacity,
      attending,
      spacesLeft,
      increaseCapacity,
    } = useEventSpace();
    const { map, embedId } = useMapping();

    return { capacity, attending, spacesLeft, increaseCapacity, map, embedId };
  },
};
</script>

<style lang="scss" scoped>
</style>