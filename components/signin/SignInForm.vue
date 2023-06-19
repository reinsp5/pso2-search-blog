<script lang="ts" setup>

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
    <v-card-title class="text-center mb-4">ログイン</v-card-title>
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
          color="white"
          class="text-none mb-2"
          size="x-large"
          variant="flat"
          @click="signInAsGoogle"
        >
          <nuxt-icon class="mr-2" name="google" filled />
          GOOGLEでログイン
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col align="center" class="mx-4 mb-2">
        <NuxtLink to="/signup">
          新規登録はこちら
        </NuxtLink>
      </v-col>
      <v-col align="center" class="ma-4">
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
