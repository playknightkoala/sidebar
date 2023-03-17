import { createStore } from "vuex";

export const store = createStore({
  state: {
    isToggle: "",
  },
  mutations: {
    setIsToggle(state, data) {
      state.isToggle = data;
    },
  },
});
