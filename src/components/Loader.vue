<template>
  <div
    class="loader-wrap d-flex justify-content-center align-items-center"
    v-if="isShowLoader"
  >
    <div class="spinner-grow text-light loader" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loader",
  computed: {
    ...mapGetters(["isShowLoader"]),
  },
};
</script>

<style scoped>
.loader-wrap {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  position: fixed;
}

.loader {
}
</style>
