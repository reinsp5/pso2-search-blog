<script lang="ts" setup>
import type { VForm } from "vuetify/lib/components/index.mjs";

const signInForm = ref<VForm | null>(null);
const email = ref("");
const password = ref("");
// メールアドレスでログイン
const signIn = async () => {
  if (!signInForm.value) {
    return;
  }
  const isValid = await signInForm.value.validate();
  if (!isValid.valid) {
    return;
  }
  const { signInMail } = useAuth();
  // try {
  //   await signInMail(email.value, password.value);
  // } catch (e) {
  //   console.error(e);
  // }
};

// Twitterでログイン
const signInAsTwitter = async () => {
  const { signInTwitter } = useAuth();
  try {
    await signInTwitter();
  } catch (e) {
    console.error(e);
  }
};

// Googleでログイン
const signInAsGoogle = async () => {
  // const { signInGoogle } = useAuth();
  // try {
  //   await signInGoogle();
  // } catch (e) {
  //   console.error(e);
  // }
};

// メールアドレスのバリデーション
const emailRules = [
  (v: string) => !!v || "入力必須です",
];

// パスワードのバリデーション（8桁以上、英数字記号を含む）
const passwordRules = [
  (v: string) => !!v || "入力必須です",
];
</script>

<template>
  <v-card>
    <v-card-title class="text-center mb-4">ログイン</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form ref="signInForm" validate-on="input" @submit.prevent="signIn">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            variant="outlined"
            density="compact"
            type="email"
          />
          <v-text-field
            class="mt-4"
            v-moddel="password"
            :rules="passwordRules"
            label="パスワード"
            variant="outlined"
            density="compact"
            type="password"
          />
          <v-btn
            class="my-4"
            color="blue-darken-4"
            size="x-large"
            type="submit"
            variant="elevated"
            block
          >
            ログインする
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-title>OAuthログイン</v-card-title>
    <v-row class="mx-4 mb-2">
      <v-col>
        <!-- Twitter -->
        <v-btn
          block
          class="text-none mb-2"
          color="blue"
          size="x-large"
          variant="flat"
          @click="signInAsTwitter"
        >
          <nuxt-icon class="mr-2" name="twitter" />
          TWITTERでログイン
        </v-btn>

        <!-- Google -->
        <v-btn
          block
          class="text-none mb-2"
          size="x-large"
          variant="outlined"
          @click="signInAsGoogle"
        >
          <nuxt-icon class="mr-2" name="google" filled />
          GOOGLEでログイン
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="mx-4 mb-2">
        <NuxtLink to="/signup">
          新規登録はこちら
        </NuxtLink>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.nuxt-icon svg {
  width: 32px;
  height: 32px;
}
</style>
