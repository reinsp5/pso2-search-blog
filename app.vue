<script lang="ts" setup>
import { mdiHome, mdiAccount } from "@mdi/js";
const drawer = ref(false);

const routes = [
  { id: 1, title: "ホーム", path: "/", icon: mdiHome },
  { id: 2, title: "アカウント", path: "/account", icon: mdiAccount },
];
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>PSO2アイテムデータベース（仮）</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item
          v-for="route in routes"
          :key="route.id"
          :prepend-icon="route.icon"
          :title="route.title"
          :to="route.path"
          nuxt
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
