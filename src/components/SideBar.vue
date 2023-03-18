<template>
  <ul>
    <li v-for="item in data" :key="item.value">
      <a href="#" @click="toggle(item)" :class="item.value === isToggle ? 'highLight' : ''">
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
    data: Array,
    selected: String,
  },
  data() {
    return {
      open: {},
      highLight: false,
    };
  },
  watch: {
    selected(newValue) {
      this.directSelectItem(newValue);
    },
  },
  methods: {
    isOpen(item) {
      return this.open[item.value];
    },
    toggle(item) {
      if (item.value === this.isToggle) {
        localStorage.setItem("historySelect", "");
        this.$store.commit("setIsToggle", "");
      } else {
        localStorage.setItem("historySelect", this.processHistorySelect(item.text));
        this.$store.commit("setIsToggle", item.value);
      }
      if (item.children) {
        for (const itemValue in this.open) {
          if (item.value !== itemValue) {
            this.open[itemValue] = false;
          }
        }
        this.open[item.value] = !this.isOpen(item);
      }
    },
    directSelectItem(selectItem) {
      this.data.forEach((item) => {
        if (selectItem.indexOf(item.value) >= 0) {
          if (!this.open[item.value]) {
            this.toggle(item);
          }
        }
      });
    },
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

.highLight {
  background-color: darkgray;
}
</style>
