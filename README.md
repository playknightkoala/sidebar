# 環境

[![npm version](https://img.shields.io/badge/npm-v8.19.3-blue.svg)](#)
[![nodejs version](https://img.shields.io/badge/Node%20JS-v18.13.0-blue.svg)](#)
[![nodejs version](https://img.shields.io/badge/Vue-v3.2.47-blue.svg)](#)
[![nodejs version](https://img.shields.io/badge/Vite-v4.2.0-blue.svg)](#)
# 專案說明
側欄下拉式選單實做。

功能：
1. 根據提供的資料，長出可展開和收合的元件。
2. 每個項目都可以點擊，點擊後，highlight 選取中的項目，若該項目有子元素，會展開該層。
3. 一次只會有一個展開且 highlight 的項目。
4. 提供一個下拉式選單，需包含所有種類。從下拉選單中選取任一項目時，等同點擊該項目。
5. 記憶功能，關閉分頁後再開啟，可以顯示上次選取的項目。

如在考量在支援最多一百層的結構下，在這麼多層的情況下可能會造成記憶體不足及畫面卡頓問題，歸納以下解決方式：

1. 使用分頁和搜尋功能：提供搜尋功能讓使用者可以快速找到要選的項目，分頁功能則減少單頁物件過多問題。
2. lazy load：有進行點選展開或動作才進行項目的渲染，可以減少單次渲染過多物件問題。

# 使用說明

```shell
npm install
```
```shell
npm npm run dev
```
