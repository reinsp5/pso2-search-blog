<script lang="ts" setup>
import {
  mdiHome,
  mdiPencilPlus,
  mdiLogin,
  mdiAccountPlus,
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiAccount,
  mdiPlusBox,
} from "@mdi/js";

const router = useRouter();
const currentPath = computed(
  () => `https://pso2-search.com${router.currentRoute.value.path}`
);
useSeoMeta({
  ogUrl: currentPath,
});

// ナビゲーションドロワーの開閉
const drawer = ref(false);

// テーマ情報
const { switchTheme, darkMode } = useAppTheme();

// ダークモード切り替え
const changeTheme = () => {
  switchTheme();
};

// ダークモードを確認
changeTheme();
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
      </template>

      <template v-slot:append>
        <v-icon color="primary" :icon="mdiWeatherSunny" />
        <v-switch
          v-model="darkMode"
          class="mx-2"
          color="success"
          inset
          hide-details
          @change="changeTheme"
        />
        <v-icon color="primary" class="mr-4" :icon="mdiWeatherNight" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary> </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
    <v-footer color="primary" app absolute>
      <v-row justify="center" no-gutters>
        <v-btn
          color="secondary"
          variant="text"
          class="mx-2"
          rounded="xl"
          to="/"
          nav
        >
          ホーム
        </v-btn>

        <v-col class="text-center mt-4" cols="12">
          <strong>PSO2 Search</strong> {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style></style>
