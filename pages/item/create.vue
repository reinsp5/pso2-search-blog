<script lang="ts" setup></script>

<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center">
      <v-col>
        <v-card class="mx-auto px-6 py-8" max-width="720">
          <v-card-title class="d-flex align-center justify-center text-h5">アイテム登録</v-card-title>
          <v-form>
            <!-- 共通項目 -->
            <ItemNameField />
            <ItemMainImage />
            <ItemCategorySelector />
            <ItemSubCategorySelector />
            <ItemRarity />
            <v-row class="mt-0 mb-2">
              <v-col>
                <TradeableSwitch />
              </v-col>
              <v-col>
                <Pso2RevivalSwitch />
              </v-col>
            </v-row>
            <AvailableField />
            <TagsField />

            <!-- 個別項目 -->
            <ElementSelector />
            <PotentialSelector />
            <ColorVariantSwitch />
            <SpecialAbilitySelector />
            <RequirementFields />

            <!-- 武器 -->
            <WeaponTypeSelector />
            <AtkPowerField />

            <!-- 防具 -->
            <DefPowerField />
            <AttributeFields />

            <!-- 武器迷彩 -->
            <MountableWeaponTypesSelector />
          </v-form>
          <v-card-actions>
            <ItemCreateBtn />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
