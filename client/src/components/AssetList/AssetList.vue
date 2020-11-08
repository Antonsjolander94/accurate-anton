<template>
  <div>
    <div class="grid grid-cols-4 gap-4 mt-10">
      <AssetListItem v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import AssetListItem from "./AssetListItem.vue";
import Post from "../../interfaces/Post";
import PostService from "../../services/PostService";

export default defineComponent({
  components: { AssetListItem },
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