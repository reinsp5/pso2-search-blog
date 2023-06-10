<script lang="ts" setup>
import { mdiCheckCircle, mdiCloseCircle } from "@mdi/js";
import { Item } from "~/types/item";

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
});

const stars = Array(props.item.rarity).fill("★");
const getClass = (index: number) => {
  // 3つごとに色を変える
  if (index < 3) {
    return "blue";
  } else if (index < 6) {
    return "green";
  } else if (index < 9) {
    return "red";
  } else if (index < 12) {
    return "blue-grey-lighten-1";
  } else if (index < 14) {
    return "amber";
  } else {
    return "purple";
  }
};
</script>

<template>
  <v-hover>
    <v-card variant="text" :to="`/item/${item.id}`" nav>
      <v-row>
        <v-avatar size="128" class="ma-8">
          <v-img :src="item.cover_image_url.url" />
        </v-avatar>
        <v-col class="d-flex flex-column my-4">
          <div class="text-h5">
            {{ item.name }}
          </div>
          <v-sheet class="d-flex flex-wrap flex-column mt-1 text-body-2">
            <v-sheet>カテゴリ：{{ item.category }}</v-sheet>
            <v-sheet class="flex-grow-1">
              レアリティ：
              {{ item.rarity }}
              <span
                v-for="(star, index) in stars"
                :key="index"
                :class="`text-${getClass(index)}`"
              >
                {{ star }}
              </span>
            </v-sheet>
            <v-sheet class="flex-grow-1">
              マイショップ出品：
              <v-icon
                :icon="item.tradeable ? mdiCheckCircle : mdiCloseCircle"
                :color="item.tradeable ? 'success' : 'error'"
              />
            </v-sheet>
            <v-sheet class="flex-grow-1">
              PSO2リバイバル品：
              <span :color="item.tradeable ? 'success' : 'error'">
                {{ item.pso2_revival ? "YES" : "NO" }}
              </span>
            </v-sheet>
          </v-sheet>
          <v-row class="text-body-2 w-50">
            <v-col>
              タグ：<v-chip
                v-for="(tag, index) in item.tags"
                :key="index"
                :text="tag"
                :class="{ 'd-none': tag == '' }"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<style></style>
