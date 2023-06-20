<script lang="ts" setup>
import { mdiImage } from "@mdi/js";

const required = (v: File) => !!v || "アイテム画像は必須です";
const limitSize = (v: any) => {
  return (
    v.every((file: File) => file.size < 8388608) ||
    "ファイルサイズは8MB未満にしてください"
  );
};

const images = useState<File[]>("preview-images", () => []);
const previewUrl = useState<string>("preview-url", () => "");

const changeImage = () => {
  const file = images.value[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = 320;
      canvas.height = 320;

      ctx.drawImage(img, 0, 0, 320, 320);
      ctx.font = "20px Roboto";

      // テキストの縁取り（ストローク）の設定
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.strokeText("©SEGA", 12, 32);

      // テキストの塗りつぶし（フィル）の設定
      ctx.fillStyle = "black";
      ctx.fillText("©SEGA", 12, 32);

      previewUrl.value = canvas.toDataURL();
    };
    img.src = event.target?.result as string;
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <v-col cols="12">
    <v-file-input
      class="mt-4"
      v-model="images"
      :rules="[required, limitSize]"
      accept="image/png, image/jpeg"
      placeholder="アイテム詳細の画像"
      :prepend-icon="mdiImage"
      label="アイテムの画像"
      variant="outlined"
      density="compact"
      @update:model-value="changeImage"
    />
  </v-col>
  <v-col align="center" cols="12" md="6">
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
  <v-col class="pl-md-16" align-self="start" cols="12" md="6">
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
</template>

<style scoped></style>
