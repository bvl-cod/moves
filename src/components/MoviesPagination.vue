<template>
  <nav
    aria-label="Page navigation example"
    class="d-flex justify-content-center"
  >
    <ul class="pagination movies-pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <span class="page-link" v-if="currentPage === 1">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </span>
        <a
          class="page-link"
          v-else
          href="#"
          aria-label="Previous"
          v-on:click.prevent="previosPage"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <template v-for="page in pages" :key="page">
        <li class="page-item" :class="{ active: page === currentPage }">
          <span
            class="page-link"
            v-if="page === currentPage"
            aria-hidden="true"
            tabindex="-1"
            >{{ page }}<span class="sr-only">(current)</span></span
          >
          <a
            class="page-link"
            :class="{ active: isActive(page) }"
            @click.prevent="changePage(page)"
            v-else
            href="#"
            >{{ page }}
          </a>
        </li>
      </template>

      <li
        class="page-item"
        :class="{ disabled: currentPage === pages.slice(-1)[0] }"
      >
        <span class="page-link" v-if="currentPage === pages.slice(-1)[0]">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </span>
        <a
          class="page-link"
          v-else
          href="#"
          aria-label="Next"
          v-on:click.prevent="nextPage"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MoviesPagination",
  data: () => ({
    // currentPage: 1,
    // moviesPerPage: 10,
    // total: 100,
    totalPages: 5,
  }),
  computed: {
    pages() {
      const pages = Math.ceil(this.total / this.moviesPerPage);
      const start = Math.max(
        1,
        this.currentPage - Math.floor(this.totalPages / 2)
      );
      const end = Math.min(pages, start + this.totalPages - 1);
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    },
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        // this.currentPage = value;
        this.$emit("onPageChanged", value);
      },
    },
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    // totalPages: {
    //   type: Number,
    //   default: 5,
    // },
    moviesPerPage: {
      type: Number,
      default: 10,
    },
  },
  // watch: {
  //   currentPage() {
  //     this.$emit("changePage", this.currentPage);
  //   },
  // },
  methods: {
    changePage(page) {
      this.currentPageModel = page;
    },
    isActive(page) {
      return page === this.currentPage;
    },
    previosPage() {
      this.currentPageModel -= 1;
    },
    nextPage() {
      this.currentPageModel += 1;
    },
  },
};
</script>

<style scoped>
.movies-pagination {
  /* margin: 30px 0px; */
  margin-top: auto;
}
.page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.page-item.disabled .page-link {
  background-color: transparent;
  color: rgb(129, 129, 129);
}
.page-item.active .page-link {
  background-color: #fff;
  color: #000;
  border-color: #fff;
}
</style>
