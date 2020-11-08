<template>
  <div class="container mx-auto v-wrapper">
    <AssetList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AssetList from "../components/AssetList/AssetList.vue";

export default defineComponent({
  name: "Home",
  components: {
    AssetList,
  },
});
</script>

<style scoped>
.v-wrapper {
  padding-top: 49px;
}
</style>