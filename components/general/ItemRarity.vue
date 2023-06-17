<script lang="ts" setup>
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

const colors = [
  "blue",
  "blue",
  "blue",
  "green",
  "green",
  "green",
  "red",
  "red",
  "red",
  "blue-grey-lighten-1",
  "blue-grey-lighten-1",
  "blue-grey-lighten-1",
  "amber",
  "amber",
  "purple",
];
const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];
</script>

<template>
  <v-col cols="12">
    <span class="text-caption">レアリティ</span>
    <v-row class="mt-1">
      <v-col cols="auto">
        <v-rating
          v-model="itemInfo.rarity"
          :item-labels="labels"
          :length="labels.length"
          density="compact"
          class="d-flex flex-wrap"
        >
          <template v-slot:item-label="props">
            <span
              class="font-weight-black text-caption"
              :class="`text-${colors[props.index]}`"
            >
              {{ props.label }}
            </span>
          </template>
        </v-rating>
      </v-col>
    </v-row>
  </v-col>
</template>

<style scoped></style>
