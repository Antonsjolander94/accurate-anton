<template>
  <button
    class="bg-gray-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
  >
    <svg
      class="fill-current w-4 h-4 mr-2 transform rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
    <span>Ladda upp</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>