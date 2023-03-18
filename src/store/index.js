import { createStore } from "vuex";

export const store = createStore({
  state: {
    isToggle: "",
    historySelect: "",
  },
  mutations: {
    setIsToggle(state, data) {
      state.isToggle = data;
    },
    setHistorySelect(state, data) {
      state.historySelect = data;
    },
  },
});
