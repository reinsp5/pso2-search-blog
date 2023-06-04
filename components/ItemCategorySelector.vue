<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 選択肢
const items: string[] = [
  "武器",
  "防具",
  "武器迷彩",
  "キャラクタークリエイト",
  "消費アイテム",
  "素材アイテム",
  "マグフォルム",
  "ミュージックディスク",
  "その他",
];

// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリが変わったらサブカテゴリを初期化
    resetOptionalFields();
  }
);

const resetOptionalFields = () => {
  delete (itemInfo.value as any).subCategory;
  delete (itemInfo.value as any).weaponType;
  delete (itemInfo.value as any).requirement;
  delete (itemInfo.value as any).atkPowerMin;
  delete (itemInfo.value as any).atkPowerMax;
  delete (itemInfo.value as any).defPowerMin;
  delete (itemInfo.value as any).defPowerMax;
  delete (itemInfo.value as any).attribute;
  delete (itemInfo.value as any).mountableWeaponTypes;
  delete (itemInfo.value as any).melodies;
  delete (itemInfo.value as any).hiddenDecoration;
  delete (itemInfo.value as any).colorVariant;
};
</script>

<template>
  <v-select
    v-model="itemInfo.category"
    class="mt-4"
    label="カテゴリー"
    :items="items"
    variant="outlined"
    density="comfortable"
    :rules="[required]"
  ></v-select>
</template>

<style scoped></style>
