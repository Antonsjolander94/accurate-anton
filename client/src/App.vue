<template>
  <div>
    <Navbar />
    <div class="bg-gray-900 h-screen overflow-h">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
export default defineComponent({
  components: { Navbar },
});
</script>

<style>
html,
body {
  height: 100%;
  background-color: #1f2124;
}
.app-container {
  width: 100%;
  max-width: 1920px;
}
</style>