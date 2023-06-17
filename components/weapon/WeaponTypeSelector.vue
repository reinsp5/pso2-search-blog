<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 選択肢
const items: string[] = [
  "ソード",
  "ワイヤードランス",
  "パルチザン",
  "ツインダガー",
  "ダブルセイバー",
  "ナックル",
  "カタナ",
  "デュアルブレード",
  "アサルトライフル",
  "ランチャー",
  "ツインマシンガン",
  "バレットボウ",
  "ガンスラッシュ",
  "ロッド",
  "タリス",
  "ウォンド",
  "ジェットブーツ",
  "タクト",
];

// フォームの表示・非表示
const hiddenForm = ref(true);

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」以外のときは表示しない
    hiddenForm.value = newVal !== "武器";
  },
  { immediate: true }
);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";
</script>

<template>
  <v-col cols="12">
    <v-select
      v-if="!hiddenForm"
      v-model="itemInfo.weapon_type"
      class="mt-4"
      label="武器種"
      :items="items"
      variant="outlined"
      density="compact"
      :rules="[required]"
    />
  </v-col>
</template>

<style scoped></style>
