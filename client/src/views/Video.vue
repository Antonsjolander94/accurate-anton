<template>
  <div class="h-screen overflow-y-h v-wrapper">
    <div class="flex flex-col h-full min-h-full">
      <div class="flex flex-row flex-1 v-section">
        <VideoSection :videoUrl="video.video_url" v-if="video" />

        <MetaSection
          :metadata="video.metadata"
          :title="video.title"
          v-if="video && video.metadata"
        />
      </div>
      <TimelineSection />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Post from "../interfaces/Post";
import PostService from "../services/PostService";
import VideoSection from "../components/Video/VideoSection.vue";
import MetaSection from "../components/Video/MetaSection.vue";
import TimelineSection from "../components/Video/TimelineSection.vue";

export default defineComponent({
  components: {
    MetaSection,
    VideoSection,
    TimelineSection,
  },
  props: {
    query: String,
  },
  setup(props, ctx) {
    const postService = new PostService();
    const route = useRoute();
    const video = ref<Post | any>();

    // const fetchData = async (): Promise<void> => {
    //   video.value = await postService.FetchPosts();
    // };
    console.log(props.query);
    // fetchData();

    const fetchPost = async (id: string): Promise<void> => {
      try {
        video.value = await postService.getPost(id);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.query) {
      fetchPost(props.query);
    }

    return {
      video,
    };
  },
});
</script>
<style scoped>
.v-wrapper {
  padding-top: 49px;
}
.v-section {
  min-height: 65vh;
  max-height: 65vh;
  height: 100%;
}
</style>