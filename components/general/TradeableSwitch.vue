<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();
</script>

<template>
  <v-switch
    v-model="itemInfo.tradeable"
    color="success"
    :label="`マイショップ出品: ${itemInfo.tradeable ? '可能' : '不可'}`"
    hide-details
    inset
  />
</template>

<style scoped></style>
