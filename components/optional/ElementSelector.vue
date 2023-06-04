<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

const items = [
  "無し",
  "炎属性",
  "氷属性",
  "雷属性",
  "風属性",
  "光属性",
  "闇属性",
];

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」以外のときは表示しない
    hiddenForm.value = newVal !== "武器";
  },
);
</script>

<template>
  <v-select
    v-if="!hiddenForm"
    v-model="itemInfo.element"
    class="mt-4"
    label="属性"
    :items="items"
    :rules="[required]"
    variant="outlined"
    density="comfortable"
  />
</template>

<style scoped></style>
