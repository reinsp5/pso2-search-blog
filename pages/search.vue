<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";
import { Item } from "~/types/item";

const pageTitle = "検索 | PSO2 Search Unofficial Item Search Engine";
const pageDescription = "PSO2およびPSO2NGSのアイテム検索エンジンです。";
useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
});

const keyword = ref("");
const searchResults = useState<Item[]>("search-result", () => []);

const { darkMode } = useAppTheme();
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
  const { search, parms } = useSearch();
  parms.value.q = keyword.value;
  const response = await search();
  searchResults.value = response!.hits.map((item) => {
    return new Item().mapItem(item);
  });
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col align="start" class="py-0" cols="12">
        <v-img
          class="mr-auto ml-0 text-start"
          v-if="!darkMode"
          height="48"
          src="/images/logo.svg"
          inline
        />
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
    <v-row justify="center" justify-sm="start">
      <v-col v-for="item in searchResults" :key="item.id" cols="auto">
        <SearchResultCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
