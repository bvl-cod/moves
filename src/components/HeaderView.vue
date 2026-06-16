<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MovieDB</a>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2 search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          debounce="500"
          @input="
            debounce(() => {
              (searchValue = $event.target.value), 2000;
            })
          "
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          @click.prevent="onSearch"
        >
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

function createDebounce() {
  let timeout = null;
  return function (fnc, delayMs) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayMs || 500);
  };
}

export default {
  name: "HeaderView",
  data: () => ({
    searchValue: "",
  }),

  watch: {
    searchValue() {
      // console.log(this.searchValue);
      this.onSearch();
      // this.$emit("search", this.searchValue);
    },
  },
  methods: {
    ...mapActions("movies", [
      "searchMovies",
      "fetchMovies",
      "toggleSearchState",
    ]),
    debounce: createDebounce(),
    onSearch() {
      console.log("method", this.searchValue);
      if (this.searchValue) {
        this.searchMovies(this.searchValue);
        this.toggleSearchState(true);

        const query = { ...this.$route.query };
        delete query["page"];
        this.$router.push({ query: { ...query } });
      } else {
        this.toggleSearchState(false);
        this.fetchMovies();
      }

      // this.$emit("search", this.searchValue);
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}
.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.8);
}
</style>
