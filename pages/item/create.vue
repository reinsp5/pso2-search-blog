<script lang="ts" setup>
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
  runTransaction,
  getDoc,
  doc,
} from "firebase/firestore";
import type { VForm } from "vuetify/lib/components/index.mjs";
import { v4 as uuidv4 } from "uuid";
import { Item } from "~/types/item";
import { useImageUpload } from "~/composables/useImageUpload";
import { DirectUploadURLResponse } from "~/types/cloudflareResponse";

// 認証必須
definePageMeta({
  middleware: ["auth"],
});

// SEO情報
useSeoMeta({
  title: "アイテム情報登録 | PSO2 Search Unofficial Item Search Engine",
});

// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// アイテムフォーム
const itemCreateForm = ref<VForm | null>(null);
const images = useState<File[]>("preview-images");

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

  // 画像アップロード用のURLを取得
  const { getUploadUrl } = useImageUpload();
  const uploadUrl = getUploadUrl();

  // 画像アップロード用のURLが取得できなかったらエラー
  if (!uploadUrl) {
    loading.value = false;
    return;
  } else if (!uploadUrl.success) {
    loading.value = false;
    return;
  }

  // 画像をアップロード
  const previewUrl = useState<string>("preview-url", () => "");
  const response = await fetch(previewUrl.value);
  const fileBlob = await response.blob();
  const formData = new FormData();
  formData.append("file", fileBlob);
  const { data } = useFetch<DirectUploadURLResponse>(uploadUrl.uploadURL, {
    method: "POST",
    body: formData,
  });

  // 画像のアップロードが失敗したらエラー
  if (!data) {
    throw new Error("画像のアップロードに失敗しました。");
  } else if (!data.value!.success) {
    throw new Error("画像のアップロードに失敗しました。");
  }

  // データベースに登録
  const { $auth, $store } = useNuxtApp();
  try {
    // <<トランザクション開始>>
    await runTransaction($store, async (transaction) => {
      // itemsコレクションを取得
      const querySnapshot = await getDocs(
        query(
          collection($store, "items"),
          where("name", "==", itemInfo.value.name)
        )
      );
      // 既に登録されている場合はエラー
      if (!querySnapshot.empty) {
        throw new Error("既に登録されている武器です。");
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

      // ドキュメントを追加
      const docRef = await addDoc(collection($store, "items"), {
        ...itemInfo.value,
        id: uuidv4(),
        requirement: {
          ...itemInfo.value.requirement,
        },
        attribute: {
          ...itemInfo.value.attribute,
        },
        cover_image_url: {
          id: data.value?.result.id,
          url: `https://imagedelivery.net/y6deFg4uWz5Imy5sDx3EYA/${data.value?.result.id}/public`,
        },
        create_user: userDoc.get("displayName") ?? "unknown",
        update_user: userDoc.get("displayName") ?? "unknown",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
    });
    // <<トランザクション終了>>

    // フォームをリセット
    itemCreateForm.value.reset();
    itemInfo.value = new Item();
    previewUrl.value = "";
    images.value = [];
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
              <!-- 共通項目 -->
              <ItemNameField />
              <ItemMainImage />
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
                登録する
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
