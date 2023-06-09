<script lang="ts" setup>
// Twitterでログイン
const signInAsTwitter = async () => {
  const { signInGoogle } = useAuth();
  try {
    await signInGoogle();
  } catch (e) {
    console.error(e);
  }
};

// Googleでログイン
const signInAsGoogle = async () => {
  const { signInTwitter } = useAuth();
  try {
    await signInTwitter();
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-card>
    <v-card-title class="text-center mb-4">ログイン</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form>
          <v-text-field
            label="メールアドレス"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            label="パスワード"
            variant="outlined"
            density="compact"
          />
          <v-btn
            class="mb-4"
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
  </v-card>
</template>

<style>
.nuxt-icon svg {
  width: 32px;
  height: 32px;
}
</style>
