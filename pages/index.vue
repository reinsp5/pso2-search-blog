<script lang="ts" setup>
import { mdiMagnify } from "@mdi/js";
import { Item } from "~/types/item";

const keyword = ref("");
const searchResults = useState<Item[]>('search-result', () => []);

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
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <span class="text-h3">PSO2アイテム検索</span>
      </v-col>
      <v-col align="center" cols="8">
        <v-text-field
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
