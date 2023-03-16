<script setup>
import { ref } from "vue";

const arrowDirection = ref("right");
const data = ref([
  {
    text: "好喝黑糖",
    value: "64f",
    children: [
      {
        text: "黑糖鮮奶",
        value: "445",
        children: [
          { text: "黑糖珍珠鮮奶", value: "37a", children: [] },
          { text: "黑糖芋圓鮮奶", value: "feb", children: [] },
          { text: "黑糖蒟蒻鮮奶", value: "59c", children: [] },
        ],
      },
      {
        text: "黑糖冬瓜",
        value: "445",
        children: [
          { text: "黑糖冬瓜牛奶", value: "ac3", children: [] },
          { text: "黑糖冬瓜珍珠", value: "ca0", children: [] },
        ],
      },
    ],
  },
  {
    text: "茶",
    value: "6c3",
    children: [
      {
        text: "烏龍茶",
        value: "5dc",
        children: [],
      },
      {
        text: "綠茶",
        value: "b5f",
        children: [],
      },
      {
        text: "紅茶",
        value: "b09",
        children: [],
      },
      {
        text: "青茶",
        value: "887",
        children: [],
      },
    ],
  },
  {
    text: "咖啡",
    value: "c81",
    children: [
      {
        text: "黑咖啡",
        value: "e02",
        children: [
          { text: "濃縮咖啡", value: "d20", children: [] },
          { text: "美式咖啡", value: "1f8", children: [] },
        ],
      },
      {
        text: "牛奶咖啡",
        value: "d7a",
        children: [
          {
            text: "拿鐵",
            value: "c09",
            children: [
              { text: "黑糖拿鐵", value: "db2", children: [] },
              { text: "榛果拿鐵", value: "9f6", children: [] },
              { text: "香草拿鐵", value: "b61", children: [] },
            ],
          },
        ],
      },
      {
        text: "卡布奇諾",
        value: "9ac",
        children: [],
      },
      {
        text: "摩卡",
        value: "ce8",
        children: [],
      },
    ],
  },
]);

function turn() {
  return (arrowDirection.value = arrowDirection.value === "right" ? "bottom" : "right");
}
</script>

<template>
  <ul v-for="root in data">
    <li>
      <a href="#" @click="turn"
        >{{ root.text }}
        <i :class="arrowDirection" class="arrow"></i>
      </a>
      <ul>
        <li v-for="second in root.children">
          <a href="#" @click="turn"
            >{{ second.text }}
            <i :class="arrowDirection" class="arrow"></i>
          </a>
          <ul>
            <li v-for="third in second.children">
              <a href="#" @click="turn"
                >{{ third.text }}
                <i :class="arrowDirection" class="arrow"></i>
              </a>
              <ul>
                <li v-for="four in third.children">
                  <a href="#" @click="turn"
                    >{{ four.text }}
                    <i :class="arrowDirection" class="arrow"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

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

.bottom {
  transform: rotate(45deg);
}
</style>
