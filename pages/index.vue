<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";
import { Item } from "~/types/item";

// SEO情報
const pageTitle = "ホーム | PSO2 Search Unofficial Item Search Engine";
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

// 検索
const search = async () => {
  // IME入力中は検索しない
  if (isCompositioning.value) {
    return;
  }

  const { search, keyword: word } = useSearch();
  word.value = keyword.value;
  searchResults.value = await search();

  // 検索結果が１件以上ある場合は、検索結果を表示するページへ遷移
  await navigateTo("/search");
};
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
