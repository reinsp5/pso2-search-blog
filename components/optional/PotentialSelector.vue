<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

const items = [
  "牙城の型",
  "会心の型",
  "渇気の型",
  "環気の型",
  "緩癒の型",
  "気功の型",
  "気巡の型",
  "偶機討滅の型",
  "継撃の型",
  "堅強の型",
  "堅城の型",
  "攻勢の陣",
  "採気の型",
  "守勢の陣",
  "収気の型",
  "瞬撃の型",
  "瞬避の型",
  "迅撃の型",
  "寸避の型",
  "積城の型",
  "節制の型",
  "穿石の型",
  "閃烈の型",
  "即撃の型",
  "鍛業の式",
  "追撃の型",
  "転気の型",
  "闘志の型",
  "爆領の型",
  "不屈の型",
  "妙手の型",
  "無創の型",
  "迷塞の型",
  "猛滅の型",
  "勇健の型",
  "勇猛の型",
  "理巡の型",
  "理放の型",
  "理流の型",
  "累堅の型",
  "渾身の型",
  "蹂躙の型",
];

// const potentials = ref<string[]>([]);
// watch(
//   () => potentials.value,
//   (newVal) => {
//     itemInfo.value.potentials = newVal;
//   }
// );

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
      v-model="itemInfo.potentials"
      class="mt-4"
      label="潜在能力"
      :items="items"
      :rules="[required]"
      variant="outlined"
      density="compact"
      multiple
    />
  </v-col>
</template>

<style scoped></style>
