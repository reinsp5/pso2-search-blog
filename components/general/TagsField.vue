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
    console.log(itemInfo.value.tags);
  },
  { immediate: true }
);
</script>

<template>
  <v-text-field
    v-model="tags"
    label="タグ"
    variant="outlined"
    density="comfortable"
    placeholder="タグは「#」ごとに認識されます。半角／全角スペースは削除されます。"
  />
</template>

<style scoped></style>
