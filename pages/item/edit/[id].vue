<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import { doc, getDoc, runTransaction, Timestamp } from "firebase/firestore";
import type { VForm } from "vuetify/lib/components/index.mjs";
import { Item } from "~/types/item";

// 認証必須
definePageMeta({
  middleware: ["auth"],
});

// 入力情報の共有State
const itemInfo = useInsertItemInfo();

const config = useRuntimeConfig();
const item = ref(new Item());

// URLクエリからアイテムIDを取得
const itemId = useRoute().params.id as string;
const docUid = ref("");
console.log(itemId);
// アイテム情報の取得
const itemDoc = async () => {
  const response = await fetch(
    "https://search.reinsp5.com/indexes/pso2-items/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.public.meilisearchApiKey}`,
      },
      body: JSON.stringify({
        filter: `id = ${itemId}`,
      }),
    }
  );
  const json = await response.json();
  console.log(json);
  docUid.value = json.hits[0]._firestore_id;
  itemInfo.value = (json.hits[0] as Item) || new Item();
};

await itemDoc();

// アイテムフォーム
const itemCreateForm = ref<VForm | null>(null);

// ローディング
const loading = ref(false);

// 登録する
const createItem = async () => {
  loading.value = true;
  if (!itemCreateForm.value) {
    loading.value = false;
    return;
  }
  // バリデーション
  const isValid = await itemCreateForm.value.validate();
  if (!isValid.valid) {
    loading.value = false;
    return;
  }

  const { $store, $auth } = useNuxtApp();
  const updateDocRef = doc($store, "items", docUid.value);
  try {
    // <<トランザクション開始>>
    await runTransaction($store, async (transaction) => {
      // 更新対象のドキュメントを取得する
      const sfDoc = await transaction.get(updateDocRef);

      // 既に登録されている場合はエラー
      if (!sfDoc.exists()) {
        throw new Error("アイテムが存在しません！");
      }

      // ユーザ情報を取得
      const user = $auth.currentUser;
      if (!user) {
        throw new Error("ユーザ情報が取得できませんでした。");
      } else if (!user.uid) {
        throw new Error("ユーザ情報が取得できませんでした。");
      }
      const userDoc = await getDoc(doc($store, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("ユーザ情報が取得できませんでした。");
      }

      // ドキュメントを更新する
      transaction.update(updateDocRef, {
        ...itemInfo.value,
        requirement: {
          ...itemInfo.value.requirement,
        },
        attribute: {
          ...itemInfo.value.attribute,
        },
        update_user: userDoc.get("displayName") ?? "unknown",
        updated_at: Timestamp.now(),
      });
    });
    // <<トランザクション終了>>

    // フォームをリセット
    itemCreateForm.value.reset();
    itemInfo.value = new Item();
    
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center">
      <v-col>
        <v-card class="mx-auto" variant="flat" max-width="720">
          <v-card-title class="d-flex align-center justify-center text-h5">
            アイテム登録
          </v-card-title>
          <v-form
            ref="itemCreateForm"
            validate-on="input"
            @submit.prevent="createItem"
          >
            <v-row no-gutters>
              <v-col>
                <v-img :src="itemInfo.cover_image_url.url" />
              </v-col>
              <!-- 共通項目 -->
              <ItemNameField />
              <ItemCategorySelector />
              <ItemSubCategorySelector />
              <ItemRarity />
              <TradeableSwitch />
              <Pso2RevivalSwitch />
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
            </v-row>
            <v-card-actions>
              <v-btn
                :loading="loading"
                class="text-none mt-8"
                color="blue-darken-4"
                size="x-large"
                variant="flat"
                type="submit"
                block
              >
                編集する
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
