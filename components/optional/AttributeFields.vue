<script lang="ts" setup>
import { Attribute } from "@/types/item";
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// フォームの表示・非表示
const hiddenForm = ref(true);

// 表示中のときは必須入力チェック
const required = (v: string) =>
  (hiddenForm.value ? true : !!v) || "必ず入力してください";

// カテゴリフィールドの変化を監視する
watch(
  () => itemInfo.value.category,
  (newVal) => {
    // カテゴリーが「武器」か「防具」以外のときは表示しない
    hiddenForm.value = newVal !== "防具";
  }
);

// 属性フィールドの変化を監視する
const attributes = reactive<Attribute>(new Attribute());
watch(
  () => ({ ...attributes }),
  (newVal) => {
    itemInfo.value.attribute = itemInfo.value.attribute || <Attribute>{};
    console.log(newVal);
    itemInfo.value.attribute = newVal;
    console.log(itemInfo.value.attribute);
  }
);
</script>

<template>
  <!-- 攻撃上昇１ -->
  <div v-if="!hiddenForm">
    <div class="text-caption mb-2">威力上昇系</div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="attributes.s_atk_up"
          type="number"
          label="打撃上昇"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.r_atk_up"
          type="number"
          label="射撃上昇"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.t_atk_up"
          type="number"
          label="法撃上昇"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
    </v-row>

    <!-- 攻撃上昇２ -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="attributes.hp_up"
          type="number"
          label="ＨＰ上昇"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.pp_up"
          type="number"
          label="ＰＰ上昇"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-spacer />
      </v-col>
    </v-row>

    <!-- 防御上昇１ -->
    <div class="text-caption mt-4 mb-2">耐性上昇系</div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="attributes.damage_resist"
          type="number"
          label="ダメージ耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.burn_resist"
          type="number"
          label="炎耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.freeze_resist"
          type="number"
          label="氷耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
    </v-row>

    <!-- 防御上昇２ -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="attributes.shock_resist"
          type="number"
          label="雷耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.mirage_resist"
          type="number"
          label="風耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.panick_resist"
          type="number"
          label="光耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
    </v-row>

    <!-- 防御上昇３ -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="attributes.poison_resist"
          type="number"
          label="闇耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.pain_resist"
          type="number"
          label="ペイン耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="attributes.env_resist"
          type="number"
          label="環境耐性"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
