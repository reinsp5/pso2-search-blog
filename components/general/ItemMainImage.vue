<script lang="ts" setup>
import { mdiImage } from "@mdi/js";
import { fabric } from "fabric";

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
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageElement = new Image();
    imageElement.onload = function () {
      const canvas = new fabric.Canvas(document.createElement("canvas"), {
        width: imageElement.width,
        height: imageElement.height,
      });

      const imageInstance = new fabric.Image(imageElement, {
        left: 0,
        top: 0,
      });

      canvas.add(imageInstance);

      const text = new fabric.Text("© SEGA", {
        left: 10,
        top: 10,
        fontSize: 25,
        borderColor: "#FFFFFF",
      });

      canvas.add(text);
      canvas.renderAll();

      const dataURL = canvas.toDataURL({ format: "png" });

      previewUrl.value = dataURL;
    };
    imageElement.src = event.target?.result as string;
  };
  reader.readAsDataURL(images.value[0]);
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
    cover
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
