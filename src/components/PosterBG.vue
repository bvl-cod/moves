<template>
  <div class="poster-page-bg" :style="posterstyle"></div>
</template>

<script>
export default {
  name: "PosterBG",
  props: {
    poster: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    defaultPoster: `linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  )`,
  }),
  computed: {
    posterstyle() {
      return { "background-image": this.bgImage };
    },
    bgImage() {
      // console.log("this.poster");
      return this.poster ? `url('${this.poster}')` : this.defaultPoster;
    },
  },
};
</script>

<style scoped>
.poster-page-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* background: url(../assets/poster-bg.jpg) no-repeat center center; */
  background-size: cover;
  /* background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  ); */
  background-position: center;
  transition: all 0.3s ease;
  z-index: -1;
}
.poster-page-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
}
</style>
