<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」以外のときは表示しない
    hiddenForm.value = newVal !== "武器";
  }
);
</script>

<template>
  <v-row v-if="!hiddenForm">
    <v-col>
      <v-text-field
        :rules="[required]"
        :model-value="itemInfo.atk_power_min"
        @update:model-value="itemInfo.atk_power_min = Number($event)"
        class="mt-4"
        label="最小攻撃力"
        type="number"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col>
      <v-text-field
      :rules="[required]"
        :model-value="itemInfo.atk_power_max"
        @update:model-value="itemInfo.atk_power_max = Number($event)"
        class="mt-4"
        label="最大攻撃力"
        type="number"
        variant="outlined"
        density="compact"
      />
    </v-col>
  </v-row>
</template>

<style scoped></style>
