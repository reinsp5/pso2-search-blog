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
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

// 登録する
const insertItem = async () => {
  const store = getFirestore();

  // 既存のデータがあるか確認
  const querySnapshot = await getDocs(
    query(
      collection(store, "items"),
      where("name", "==", itemInfo.value.name)
    )
  );
  if (!querySnapshot.empty) {
    alert("既に登録されている武器です。");
    return;
  }

  const user = await getAuth().currentUser;
  console.log(itemInfo.value);
  const docRef = await addDoc(collection(store, "items"), {
    ...itemInfo.value,
    id: uuidv4(),
    requirement: {
      ...itemInfo.value.requirement
    },
    attribute: {
      ...itemInfo.value.attribute
    },
    create_user: user?.displayName || user?.email,
    update_user: user?.displayName,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  console.log(docRef);
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
