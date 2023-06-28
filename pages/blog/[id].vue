<script lang="ts" setup>
import { Blog } from "types/blog";

const { darkMode } = useAppTheme();

const { params } = useRoute();

const { data } = useMicroCMSGetListDetail<Blog>({
  endpoint: "blogs",
  contentId: params.id as string,
});

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  ogDescription: data.value?.content,
});
</script>

<template>
  <template v-if="data">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card
            variant="flat"
            class="tw-prose tw-prose-2xl tw-mx-auto prose-img:tw-max-h-[480px] prose-img:tw-mx-auto prose-img:tw-w-full prose-img:tw-object-contain prose-img:tw-object-center"
          >
            <v-card-title>
              <h2 class="text-h6 text-md-h4 font-weight-bold">{{ data.title }}</h2>
            </v-card-title>
            <v-card-text class="text-body-2 text-md-body-1">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="data.content" />
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>

<style>
.v-card-title {
  overflow-wrap: break-word;
  white-space: normal;
}

td:first-child {
  white-space: nowrap;
  font-weight: bold;
}
</style>
