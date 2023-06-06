<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」か「防具」以外のときは表示しない
    hiddenForm.value = newVal !== "武器" && newVal !== "防具";
  }
);
</script>

<template>
  <v-row v-if="!hiddenForm">
    <v-col>
      <v-text-field
        :model-value="itemInfo.requirement.min_level"
        @update:model-value="itemInfo.requirement.min_level = Number($event)"
        type="number"
        label="必要最小Lv."
        variant="outlined"
        density="comfortable"
        hide-details
      />
    </v-col>
  </v-row>
</template>

<style scoped></style>
