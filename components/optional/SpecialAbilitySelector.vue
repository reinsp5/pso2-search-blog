<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

const items = [
  "セズン・ルーナフィーヴ",
  "セズン・オートナルフィーヴ",
  "セズン・ヴィンターフィーヴ",
  "セズン・スプリングフィーヴ",
  "セズン・セクンダアニバフィーヴ",
];

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」以外のときは表示しない
    hiddenForm.value = newVal !== "武器";
  },
  { immediate: true }
);
</script>

<template>
  <v-col v-if="!hiddenForm" cols="12">
  <v-select
    v-model="itemInfo.special_abilities"
    class="mt-4"
    label="特殊能力"
    :items="items"
    :rules="[required]"
    variant="outlined"
    density="compact"
    multiple
  />
</v-col>
</template>

<style scoped></style>
