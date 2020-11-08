<template>
  <div>
    Posts
    <!-- <ul v-if="posts && posts.length" class="grid grid-cols-4 gap-6">
      <li>
        <div
          class="bg-gray-800 flex flex-col rounded overflow-hidden hover:bg-gray-600 transition duration-300"
        >
          <div
            class="w-100 text-white shadow-lg h-48 bg-gray-600 h-100 w-100"
          ></div>
        </div>
      </li>
      <li v-for="post in posts" :key="post._id">
        <router-link
          :to="`/video/${post._id}`"
          class="bg-gray-800 flex flex-col rounded overflow-hidden hover:bg-gray-600 transition duration-300"
        >
          <div
            class="w-100 text-white shadow-lg h-48 bg-center bg-no-repeat bg-cover h-100 w-100"
            :style="{ backgroundImage: 'url(' + post.img_url + ')' }"
          ></div>
          <div class="w-100 p-5">
            <p class="text-white text-bold">{{ post.title }}</p>
          </div>
        </router-link>
      </li>
    </ul> -->
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