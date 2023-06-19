<script lang="ts" setup>
const darkMode = useState("dark-mode");

useHead({
  title: "新規登録 | PSO2 Search Unofficial Item Search Engine",
});
</script>

<template>
  <v-row class="h-100" justify="center" align="center">
    <v-col cols="8" align="center">
      <v-img v-if="!darkMode" class="px-8" src="/images/logo.svg" max-width="960" />
      <v-img v-else class="px-8" src="/images/logo_dark.svg" max-width="960" />
    </v-col>
    <v-col class="mx-4">
      <SignUpForm />
    </v-col>
  </v-row>
</template>

<style scoped></style>
