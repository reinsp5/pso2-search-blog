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
import { useTheme } from "vuetify";
import { MAIN_THEME, MAIN_DARK_THEME } from "@/helpers/themes";
const drawer = ref(false);
const darkMode = useState("dark-mode", () => false);
const theme = useTheme();
const changeTheme = () => {
  theme.global.name.value = darkMode.value ? MAIN_DARK_THEME : MAIN_THEME;
};

const { checkAuthState, isAuthed } = useAuth();
await checkAuthState();
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
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item :prepend-icon="mdiHome" title="ホーム" to="/" nuxt />
        <v-list-item
          v-if="!isAuthed"
          :prepend-icon="mdiAccountPlus"
          title="アカウント登録"
          to="/signup"
          nuxt
        />
        <v-list-item
          v-if="!isAuthed"
          :prepend-icon="mdiLogin"
          title="ログイン"
          to="/signin"
          nuxt
        />
        <v-list-item
          v-if="isAuthed"
          :prepend-icon="mdiPlusBox"
          title="アイテム登録"
          to="/item/create"
          nuxt
        />
        <v-list-item
          v-if="isAuthed"
          :prepend-icon="mdiAccount"
          title="アカウント"
          to="/account"
          nuxt
        />
      </v-list>
    </v-navigation-drawer>
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
        <v-btn
          color="secondary"
          variant="text"
          class="mx-2"
          rounded="xl"
          to="/item/create"
          nav
        >
          アイテム登録
        </v-btn>
        <v-btn
          color="secondary"
          variant="text"
          class="mx-2"
          rounded="xl"
          to="/terms"
          nav
        >
          利用規約
        </v-btn>
        <v-btn
          color="secondary"
          variant="text"
          class="mx-2"
          rounded="xl"
          to="/privacy"
          nav
        >
          プライバシーポリシー
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>PSO2 Search</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style></style>
