<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import { VForm } from "vuetify/lib/components/index.mjs";

definePageMeta({
  middleware: ["auth"],
});

const displayName = useState<string>("update-display-name", () => "");
const email = useState<string>("update-email", () => "");

// フォームバリデーションチェック
const form = ref<VForm | null>(null);

// アラートの表示
const alert = ref(false);

// ローディングの表示
const loading = ref(false);

// ダイアログの表示
const dialog = ref(false);

const user = getAuth().currentUser;
if (user) {
  displayName.value = user.displayName ?? "";
  email.value = user.email ?? "";
}

// ユーザ情報の更新
const updateUser = async () => {
  loading.value = true;
  const { updateUser } = useAuth();
  alert.value = await updateUser(displayName.value, email.value);
  loading.value = false;
};

// サインアウト
const signOut = async () => {
  const { signOut } = useAuth();
  await signOut();
};

// アカウント削除
const delUser = async () => {
  const { delUser } = useAuth();
  await delUser();
};

// ダイアログの表示
const openDialog = () => {
  dialog.value = true;
};
</script>

<template>
  <v-container>
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card variant="flat" color="error" min-height="300">
        <v-card-title class="text-h5"> アカウント削除 </v-card-title>
        <v-card-text>
          本当にアカウントを削除しますか？<br />
          アカウントを削除しても、あなたの登録したアイテムの情報は残ります。<br />
          設定したアイテムの画像や自キャラの画像もそのまま残ります。<br />
          <div class="mt-4">
            以上に同意し、アカウントを削除する場合は「同意します」を押してください。
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="font-weight-bold"
            color="white"
            variant="text"
            @click="delUser"
          >
            同意します
          </v-btn>
          <v-btn color="white" variant="text" @click="dialog = false">
            やっぱりやめます
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" variant="outlined" max-width="960">
          <v-card-title class="ma-4 text-h6 text-md-h5">
            アカウント情報
          </v-card-title>
          <v-row>
            <v-col>
              <v-form ref="form" class="mx-8 mt-8" @submit.prevent="updateUser">
                <v-text-field
                  v-model="displayName"
                  variant="outlined"
                  label="表示名"
                />
                <v-text-field
                  v-model="email"
                  variant="outlined"
                  label="メールアドレス"
                />
                <v-btn
                  
                  block
                  color="primary"
                  class="text-md-h6 mb-4"
                  size="x-large"
                  variant="flat"
                  type="submit"
                  :loading="loading"
                >
                  ユーザ情報更新
                </v-btn>
              </v-form>
              <v-fade-transition>
                <v-alert
                  class="mx-8 mb-8"
                  v-model="alert"
                  position="static"
                  type="success"
                  title="アカウント情報を更新しました。"
                  closable
                />
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto" variant="outlined" max-width="960">
          <v-card-title> ログアウト／アカウントの削除 </v-card-title>
          <v-row>
            <v-col class="pa-8" cols="12" md="6">
              <v-btn
                class="text-md-h6"
                color="primary"
                block
                min-height="100px"
                @click="signOut"
              >
                ログアウト
              </v-btn>
            </v-col>
            <v-col class="pa-8" cols="12" md="6">
              <v-btn
                class="text-md-h6"
                color="error"
                block
                min-height="100px"
                @click="openDialog"
              >
                アカウント削除
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
