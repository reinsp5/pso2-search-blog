<script lang="ts" setup>
import { mdiImage } from "@mdi/js";

const required = (v: File) => !!v || "アイテム画像は必須です";
const limitSize = (v: any) => {
  return (
    v.every((file: File) => file.size < 8388608) ||
    "ファイルサイズは8MB未満にしてください"
  );
};

const images = ref<File[]>([]);
const previewUrl = ref<string>("");
const preview = () => {
  if (!images.value.length) {
    previewUrl.value = "";
    return;
  }
  previewUrl.value = URL.createObjectURL(images.value[0]);
};
</script>

<template>
  <v-file-input
    class="mt-4"
    v-model="images"
    :rules="[required, limitSize]"
    accept="image/png, image/jpeg, image/bmp, image/avif"
    placeholder="Pick an avatar"
    :prepend-icon="mdiImage"
    label="アイテム画像"
    variant="outlined"
    density="comfortable"
    @update:model-value="preview"
  />
  <v-img
    v-if="images.length"
    :src="previewUrl"
    max-width="100%"
    :aspect-ratio="16 / 9"
  />
  <v-sheet
    v-if="!images.length"
    max-width="100%"
    height="350"
    rounded="lg"
    border="sm opacity-50"
    color="transparent"
    class="mb-8 pa-4 d-flex justify-center align-center"
  >
    <v-icon :icon="mdiImage" size="100" />
  </v-sheet>
</template>

<style scoped></style>
