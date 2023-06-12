<script lang="ts" setup>

// Twitterで登録
const signUpAsTwitter = async () => {
  const { signInTwitter } = useAuth();
  try {
    await signInTwitter();
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

</script>

<template>
  <v-card variant="text">
    <v-card-title class="text-center mb-4">登録</v-card-title>
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
          color="white"
          class="text-none mt-4 mb-2"
          size="x-large"
          variant="flat"
          @click="signUpAsGoogle"
        >
          <nuxt-icon class="mr-2" name="google" filled />
          GOOGLEで登録
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-4 text-center">
        <NuxtLink to="/signin">
          ログインはこちら
        </NuxtLink>
      </v-col>
      <v-col class="ma-4 text-center">
        <NuxtLink to="/terms">
          利用規約はこちら
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
