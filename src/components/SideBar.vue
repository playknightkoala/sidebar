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

    return {
      isToggle,
    };
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
    selected(newValue, oldValue) {
      this.data.forEach((item) => {
        if (newValue.indexOf(item.value) >= 0) {
          if (!this.open[item.value]) {
            this.toggle(item);
          }
        }
      });
    },
  },
  methods: {
    isOpen(item) {
      return this.open[item.value];
    },
    toggle(item) {
      if (item.value === this.isToggle) {
        this.$store.commit("setIsToggle", "");
      } else {
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
  },
  components: {
    SideBar: this,
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
