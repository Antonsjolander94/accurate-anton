<template>
  <nav class="bg-gray-900 border-b border-gray-800 fixed top-0 w-full">
    <div class="p-3">
      <router-link class="text-white" v-if="isVideoRoute" to="/"
        >Bakåt</router-link
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    route: String,
  },
  setup(props) {
    const route = useRoute();
    const isVideoRoute = ref(false);
    console.log({ route: route.name });
    watch(
      () => route.fullPath,
      async (newName) => {
        newName.includes("/video/")
          ? (isVideoRoute.value = true)
          : (isVideoRoute.value = false);
      }
    );
    return { isVideoRoute };
  },
});
</script>
