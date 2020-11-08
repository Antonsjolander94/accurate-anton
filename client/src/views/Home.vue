<template>
  <div class="home">
    <PostList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostList from "../components/PostList.vue";

export default defineComponent({
  name: "Home",
  components: {
    PostList,
  },
});
</script>
