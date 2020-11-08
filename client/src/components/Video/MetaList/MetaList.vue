<template>
  <div class="text-white">
    <div class="flex mb-1">
      <p class="text-gray-700 text-sm">{{ title }}</p>
    </div>
    <ul>
      <MetaListItem
        v-for="(value, name) in metadata.format"
        :key="name"
        :value="value.toString()"
        :content="name.toString()"
      />
    </ul>
    <ul class="mt-10" v-for="(stream, index) in metadata.streams" :key="index">
      <MetaListItem
        v-for="(value, name) in stream"
        :key="name"
        :value="value.toString()"
        :content="name.toString()"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MetaListItem from "./MetaListItem.vue";

export default defineComponent({
  components: { MetaListItem },
  props: {
    metadata: {
      type: Object,
    },
    title: String,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss">
ul li.meta-list-item {
  @apply border-b border-gray-800;
}
</style>