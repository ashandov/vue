// import Vue from "vue";

const usersStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        name: "Denis",
        age: 30,
      },
    },
  },
  getters: {
    usersList: ({ list }) => Object.values(list),
  },
  mutations: {
    ADD_USER(state, user) {
      state.list[user.id] = user;
    },
  },
  actions: {
    addNewUser({ commit }, user) {
      const newUser = { ...user, id: String(Math.random()) };
      console.log(newUser);
      console.log(commit);
      commit("ADD_USER", newUser);
    },
  },
};

export default usersStore;
