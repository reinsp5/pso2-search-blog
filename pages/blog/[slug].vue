<script lang="ts" setup>
import type { Article } from "~/types/article";

const { darkMode } = useAppTheme();

const route = useRoute();
const { slug } = route.params;

const { data } = await useAsyncData(`article-${slug}`, async () => {
  const { $newtClient } = useNuxtApp();
  return await $newtClient.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug,
      select: ["_id", "_sys", "title", "slug", "meta", "body", "category"],
    },
  });
});
const article = data.value;

useSeoMeta({
  title: article?.title,
  ogTitle: article?.title,
  ogDescription: article?.body,
});
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card variant="flat" class="tw-prose" >
          <v-card-title>
            <h2>{{ article?.title }}</h2>
          </v-card-title>
          <v-card-text>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="article?.body" />
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
