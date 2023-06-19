<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";
import { Item } from "~/types/item";

const keyword = ref("");
const searchResults = useState<Item[]>("search-result", () => []);

const config = useRuntimeConfig();

const darkMode = useState("dark-mode");
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
};

useHead({
  title: "検索ページ | PSO2 Search Unofficial Item Search Engine",
  meta: [
    { property: "og:title", content: "検索ページ | PSO2 Search Unofficial Item Search Engine" },
    { property: "og:description", content: "PSO2 Searchの検索フォームです。" },
  ],
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col align="start" class="py-0" cols="12">
        <v-img class="mr-auto ml-0 text-start" v-if="!darkMode" height="48" src="/images/logo.svg" inline />
        <v-img v-else height="48" src="/images/logo_dark.svg" inline />
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="7" xl="5">
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
    <v-row justify="center" justify-sm="start" >
      <v-col v-for="item in searchResults" :key="item.id" cols="auto">
        <SearchResultCard  :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
