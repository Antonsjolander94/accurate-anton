<template>
  <li class="flex flex-wrap justify-between meta-list-item py-3">
    <p class="text-gray-700 break-all">{{ content }}</p>
    <p class="whitespace-normal break-all">{{ value }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: String,
    content: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>