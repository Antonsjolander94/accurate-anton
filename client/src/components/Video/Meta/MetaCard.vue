<template>
  <div class="mb-5">
    <p class="text-gray-700 text-sm">{{ title }}</p>
    <div class="bg-gray-800 text-white mt-2 rounded p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>
