<template>
  <div class="w-4/12 overflow-y-auto relative">
    <!-- <MetaList :imgUrl="img_url" :metadata="metadata" /> -->
    <ul class="bg-gray-900 fixed w-full flex border-b border-gray-800 tab-nav">
      <li class="nav-item">
        <a
          class="tab text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none"
          @click.prevent="setActive('metadata')"
          :class="{ active: isActive('metadata') }"
          href="#home"
          >Metadata</a
        >
      </li>
      <li class="nav-item">
        <a
          class="tab text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none"
          @click.prevent="setActive('media')"
          :class="{ active: isActive('media') }"
          href="#media"
          >Media</a
        >
      </li>
      <li class="nav-item">
        <a
          class="tab text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none"
          @click.prevent="setActive('audio')"
          :class="{ active: isActive('audio') }"
          href="#audio"
          >Audio</a
        >
      </li>
      <li class="nav-item">
        <a
          class="tab text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none"
          @click.prevent="setActive('markers')"
          :class="{ active: isActive('markers') }"
          href="#markers"
          >Markers</a
        >
      </li>
    </ul>
    <div class="tab-content pt-15 px-8 py-8 text-white">
      <div
        class="tab-pane flex flex-col"
        :class="{ 'active show': isActive('metadata') }"
        id="metadata"
      >
        <h1 class="text-xl font-bold mb-5">{{ title }}</h1>

        <div class="flex flex-col" v-if="durationExists">
          <p class="text-xs text-gray-600">DURATION</p>
          {{ duration }}
        </div>
        <div class="flex flex-col mt-3" v-if="frameRateExists">
          <p class="text-xs text-gray-600">FRAME RATE</p>
          {{ frameRateExists }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    metadata: {
      type: Object,
    },
    title: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  setup(props) {
    const activeItem = ref("metadata");

    const durationExists = computed(() => props?.metadata?.format?.duration);
    const duration = computed(() =>
      new Date(props?.metadata?.format?.duration * 1000)
        .toISOString()
        .substr(11, 8)
    );
    const frameRateExists = computed(
      () => props?.metadata?.streams[0].avg_frame_rate
    );

    const isActive = (menuItem: string) => {
      return activeItem.value === menuItem;
    };
    const setActive = (menuItem: string) => {
      activeItem.value = menuItem;
    };

    return {
      setActive,
      isActive,
      activeItem,
      durationExists,
      duration,
      frameRateExists,
    };
  },
});
</script>

<style lang="postcss">
.tab-nav {
  min-width: 232px;
}
.tab {
  @apply font-medium transition duration-300;
}
.tab.active {
  @apply bg-gray-900 text-white py-4 px-6 block  border-b-2  border-purple-500;
}
.tab-pane {
  display: none;
}
.tab-pane.active {
  display: flex;
}
.tab-content {
  margin-top: 59px;
}
</style>