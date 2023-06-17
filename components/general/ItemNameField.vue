<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";

// 文字数制限
const limitLength = (v: string) =>
  (v && v.length <= 20) || "20文字以内で入力してください";
</script>

<template>
  <v-col cols="12">
  <v-text-field
    v-model="itemInfo.name"
    class="mt-4"
    label="アイテム名"
    variant="outlined"
    density="compact"
    :rules="[required, limitLength]"
    counter="20"
  />
</v-col>
</template>

<style scoped></style>
