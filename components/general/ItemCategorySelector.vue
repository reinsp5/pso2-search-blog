<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 選択肢
const items: string[] = [
  "武器",
  "防具",
  "武器迷彩",
  "キャラクタークリエイト",
  "クリエイティブスペース",
  "消費アイテム",
  "素材アイテム",
  "マグフォルム",
  "ミュージックディスク",
  "その他",
];

// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";
</script>

<template>
  <v-col cols="12">
    <v-select
      v-model="itemInfo.category"
      class="mt-4"
      label="カテゴリー"
      :items="items"
      variant="outlined"
      density="compact"
      :rules="[required]"
    />
  </v-col>
</template>

<style scoped></style>
