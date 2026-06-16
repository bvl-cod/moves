import mutations from "@/store/mutations";

const { TOGGLE_LOADER } = mutations;

const loaderStore = {
  state: {
    isShowLoader: false,
  },
  mutations: {
    [TOGGLE_LOADER](state, playload) {
      state.isShowLoader = playload;
    },
  },
  getters: {
    isShowLoader: ({ isShowLoader }) => isShowLoader,
  },
  actions: {
    toggleLoader({ commit }, playload) {
      commit(TOGGLE_LOADER, playload);
    },
  },
};

export default loaderStore;
