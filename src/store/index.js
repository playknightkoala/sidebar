import { createStore } from "vuex";

export const store = createStore({
  state: {
    isToggle: "", // 目前正被點擊的項目
    historySelect: "", // 歷史點擊的項目
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
