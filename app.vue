<script lang="ts" setup>
import { mdiHome, mdiPencilPlus, mdiLogin, mdiAccountPlus } from "@mdi/js";
const drawer = ref(false);

const routes = [
  { id: 1, title: "ホーム", path: "/", icon: mdiHome },
  { id: 2, title: "登録", path: "/signup", icon: mdiAccountPlus },
  { id: 3, title: "ログイン", path: "/signin", icon: mdiLogin },
  { id: 4, title: "アイテム登録", path: "/item/create", icon: mdiPencilPlus },
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
