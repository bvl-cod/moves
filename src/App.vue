<template>
  <Loader />
  <NotificationView />
  <PosterBg :poster="posterBg" />
  <HeaderView />
  <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  <MoviesPagination
    :currentPage="currentPage"
    :moviesPerPage="moviesPerPage"
    :total="moviesLength"
    @onPageChanged="onPageChanged"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBG";
import MoviesPagination from "@/components/MoviesPagination";
import Loader from "@/components/Loader.vue";
import HeaderView from "@/components/HeaderView.vue";
import NotificationView from "@/components/NotificationView.vue";

// import { watch } from "vue";
// + import { useRouter, useRoute } from "vue-router";
// import { useRouter } from "vue-router";

// const router = useRouter();

// watch(
//   () => route.query.page,
//   (newId, oldId) => {
//     console.log(newId, oldId);
//     // react to route changes...
//   }
// );

export default {
  name: "app",
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    HeaderView,
    NotificationView,
  },

  data: () => ({
    posterBg: "",
  }),
  computed: {
    ...mapGetters("movies", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1, inSearch = false, showMovie }) {
      //await router.isReady();
      // console.log("handler", page);
      if (page && inSearch === false) {
        this.changeCurrentPage(Number(page));
      }
      console.log("movie", showMovie);
    },
    onChangePoster(poster) {
      this.posterBg = poster;
    },
    onPageChanged(page) {
      // console.log(this.$router);
      this.$router.push({ query: { page } });
      //this.changeCurrentPage(page);
    },
  },

  // created() {
  //   const router = useRouter();
  //   const route = useRoute();
  //   (async () => {
  //     await router.isReady();
  //     console.log("async", route.query);
  //     if (this.$route.query.page) {
  //       this.changeCurrentPage(Number(this.$route.query.page));
  //     }
  //   })();
  // },
};
</script>

<style>
#app {
  font-family: Arial, Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
