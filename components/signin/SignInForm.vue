<script lang="ts" setup>
const { account } = useAppwrite();

// Discordでログイン
const signInAsDiscord = async () => {
  try {
    await account.createOAuth2Session("discord", "http://localhost:3000");
  } catch (e) {
    console.error(e);
  }
};

// Googleでログイン
const signInAsGoogle = async () => {
  try {
    await account.createOAuth2Session("google", "http://localhost:3000");
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
        
        <!-- Discord -->
        <v-btn
          block
          class="text-none mb-2"
          color="indigo"
          size="x-large"
          variant="flat"
          @click="signInAsDiscord"
        >
          <Icon class="mx-2" name="ic:baseline-discord" size="24" />
          DISCORDでログイン
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
