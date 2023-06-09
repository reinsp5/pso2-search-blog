<script lang="ts" setup>
import { mdiHome, mdiPencilPlus, mdiLogin, mdiAccountPlus } from "@mdi/js";
const drawer = ref(false);

</script>

<template>
  <v-app>
    <v-app-bar :elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>PSO2アイテムデータベース（仮）</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item :prepend-icon="mdiHome" title="ホーム" to="/" nuxt />
        <v-list-item :prepend-icon="mdiHome" title="登録" to="/signup" nuxt />
        <v-list-item :prepend-icon="mdiHome" title="ログイン" to="/signin" nuxt />
        <v-list-item :prepend-icon="mdiHome" title="アイテム登録" to="/item/create" nuxt />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
