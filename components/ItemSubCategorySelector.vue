<script lang="ts" setup>
// 選択肢
const items: string[] = [
  "武器",
  "防具",
  "武器迷彩",
  "キャラクタークリエイト",
  "消費アイテム",
  "素材アイテム",
  "その他",
];
</script>

<template>
  <v-select
    class="mt-4"
    label="サブカテゴリー"
    :items="items"
    variant="outlined"
    density="comfortable"
  ></v-select>
</template>

<style scoped></style>
