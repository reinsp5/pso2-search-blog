<script lang="ts" setup>
import { Blog } from "types/blog";

// SEO情報
const pageTitle = "ホーム | PSO2 Search Unofficial Item Search Engine";
const pageDescription = "PSO2およびPSO2NGSのアイテム検索エンジンです。";
useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
});
const { darkMode } = useAppTheme();

const { data } = useMicroCMSGetList<Blog>({
  endpoint: "blogs",
});

</script>

<template>
  <v-container>
    <v-row justify="center" class="w-md-75 mx-auto">
      <v-col cols="12" v-for="blog in data?.contents" :key="blog.id">
        <v-card variant="flat" :to="`/blog/${blog.id}`" v-ripple>
          <v-row class="my-4">
            <v-col align="center" cols="12" md="3">
              <v-img
                :src="blog.eyecatch?.url"
                max-width="200"
                max-height="200"
                :width="blog.eyecatch?.width"
                :height="blog.eyecatch?.height"
                alt=""
                cover
              />
            </v-col>
            <v-col>
              <v-row no-gutters>
                <v-col cols="12">
                  <span class="text-h6 text-md-h5 font-weight-bold">
                    <NuxtLink :to="`/blog/${blog.id}`">
                      {{ blog.title }}
                    </NuxtLink>
                  </span>
                </v-col>
                <v-col cols="12" class="text-caption">
                  公開日：{{ blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString() }}
                </v-col>
                <v-col class="pr-8 py-4" cols="12">
                  {{ blog.description }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-divider color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
