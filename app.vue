<script lang="ts" setup>
import { mdiHome, mdiPencilPlus, mdiLogin, mdiAccountPlus } from "@mdi/js";
const drawer = ref(false);

const icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item :prepend-icon="mdiHome" title="ホーム" to="/" nuxt />
        <v-list-item
          :prepend-icon="mdiHome"
          title="アイテム登録"
          to="/item/create"
          nuxt
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
    <v-footer class="d-flex flex-column mx-0 px-0" app absolute>
      <div class="px-4 py-2 text-center w-100">
        {{ new Date().getFullYear() }} — <strong>PSO2アイテム検索</strong>
      </div>
    </v-footer>
  </v-app>
</template>
