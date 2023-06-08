<script lang="ts" setup>
import { getAuth } from "firebase/auth";

definePageMeta({
  middleware: ["auth"],
});

const signOut = async () => {
  const { signOut } = getAuth();
  try {
    await signOut();
    return await navigateTo("/");
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
