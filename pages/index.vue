<script lang="ts" setup>
// SEO情報
const pageTitle = "ホーム | PSO2 Search Unofficial Item Search Engine";
const pageDescription = "PSO2およびPSO2NGSのアイテム検索エンジンです。";
useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
});
const { darkMode } = useAppTheme();

import type { Article } from "~/types/article";

const { data } = await useAsyncData("articles", async () => {
  const { $newtClient } = useNuxtApp();
  return await $newtClient.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "title", "slug", "body"],
    },
  });
});
const articles = data.value?.items;
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="article in articles" :key="article._id">
        <v-card variant="flat">
          <v-card-title>
            <NuxtLink :to="`/blog/${article.slug}`">
              {{ article.title }}
            </NuxtLink>
          </v-card-title>
          <v-card-text>{{ article.body }}</v-card-text>
        </v-card>
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
