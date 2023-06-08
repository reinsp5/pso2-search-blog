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
const previewUrl = useState<string>("preview-url", () => "");
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

      canvas.add(imageInstance.scaleToHeight(256));

      const text = new fabric.Text("© SEGA", {
        left: 12,
        top: 12,
        fontSize: 20,
        fill: "black",
        stroke: "white",
        strokeWidth: 1,
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
    accept="image/png, image/jpeg"
    placeholder="アイテム詳細の画像"
    :prepend-icon="mdiImage"
    label="アイテムの画像"
    variant="outlined"
    density="comfortable"
    @update:model-value="preview"
  />
  <v-row align="center">
    <v-col align-self="start" class="pl-16">
      <v-list lines="three">
        <v-list-item>
          <v-list-item-title class="font-weight-bold">
            「アイテム詳細」の画像推奨
          </v-list-item-title>
          <v-list-item-subtitle>
            PSO2内のアイテム詳細で表示される四角形の画像を添付してください。
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title class="font-weight-bold">
            「&copy;SEGA」は自動挿入
          </v-list-item-title>
          <v-list-item-subtitle>
            PSO2の著作物利用ガイドラインに基づき、「&copy;SEGA」を画像左上に自動挿入します。
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title class="font-weight-bold">
            JPEG/PNGかつ8MB未満
          </v-list-item-title>
          <v-list-item-subtitle>
            アップロード可能なファイルは8MB未満です。JPEGまたはPNG形式に対応しています。
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col align="center" cols="6">
      <v-img
        v-if="images.length"
        :src="previewUrl"
        max-width="320"
        :aspect-ratio="1 / 1"
        cover
      />
      <v-sheet
        v-if="!images.length"
        max-width="320"
        max-height="320"
        width="100%"
        height="320"
        rounded="lg"
        border="sm opacity-50"
        color="transparent"
        class="mb-8 pa-4 d-flex align-center justify-center"
      >
        <v-icon :icon="mdiImage" size="100" />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped></style>
