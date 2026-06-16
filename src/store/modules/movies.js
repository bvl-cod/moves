import axios from "@/plugins/axios";
import topIDs from "@/store/mock/imdb_top250";
// const IDs = topIDs.slice();

import mutations from "@/store/mutations";

function serializeDataRes(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH, SEARCHED_IDS } =
  mutations;

const moviesStore = {
  namespaced: true,
  state: {
    moviesIDs: topIDs,
    searchedIds: {},
    moviesPerPage: 10,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    moviesList: ({ movies }) => movies,

    slicedIds:
      ({ moviesIDs }) =>
      (from, to) =>
        moviesIDs.slice(from, to),
    currentPage: ({ isSearch, currentPage }) => (isSearch ? 1 : currentPage),
    moviesPerPage: ({ isSearch, movies, moviesPerPage }) =>
      isSearch ? Object.keys(movies).length : moviesPerPage,
    moviesLength: ({ isSearch, movies, moviesIDs }) =>
      isSearch ? Object.keys(movies).length : Object.keys(moviesIDs).length,
    isSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, movies) {
      state.movies = movies;
    },
    [CURRENT_PAGE](state, currentPage) {
      state.currentPage = currentPage;
    },
    [REMOVE_MOVIE](state, id) {
      const newIDs = state.moviesIDs.slice();
      newIDs.splice(id, 1);
      state.moviesIDs = newIDs;

      // console.log("remove", id, newIDs.length);
    },
    [TOGGLE_SEARCH](state, isSearch) {
      state.isSearch = isSearch;
    },
    [SEARCHED_IDS](state, ids) {
      state.searchedIds = { ...ids };
    },
  },
  actions: {
    // initStore: {
    //   handler({ dispatch }) {
    //     dispatch("fetchMovies");
    //   },
    //   root: true,
    // },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        //const {currentPage, currentPage}=getters;
        if (getters.isSearch) return;

        dispatch("toggleLoader", true, { root: true });

        const from = (getters.currentPage - 1) * getters.moviesPerPage;
        const to = getters.currentPage * getters.moviesPerPage;

        const moviesIdFetch = getters.slicedIds(from, to);
        // console.log(moviesIdFetch);

        const request = moviesIdFetch.map((id) => {
          return axios.get("/", {
            params: {
              i: id, // movie id
            },
          });
          // .then((response) => response.data)
        });

        const response = await Promise.all(request);
        const movies = serializeDataRes(response);

        commit(MOVIES, movies);
        console.log(movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, currentPage) {
      commit(CURRENT_PAGE, currentPage);
      dispatch("fetchMovies");
    },
    removeMovei({ commit, dispatch, state }, id) {
      const index = state.moviesIDs.findIndex((item) => item === id);
      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
    async searchMovies({ commit, dispatch }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const response = await axios.get("/", {
          params: {
            s: query,
          },
        });
        if (response.Error) {
          throw new Error(response.Error);
        }
        const movies = serializeDataRes(response.Search);
        console.log(movies);
        commit(SEARCHED_IDS, movies);
        commit(MOVIES, movies);
        commit(CURRENT_PAGE, 1);
      } catch (err) {
        console.log(err.message);
        dispatch(
          "addNotification",
          {
            message: err.message,
            title: "Error",
            variant: "danger",
          },
          { root: true }
        );
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
      // dispatch("fetchMovies");
    },
  },
};

export default moviesStore;
