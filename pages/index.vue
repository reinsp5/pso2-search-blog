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
      select: ["_id", "_sys", "title", "slug", "meta", "body", "category"],
    },
  });
});
const articles = data.value?.items;
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="article in articles" :key="article._id">
        <v-row class="my-4">
          <v-col align="center" cols="12" md="3">
            <v-img
              :src="article.meta.ogImage.src"
              max-width="200"
              max-height="200"
              cover
            />
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12">
                <span class="text-h6 text-md-h5">
                  <NuxtLink :to="`/blog/${article.slug}`">
                    {{ article.title }}
                  </NuxtLink>
                </span>
              </v-col>
              <v-col cols="12" class="text-caption">
                {{
                  `作成日：${new Date(
                    article._sys.createdAt
                  ).toLocaleDateString()}`
                }}
                　
                {{
                  `編集日：${new Date(
                    article._sys.updatedAt
                  ).toLocaleDateString()}`
                }}
              </v-col>
              <v-col cols="12">
                {{ article.meta.description }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
