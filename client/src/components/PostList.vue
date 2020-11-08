<template>
  <div>
    Posts
    <ul v-if="posts && posts.length">
      <li v-for="post in posts" :key="post._id">
        <router-link :to="`/video/${post._id}`">
          <img :src="post.img_url" alt="" />
        </router-link>

        <!-- <video controls :poster="post.img_url">
          <source :src="post.video_url" type="video/mp4" />
          Your browser does not support the video tag.
        </video> -->
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Post from "../interfaces/Post";
import PostService from "../services/PostService";

export default defineComponent({
  setup() {
    const postService = new PostService();
    const posts = ref<Post[]>([]);

    const fetchData = async (): Promise<void> => {
      posts.value = await postService.FetchPosts();
    };
    fetchData();
    return {
      posts,
    };
  },
});
</script>

<style scoped>
</style>