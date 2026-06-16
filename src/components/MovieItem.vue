<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBG"></div>
    <div class="movie-item-poster">
      <div
        class="movie-item-info-wrap d-flex flex-column justify-content-between"
      >
        <div class="movie-item-info">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <span class="movie-year">
            {{ movie.Year }}
          </span>
        </div>

        <div class="movie-item-controls row no-gutters">
          <div class="col pr-2">
            <button
              class="btn btn-primary btn-light w-100 d-md-block"
              type="button"
              @click="showInfoModalEvent"
            >
              Info
            </button>
          </div>
          <div class="col pl-2">
            <button
              class="btn btn-primary btn-light w-100 d-md-block"
              @click="RemoveItem"
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterBG() {
      return {
        "background-image": `url(${this.movie.Poster})`,
      };
      //`url(${this.movie.Poster})`;
    },
  },
  methods: {
    RemoveItem() {
      this.$emit("removeItem", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    showInfoModalEvent() {
      this.$emit("showInfoModal", this.movie.imdbID);
    },
  },
};
</script>

<style scoped>
button {
  background: rgba(255, 255, 255, 0.4);
}
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 400px;
}
.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-item-info-wrap {
  padding: 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.5s ease;
}
.movie-title {
  font-size: 20px 10px;
  color: #fff;
}
.movie-year {
  font-size: 14px;
  color: #fff;
}
.movie-item:hover .movie-item-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
