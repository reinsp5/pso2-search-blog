<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 入手場所
const available_at = ref("");
watch(
  available_at,
  (newVal) => {
    itemInfo.value.available_at = newVal.split("\n");
    console.log(itemInfo.value.available_at);
  },
  { immediate: true }
);
</script>

<template>
  <v-textarea
          v-model="available_at"
          label="入手方法"
          variant="outlined"
          placeholder="入手方法は、改行単位で複数登録できます。"
        />
</template>

<style scoped></style>
