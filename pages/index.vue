<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";
import { Item } from "~/types/item";
import { useStorage } from "@vueuse/core";

const keyword = ref("");
const searchResults = useState<Item[]>("search-result", () => []);
const darkMode = useStorage("dark-mode", false);
const config = useRuntimeConfig();

const isCompositioning = ref(false);

// IME入力開始
const compositionStart = () => {
  isCompositioning.value = true;
};

// IME入力終了
const compositionEnd = () => {
  isCompositioning.value = false;
};
const search = async () => {
  // IME入力中は検索しない
  if (isCompositioning.value) {
    return;
  }
  const response = await fetch(
    "https://search.reinsp5.com/indexes/pso2-items/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.public.meilisearchApiKey}`,
      },
      body: JSON.stringify({
        q: keyword.value,
      }),
    }
  );
  // 検索結果を保存
  const json = await response.json();
  searchResults.value = json.hits as Item[];
  // 検索結果が１件以上ある場合は、検索結果を表示するページへ遷移
  if (json.hits.length > 0) {
    await navigateTo("/search");
  }
};

useHead({
  title: "ホーム | PSO2 Search Unofficial Item Search Engine",
  meta: [
    {
      property: "og:title",
      content: "ホーム | PSO2 Search Unofficial Item Search Engine",
    },
    {
      property: "og:description",
      content: "PSO2およびPSO2NGSのアイテム検索エンジンです。",
    },
  ],
});
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-img
          v-if="!darkMode"
          class="px-8"
          height="96"
          src="/images/logo.svg"
        />
        <v-img v-else class="px-8" height="96" src="/images/logo_dark.svg" />
      </v-col>
      <v-col align="center" cols="12" lg="8" xl="5">
        <v-text-field
          color="primary"
          :prepend-inner-icon="mdiMagnify"
          v-model="keyword"
          variant="outlined"
          density="comfortable"
          @compositionstart="compositionStart"
          @compositionend="compositionEnd"
          @keydown.enter="search"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
