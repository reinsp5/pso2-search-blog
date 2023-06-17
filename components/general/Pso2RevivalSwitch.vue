<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();
</script>

<template>
  <v-col cols="12" md="6">
    <v-switch
      v-model="itemInfo.pso2_revival"
      color="success"
      :label="`PSO2リバイバル: ${itemInfo.pso2_revival ? '済' : '未済'}`"
      hide-details
      inset
    />
  </v-col>
</template>

<style scoped></style>
