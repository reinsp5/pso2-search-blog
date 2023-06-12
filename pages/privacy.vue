<script lang="ts" setup></script>

<template>
  <v-container class="w-100 d-flex align-center justify-center">
    <v-card variant="tonal" max-width="960" width="100%">
      <v-card-title class="my-4 text-h4 font-weight-bold">
        プライバシーポリシー
      </v-card-title>
      <v-card-text>
        <v-row class="ma-8">
          <v-col>
            本サービスの会員システムは、Google社のFirebase
            Authenticationを使用しています。
            従って、プライバシーポリシーは<NuxtLink
              to="https://firebase.google.com/support/privacy?hl=ja"
              >Firebase Authenticationのプライバシーポリシー</NuxtLink
            >が適用されます。<br />
            当方はユーザー様のユーザ名およびFirebase
            Authenticationによってアカウントごとに割り当てられる固有識別子のみ閲覧可能であり、各OAuthアカウントの詳細なユーザ情報へはアクセスできません。
          </v-col>
        </v-row>

        <v-row class="ma-8">
          <v-col>
            <div class="text-h5 font-weight-bold mb-8">
              １．アカウント作成およびログイン方法
            </div>
            当サービスは、以下の方法によるアカウント作成およびログインを提供します。
            <ol>
              <li>Googleアカウント認証</li>
              <li>Twitterアカウント認証</li>
            </ol>
          </v-col>
        </v-row>

        <v-row class="ma-8">
          <v-col>
            <div class="text-h5 font-weight-bold mb-8">
              ２．取得する情報と取得目的
            </div>
            当サービスは、アイテム情報の登録／編集／削除を行うために利用登録が必要です。<br />
            利用登録の方法については、前項に記載したとおりです。<br />
          </v-col>
        </v-row>
        <div class="ma-12 text-h6 text-right">以上</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
ol,
ul {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
}

li {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
