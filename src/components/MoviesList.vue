<template>
  <div class="container">
    <h3 class="list-title">{{ listTitle }}</h3>
    <div class="row justify-content-center">
      <template v-if="ifExist">
        <div
          class="col-9 col-sm-5 col-md-4 col-lg-3 col-xl-3"
          v-for="(movie, key) in list"
          :key="key"
        >
          <MovieItem
            :movie="movie"
            @mouseover="onMouseover(movie.Poster)"
            @removeItem="onRemovwItem"
            @showInfoModal="navigateInfo"
          />
        </div>
      </template>
      <template v-else>
        <div class="col-12">
          <h3 class="text-center">No movies found</h3>
        </div>
      </template>
    </div>

    <ModalDialog
      body-class="movie-modal-body"
      ref="infoModal"
      @close="onCloseInfoModal"
      :footerShow="false"
      :headerShow="false"
    >
      <MovieInfoModalContent :movie="selectedMovie" @close="onCloseInfoModal" />
    </ModalDialog>

    <ModalDialog ref="dialogModal" />
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import ModalDialog from "./ModalDialog.vue";
import MovieInfoModalContent from "./MovieInfoModalContent.vue";
import { mapActions, mapGetters } from "vuex";
// import { ref, onMounted } from "vue";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    listTitle() {
      return this.isSearch ? "Search results" : "IMDB top 250";
    },
    ifExist() {
      return Object.keys(this.list).length > 0;
    },
    movieInfoModal() {
      return this.$refs.infoModal;
    },
    selectedMovie() {
      console.log(this.selectedMovieId, this.list[this.selectedMovieId]);
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    },
  },
  data: () => ({
    selectedMovieId: "",
  }),
  watch: {
    "$route.query": {
      handler() {
        if (this.$route.query && this.$route.query.showMovie) {
          this.onShowInfo(this.$route.query.showMovie);
        }
      },
    },
  },
  methods: {
    ...mapActions("movies", ["removeMovei"]),
    ...mapActions(["addNotification"]),
    onMouseover(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemovwItem({ id, title }) {
      //console.log(this.$refs.dialogModal);
      const isConfermed = await this.$refs.dialogModal.show(
        `Are you sure delete "${title}"?`
      );
      //   `Are you sure delete "${movie.title}"?`,
      //   "Warning",
      //   {
      //     confirmButtonText: "OK",
      //     cancelButtonText: "Cancel",
      //     type: "warning",
      //   }
      // );
      if (isConfermed) {
        this.removeMovei(id);
        this.addNotification({
          variant: "success",
          title: "Success",
          message: `"${title}" has been removed`,
        });
      }
      console.log(isConfermed);
      //this.$emit("removeItem", id);
    },
    navigateInfo(id) {
      const query = { ...this.$route.query };
      this.$router.push({ query: { ...query, showMovie: id } });
    },
    onShowInfo(id) {
      // console.log(id);
      if (id) {
        this.selectedMovieId = id;
        this.movieInfoModal.show();
      }
    },
    onCloseInfoModal() {
      // console.log("close");
      if (this.selectedMovieId) {
        //console.log("close");
        const query = { ...this.$route.query };
        delete query["showMovie"];
        this.$router.push({ query: { ...query } });
        this.selectedMovieId = null;
        this.movieInfoModal.hide();
      }
    },
  },
  components: {
    MovieItem,
    ModalDialog,
    MovieInfoModalContent,
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}

:deep(.movie-modal-body) {
  padding: 0px !important;
}
:deep(.modal-dialog) {
  max-width: 800px;
}
</style>
