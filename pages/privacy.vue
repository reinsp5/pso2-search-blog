<script lang="ts" setup></script>

<template>
  <v-container class="w-100 d-flex align-center justify-center">
    <v-card variant="tonal" max-width="960" width="100%">
      <v-card-title class="my-4 text-h4 font-weight-bold">
        プライバシーポリシー
      </v-card-title>
      <v-card-content>
        <v-row class="ma-8">
          <v-col>
            本サービスの利用に際して、当方はユーザの皆さまの個人情報を取得しません。<br />
            ただし、アカウント管理のために識別情報として本ポリシーに掲げる情報を取得します。
          </v-col>
        </v-row>

        <v-row class="ma-8">
          <v-col>
            <div class="text-h5 font-weight-bold">
              １．アカウント作成およびログイン方法
            </div>
            当サービスは、以下の方法によるアカウント作成およびログインを提供します。
            <ol>
              <li>メールアドレス認証（メールアドレスおよびパスワード）</li>
              <li>Googleアカウント認証</li>
              <li>Twitterアカウント認証</li>
            </ol>
          </v-col>
        </v-row>

        <v-row class="ma-8">
          <v-col>
            <div class="text-h5 font-weight-bold">
              ２．取得する情報と取得目的
            </div>
            当サービスは、アイテム情報の登録／編集／削除を行うためにアカウントを必要とします。<br />
            アカウントを作成およびログインするために、以下の情報を取得します。
            <ol>
              <li>
                メールアドレス認証（メールアドレスおよびパスワード）
                <ul>
                  <li>ご自身で登録したメールアドレス</li>
                  <li>ご自身で登録したパスワードのハッシュ値<br />
                    （パスワードそのものは取得しません）
                  </li>
                  <li>アカウント管理システムにより割り当てられる固有識別子</li>
                </ul>
              </li>
              <li>
                Googleアカウント認証
                <ul>
                  <li>
                    Googleアカウントに紐づくメールアドレス
                  </li>
                  <li>
                    アカウント管理システムにより割り当てられる固有識別子
                  </li>
                </ul>
              </li>
              <li>
                Twitterアカウント認証
                <ul>
                  <li>
                    Twitterアカウントのアカウント名<br />
                    （スクリーン名ではありません）
                  </li>
                  <li>
                    アカウント管理システムにより割り当てられる固有識別子
                  </li>
                </ul>
              </li>
            </ol>
          </v-col>
        </v-row>
        <div class="ma-12 text-h6 text-right">以上</div>
      </v-card-content>
    </v-card>
  </v-container>
</template>

<style scoped></style>
