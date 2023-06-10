<script lang="ts" setup>
import { mdiCheckCircle, mdiCloseCircle } from "@mdi/js";
import { Item } from "~/types/item";
// 検索結果の共有State
const searchResults = useState<Item[]>("search-result", () => []);

const itemId = useRoute().params.id as string;

const item = computed(() => {
  return searchResults.value.find((item) => item.id === itemId) || new Item();
});

const stars = Array(item.value.rarity).fill("★");
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
  <v-container class="h-100 d-flex justify-center align-center">
    <v-card class="pa-4" max-width="960">
      <v-card-title class="d-flex align-center justify-center">
        <span class="text-body-1 text-md-h5 font-weight-bold">
          {{ item.name }}
        </span>
      </v-card-title>
      <v-row class="text-caption text-md-h6" align="center" no-gutters>
        <v-col class="my-2" align="center" cols="12">
          <!-- 画像 -->
          <v-img
            :src="item.cover_image_url.url"
            max-width="200"
            max-height="200"
          />
        </v-col>
        <v-col class="my-2" cols="12">
          <v-row>
            <!-- レアリティ -->
            <v-col>レアリティ</v-col>
            <v-col>
              <span
                v-for="(star, index) in stars"
                :key="index"
                :class="`text-${getClass(index)}`"
              >
                {{ star }}
              </span>
              <span>
                {{ `（${item.rarity}）` }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <!-- カテゴリ -->
        <v-col class="my-2">
          <v-row>
            <v-col>カテゴリ</v-col>
            <v-col>{{ item.category }}</v-col>
          </v-row>
        </v-col>
        <!-- サブカテゴリ（オプション） -->
        <v-col class="my-2" v-if="item.sub_category.length" cols="12">
          <v-row>
            <v-col>サブカテゴリ</v-col>
            <v-col>
              {{ item.sub_category }}
            </v-col>
          </v-row>
        </v-col>
        <!-- 武器種（オプション） -->
        <v-col class="my-2" v-if="item.weapon_type.length" cols="12">
          <v-row>
            <v-col>武器種</v-col>
            <v-col>
              {{ item.weapon_type }}
            </v-col>
          </v-row>
        </v-col>
        <!-- 属性（オプション） -->
        <v-col class="my-2" v-if="item.category === '武器'" cols="12">
          <v-row>
            <v-col>属性</v-col>
            <v-col>
              {{ item.element.length != 0 ? item.element : "なし" }}
            </v-col>
          </v-row>
        </v-col>
        <!-- 装備条件（オプション） -->
        <v-col
          class="my-2"
          v-if="item.category === '武器' || item.category === '防具'"
          cols="12"
        >
          <v-row>
            <v-col>必要最小レベル</v-col>
            <v-col> Lv.{{ item.requirement.min_level }} </v-col>
          </v-row>
        </v-col>
        <!-- マイショップ出品 -->
        <v-col
          class="my-2"
          v-if="item.category === '武器' || item.category === '防具'"
          cols="12"
        >
          <v-row>
            <v-col>マイショップ出品</v-col>
            <v-col>
              {{ item.tradeable ? "可能" : "不可" }}
            </v-col>
          </v-row>
        </v-col>
        <!-- PSO2リバイバル -->
        <v-col class="my-2">
          <v-row>
            <v-col>PSO2リバイバル</v-col>
            <v-col>{{ item.pso2_revival ? "済" : "未済" }}</v-col>
          </v-row>
        </v-col>
        <!-- 攻撃力（オプション） -->
        <v-col class="my-2" v-if="item.category === '武器'" cols="12">
          <v-row>
            <v-col>攻撃力</v-col>
            <v-col>
              {{ `${item.atk_power_min} 〜 ${item.atk_power_max}` }}
            </v-col>
          </v-row>
        </v-col>
        <!-- 防御力（オプション） -->
        <v-col class="my-2" v-if="item.category === '防具'" cols="12">
          <v-row>
            <v-col>防御力</v-col>
            <v-col>
              {{ `${item.def_power_min} 〜 ${item.def_power_max}` }}
            </v-col>
          </v-row>
        </v-col>
        <!-- 潜在能力（オプション） -->
        <v-col class="my-2" v-if="item.potentials.length" cols="12">
          <v-row>
            <v-col>潜在能力</v-col>
            <v-col>
              <v-sheet
                v-for="(potential, index) in item.potentials"
                :key="index"
              >
                {{ potential }}
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <!-- 入手方法 -->
        <v-col class="my-2" cols="12">
          <v-row>
            <v-col>入手方法</v-col>
            <v-col>
              <v-sheet
                v-for="(available, index) in item.available_at"
                :key="index"
                class="text-caption"
              >
                {{ available }}
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
        <!-- 備考 -->
        <v-col class="my-2" cols="12">
          <v-row>
            <v-col>備考</v-col>
            <v-col>
              Wiki:
              <a
                target="_blank"
                :href="`https://pso2ngs.swiki.jp/index.php?${item.name}`"
              >
                {{ item.name }}
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style></style>
