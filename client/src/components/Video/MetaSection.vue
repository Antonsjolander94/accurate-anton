<template>
  <div class="w-1/3 overflow-y-auto p-8">
    <div class="flex mb-5" v-if="title">
      <p class="text-white font-bold text-xl">{{ title }}</p>
    </div>
    <MetaList :metadata="metadata" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MetaList from "./MetaList/MetaList.vue";

export default defineComponent({
  components: { MetaList },
  props: {
    metadata: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>
