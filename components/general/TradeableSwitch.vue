<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();
</script>

<template>
  <v-col cols="12" md="6">
    <v-switch
      v-model="itemInfo.tradeable"
      color="success"
      :label="`マイショップ出品: ${itemInfo.tradeable ? '可能' : '不可'}`"
      hide-details
      inset
    />
  </v-col>
</template>

<style scoped></style>
