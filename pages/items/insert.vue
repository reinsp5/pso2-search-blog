<script lang="ts" setup>

// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 必須入力チェック
const required = (v: string) => !!v || "必ず入力してください";

// 文字数制限
const limitLength = (v: string) =>
  (v && v.length <= 20) || "20文字以内で入力してください";

// タグ
const tags = ref("");
watch(
  tags,
  (newVal) => {
    itemInfo.value.tags = newVal
      .replace(/[\s　]/g, "")
      .split("#")
      .filter((tag) => tag.length > 0);
    console.log(itemInfo.value.tags);
  },
  { immediate: true }
);

</script>

<template>
  <v-container>
    <v-card class="mx-auto px-6 py-8" max-width="720">
      <v-card-title class="text-center">アイテム登録</v-card-title>
      <v-form>
        <v-text-field
          v-model="itemInfo.name"
          label="アイテム名"
          variant="outlined"
          density="comfortable"
          :rules="[required, limitLength]"
          counter="20"
        />
        <ItemCategorySelector />
        <ItemSubCategorySelector />
        <ItemRarity />
        <WeaponTypeSelector />
        <ElementSelector />
        <AtkPowerField />
        <PotentialSelector />
        <SpecialAbilitySelector />
        <v-row class="mt-0">
          <v-col>
            <v-switch
              v-model="itemInfo.tradeable"
              :label="`マイショップ出品: ${
                itemInfo.tradeable ? '可能' : '不可'
              }`"
              hide-details
              inset
            />
          </v-col>
          <v-col>
            <v-switch
              v-model="itemInfo.pso2Revival"
              :label="`PSO2リバイバル: ${itemInfo.pso2Revival ? '済' : '未済'}`"
              hide-details
              inset
            />
          </v-col>
        </v-row>
        <ColorVariantSwitch class="mb-2" />
        <AvailableField />
        <v-text-field
          v-model="tags"
          label="タグ"
          variant="outlined"
          density="comfortable"
          placeholder="タグは「#」ごとに認識されます。半角／全角スペースは削除されます。"
        />
        <ItemInsertBtn />
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped></style>
