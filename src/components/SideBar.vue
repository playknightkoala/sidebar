<template>
  <ul>
    <li v-for="item in data" :key="item.value">
      <a href="#" @click="toggle(item)" :class="item.value === isToggle ? 'highlight' : ''">
        {{ item.text }}
        <i :class="[item.children.length > 0 ? 'arrow' : '', isOpen(item) ? 'down' : 'right']"></i>
      </a>
      <SideBar v-show="isOpen(item)" :data="item.children" :selected="selected"></SideBar>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SideBar",
  setup() {
    const store = useStore();
    const isToggle = computed(() => store.state.isToggle);
    const historySelect = computed(() => store.state.historySelect);

    return {
      isToggle,
      historySelect,
    };
  },
  components: {
    SideBar: this,
  },
  props: {
    data: Array, // 選單項目
    selected: String, // 外部選擇器的項目
  },
  data() {
    return {
      open: {}, // 選單項目的開關狀態
      highlight: false, // 是否highlight
    };
  },
  watch: {
    // 監聽外部選擇器選擇的項目
    selected(newValue) {
      this.directSelectItem(newValue);
    },
  },
  methods: {
    /**
     * 回傳項目狀態
     * @param item 項目
     * @returns Object
     */
    isOpen(item) {
      return this.open[item.value];
    },
    /**
     * 開關點擊項目
     * @param item
     */
    toggle(item) {

      // 如項目重複點擊則不儲存
      if (item.value === this.isToggle) {
        localStorage.setItem("historySelect", "");
        this.$store.commit("setIsToggle", "");
      } else {
        // 項目被點擊則儲存該項目
        localStorage.setItem("historySelect", this.processHistorySelect(item.text));
        this.$store.commit("setIsToggle", item.value);
      }
      if (item.children) {
        for (const itemValue in this.open) {
          // 關閉所有除了目前傳入項目的項目
          if (item.value !== itemValue) {
            this.open[itemValue] = false;
          }
        }
        this.open[item.value] = !this.isOpen(item);
      }
    },
    /**
     * 選擇傳入的項目
     * 格式為項目的ID
     * @param selectItem 選擇項目的ID
     */
    directSelectItem(selectItem) {
      this.data.forEach((item) => {
        if (selectItem.indexOf(item.value) >= 0) {
          if (!this.open[item.value]) {
            this.toggle(item);
          }
        }
      });
    },
    /**
     * 回傳傳入項目對應的項目ID
     * @param text 項目名稱
     * @returns String
     */
    processHistorySelect(text) {
      const select = this.historySelect.filter((item) => item.text === text);
      if (select.length > 0) {
        return select[0].value;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.arrow {
  border: solid black;
  border-width: 0px 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.right {
  transform: rotate(-45deg);
}

.down {
  transform: rotate(45deg);
}

ul {
  list-style-type: none;
}

.highlight {
  background-color: darkgray;
}
</style>
