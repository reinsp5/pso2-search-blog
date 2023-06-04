<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
// 入力情報の共有State
const itemInfo = useInsertItemInfo();

const { database } = useAppwrite();

// 登録する
const insertItem = async () => {
  const insertData = JSON.stringify(itemInfo.value);
  console.log(insertData);

  const response = await database.createDocument(
    "647af1ca33b3c12a6cc7",
    "647af1d252fc2a26941f",
    uuidv4(),
    insertData
  );
};
</script>

<template>
  <v-btn
    block
    class="text-none mb-2"
    color="indigo"
    size="x-large"
    variant="flat"
    @click="insertItem"
  >
    登録する
  </v-btn>
</template>

<style scoped></style>
