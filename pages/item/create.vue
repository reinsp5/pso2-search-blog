<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  getDocs,
  query,
  where,
  runTransaction,
} from "firebase/firestore";
import type { VForm } from "vuetify/lib/components/index.mjs";
import { v4 as uuidv4 } from "uuid";

// 認証必須
definePageMeta({
  middleware: ["auth"],
});

// 入力情報の共有State
const itemInfo = useInsertItemInfo();

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
  console.log(isValid);
  if (!isValid.valid) {
    loading.value = false;
    return;
  }

  // 画像アップロード用のURLを取得
  const responseUploadUrl = await fetch("/api/get-upload-url", {
    method: "POST",
  });
  const imageUploadURL = await responseUploadUrl.json();
  console.log(imageUploadURL);

  // 画像をアップロード
  const previewUrl = useState<string>("preview-url", () => "");
  const response = await fetch(previewUrl.value);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append("file", blob);
  const cloudflareResponse = await fetch(imageUploadURL.uploadURL, {
    method: "POST",
    body: formData,
  });

  // 画像のアップロードが失敗したらエラー
  if (!cloudflareResponse.ok) {
    throw new Error("画像のアップロードに失敗しました。");
  }
  console.log(cloudflareResponse);
  // データベースに登録
  const store = getFirestore();
  try {
    // <<トランザクション開始>>
    await runTransaction(store, async (transaction) => {
      // itemsコレクションを取得
      const querySnapshot = await getDocs(
        query(
          collection(store, "items"),
          where("name", "==", itemInfo.value.name)
        )
      );
      // 既に登録されている場合はエラー
      if (!querySnapshot.empty) {
        throw new Error("既に登録されている武器です。");
      }

      // ユーザ情報を取得
      const user = getAuth().currentUser;
      if (!user?.displayName) {
        throw new Error("ユーザ名が未指定です");
      }

      // ドキュメントを追加
      const docRef = await addDoc(collection(store, "items"), {
        ...itemInfo.value,
        id: uuidv4(),
        requirement: {
          ...itemInfo.value.requirement,
        },
        attribute: {
          ...itemInfo.value.attribute,
        },
        cover_image_url: {
          id: imageUploadURL.id,
          url: `https://imagedelivery.net/y6deFg4uWz5Imy5sDx3EYA/${imageUploadURL.id}/public`,
        },
        create_user: user?.displayName,
        update_user: user?.displayName,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      alert(e.message);
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
        <v-card class="mx-auto px-6 py-8" max-width="720">
          <v-card-title class="d-flex align-center justify-center text-h5">
            アイテム登録
          </v-card-title>
          <v-form
            ref="itemCreateForm"
            validate-on="input"
            @submit.prevent="createItem"
          >
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
