<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

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
</script>

<template>
  <v-col v-if="!hiddenForm" cols="12">
    <v-switch
      v-model="itemInfo.color_variant"
      color="success"
      :label="`カラー変更: ${itemInfo.color_variant ? '可能' : '不可'}`"
      hide-details
      inset
    />
  </v-col>
</template>

<style scoped></style>
