<script lang="ts" setup>
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

</script>

<template>
  <v-card>
    <v-card-title class="text-center mb-4">登録</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form>
          <v-text-field
            type="email"
            label="メールアドレス"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            type="password"
            label="パスワード"
            variant="outlined"
            density="comfortable"
          />
          <v-btn
            class="mb-4"
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
          <Icon class="mx-2" name="mdi:twitter" size="24" />
          Twitterで登録
        </v-btn>

        <!-- Google -->
        <v-btn
          block
          class="text-none mb-2"
          size="x-large"
          variant="outlined"
          @click="signUpAsGoogle"
        >
          <Icon class="mx-2" name="logos:google-icon" size="24" />
          GOOGLEで登録
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped></style>
