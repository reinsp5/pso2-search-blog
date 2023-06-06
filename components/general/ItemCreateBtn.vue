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
import { v4 as uuidv4 } from "uuid";
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 登録する
const insertItem = async () => {
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
  }
};
</script>

<template>
  <v-btn
    block
    class="text-none mt-8"
    color="indigo"
    size="x-large"
    variant="flat"
    @click="insertItem"
  >
    登録する
  </v-btn>
</template>

<style scoped></style>
