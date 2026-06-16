<template>
  <div class="movie-info-wrap">
    <header class="movie-info-header">
      <h6 class="movie-header-title">Movie view</h6>

      <button
        type="button"
        @click="closeModal"
        class="bi bi-x-lg btn-close"
        aria-label="Close"
      ></button>
    </header>
    <div class="movie-info-content">
      <div class="row">
        <div class="col-4">
          <div class="movie-poster-wrap">
            <div class="movie-poster" v-bind:style="posterstyle"></div>
          </div>
        </div>
        <div class="col-8">
          <h6 class="movie-title">{{ movie ? movie.Title : "" }}</h6>
          <div
            ref="ratingMovie"
            data-coreui-toggle="rating"
            data-coreui-item-count="10"
            :data-coreui-value="rating"
          ></div>
          <StarRating :rating="rating" />
          <p class="movie-description">{{ movie ? movie.Plot : "" }}</p>
          <div class="mt-3 mb-4">
            <span class="badge bg-secondary bg-success mr-2">{{
              movie ? movie.Year : ""
            }}</span>
            <span class="badge bg-secondary bg-success mr-2">{{
              movie ? movie.Runtime : ""
            }}</span>
            <span class="badge bg-secondary bg-success mr-2">{{
              movie ? movie.Genre : ""
            }}</span>
            <span class="badge bg-secondary bg-success mr-2">{{
              movie ? movie.Language : ""
            }}</span>
          </div>
          <table class="table small">
            <tbody>
              <tr>
                <th class="text-muted">Production</th>
                <td>{{ movie ? movie.Production : "" }}</td>
              </tr>
              <tr>
                <th class="text-muted">Country</th>
                <td>{{ movie ? movie.Country : "" }}</td>
              </tr>
              <tr>
                <th class="text-muted">Director</th>
                <td>{{ movie ? movie.Director : "" }}</td>
              </tr>
              <tr>
                <th class="text-muted">Writer</th>
                <td>{{ movie ? movie.Writer : "" }}</td>
              </tr>
              <tr>
                <th class="text-muted">Actors</th>
                <td>{{ movie ? movie.Actors : "" }}</td>
              </tr>
              <tr>
                <th class="text-muted">Awards</th>
                <td>{{ movie ? movie.Awards : "" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "./StarRating.vue";

export default {
  name: "MovieInfoModalContent",
  data: () => ({
    defaultPoster: `linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  )`,
    ratingMovie: null,
  }),
  props: {
    movie: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    closeModal() {
      // console.log("closeModal");
      this.$emit("close");
    },
  },
  computed: {
    rating() {
      return this.movie && this.movie.imdbRating
        ? Math.ceil(this.movie.imdbRating)
        : 0;
    },
    posterstyle() {
      //console.log("this.poster", this.bgImage);
      return { "background-image": this.bgImage };
    },
    bgImage() {
      // console.log("this.poster");
      return this.movie && this.movie.Poster
        ? `url('${this.movie.Poster}')`
        : this.defaultPoster;
    },
  },
  components: {
    StarRating,
  },
};
</script>

<style scoped>
.movie-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
  color: #fff;
}
.movie-header-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
}
.btn-close {
  background: transparent;
  color: darkgray;
  border: none;
  font-size: 24px;
}
.btn-close:hover {
  color: #fff;
}
.movie-info-content {
  padding: 1rem;
  background-color: #fff;
}
.movie-poster-wrap {
  position: relative;
  padding-bottom: 150%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.movie-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}
.movie-title {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.movie-description {
  font-size: 1.25 rem;
  font-weight: 300;
}
.badge {
  color: #fff;
}
</style>
