<script lang="ts" setup>
import type { VForm } from "vuetify/lib/components/index.mjs";

const signUpForm = ref<VForm | null>(null);
const email = ref("");
const password = ref("");

// メールアドレスで登録
const signUp = async () => {
  // バリデーションチェック
  if (!signUpForm.value) {
    return;
  }
  const isValid = await signUpForm.value.validate();
  if (!isValid.valid) {
    return;
  }
  
  const { signUpMail } = useAuth();
  try {
    await signUpMail(email.value, password.value);
  } catch (e) {
    console.error(e);
  }
};

// Googleで登録
const signUpAsGoogle = async () => {
  const { signInGoogle } = useAuth();
  try {
    await signInGoogle();
  } catch (e) {
    console.error(e);
  }
};

// Twitterで登録
const signUpAsTwitter = async () => {
  const { signInTwitter } = useAuth();
  try {
    await signInTwitter();
  } catch (e) {
    console.error(e);
  }
};

// メールアドレスのバリデーション
const emailRules = [
  (v: string) => !!v || "入力必須です",
  (v: string) =>
    /.+@.+\..+/.test(v) || "メールアドレスの形式で入力してください",
];

// パスワードのバリデーション（8桁以上、英数字記号を含む）
const passwordRules = [
  (v: string) => !!v || "入力必須です",
  (v: string) => v.length >= 8 || "8文字以上で入力してください",
  (v: string) =>
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}/.test(v) ||
    "英数字記号を含めてください",
];
</script>

<template>
  <v-card>
    <v-card-title class="text-center mb-4">登録</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form ref="signUpForm" validate-on="input" @submit.prevent="signUp">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="メールアドレス"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            class="mt-4"
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="パスワード"
            variant="outlined"
            density="compact"
          />
          <v-btn
            class="my-4"
            color="blue-darken-4"
            size="x-large"
            type="submit"
            variant="elevated"
            block
          >
            登録する
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-title class="text-center">OAuth登録</v-card-title>
    <v-row class="mx-4 mb-2">
      <v-col>
        <!-- Twitter -->
        <v-btn
          block
          class="text-none mb-2"
          color="blue"
          size="x-large"
          variant="flat"
          @click="signUpAsTwitter"
        >
          <nuxt-icon class="mr-2" name="twitter" />
          TWITTERで登録
        </v-btn>

        <!-- Google -->
        <v-btn
          block
          class="text-none mt-4 mb-2"
          size="x-large"
          variant="outlined"
          @click="signUpAsGoogle"
        >
          <nuxt-icon class="mr-2" name="google" filled />
          GOOGLEで登録
        </v-btn>
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
