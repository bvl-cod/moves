import mutations from "@/store/mutations";

const { ADD_NOTIFICATION } = mutations;

const notificationStore = {
  state: {
    messagePool: [],
  },
  getters: {
    getMessagePool({ messagePool }) {
      console.log("gett msg pool");
      return messagePool[messagePool.length - 1];
    },
  },
  mutations: {
    [ADD_NOTIFICATION](state, message) {
      const messagePool = state.messagePool.slice();
      messagePool.push(message);
      state.messagePool = messagePool; //.push(message);
    },
  },
  actions: {
    addNotification({ commit }, message) {
      commit(ADD_NOTIFICATION, message);
    },
  },
};

export default notificationStore;
