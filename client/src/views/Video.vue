<template>
  <div>{{ $route.params.id }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Post from "../interfaces/Post";
import PostService from "../services/PostService";

export default defineComponent({
  setup(props, ctx) {
    const postService = new PostService();
    const posts = ref<Post[]>([]);

    const fetchData = async (): Promise<void> => {};
    fetchData();
    return {
      posts,
    };
  },
});
</script>
<style scoped>
</style>