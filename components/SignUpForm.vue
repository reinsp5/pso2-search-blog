<script lang="ts" setup>
const { account } = useAppwrite();

const createAccountAsDiscord = async () => {
  try {
    await account.createOAuth2Session("discord", "http://localhost:3000");
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-card>
    <v-card-title>登録</v-card-title>
    <v-row class="mx-4">
      <v-col>
        <v-form>
          <v-text-field></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-title>OAuth</v-card-title>
    <v-row class="mx-4 mb-2">
      <v-col>
        
        <!-- Discord -->
        <v-btn
          block
          class="text-none mb-2"
          color="indigo"
          size="x-large"
          variant="flat"
          @click="createAccountAsDiscord"
        >
          <Icon class="mx-2" name="ic:baseline-discord" size="24" />
          DISCORDで登録
        </v-btn>

        <!-- Google -->
        <v-btn
          block
          class="text-none mb-2"
          size="x-large"
          variant="outlined"
          @click="createAccountAsDiscord"
        >
          <Icon class="mx-2" name="logos:google-icon" size="24" />
          GOOGLEで登録
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped></style>
