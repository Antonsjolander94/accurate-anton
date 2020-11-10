<template>
  <div
    class="border-r border-gray-800 w-full flex justify-center items-center bg-black"
  >
    <video width="320" height="240" controls>
      <source :src="videoUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    videoUrl: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
video {
  width: 100%;
  max-height: 100%;
  background-color: black;
}
</style>