<script setup>
import SideBar from "../components/SideBar.vue";
import { ref } from "vue";

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
        value: "29e",
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

const selectOptions = ref(flattenTree(data.value));
const selectValue = ref("-");

function flattenTree(tree, parentValue = "") {
  let result = [];

  for (let node of tree) {
    let value = parentValue + (parentValue ? ";" : "") + node.value;
    result.push({ text: node.text, value: value });

    if (node.children && node.children.length > 0) {
      let children = flattenTree(node.children, value);
      result = result.concat(children);
    }
  }

  return result;
}
</script>

<template>
  <SideBar :data="data" :selected="selectValue"></SideBar>
  <select v-model="selectValue">
    <option>-</option>
    <option v-for="item in selectOptions" :value="item.value">{{ item.text }}</option>
  </select>
</template>

<style scoped></style>
