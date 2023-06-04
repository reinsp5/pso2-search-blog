<script lang="ts" setup>
// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";

// 文字数制限
const limitLength = (v: string) =>
  (v && v.length <= 20) || "20文字以内で入力してください";
</script>

<template>
  <v-container>
    <v-card class="mx-auto px-6 py-8" max-width="720">
      <v-card-title class="text-center">アイテム登録</v-card-title>
      <v-form>
        <v-text-field
          label="アイテム名"
          variant="outlined"
          density="comfortable"
          :rules="[required, limitLength]"
          counter="20"
        />
        <ItemCategorySelector />
        <ItemSubCategorySelector />
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped></style>
