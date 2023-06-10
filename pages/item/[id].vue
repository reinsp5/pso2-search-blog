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
  <v-container>
    <v-card class="pa-4">
      <v-sheet class="d-flex">
        <v-sheet>
          <!-- 画像 -->
          <v-img
            :src="item.cover_image_url.url"
            max-width="256"
            max-height="256"
          />
        </v-sheet>
        <v-sheet class="ml-2 w-100">
          <span class="text-h4">{{ item.name }}</span>
          <v-table class="mt-4 w-100">
            <tbody>
              <tr class="text-h5">
                <td style="width: 175px !important;">レアリティ：</td>
                <td>
                  <span
                    v-for="(star, index) in stars"
                    :key="index"
                    :class="`text-${getClass(index)}`"
                    class="text-h4"
                  >
                    {{ star }}
                  </span>
                  <span class="text-h4">
                    {{ `（${item.rarity}）` }}
                  </span>
                </td>
              </tr>

              <tr>
                <td>カテゴリ</td>
                <td>{{ item.category }}</td>
              </tr>

              <!-- サブカテゴリ（オプション） -->
              <tr v-if="item.sub_category.length">
                <td>サブカテゴリ</td>
                <td>
                  {{ item.sub_category }}
                </td>
              </tr>

              <!-- 武器種（オプション） -->
              <tr v-if="item.weapon_type.length">
                <td>武器種</td>
                <td>
                  {{ item.weapon_type }}
                </td>
              </tr>

              <!-- 属性（オプション） -->
              <tr v-if="item.category === '武器'">
                <td>属性</td>
                <td>
                  {{ item.element.length != 0 ? item.element : "なし" }}
                </td>
              </tr>
              <!-- 装備条件（オプション） -->
              <tr v-if="item.category === '武器' || item.category === '防具'">
                <td>必要最小レベル</td>
                <td>Lv.{{ item.requirement.min_level }}</td>
              </tr>

              <!-- マイショップ出品 -->
              <tr>
                <td>マイショップ出品</td>
                <td>
                  {{ item.tradeable ? "可能" : "不可" }}
                  <v-icon
                    :icon="item.tradeable ? mdiCheckCircle : mdiCloseCircle"
                    :color="item.tradeable ? 'green' : 'red'"
                  />
                </td>
              </tr>

              <!-- PSO2リバイバル -->
              <tr>
                <td>PSO2リバイバル</td>
                <td>
                  {{ item.pso2_revival ? "済" : "未済" }}
                </td>
              </tr>

              <!-- 攻撃力（オプション） -->
              <tr v-if="item.category === '武器'">
                <td>攻撃力</td>
                <td>
                  {{ `${item.atk_power_min} 〜 ${item.atk_power_max}` }}
                </td>
              </tr>

              <!-- 防御力（オプション） -->
              <tr v-if="item.category === '防具'">
                <td>防御力</td>
                <td>
                  {{ `${item.def_power_min} 〜 ${item.def_power_max}` }}
                </td>
              </tr>

              <!-- 潜在能力（オプション） -->
              <tr v-if="item.potentials.length">
                <td>潜在能力</td>
                <td>
                  <ul>
                    <li
                      v-for="(potential, index) in item.potentials"
                      :key="index"
                      class="mt-2"
                    >
                      {{ potential }}
                    </li>
                  </ul>
                </td>
              </tr>

              <!-- 入手方法 -->
              <tr>
                <td>入手方法</td>
                <td class="pb-2">
                  <ul>
                    <li
                      v-for="(available, index) in item.available_at"
                      :key="index"
                      class="mt-2"
                    >
                      {{ available }}
                    </li>
                  </ul>
                </td>
              </tr>

              <!-- 備考 -->
              <tr>
                <td>備考</td>
                <td class="pb-2">
                  Wiki:
                  <a
                    target="_blank"
                    :href="`https://pso2ngs.swiki.jp/index.php?${item.name}`"
                  >
                    {{ item.name }}
                  </a>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<style>

</style>
