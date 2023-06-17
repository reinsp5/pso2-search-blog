<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

const items = ["炎属性", "氷属性", "雷属性", "風属性", "光属性", "闇属性"];

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
      v-model="itemInfo.element"
      class="mt-4"
      label="属性"
      :items="items"
      variant="outlined"
      density="compact"
      clearable
    />
  </v-col>
</template>

<style scoped></style>
