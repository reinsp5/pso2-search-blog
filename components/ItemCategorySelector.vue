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

// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";
</script>

<template>
  <v-select
    class="mt-4"
    label="カテゴリー"
    :items="items"
    variant="outlined"
    density="comfortable"
    :rules="[required]"
  ></v-select>
</template>

<style scoped></style>
