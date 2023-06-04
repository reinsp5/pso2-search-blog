<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();
</script>

<template>
  <v-switch
    v-model="itemInfo.pso2Revival"
    color="success"
    :label="`PSO2リバイバル: ${itemInfo.pso2Revival ? '済' : '未済'}`"
    hide-details
    inset
  />
</template>

<style scoped></style>
