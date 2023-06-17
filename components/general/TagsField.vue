<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// タグ
const tags = ref("");
watch(
  tags,
  (newVal) => {
    itemInfo.value.tags = newVal
      .replace(/[\s　]/g, "")
      .split("#")
      .filter((tag) => tag.length > 0);
  },
  { immediate: true }
);
</script>

<template>
  <v-col cols="12">
    <v-text-field
      v-model="tags"
      class="mt-4"
      label="タグ"
      variant="outlined"
      density="compact"
      placeholder="タグは「#」ごとに認識されます。半角／全角スペースは削除されます。"
    />
  </v-col>
</template>

<style scoped></style>
