<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

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

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」以外のときは表示しない
    hiddenForm.value = newVal !== "武器迷彩";
  }
);
</script>

<template>
  <v-col cols="12">
    <v-select
      v-if="!hiddenForm"
      v-model="itemInfo.mountable_weapon_types"
      class="mt-4"
      label="適用可能武器種"
      :items="items"
      :rules="[required]"
      variant="outlined"
      density="compact"
      multiple
    />
  </v-col>
</template>

<style scoped></style>
