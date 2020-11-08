<template>
  <router-link
    :to="`/video/${post._id}`"
    class="rounded overflow-hidden shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-300"
  >
    <div
      class="w-100 text-white h-40 bg-center bg-no-repeat bg-cover"
      :style="{ backgroundImage: 'url(' + post.img_url + ')' }"
    ></div>
    <div class="p-4">
      <p class="font-bold text-white text-l">{{ post.title }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PostService from "../../services/PostService";
import Post from "../../interfaces/Post";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>