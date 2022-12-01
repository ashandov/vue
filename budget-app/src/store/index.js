import { createStore } from "vuex";
import budgets from "./modules/budgets";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    budgets: budgets,
  },
});
