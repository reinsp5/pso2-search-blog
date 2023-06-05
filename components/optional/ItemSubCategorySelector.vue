<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) => (hiddenForm.value ? true : !!v) || "必ず入力してください";

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリによって表示するフォームを切り替える
    switch (newVal) {
      case "武器":
      case "防具":
      case "武器迷彩":
      case "マグフォルム":
      case "ミュージックディスク":
        hiddenForm.value = true;
        items = [];
        break;
      case "キャラクタークリエイト":
        hiddenForm.value = false;
        items = characterCreateCategories;
        break;
      case "消費アイテム":
        hiddenForm.value = false;
        items = consumableItems;
        break;
    }
    console.log(itemInfo.value);
  },
);

// 選択肢
let items: string[] = [
  "武器",
  "防具",
  "武器迷彩",
  "キャラクタークリエイト",
  "消費アイテム",
  "素材アイテム",
  "その他",
];

const characterCreateCategories = [
  "顔",
  "ヘアスタイル",
  "瞳",
  "まゆ毛",
  "まつ毛",
  "口",
  "歯",
  "耳",
  "角",
  "フェイスペイント",
  "ボディペイント",
  "アクセサリー",
  "ステッカー",
  "ボイス",
  "モーション",
  "コスチューム",
  "セットウェア",
  "アウターウェア",
  "ベースウェア",
  "インナーウェア",
  "ボディパーツ",
  "アームパーツ",
  "レッグパーツ",
];

// 消費アイテム
const consumableItems = [
  "ロビーアクション",
  "モーション",
  "スタンプ",
  "特殊能力カプセル",
  "マイショップアイテム",
  "その他",
];

</script>

<template>
  <v-select
    v-if="!hiddenForm"
    v-model="itemInfo.sub_category"
    class="mt-4"
    label="サブカテゴリー"
    :items="items"
    :rules="[required]"
    variant="outlined"
    density="comfortable"
  />
</template>

<style scoped></style>
