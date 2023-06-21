<script lang="ts" setup>
const pageTitle =
  "プライバシーポリシー | PSO2 Search Unofficial Item Search Engine";
const pageDescription =
  "PSO2 Searchにアイテム登録を行うためにアカウントを作成する際のプライバシーポリシーです。";
useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
});
</script>

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
            Authenticationを使用します。 Firebase
            Authenticationのプライバシーポリシーは<NuxtLink
              to="https://firebase.google.com/support/privacy?hl=ja"
              >Firebase Authenticationのプライバシーポリシー</NuxtLink
            >を御覧ください。<br />
            当方は、ユーザ名およびFirebase
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

        <v-row class="ma-8">
          <v-col>
            <div class="text-h5 font-weight-bold mb-8">３．注意事項</div>
            <ol>
              <li>
                OAuth認証（Twitter認証およびGoogle認証）によりログインした場合、ユーザ名の初期値はOAuth認証によって取得したユーザ名がそのまま利用されます。<br />
                万が一、ユーザ名がご自身の本名など個人を特定できる情報になっている場合は、直ちにユーザ名を変更してください。<br />
                ユーザ名の変更は、アカウント設定画面から行うことができます。<br />
              </li>
              <li>
                ユーザー名を変更しても、過去に登録したアイテム情報には変更は反映されません。<br />
              </li>
              <li>
                ユーザー名は、他のユーザーと重複しないようにしてください。<br />
              </li>
            </ol>
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
