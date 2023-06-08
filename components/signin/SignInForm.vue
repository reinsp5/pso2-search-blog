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
    <v-card-title>ログイン</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form>
          <v-text-field></v-text-field>
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
          <Icon class="mx-2" name="mdi:twitter" size="24" />
          Twitterでログイン
        </v-btn>

        <!-- Google -->
        <v-btn
          block
          class="text-none mb-2"
          size="x-large"
          variant="outlined"
          @click="signInAsGoogle"
        >
          <Icon class="mx-2" name="logos:google-icon" size="24" />
          GOOGLEでログイン
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped></style>
