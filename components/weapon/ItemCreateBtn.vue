<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

const { database, account } = useAppwrite();

// 登録する
const insertItem = async () => {
  const user = await account.get();
  itemInfo.value.createUser = user.name;
  itemInfo.value.updateUser = user.name;
  itemInfo.value.createdAt = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  itemInfo.value.updatedAt = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  let insertData = {
    ...itemInfo.value,
    // JSON文字列に変換
    attribute: JSON.stringify(itemInfo.value.attribute),
    requirement: JSON.stringify(itemInfo.value.requirement),
  }
  const insertDataStr = JSON.stringify(insertData);
  console.log(insertDataStr);

  const response = await database.createDocument(
    "647af1ca33b3c12a6cc7",
    "647c5b12d5c5cb9b7c27",
    uuidv4(),
    insertDataStr
  );
  console.log(response);
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
