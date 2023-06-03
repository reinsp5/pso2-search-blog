<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
const { account } = useAppwrite();

const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div>
    <v-btn @click="signOut">ログアウト</v-btn>
  </div>
</template>

<style scoped></style>
