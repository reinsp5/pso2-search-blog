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
  <v-container class="d-flex align-center justify-center">
    <v-card variant="tonal" max-width="1280">
      <v-card-title class="mt-8 text-h4 font-weight-bold text-center">
        プライバシーポリシー
      </v-card-title>
      <v-card-text class="text-caption text-md-body-1">
        <v-row class="ma-1 ma-md-8">
          <v-col>
            このプライバシーポリシー（以下、「当ポリシー」）は、PSO2
            Search（以下、「本サービス」）の個人情報の取り扱いについて定めるものです。
          </v-col>
        </v-row>
        <v-row class="ma-1 ma-md-8">
          <v-col>
            <div class="text-body-1 text-md-h5 font-weight-bold">
              １．本サービスが収集する個人情報
            </div>
            <div class="mt-5">
              本サービスの運営上、個人情報を必要としないため、ユーザーの個人情報を個別に収集および保管、使用することはありません。<br />
              ただし、アカウントを作成した場合はOAuthプロバイダにより提供される情報（メールアドレス、ユーザーID、ユーザー名）についてはユーザーを識別することを目的として収集、保管、使用されます。
            </div>
          </v-col>
        </v-row>

        <v-row class="ma-1 ma-md-8">
          <v-col>
            <div class="text-body-1 text-md-h5 font-weight-bold">
              ２．アカウント作成と識別情報の取得
            </div>
            <div class="mt-5">
              本サービスでは、ユーザーはアカウントを作成し、アイテム情報の登録及び編集を行うことができます。<br />
              アカウント作成は以下の２つの方法で可能であり、いずれの方法でアカウントを作成した場合も、識別情報としてOAuthプロバイダよりユーザーID、メールアドレス、ユーザー名が提供されます。
              本サービスはそれら識別情報をユーザーを識別するために使用します。<br />
              <ol>
                <li>
                  Google認証<br />
                  Googleアカウントを用いてアカウントを作成する場合、GoogleからユーザーID、メールアドレス、ユーザー名を取得します。<br />
                  ※ユーザー名はGoogleアカウントの表示名となります。万が一本名が設定されている場合は、本名が表示される可能性があります。
                  アカウント作成時、初回のユーザ名変更時に必ず変更してください。
                  </li>
                <li>
                  Twitter認証<br />
                  Twitterアカウントを用いてアカウントを作成する場合、TwitterからユーザーID、メールアドレス、ユーザー名を取得します。<br />
                  ※ユーザー名はTwitterアカウントの表示名となります。万が一本名が設定されている場合は、本名が表示される可能性があります。
                  アカウント作成時、初回のユーザ名変更時に必ず変更してください。
                  </li>
              </ol>
            </div>
          </v-col>
        </v-row>

        <div class="ma-12 text-h6 text-right">以上</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
ol {
  margin-top: 1.5em;
  margin-left: 1.5em;
}
li {
  line-height: 2em;
}
</style>
