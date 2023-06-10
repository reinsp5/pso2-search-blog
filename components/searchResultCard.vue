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
    <v-card max-width="400" variant="text" :to="`/item/${item.id}`" nav>
      <v-card-title class="text-body-1 text-md-h5 font-weight-bold">
        {{ item.name }}
      </v-card-title>
      <v-row class="ma-4" align="center" justify="center" no-gutters>
        <v-col align="center" cols="12">
          <v-avatar size="200" class="ma-8">
            <v-img :src="item.cover_image_url.url" />
          </v-avatar>
        </v-col>
        <!-- レアリティ -->
        <v-col cols="12">
          <v-row>
            <v-col> レアリティ </v-col>
            <v-col>
              <span
                v-for="(star, index) in stars"
                :key="index"
                :class="`text-${getClass(index)}`"
              >
                {{ star }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <!-- カテゴリ -->
        <v-col cols="12">
          <v-row>
            <v-col> カテゴリ </v-col>
            <v-col>
              {{ item.category }}
            </v-col>
          </v-row>
        </v-col>
        <!-- マイショップ出品可否 -->
        <v-col cols="12">
          <v-row>
            <v-col> マイショップ出品 </v-col>
            <v-col>
              <v-icon
                :icon="item.tradeable ? mdiCheckCircle : mdiCloseCircle"
                :color="item.tradeable ? 'success' : 'error'"
              />
            </v-col>
          </v-row>
        </v-col>
        <!-- PSO2リバイバル品 -->
        <v-col cols="12">
          <v-row>
            <v-col> PSO2リバイバル品 </v-col>
            <v-col>
              <span :color="item.tradeable ? 'success' : 'error'">
                {{ item.pso2_revival ? "済" : "未済" }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <!-- タグ -->
        <v-col cols="12">
          <v-row>
            <v-col> タグ </v-col>
            <v-col>
              <v-chip
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
